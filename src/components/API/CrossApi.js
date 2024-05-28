import { status401, status500, status404} from './errorRecvest'

const baseURL = 'https://checkpoint-manager.ru'

export function crossing(passId, checkpointId, direction) {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/crossings/${direction}`, {
    method: 'POST',
    body: JSON.stringify({
      passId: passId,
      checkpointId: checkpointId,
      performedAt: new Date(),
    }),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user?.access_token}`,
    },
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Неверные данные запроса')
    }
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 404) {
      throw new Error(status404)
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response
  })
}
