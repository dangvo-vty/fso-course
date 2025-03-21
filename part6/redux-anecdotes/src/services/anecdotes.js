import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (content) => {
    const object = asObject(content)
    const response = await axios.post(baseUrl,object)
    return response.data
}

const update = async (id,update) => {

  const updated = await axios.put(`${baseUrl}/${id}`,update)
  console.log(updated)
  return updated.data
}
export default { getAll,createNew, update }