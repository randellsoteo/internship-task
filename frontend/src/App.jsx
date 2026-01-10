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
              <span className="font-bold text-xl text-gray-800 tracking-tight">Black Bureau Platforms Inc.</span>
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
                Admin Dashboard
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

// --- COMPONENT 2: The Admin Dashboard (Enhanced) ---
function AdminDashboard() {
  const [applicants, setApplicants] = useState([])
  const [search, setSearch] = useState('')
  
  // New States for Enhancements
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortBy, setSortBy] = useState('created_at')
  const [sortOrder, setSortOrder] = useState('desc')
  const [loading, setLoading] = useState(false)

  // Fetch data with all filters
  const fetchApplicants = (searchTerm = search, pageNum = page, sort = sortBy, order = sortOrder) => {
    setLoading(true);
    // Build query string
    const url = `/api/applicants?search=${searchTerm}&page=${pageNum}&sort_by=${sort}&sort_order=${order}`;
    
    axios.get(url)
      .then(res => {
        // Laravel paginate() wraps items in .data, and gives meta info
        setApplicants(res.data.data);
        setTotalPages(res.data.last_page);
        setPage(res.data.current_page); // Sync with server
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }

  useEffect(() => {
    fetchApplicants(search, 1); // Reset to page 1 on initial load
  }, []);

  // Handle Search
  const handleSearch = (e) => {
    setSearch(e.target.value);
    // Reset to page 1 when searching
    fetchApplicants(e.target.value, 1, sortBy, sortOrder); 
  }

  // Handle Sorting Click
  const handleSort = (column) => {
    const newOrder = (sortBy === column && sortOrder === 'asc') ? 'desc' : 'asc';
    setSortBy(column);
    setSortOrder(newOrder);
    fetchApplicants(search, page, column, newOrder);
  }

  // Handle Page Change
  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      fetchApplicants(search, newPage, sortBy, sortOrder);
    }
  }

  // Status & Delete Handlers (Same as before)
  const handleDelete = async (id) => {
    if(!confirm('Delete this applicant?')) return;
    try { await axios.delete(`/api/applicants/${id}`); fetchApplicants(); } catch (e) { alert('Error'); }
  }
  const handleStatusChange = async (id, newStatus) => {
    try { await axios.put(`/api/applicants/${id}`, { status: newStatus }); fetchApplicants(); } catch (e) { alert('Error'); }
  }

  // Helper for Sort Icons
  const SortIcon = ({ column }) => {
    if (sortBy !== column) return <span className="ml-1 text-gray-300">↕</span>;
    return sortOrder === 'asc' ? <span className="ml-1 text-indigo-600">↑</span> : <span className="ml-1 text-indigo-600">↓</span>;
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Applicants</h2>
          <div className="mt-4 flex md:mt-0 md:ml-4 w-full md:w-auto">
            <input 
              type="text" 
              className="w-full md:w-64 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm px-4 py-2" 
              placeholder="Search candidates..." 
              value={search}
              onChange={handleSearch}
            />
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg border border-gray-200 flex flex-col min-h-[400px]">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th onClick={() => handleSort('name')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none">
                    Candidate <SortIcon column="name" />
                  </th>
                  <th onClick={() => handleSort('school')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none">
                    School <SortIcon column="school" />
                  </th>
                  <th onClick={() => handleSort('status')} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 select-none">
                    Status <SortIcon column="status" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resume</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr><td colSpan="5" className="text-center py-10 text-gray-500">Loading data...</td></tr>
                ) : applicants.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                          {app.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{app.name}</div>
                          <div className="text-xs text-gray-500">{new Date(app.created_at).toLocaleDateString()}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.school}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select 
                        value={app.status || 'Pending'} 
                        onChange={(e) => handleStatusChange(app.id, e.target.value)}
                        className={`text-xs font-semibold rounded-full px-2 py-1 border-0 cursor-pointer focus:ring-0
                          ${app.status === 'Hired' ? 'bg-green-100 text-green-800' : 
                            app.status === 'Rejected' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Interview">Interview</option>
                        <option value="Hired">Hired</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600 hover:text-indigo-900">
                        {/* UPDATE URL HERE */}
                      <a href={`https://fluffy-fortnight-4j79rr5jq6jp27rx7-8000.app.github.dev/storage/${app.resume_path}`} target="_blank" className="font-medium hover:underline">Download PDF</a>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => handleDelete(app.id)} className="text-red-600 hover:text-red-900">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Pagination Footer */}
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6 mt-auto">
            <div className="flex items-center justify-between">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button 
                      onClick={() => changePage(page - 1)}
                      disabled={page === 1}
                      className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Previous</span>
                    </button>
                    <button 
                      onClick={() => changePage(page + 1)}
                      disabled={page === totalPages}
                      className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span>Next</span>
                    </button>
                  </nav>
                </div>
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