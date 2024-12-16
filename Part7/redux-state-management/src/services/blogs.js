import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/blogs';

const getAll = () => {
  const config = {
    headers: { Authorization: token },
  };
  const request = axios.get(baseUrl, config);
  return request.then(response => response.data);
}

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
}

const update = async (id, newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, newObject, config);
  return response.data;
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data;
}

export default { getAll, create, setToken, update, remove }