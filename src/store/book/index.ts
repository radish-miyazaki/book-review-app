import { writable, derived } from "svelte/store";
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

// INFO: storeBooksからidが同じ変数を返却する
//  derived: writableの値から他の値を取得する関数。getters関数。
export const find = (id: string) => {
  return derived(storeBooks, $storeBooks => $storeBooks.find(book => book.id === id))
}