const getFormattedDate = (date, isMaxDate = false) => {
  if (date) {
    if (isMaxDate) {
      date.setFullYear(date.getFullYear() + 1)
    }

    return (
      date.getFullYear().toString() +
      '-' +
      (date.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      date.getDate().toString().padStart(2, '0') +
      'T' +
      date.toLocaleTimeString().slice(0, -3)
    )
  }
}

export { getFormattedDate }
