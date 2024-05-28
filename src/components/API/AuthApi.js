import { status500 } from './errorRecvest'
const baseURL = 'https://checkpoint-manager.ru'
export async function RegApi(fullName, email, password) {
  return fetch(`${baseURL}/api/v1/authentication/registration`, {
    method: 'POST',
    body: JSON.stringify({
      fullName,
      email,
      password,
    }),
    headers: {
      'content-type': 'application/json',
    },
  }).then((response) => {
    if (response.status === 400) {
      throw new Error('неуспешная валидация полей формы')
    }
    if (response.status === 409) {
      throw new Error('Пользователь с таким e-mail уже зарегистрирован')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response.json()
  })
}

export async function LogInApi(email, password) {
  return fetch(`${baseURL}/api/v1/authentication/login`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      'content-type': 'application/json',
    },
  }).then((response) => {
    if (response.status === 401) {
      throw new Error('Неверный e-mail или пароль')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response.json()
  })
}

export async function refreshToken(refresh) {
  return fetch(`${baseURL}/api/v1/authentication/refresh-token`, {
    method: 'POST',
    body: JSON.stringify({
      //что передавать
      refresh,
    }),
    headers: {
      'content-type': 'application/json',
    },
  }).then((response) => {
    if (response.status === 403) {
      throw new Error(
        'Невалидный токен обновления. Войдите в приложение повторно.',
      )
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response.json()
  })
}

export async function confirmReg() {
  return fetch(`${baseURL}/api/v1/authentication/confirm`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  }).then((response) => {
    if (response.status === 404) {
      throw new Error(
        'Ссылка подтверждения недействительна или истек срок действия',
      )
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response.json()
  })
}

export async function checkReg(email) {
  return fetch(
    `${baseURL}/api/v1/authentication/is-authenticated?email=${email}`,
    {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    },
  ).then((response) => {
    if (response.status === 400) {
      throw new Error('Параметры не были переданы')
    }
    if (response.status === 500) {
      throw new Error(status500)
    }
    return response.json()
  })
}
