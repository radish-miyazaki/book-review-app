/*
  BooksのRepositoryのインタフェース
*/
export interface BookRepositoryImpl {
  get(params: GoogleQueryParams): Promise<GoogleResponse>;
  find(id: string): Promise<BookItem>;
}

/*
  Googleからの戻り値を格納する型
  @sse: https://developers.google.com/books/docs/v1/using#response_1
*/
export interface GoogleResponse {
  items: BookItem[];
  kind: string;
  totalItems: number;
}

/*
  Googleからの戻り値に含まれる本の情報
*/
export interface BookItem {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    publishedDate?: string;
    description?: string;
    publisher?: string;
    imageLinks?: {
      smallThumbnail: string;
      thumbnail: string;
    };
    pageCount: number;
    previewLink?: string;
  };
  saleInfo?: {
    listPrice: {
      amount: number;
    };
  };
}

/*
  APIリクエスト時に付与するQueryの定義
  @see https://developers.google.com/books/docs/v1/using#query-params
*/
export interface GoogleQueryParams {
  q: string;
  startIndex?: number;
}