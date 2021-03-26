import axios from 'axios'

const getUserProfile = async (token: string) => {
  const res = await axios.get('http://localhost:3000/users', { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}
export default { getUserProfile }
