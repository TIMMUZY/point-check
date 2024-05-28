const getCurrentTimezone = () => {
  const currentDate = new Date()
  const currentTimeZoneOffsetInHours = currentDate.getTimezoneOffset() / 60
  return currentTimeZoneOffsetInHours
}
export default getCurrentTimezone
