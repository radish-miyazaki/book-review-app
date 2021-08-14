import { writable } from "svelte/store";
import type { BookItem } from "../../repositories/book";

// INFO: subscribeのみを返しており、set()を返していないので、更新できない。
// const useBookStore = () => {
//   const { subscribe } = writable<BookItem[]>([])
//   return { subscribe }
// }

// INFO: Reset・更新メソッドのみを更新する
const useBookStore = () => {
  const { subscribe, set, update } = writable<BookItem[]>([])
  const reset = () => set([])
  const add = (newBooks: BookItem[]) => update((books: BookItem[]) => {
    return [...books, ...newBooks]
  })
  return {
    subscribe, reset, add
  }
}

export const storeBooks = useBookStore()