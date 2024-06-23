import axios from 'axios'
const baseUrl = 'http://localhost:3001/notes'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}

export default { 
  getAll: getAll, 
  create: create, 
  update: update
}

// También podría ser el export de la siguiente forma que es más simplificada, ya qeu los nombres de las claves y variables son iguales:
// export default { getAll, create, update }