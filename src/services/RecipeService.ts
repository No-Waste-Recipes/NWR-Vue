import axios from 'axios'

export default {
  async getIngredients (params: string | (string | null)[]) {
    const res = await axios.get('http://localhost:3000/recipes?' + params)
    return res.data
  }
}
