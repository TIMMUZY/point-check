const baseURL = 'https://checkpoint-manager.ru'
export async function confirmRegistration(token) {
  return fetch(`${baseURL}/api/v1/confirm/registration?token=${token}`, {
    method: 'GET',
  }).then((response) => {
    if (!response.ok) {
      throw new Error('Что-то пошло не так')
    }
    return response
  })
}
