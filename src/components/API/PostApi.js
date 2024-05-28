import { status401, status500, newError } from "./errorRecvest"

const baseURL = 'https://checkpoint-manager.ru'
export async function addPost(name, type, note, territoryId) {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/checkpoints`, {
    method: 'POST',
    body: JSON.stringify({
      name: name,
      type: type,
      note: note,
      territory: {
        id: territoryId
      }
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
      throw new Error('Некорректный запрос, проверьте данные')
    }
    if (response.status === 404) {
      throw new Error('Не удалось создать КПП')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response
  })
}

export async function changePost(id, name, type, note, territoryId) {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/checkpoints`, {
    method: 'PUT',
    body: JSON.stringify({
      id: id,
      name: name,
      type: type,
      note: note,
      territory: {
        id: territoryId
      }
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
      throw new Error('Некорректный запрос, проверьте данные')
    }
    if (response.status === 404) {
      throw new Error('Не удалось изменить КПП')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response
  })
}

export function deletePost(id) {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/checkpoints/${id}`, {
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
    } else if (response.status === 404) {
      throw new Error('КПП не найден')
    } else if (response.status === 500) {
      throw new Error(status500)
    } else {
      throw new Error(newError)
    }
  })
}

export function getPostsTerritory(id) {
  const user = JSON.parse(sessionStorage.getItem('user'))
  return fetch(`${baseURL}/api/v1/checkpoints/territories/${id}`, {
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
      throw new Error('Посты охраны не найдены')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response.json()
  })
}
