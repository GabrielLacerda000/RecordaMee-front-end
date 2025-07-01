// types/api.ts
export type ApiResponse<T> = {
  status: 'success' | 'error'
  message: string
  data: T
}
