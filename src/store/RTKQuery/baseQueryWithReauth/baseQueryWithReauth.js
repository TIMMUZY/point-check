import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQueryWithReauth = async (args, api, extraOptions) => {
  /**
   * fetchBaseQuery - это обертка от rtk-quert над fetch функцией
   * https://redux-toolkit.js.org/rtk-query/api/fetchBaseQuery
   *
   * fetchBaseQuery возвращает функцию, которую можно воспринимать как аналог fetch или axios функции.
   * то есть вызов "await baseQuery(...)" можно воспринимать как вызов "await fetch(...)"
   */
  const baseQuery = fetchBaseQuery({
    baseUrl: 'https://checkpoint-manager.ru',
    // prepareHeaders - это часть api fetchBaseQuery, которая позволяет сформировать общие заголовки для всех запросов
    prepareHeaders: (headers) => {
      // Мы достаем из стора access токен и прикрепляем его ко всем запросам, чтобы не пробрасывать токен в каждый запрос вручную
      // Мы находимся внутри callback функции, которая вызывается непосредственно перед каждым запросом,
      // таким образом все запросы всегда используют актуальный acces токен из redux стора
      // const token = getState().user.accessToken;
      const user = JSON.parse(sessionStorage.getItem('user'))
      const token = user?.access_token
      // Чтобы выключить отображение debug логов в консоли браузера, включите уровень Verbose\Debug в консоли разработчика
      // console.debug('Использую токен из стора', { token })

      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }

      return headers
    },
  })

  // Делаем запрос
  const result = await baseQuery(args, api, extraOptions)
  // console.debug('Результат первого запроса', { result })

  // Если запрос выполнился не с 401 кодом, то все хорошо, просто отдаем результат запроса наружу
  if (result?.error?.status !== 401) {
    return result
  }

  // Ниже обрабатываем 401 код

  // Функция которая отчищает данные о юзере в сторе и отправляет на страницу логина
  const forceLogout = () => {
    console.debug('Принудительная авторизация!')
    sessionStorage.removeItem('user')
    // api.dispatch(removeUser())
    // window.location.navigate("/");
  }

  // Функция getState возвращает состояние redux стейта целиком, ее нам предоставляет rtk query, она прилетает параметром запроса в функцию
  //   const { user } = api.getState()
  const user = JSON.parse(sessionStorage.getItem('user'))
  // console.debug('Данные пользователя в сторе', { user })
  // Если в сторе нет refresh токена, то помочь пользователю мы уже ничем не сможем, разлогиниваем его и отправляем авторизоваться руками
  if (!user?.refresh_token) {
    return forceLogout()
  }

  // Делаем запрос за новым access токеном в API обновления токена
  const refreshResult = await baseQuery(
    {
      url: '/api/v1/authentication/refresh-token',
      method: 'PUT',
      body: {
        refreshToken: user?.refreshToken,
      },
      headers: {
        'content-type': 'application/json',
      },
    },
    api,
    extraOptions,
  )

  console.debug('Результат запроса на обновление токена', { refreshResult })

  // Если api обновления токена не вернуло новый access токен, то ничего сделать мы не можем, разлогиниваем юзера
  // Апи может не вернуть новый access токен по разным причинам, например у нас неверный refresh токен или refresh токен протух (обычно refresh токены не протухаю, но бывает и такое)
  // if (!refreshResult.data.access_token) {
  //   return forceLogout();
  // }
  if (refreshResult?.error?.status === 401) {
    return forceLogout()
  } else {
    if (!refreshResult.data.access_token) {
      return forceLogout()
    }

    // Мы наконец получили новый access токен, сохраняем его в стор, чтобы последующие запросы могли его использовать внутри prepareHeaders
    // api.dispatch(
    //   setToken({
    //     accessToken: refreshResult.data.access_token,
    //     refreshToken: refreshResult.data.refresh_token,
    //     typeToken: refreshResult.data.token_type,
    //   }),
    // )
    user.refresh_token = refreshResult.data.access_token
    user.access_token = refreshResult.data.refresh_token
    sessionStorage.setItem('user', user)
  }

  // Делаем повторный запрос с теми же параметрами что и исходный,
  // но помним, что повторный запрос произойдет уже с новым токеном,
  // потому что для него вызовется callback prepareHeaders, который получит актуальный access токен из стора,
  // который мы положили в стор строчкой выше
  const retryResult = await baseQuery(args, api, extraOptions)

  // Если повторный запрос выполнился с 401 кодом, то что-то совсем пошло не так, отправляем на принудительную ручную авторизацию
  if (retryResult?.error?.status === 401) {
    return forceLogout()
  }

  console.debug('Повторный запрос завершился успешно')

  return retryResult
}

export default baseQueryWithReauth
