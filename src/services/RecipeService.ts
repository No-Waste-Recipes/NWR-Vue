import axios from 'axios'

const getIngredients = async (params: string | (string | null)[]) => {
  const res = await axios.get('http://localhost:3000/recipes?' + params)
  return res.data
}

const getRecipe = async (slug: string) => {
  const res = await axios.get('http://localhost:3000/recipes/' + slug)
  return res.data
}

const createRecipe = async (recipe: object) => {
  console.log()
  const res = await axios.post('http://localhost:3000/recipes', recipe)
  return res.data
}

const placeComment = async (slug: string, data: { text: string }, token: string) => {
  const res = await axios.post('http://localhost:3000/recipes/' + slug + '/comment', data, { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}

const deleteComment = async (slug: string, id: number, token: string) => {
  const res = await axios.delete('http://localhost:3000/recipes/' + slug + '/comment/' + id, { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}

const deleteRecipe = async (id: number, token: string) => {
  const res = await axios.delete('http://localhost:3000/recipes/' + id, { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}

export default { getIngredients, getRecipe, placeComment, createRecipe, deleteComment, deleteRecipe }
