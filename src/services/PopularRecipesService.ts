import axios from 'axios'

export default {
  async getPopularRecipes () {
    const res = await axios.get('http://localhost:3000/recipes/popular')
    return res.data
  },

  async getFavoriteRecipes (token: string) {
    const res = await axios.get('http://localhost:3000/users/favorites', { headers: { Authorization: `Bearer ${token}` } })
    return res.data
  }
}
