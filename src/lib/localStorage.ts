export function saveUserData(data: any) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('halsaLagom', JSON.stringify(data))
  }
}

export function getUserData() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem('halsaLagom')
    return data ? JSON.parse(data) : null
  }
  return null
}
