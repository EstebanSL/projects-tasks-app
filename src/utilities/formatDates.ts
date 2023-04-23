export const formatDate = (date: string) => {
  const newDate = new Date(date.split('T')[0])
  const options: any = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
  return newDate.toLocaleDateString('es-CO', options)
}