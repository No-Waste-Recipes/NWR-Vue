import axios from 'axios'

const getUsers = async (token: string) => {
  const res = await axios.get('http://localhost:3000/users/users', { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}

const deleteUserProfile = async (token: string, userId: number) => {
  const res = await axios.delete('http://localhost:3000/users/' + userId, { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}

export default { getUsers, deleteUserProfile }
