import axios from 'axios'
import toast from 'react-hot-toast'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log the error or show a global notification
    const status = error.response?.status
    if (status === 500) {
      toast.error("Server error occurred. Please try again later.")
    } else if (status === 400) {
      return Promise.reject(error)
    } else if (status === 404) {
      toast.error("Resource not found. It may have been removed.")
    } else {
      toast.error("An unexpected error occurred. Please try again.")
    }

    console.error("API Error:", error.response?.data);
    return Promise.reject(error);
  }
)