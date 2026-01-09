import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// --- COMPONENT 1: The Application Form ---
function ApplicationForm() {
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [resume, setResume] = useState(null)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Sending...');
    const formData = new FormData();
    formData.append('name', name);
    formData.append('school', school);
    formData.append('resume', resume);

    try {
      await axios.post('/api/applicants', formData, {
        headers: { 'Accept': 'application/json' }
      });
      setMessage('✅ Application sent successfully!');
      setName(''); setSchool(''); setResume(null);
    } catch (error) {
      console.error(error);
      setMessage('❌ Error sending application.');
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg mt-10">
      <h1 className="text-2xl font-bold mb-6">Internship Application</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input placeholder="Name" className="w-full p-2 border rounded" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="School" className="w-full p-2 border rounded" value={school} onChange={e => setSchool(e.target.value)} required />
        <input type="file" className="w-full" onChange={e => setResume(e.target.files[0])} required accept=".pdf,.doc,.docx" />
        <button className="w-full bg-blue-600 text-white py-2 rounded">Submit</button>
      </form>
      {message && <p className="mt-4 text-center font-bold">{message}</p>}
      
      <div className="mt-6 text-center">
        <Link to="/admin" className="text-sm text-gray-500 hover:underline">Go to Admin Dashboard</Link>
      </div>
    </div>
  )
}

// --- COMPONENT 2: The Admin Dashboard ---
function AdminDashboard() {
  const [applicants, setApplicants] = useState([])

  // Fetch data when page loads
  useEffect(() => {
    axios.get('/api/applicants')
      .then(res => setApplicants(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link to="/" className="text-blue-600 hover:underline">Back to Form</Link>
      </div>

      <table className="w-full text-left">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-3">Name</th>
            <th className="p-3">School</th>
            <th className="p-3">Resume</th>
            <th className="p-3">Applied At</th>
          </tr>
        </thead>
        <tbody>
          {applicants.map(app => (
            <tr key={app.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-medium">{app.name}</td>
              <td className="p-3 text-gray-600">{app.school}</td>
              <td className="p-3">
                {/* Download Link */}
                <a 
                  href={`https://fluffy-fortnight-4j79rr5jq6jp27rx7-8000.app.github.dev/storage/${app.resume_path}`} 
                  target="_blank"
                  className="text-blue-600 hover:underline text-sm font-bold"
                >
                  Download
                </a>
              </td>
              <td className="p-3 text-sm text-gray-400">
                {new Date(app.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {applicants.length === 0 && <p className="text-center p-4 text-gray-500">No applicants yet.</p>}
    </div>
  )
}

// --- MAIN ROUTER ---
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <Routes>
          <Route path="/" element={<ApplicationForm />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App