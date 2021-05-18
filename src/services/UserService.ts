import axios from 'axios'

const getUserProfile = async (token: string) => {
  const res = await axios.get('http://localhost:3000/users', { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}

const updateUserProfile = async (token: string, data) => {
  const res = await axios.put('http://localhost:3000/users', data, { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}

const deleteUserProfile = async (token: string) => {
  const res = await axios.delete('http://localhost:3000/users', { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}

const getMyRecipes = async (token: string) => {
  const res = await axios.get('http://localhost:3000/users/myrecipes', { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}
export default {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getMyRecipes
}
