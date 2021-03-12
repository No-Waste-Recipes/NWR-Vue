import axios from 'axios'

const getIngredients = async (params: string | (string | null)[]) => {
  const res = await axios.get('http://localhost:3000/recipes?' + params)
  return res.data
}

const getRecipe = async (slug: string) => {
  console.log()
  const res = await axios.get('http://localhost:3000/recipes/' + slug)
  return res.data
}

const createRecipe = async (recipe: object) => {
  console.log()
  const res = await axios.post('http://localhost:3000/recipes', recipe)
  return res.data
}

export default { getIngredients, getRecipe, createRecipe }
