import type {
  BookItem,
  BookRepositoryImpl,
  GoogleResponse,
  GoogleQueryParams
} from "./types";
import { httpClient } from "../httpClient"

export class BookRepository implements BookRepositoryImpl {
  async get(params: GoogleQueryParams) {
    const { data } = await httpClient.get<GoogleResponse>('/', { params })
    return data
  }

  async find(id: string) {
    const { data } = await httpClient.get<BookItem>(`/${id}`)
    return data
  }
}