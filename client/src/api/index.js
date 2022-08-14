export const setHeaders = () => {
  const header = {
    headers: {
      "access_token": localStorage.getItem("token")
    }
  }
  return header
}