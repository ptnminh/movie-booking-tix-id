
import authApi from "../api/authApi";

const authUtils = {
    isAuthenticated: async () => {
      const token = localStorage.getItem('access_token')
      if (!token) return false
      try {
        const res = await authApi.verify()
        return res.user
      } catch {
        return false
      }
    }
  }
  
  export default authUtils
