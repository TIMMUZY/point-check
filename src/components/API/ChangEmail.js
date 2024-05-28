import { status401, status500 } from './errorRecvest'

const baseURL = 'https://checkpoint-manager.ru'
export async function changeEmailApi(newEmail) {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/users/email`, {
    method: 'PATCH',
    body: JSON.stringify({
      newEmail,
    }),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Не верно введены данные')
    }
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 409) {
      throw new Error('Указанная почта уже используется')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response
  })
}
