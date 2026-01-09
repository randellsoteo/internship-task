import { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'

// --- UI COMPONENT: Navigation Bar ---
function Navbar() {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Logo Icon */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                BB
              </div>
              <span className="font-bold text-xl text-gray-800 tracking-tight">Black Bureau</span>
            </div>
          </div>
          <div className="flex items-center">
            {isAdmin ? (
              <Link to="/" className="text-sm font-medium text-gray-500 hover:text-indigo-600 transition flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                Apply Now
              </Link>
            ) : (
              <Link to="/admin" className="px-4 py-2 rounded-md bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition">
                Admin Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

// --- PAGE: Application Form ---
function ApplicationForm() {
  const [name, setName] = useState('')
  const [school, setSchool] = useState('')
  const [resume, setResume] = useState(null)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('school', school);
    formData.append('resume', resume);

    try {
      await axios.post('/api/applicants', formData, {
        headers: { 'Accept': 'application/json' }
      });
      setMessage('success');
      setName(''); setSchool(''); setResume(null);
    } catch (error) {
      console.error(error);
      setMessage('error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-900">
          Join the Team
        </h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Submit your application and resume below.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Name Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Full Name</label>
              <div className="mt-1">
                <input 
                  type="text" 
                  required 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition"
                  placeholder="e.g. Alex Doe"
                />
              </div>
            </div>

            {/* School Input */}
            <div>
              <label className="block text-sm font-medium text-slate-700">University / School</label>
              <div className="mt-1">
                <input 
                  type="text" 
                  required 
                  value={school}
                  onChange={e => setSchool(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 rounded-lg shadow-sm placeholder-slate-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition"
                  placeholder="e.g. MIT"
                />
              </div>
            </div>

            {/* File Upload - Styled */}
            <div>
              <label className="block text-sm font-medium text-slate-700">Resume (PDF)</label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-slate-300 border-dashed rounded-lg hover:border-indigo-400 transition bg-slate-50 group">
                <div className="space-y-1 text-center">
                  <svg className="mx-auto h-12 w-12 text-slate-400 group-hover:text-indigo-500 transition" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <div className="text-sm text-slate-600">
                    <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" required accept=".pdf,.doc,.docx" onChange={e => setResume(e.target.files[0])} />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-slate-500">PDF, DOC, DOCX up to 2MB</p>
                  {resume && <p className="text-sm text-green-600 font-semibold mt-2">Selected: {resume.name}</p>}
                </div>
              </div>
            </div>

            <div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>
          </form>

          {/* Alerts */}
          {message === 'success' && (
            <div className="mt-4 p-4 rounded-md bg-green-50 border border-green-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-green-800">Application received!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// --- PAGE: Admin Dashboard ---
function AdminDashboard() {
  const [applicants, setApplicants] = useState([])
  const [search, setSearch] = useState('')

  const fetchApplicants = (searchTerm = '') => {
    const url = searchTerm ? `/api/applicants?search=${searchTerm}` : '/api/applicants';
    axios.get(url).then(res => setApplicants(res.data)).catch(err => console.error(err));
  }

  useEffect(() => { fetchApplicants() }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    fetchApplicants(e.target.value);
  }

  const handleDelete = async (id) => {
    if(!confirm('Delete this applicant?')) return;
    try { await axios.delete(`/api/applicants/${id}`); fetchApplicants(search); } catch (e) { alert('Error'); }
  }

  const handleStatusChange = async (id, newStatus) => {
    try { await axios.put(`/api/applicants/${id}`, { status: newStatus }); fetchApplicants(search); } catch (e) { alert('Error'); }
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-slate-900 sm:text-3xl sm:truncate">
              Applicants
            </h2>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
              <input 
                type="text" 
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2" 
                placeholder="Search candidates..." 
                value={search}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>

        {/* Table Section */}
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Candidate</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">School</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {applicants.map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                              {app.name.charAt(0)}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{app.name}</div>
                              <div className="text-xs text-gray-500">Applied: {new Date(app.created_at).toLocaleDateString()}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{app.school}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select 
                            value={app.status || 'Pending'} 
                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                            className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer
                              ${app.status === 'Hired' ? 'bg-green-100 text-green-800' : 
                                app.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                                'bg-yellow-100 text-yellow-800'}`}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Interview">Interviewing</option>
                            <option value="Hired">Hired</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                             {/* 👇👇👇 REPLACE URL HERE 👇👇👇 */}
                          <a href={`https://fluffy-fortnight-4j79rr5jq6jp27rx7-8000.app.github.dev/storage/${app.resume_path}`} target="_blank" className="text-indigo-600 hover:text-indigo-900 font-medium flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            PDF
                          </a>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button onClick={() => handleDelete(app.id)} className="text-red-600 hover:text-red-900">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {applicants.length === 0 && <div className="text-center py-12 text-gray-500">No applicants found.</div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// --- MAIN LAYOUT ---
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<ApplicationForm />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  )
}

export default App