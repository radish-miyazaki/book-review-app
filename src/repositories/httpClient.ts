import axios from "axios";

// axios instance
export const httpClient = axios.create({
  // INFO: 本のデータはGoogleが公開しているAPIから取得する。
  //   @see: https://developers.google.com/books/docs/v1/using#RetrievingVolume
  baseURL: "https://www.googleapis.com/books/v1/volumes"
})