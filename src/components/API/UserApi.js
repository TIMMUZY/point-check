import { status401, status403, status500 } from "./errorRecvest"

const baseURL = 'https://checkpoint-manager.ru'

export function getUsersAll(pageNumber, pageSize) {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/users?page=${pageNumber}&size=${pageSize}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user?.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 403) {
      throw new Error(status403)
    }
    if (response.status === 404) {
      throw new Error('Пользователи не найдены')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response?.json()
  })
}

export function getUsersAssociated(pageNumber, pageSize) {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/users/associated/?page=${pageNumber}&size=${pageSize}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user?.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 403) {
      throw new Error(status403)
    }
    if (response.status === 404) {
      throw new Error('Пользователи не найдены')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response?.json()
  })
}

export function getSearchUsers(part) {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/users/name?name=${part}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user?.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 403) {
      throw new Error(status403)
    }
    if (response.status === 404) {
      throw new Error('Пользователи не найдены')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response?.json()
  })
}


