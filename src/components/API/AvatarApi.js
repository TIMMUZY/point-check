const baseURL = 'https://checkpoint-manager.ru'
import { status401, status500, status404 } from './errorRecvest'
export async function addAvatarApi(formData) {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/avatars/users/${user.id}`, {
    method: 'POST',
    body: formData,
    headers: {
      //   'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.status === 201) {
      return response.json()
    }
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 400) {
      return response.json().then((errorData) => {
        if (errorData.title === 'Size of uploading file exceeds maximum') {
            throw new Error('Максимальный размер файла не должен превышать 5Мб')
          } else {
            throw new Error('Загружаемый файл имеет недопустимый формат, загрузите файл в одном из следущих форматов: jpg, jpeg, png, ico, gif, eps, svg, bmp.')
          }
      })
    }
    if (response.status === 500) {
      throw new Error('Ошибка сервера при обработке запроса')
    }
    throw new Error()
  })
}

export async function getAvatarApi() {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/avatars/users/${user.id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 404) {
      throw new Error('Аватар не найден')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response
  })
}

export async function getAvatarApiId(id) {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/avatars/users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 404) {
      throw new Error('Аватар не найден')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response
  })
}

export async function delAvatarApi() {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/avatars/users/${user?.id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 404) {
      return
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response
  })
}

export async function addTerritoryAvatarApi({ formData, id }) {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/avatars/territories/${id}`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 400) {
      throw new Error('Некорректный запрос, проверьте данные')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    if (response.status === 404) {
      throw new Error(status404)
    }
    return response.json()
  })
}

export async function getTerritoryAvatarApi(id) {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/avatars/territories/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 404) {
      return
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response
  })
}

export async function delTerritoryAvatarApi(id) {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/avatars/territories/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 404) {
      return
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response
  })
}
