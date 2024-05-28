import { status401, status403, status500, newError } from './errorRecvest'

const baseURL = 'https://checkpoint-manager.ru'

export function getUserEmail(email) {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/users/email?email=${email}`, {
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
    } else if (response.status === 403) {
      throw new Error(status403)
    } else if (response.status === 404) {
      throw new Error('Пользователи с указанной почтой не найдены')
    } else if (response.status === 500) {
      throw new Error(status500)
    } else {
      throw new Error(newError)
    }
  })
}


export function addUserToTerritory(territoryId, userId) {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/territories/${territoryId}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response
    } else if (response.status === 400) {
      throw new Error(
        'Указанный пользователь уже прикреплен к данной территории',
      )
    } else if (response.status === 401) {
      throw new Error(status401)
    } else if (response.status === 403) {
      throw new Error(status403)
    } else if (response.status === 404) {
      throw new Error('Пользователь или территория не найдены')
    } else if (response.status === 500) {
      throw new Error(status500)
    } else {
      throw new Error(newError)
    }
  })
}

export function detachUserToTerritory(territoryId, userId) {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/territories/${territoryId}/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response
    } else if (response.status === 400) {
      throw new Error(
        'Указанный пользователь не прикреплен к данной территории',
      )
    } else if (response.status === 401) {
      throw new Error(status401)
    } else if (response.status === 403) {
      throw new Error(status403)
    } else if (response.status === 404) {
      throw new Error('Пользователь или территория не найдены')
    } else if (response.status === 500) {
      throw new Error(status500)
    } else {
      throw new Error(newError)
    }
  })
}
