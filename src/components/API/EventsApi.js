import { status401, status500} from './errorRecvest'

const baseURL = 'https://checkpoint-manager.ru'
export function eventsListApi (endpoint) {
    const user = JSON.parse(sessionStorage?.getItem('user'))
  
    return fetch(`${baseURL}/api/v1/events${endpoint}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${user?.access_token}`,
      },
    }).then((response) => {
      if (response.status === 401) {
        throw new Error(status401)
      }
      if (response.status === 400) {
        throw new Error('Неверные данные запроса')
      }
      if (response.status === 404) {
        throw new Error('Пользователь или территория не найдены')
      }
      if (response.status === 500) {
        throw new Error(status500)
      }
      return response.json()
    })
  }


  