import { status401, status403, status500} from './errorRecvest'

const baseURL = 'https://checkpoint-manager.ru'
export async function changeRole(id, role) {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/users/role/${id}?role=${role}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 403) {
      throw new Error(status403)
    }
    if (response.status === 404) {
      throw new Error('Пользователь не найден')
    }
    if (response.status === 409) {
      throw new Error('Назначаемая роль совпадает с текущей ролью пользователя')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response
  })
}
