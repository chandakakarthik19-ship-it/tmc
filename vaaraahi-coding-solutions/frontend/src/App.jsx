import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Alumni from './pages/Alumni'
import Contact from './pages/Contact'
import Gallery from './pages/Gallery'
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import Enrollments from './pages/Enrollments'

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gradient-to-br from-tmc-light via-gray-100 to-tmc-light relative overflow-hidden">
        <Header />
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alumni" element={<Alumni />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:id" element={<CourseDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/enrollments" element={<Enrollments />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
