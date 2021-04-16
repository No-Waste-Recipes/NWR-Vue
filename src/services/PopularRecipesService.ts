import axios from 'axios'

export default {
  async getPopularRecipes () {
    const res = await axios.get('http://localhost:3000/recipes/popular')
    return res.data
  },

  async getFavoriteRecipes (token: string) {
    const res = await axios.get('http://localhost:3000/users/favorites', { headers: { Authorization: `Bearer ${token}` } })
    return res.data
  },

  async addFavoriteRecipe (token: string, recipeId: object) {
    const res = await axios.post('http://localhost:3000/users/favorites', { recipeId: recipeId }, { headers: { Authorization: `Bearer ${token}` } })
    return res.data
  }
}
