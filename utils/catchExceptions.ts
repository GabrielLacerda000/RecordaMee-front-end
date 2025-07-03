export function catchRepositoryExceptions(error: any, genericError: string) {
  
  const toast = useToast()

  const errorMenssage = error.response.data.message || error.response.data.errors[0].message || genericError

  toast.error({ title: errorMenssage, message: errorMenssage })

  throw error
}