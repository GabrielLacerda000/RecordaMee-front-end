export function catchRepositoryExceptions(error: any, genericError: string) {
  
  const toast = useToast()

  const errorMenssage = error.response.data.message || error.response.data.errors[0].message || genericError

  toast.error({
    title: 'Error',
    message: errorMenssage,
    timeout: 30000,
})

  setTimeout(() => {
    toast.hideToast(errorMenssage, errorMenssage, 'error')
  }, 5000)


  throw error
}