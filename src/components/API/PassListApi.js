import { status401, status500,newError } from "./errorRecvest"
const baseURL = 'https://checkpoint-manager.ru'
export function getPassList(endpoint = ' ') {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/passes${endpoint}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json()
    } else if (response.status === 401) {
      throw new Error(status401)
    } else if (response.status === 404) {
      throw new Error('Пропуска не найдены')
    } else if (response.status === 500) {
      throw new Error(status500)
    } else {
      throw new Error(newError)
    }
  })
}

export function getPassListTerritories(endpoint = ' ') {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/passes${endpoint}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json()
    } else if (response.status === 401) {
      throw new Error(status401)
    } else if (response.status === 404) {
      throw new Error('Пропуска не найдены')
    } else if (response.status === 500) {
      throw new Error(status500)
    } else {
      throw new Error(newError)
    }
  })
}

export function getPassTerritory(id, endpoint = '') {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/passes/territories/${id}${endpoint}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user?.access_token}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json()
    } else if (response.status === 401) {
      throw new Error(status401)
    } else if (response.status === 404) {
      throw new Error('Пропуска не найдены')
    } else if (response.status === 500) {
      throw new Error(status500)
    } else {
      throw new Error(newError)
    }
  })
}

export function changeFavoriteDB(passId, type) {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/passes/${passId}/${type ? 'favorite' : 'not_favorite'}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response
    } else if (response.status === 401) {
      throw new Error(status401)
    } else if (response.status === 404) {
      throw new Error('Пропуск не найден')
    } else if (response.status === 500) {
      throw new Error(status500)
    } else {
      throw new Error(newError)
    }
  })
}
