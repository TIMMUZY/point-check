import { status401, status403, status500, newError } from './errorRecvest'

const baseURL = 'https://checkpoint-manager.ru'

export function deleteUser(userId) {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response
    } else if (response.status === 401) {
      throw new Error(status401)
    } else if (response.status === 403) {
      throw new Error(status403)
    } else if (response.status === 404) {
      throw new Error('Пользователь не найден')
    } else if (response.status === 500) {
      throw new Error(status500)
    } else {
      throw new Error(newError)
    }
  })
}
