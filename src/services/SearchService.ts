import axios from 'axios'

export default {
  async getIngredients (name: string, excludedIngredients) {
    const res = await axios.get('http://localhost:3000/ingredients?name=' + name + '&excluded=' + excludedIngredients)
    return res.data
  }
}
