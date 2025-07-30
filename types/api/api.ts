// types/api.ts
export type Pagination = {
  current_page: number
  total_pages: number
  total_items: number
  items_per_page: number
}


export type ApiResponse<T> = {
  status: 'success' | 'error'
  message: string
  data: T
  pagination: Pagination
}

export type genericApiResponse = {
  data: string | null
}
