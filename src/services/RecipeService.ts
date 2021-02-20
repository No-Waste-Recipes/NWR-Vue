import axios from 'axios'

export default {
  async getIngredients (ingredients: []) {
    const res = await axios.get('http://localhost:3000/recipes/filtered?ingredients=' + ingredients)
    return res.data
  }
}
