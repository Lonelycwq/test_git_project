export const getdate = (date, spe) => {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  return year + spe + month + spe + day
}
