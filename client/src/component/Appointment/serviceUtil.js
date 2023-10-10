export const calculateTotalDuration = (selectedServices) => {
  return selectedServices.reduce((total, service) => total + service.duration, 0)
}

export const calculateTotalPrice = (selectedServices) => {
  return selectedServices.reduce((total, service) => total + service.price, 0)
}
