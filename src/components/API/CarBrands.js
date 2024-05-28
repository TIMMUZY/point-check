import { status401, status500} from './errorRecvest'

export async function getCarBrandsAll() {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch('https://checkpoint-manager.ru/api/v1/car/brands/all', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user?.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 404) {
      throw new Error('Нет ни одного бренда в бд')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response?.json()
  })
}
