import axios from 'axios'

const getApproveRecipes = async (token: string) => {
  const res = await axios.get('http://localhost:3000/recipes/approve', { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}

const approveRecipe = async (slug: string, status: string, token: string) => {
  const res = await axios.post('http://localhost:3000/recipes/approve/' + slug, { status }, { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}

const getReportedRecipes = async (token: string) => {
  const res = await axios.get('http://localhost:3000/recipes/reports', { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}

const getReportedComments = async (token: string) => {
  const res = await axios.get('http://localhost:3000/recipes/comment/reports', { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}

export default { getApproveRecipes, approveRecipe, getReportedComments, getReportedRecipes }
