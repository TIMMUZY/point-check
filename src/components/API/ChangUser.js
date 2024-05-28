import { status401, status403, status500} from './errorRecvest'

const baseURL = 'https://checkpoint-manager.ru'
export async function changeUserApi(id, fullName, mainNumber) {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/users`, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      fullName,
      mainNumber,
    }),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 400) {
      throw new Error('Ошибки валидации: Имя: только латиница/кириллица, каждое новое слово начинается с заглавной; Телефон: 11-20 символов')
    }
    if (response.status === 403) {
      throw new Error(status403)
    }
    if (response.status === 404) {
      throw new Error('Пользователь не найден')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response.json()
  })
}
