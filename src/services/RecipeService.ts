import axios from 'axios'

const getIngredients = async (params: string | (string | null)[]) => {
  const res = await axios.get('http://localhost:3000/recipes?' + params)
  return res.data
}

const getRecipe = async (slug: string) => {
  const res = await axios.get('http://localhost:3000/recipes/' + slug)
  return res.data
}

const createRecipe = async (recipe: any, token: string) => {
  const res = await axios.post('http://localhost:3000/recipes', recipe, {
    headers: {
      'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`
    }
  })
  return res.data
}

const updateRecipe = async (recipe: any, slug: string, token: string) => {
  const res = await axios.post('http://localhost:3000/recipes/' + slug, recipe, {
    headers: {
      'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}`
    }
  })
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

const reportRecipe = async (slug: any, status: boolean, token: string) => {
  const res = await axios.put('http://localhost:3000/recipes/' + slug + '/report', { status: status }, { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}

const reportComment = async (slug: any, status: boolean, id: any, token: string) => {
  const res = await axios.put('http://localhost:3000/recipes/' + slug + '/comment/' + id + '/report', { status: status }, { headers: { Authorization: `Bearer ${token}` } })
  return res.data
}

export default { getIngredients, getRecipe, placeComment, createRecipe, deleteComment, deleteRecipe, reportComment, reportRecipe, updateRecipe }
