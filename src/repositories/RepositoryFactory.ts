// INFO: Repository Factoryを介してRepositoryを生成することによって、
//  環境によって実装を取り替えやすくなり
import { BookRepository, BookRepositoryImpl } from "./book";

// 各Repositoryを集約するオブジェクトのValue
export const BOOK = Symbol('book')

// 各Repositoryを集約する型
export interface Repositories {
  [BOOK]: BookRepositoryImpl;
}

// 各Repositoryを集約する実際のデータ
export default {
  [BOOK]: new BookRepository(),
} as Repositories