export function catchRepositoryExceptions(error: any, genericError: string) {
  
  const toast = useToast()

  const errorMenssage = error.response.data.message || error.response.data.errors[0].message || genericError

  toast.add({
    title: 'Erro ao fazer login',
    description: errorMenssage,
    color: 'error'
  })

  throw error
}