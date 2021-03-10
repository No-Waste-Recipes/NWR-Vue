import axios from 'axios'

export default {
  async getPopularRecipes () {
    const res = await axios.get('http://localhost:3000/recipes/popular')
    return res.data
  }
}
