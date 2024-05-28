import { status401, status500, newError } from "./errorRecvest"
const baseURL = 'https://checkpoint-manager.ru'

export function getPassList() {
  const user = JSON.parse(sessionStorage?.getItem('user'))

  return fetch(`${baseURL}/api/v1/passes/users/${user?.id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user?.access_token}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json()
    } else if (response.status === 401) {
      throw new Error(status401)
    } else if (response.status === 404) {
      throw new Error('Пропуска не найдены')
    } else if (response.status === 500) {
      throw new Error(status500)
    } else {
      throw new Error(newError)
    }
  })
}

export function addPass({
  isAutoPass,
  commentPass,
  typeTimePass,
  startTimePass,
  endTimePass,
  nameVisitor,
  tel,
  licensePlateCar,
  brandCarID,
  currentTimezone,
  territoryID,
}) {
  const user = JSON.parse(sessionStorage?.getItem('user'))

  return fetch(`${baseURL}/api/v1/passes`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.access_token}`,
    },
    body: isAutoPass
      ? JSON.stringify({
          userId: user?.id,
          сomment: commentPass,
          typeTime: typeTimePass,
          territoryId: territoryID,
          startTime: startTimePass + ':00.000' + currentTimezone,
          endTime: endTimePass + ':00.000' + currentTimezone,
          car: {
            licensePlate: licensePlateCar,
            brand: {
              brand: brandCarID,
            },
          },
        })
      : JSON.stringify({
          userId: user?.id,
          сomment: commentPass,
          typeTime: typeTimePass,
          territoryId: territoryID,
          // startTime: startTimePass + ':00.000' + currentTimezone,
          // endTime: endTimePass + ':00.000' + currentTimezone,
          startTime: startTimePass + ':00.000Z',
          endTime: endTimePass + ':00.000Z',
          visitor: {
            name: nameVisitor,
            phone: tel,
            note: commentPass,
          },
        }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error(
        'Неуспешная валидация полей; у пользователя найден накладывающийся пропуск',
      )
    }
    if (response.status === 401) {
      throw new Error('Произошла ошибка, Нужно авторизоваться')
    }
    if (response.status === 404) {
      throw new Error('Не найден пользователь или территория')
    }

    if (response.status === 500) {
      throw new Error('Ошибка сервера')
    }
    return response.json()
  })
}

export function cancelPass(id) {
  const user = JSON.parse(sessionStorage?.getItem('user'))

  return fetch(`${baseURL}/api/v1/passes/${id}/cancel`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Пропуск не является активным')
    }
    if (response.status === 401) {
      throw new Error('Произошла ошибка, Нужно авторизоваться')
    }
    if (response.status === 404) {
      throw new Error('Пропуск не найден')
    }

    if (response.status === 500) {
      throw new Error('Ошибка сервера')
    }
    return response.json()
  })
}

export function activePass (id) {
  const user = JSON.parse(sessionStorage?.getItem('user'))

  return fetch(`${baseURL}/api/v1/passes/${id}/activate`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('Данный пропуск нельзя активировать')
    }
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 404) {
      throw new Error('Пропуск не найден')
    }

    if (response.status === 500) {
      throw new Error(status500)
    }
    return response.json()
  })
}

export function delPass(id) {
  const user = JSON.parse(sessionStorage?.getItem('user'))

  return fetch(`${baseURL}/api/v1/passes/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user.access_token}`,
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 404) {
      throw new Error('Пропуск не найден')
    }

    if (response.status === 500) {
      throw new Error(status500)
    }
    return response
  })
}
export function eventsPass({id,pageNumber}) {
  const user = JSON.parse(sessionStorage?.getItem('user'))

  return fetch(`${baseURL}/api/v1/crossings/passes/${id}?page=${pageNumber-1}&size=4`, {
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
      throw new Error('Пропуск не найден')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response.json()
  })
}

export function getPassById(passId) {
  const user = JSON.parse(sessionStorage?.getItem('user'))

  return fetch(`${baseURL}/api/v1/passes/${passId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${user?.access_token}`,
    },
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('пропуск отсутствует в базе')
    }
    if (response.status === 401) {
      throw new Error(status401)
    }
    if (response.status === 404) {
      throw new Error('Пропуск не найден')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response.json()
  })
}
