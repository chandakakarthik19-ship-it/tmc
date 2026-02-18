import { useState, useEffect } from 'react'
import axios from 'axios'
import { BASE_URL } from '../config'

export default function Gallery() {
  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [uploadData, setUploadData] = useState({
    title: '',
    description: '',
    category: 'general'
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [adminPassword, setAdminPassword] = useState('')
  const [showAdminLogin, setShowAdminLogin] = useState(false)

  const getImageSrc = (url) => {
    if (!url) return ''
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    return `${BASE_URL}${url.startsWith('/') ? '' : '/'}${url}`
  }

  useEffect(() => {
    fetchImages()
    // Check if admin is logged in from localStorage
    const adminStatus = localStorage.getItem('isAdmin')
    if (adminStatus === 'true') {
      setIsAdmin(true)
    }
  }, [])

  const fetchImages = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/gallery`)
      setImages(response.data)
    } catch (err) {
      console.error('Failed to fetch images:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleAdminLogin = () => {
    // Simple password check - in production, use proper authentication
    if (adminPassword === 'admin123') {
      setIsAdmin(true)
      localStorage.setItem('isAdmin', 'true')
      setShowAdminLogin(false)
      setAdminPassword('')
    } else {
      alert('Incorrect password')
    }
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
    localStorage.removeItem('isAdmin')
    setShowUploadForm(false)
  }

  const handleUploadChange = (e) => {
    setUploadData({
      ...uploadData,
      [e.target.name]: e.target.value
    })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }
      
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }
      
      setSelectedFile(file)
      
      // Create preview URL
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleUploadSubmit = async (e) => {
    e.preventDefault()
    
    if (!selectedFile) {
      alert('Please select an image file')
      return
    }
    
    setUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('image', selectedFile)
      formData.append('title', uploadData.title)
      formData.append('description', uploadData.description)
      formData.append('category', uploadData.category)
      
      const response = await axios.post(`${BASE_URL}/api/gallery`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      setImages([response.data, ...images])
      setShowUploadForm(false)
      setUploadData({
        title: '',
        description: '',
        category: 'general'
      })
      setSelectedFile(null)
      setPreviewUrl(null)
      alert('Image uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      alert('Failed to upload image. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteImage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return
    
    try {
      await axios.delete(`${BASE_URL}/api/gallery/${id}`)
      setImages(images.filter(img => img._id !== id))
      setSelectedImage(null)
      alert('Image deleted successfully!')
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete image. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-dark">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-accent-blue border-opacity-30 border-t-accent-blue"></div>
          <p className="mt-4 text-gray-400">Loading gallery...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-dark">
      {/* Header */}
      <div className="container mx-auto mb-12">
        <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-white">Gallery</h1>
            <p className="text-gray-400 mt-2">Showcase of our achievements and moments</p>
          </div>
          
          <div className="flex gap-3">
            {!isAdmin ? (
              <button
                onClick={() => setShowAdminLogin(true)}
                className="px-6 py-2 bg-accent-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
              >
                Admin Login
              </button>
            ) : (
              <>
                <button
                  onClick={() => setShowUploadForm(true)}
                  className="px-6 py-2 bg-accent-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
                >
                  + Upload Image
                </button>
                <button
                  onClick={handleAdminLogout}
                  className="px-6 py-2 bg-gray-dark text-white border border-gray-700 rounded-lg font-semibold hover:border-accent-blue transition-colors"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="container mx-auto">
        {images.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📷</div>
            <p className="text-gray-400 text-lg">No images uploaded yet.</p>
            {isAdmin && (
              <button
                onClick={() => setShowUploadForm(true)}
                className="mt-6 px-8 py-3 bg-accent-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
              >
                Upload First Image
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image, idx) => (
              <div
                key={image._id}
                className="bg-gray-dark border border-gray-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer hover:border-accent-blue"
                style={{ animation: `slideUp 0.6s ease-out ${idx * 0.05}s both` }}
                onClick={() => setSelectedImage(image)}
              >
                <div className="aspect-square overflow-hidden bg-gray-700">
                  <img
                    src={getImageSrc(image.imageUrl)}
                    alt={image.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400?text=Image+Not+Found'
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white mb-1 truncate">{image.title}</h3>
                  {image.description && (
                    <p className="text-sm text-gray-400 line-clamp-2">{image.description}</p>
                  )}
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs bg-accent-blue bg-opacity-20 text-accent-blue px-2 py-1 rounded">
                      {image.category}
                    </span>
                    {isAdmin && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteImage(image._id)
                        }}
                        className="text-red-500 hover:text-red-400 transition-colors"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowAdminLogin(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h2>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-blue-700 placeholder-blue-400 focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAdminLogin(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAdminLogin}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-coral to-coral-light text-white rounded-lg font-semibold hover:from-coral-dark hover:to-coral transition-all duration-300"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Form Modal */}
      {showUploadForm && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn overflow-y-auto"
          onClick={() => setShowUploadForm(false)}
        >
          <div
            className="bg-gradient-to-br from-[#0F172A] to-[#1E1B4B] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-gradient-to-r from-navy to-navy-light text-white p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">Upload New Image</h2>
                <button
                  onClick={() => setShowUploadForm(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <form onSubmit={handleUploadSubmit} className="p-8 space-y-6">
              {/* Title Field */}
              <div>
                <label className="block text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-green-200 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={uploadData.title}
                  onChange={handleUploadChange}
                  required
                  className="w-full px-4 py-3 border border-pink-400 bg-gradient-to-r from-pink-300 to-blue-200 rounded-lg text-black placeholder-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter image title"
                />
              </div>

              {/* Image File Upload Field */}
              <div>
                <label className="block text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-green-200 mb-2">
                  Select Image <span className="text-red-500">*</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="w-full px-4 py-3 border border-pink-400 bg-gradient-to-r from-pink-300 to-blue-200 rounded-lg text-black placeholder-black focus:ring-2 focus:ring-blue-500 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-600 file:text-white hover:file:bg-pink-700 file:cursor-pointer"
                />
                <p className="text-xs text-orange-100 mt-1">Upload an image file (Max 5MB, JPG, PNG, GIF)</p>
              </div>

              {/* Category Field */}
              <div>
                <label className="block text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-green-200 mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={uploadData.category}
                  onChange={handleUploadChange}
                  className="w-full px-4 py-3 border border-pink-400 bg-gradient-to-r from-pink-300 to-blue-200 rounded-lg text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="general">General</option>
                  <option value="events">Events</option>
                  <option value="achievements">Achievements</option>
                  <option value="classroom">Classroom</option>
                  <option value="students">Students</option>
                </select>
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-green-200 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  name="description"
                  value={uploadData.description}
                  onChange={handleUploadChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-pink-400 bg-gradient-to-r from-pink-300 to-blue-200 rounded-lg text-black placeholder-black focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Brief description of the image"
                ></textarea>
              </div>

              {/* Preview */}
              {previewUrl && (
                <div>
                  <label className="block text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-orange-200 to-green-200 mb-2">Preview</label>
                  <div className="border border-gray-300 rounded-lg overflow-hidden">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowUploadForm(false)}
                  disabled={uploading}
                  className="flex-1 px-6 py-3 border-2 border-orange-300 text-orange-100 rounded-lg font-semibold hover:bg-orange-900/30 transition-all duration-300 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-200 to-green-200 text-black rounded-lg font-semibold hover:from-orange-300 hover:to-green-300 transition-all duration-300 disabled:opacity-50"
                >
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Detail Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <div className="relative">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-coral transition-colors text-4xl font-light"
              >
                ×
              </button>
              <img
                src={getImageSrc(selectedImage.imageUrl)}
                alt={selectedImage.title}
                className="w-full max-h-[80vh] object-contain rounded-lg"
              />
              <div className="bg-white rounded-b-lg p-6 mt-2">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h3>
                {selectedImage.description && (
                  <p className="text-gray-600 mb-4">{selectedImage.description}</p>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-sm bg-coral bg-opacity-20 text-coral px-3 py-1 rounded">
                    {selectedImage.category}
                  </span>
                  {isAdmin && (
                    <button
                      onClick={() => handleDeleteImage(selectedImage._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Delete Image
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
