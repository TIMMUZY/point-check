//форматирование номера для отправки
export function clearNumber(number) {
  // Удаление пробелов, тире и скобок из номера
  if (!number) {
    const clearedNumber = null
    return clearedNumber
  }
  const clearedNumber = number?.replace(/[^\d]/g, '')
  return clearedNumber
}

//форматирование номера для отображения
export function formatNumber(phoneNumber) {
  if (phoneNumber?.startsWith('8') || phoneNumber?.startsWith('7')) {
    phoneNumber = '+7' + phoneNumber?.slice(1)
  }

  // Format the number in the required pattern: +7 (XXX) XXX-XX-XX
  if (!phoneNumber) {
    return
  }
  const formattedNumber = `+7 (${phoneNumber?.slice(
    2,
    5,
  )}) ${phoneNumber?.slice(5, 8)}-${phoneNumber?.slice(
    8,
    10,
  )}-${phoneNumber?.slice(10)}`

  return formattedNumber
}

//форматирование для отображения в формате редактирования (когда передаем в инпут формы)
export function removeFirstDigitNumber(phoneNumber) {
  // Check if the number starts with "8" or "+7"
  if (phoneNumber?.startsWith('8') || phoneNumber?.startsWith('7')) {
    // Remove the first digit
    phoneNumber = phoneNumber?.slice(1)
  }

  return phoneNumber
}
