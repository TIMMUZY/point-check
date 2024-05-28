import { status401, status500, status403} from './errorRecvest'
const baseURL = 'https://checkpoint-manager.ru'

export function getTerritoryAll() {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/territories`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user?.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 404) {
      throw new Error('Территории не найдены')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response?.json()
  })
}

export function getSearchTerritory(part) {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/territories/name?name=${part}`, {
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
      throw new Error('Территории не найдены')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response?.json()
  })
}

export function getTerritoryUser() {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/users/${user?.id}/territories`, {
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
      throw new Error('Территории не найдены')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response?.json()
  })
}

export function getTerritoryUserId(id) {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/users/${id}/territories`, {
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
      throw new Error('Территории не найдены')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response?.json()
  })
}

export function getTerritoryUserIdGeneral(id) {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/users/${id}/common_territories`, {
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
      throw new Error('Территории не найдены')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response?.json()
  })
}

export function addTerritory(name, city, address, note = '') {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/territories`, {
    method: 'POST',
    body: JSON.stringify({
      name,
      city,
      address,
      note
    }),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user?.access_token}`,
    },
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Неверные данные')
    }
    if (response.status === 404) {
      throw new Error('Не удалось создать территорию')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response?.json()
  })
}

export function editTerritory(id, name, city, address, note = '') {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/territories`, {
    method: 'PUT',
    body: JSON.stringify({
      id,
      name,
      city,
      address,
      note
    }),
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user?.access_token}`,
    },
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Неверные данные')
    }
    if (response.status === 404) {
      throw new Error('Не удалось изменить территорию')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response?.json()
  })
}

export function deleteTerritory(territoryId) {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/territories/${territoryId}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error('Произошла ошибка, Нужно авторизоваться')
    }
    if (response.status === 404) {
      throw new Error('Что-то пошло не так')
    }
    if (response.status === 500) {
      throw new Error('Ошибка сервера')
    }
    if (response.ok) {
      return response
    }
  })
}

export function getTerritory(id) {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/territories/${id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user?.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error('Произошла ошибка, Нужно авторизоваться')
    }
    if (response.status === 404) {
      throw new Error('Территория не найдена')
    }
    if (response.status === 500) {
      throw new Error('Ошибка сервера')
    }
    return response?.json()
  })
}

export function getUsersTerritory(id, pageNumber, pageSize) {
  const user = JSON.parse(sessionStorage.getItem('user'))

  return fetch(`${baseURL}/api/v1/territories/${id}/users?page=${pageNumber}&size=${pageSize}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user?.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error('Произошла ошибка, Нужно авторизоваться')
    }
    if (response.status === 403) {
      throw new Error('Ошибка доступа к данным')
    }
    if (response.status === 404) {
      throw new Error('Пользователи не найдены')
    }
    if (response.status === 500) {
      throw new Error('Ошибка сервера')
    }
    return response?.json()
  })
}

