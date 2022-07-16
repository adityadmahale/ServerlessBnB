import axios from 'axios'

const httpClient = axios.create({
  baseURL: 'https://csci5410-gateway-3zzzs9sg.ue.gateway.dev',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
})

export default httpClient
