import { status401, status500} from './errorRecvest'
const baseURL = 'https://checkpoint-manager.ru'
export async function changePassApi(
  currentPassword,
  newPassword,
  confirmationPassword,
) {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/users/password`, {
    method: 'PATCH',
    body: JSON.stringify({
      currentPassword,
      newPassword,
      confirmationPassword,
    }),
    headers: {
      'content-type': 'application/json',
      "Authorization": `Bearer ${user.access_token}`,

    },
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Не верно введены данные')
    }
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 409) {
      throw new Error('Передан неверный текущий пароль пользователя')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response
  })
}