const BASE_URL = 'http://localhost:8080'

export const api = {
  createPlayer: `${BASE_URL}/player/create`,
  registerPlayer: `${BASE_URL}/player/register`,
  joinRoom: `${BASE_URL}/room/join`,
  createRoom: `${BASE_URL}/room/create`,
}

export const buildQuery = (url: string, query: Record<string, string>) => {
  let queryString = '?'

  for (let [key, value] of Object.entries(query)) {
    queryString += `${key}=${value}&`
  }

  queryString = queryString.slice(0, -1)

  return url + queryString
}
