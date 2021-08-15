<script lang="ts">
  import Row from "./Row.svelte";
  import type { BookItem } from "../repositories/book";

  export let book: BookItem

  $: price = book.saleInfo.listPrice?.amount
    ? `${book.saleInfo.listPrice?.amount} (JPY)`
    : ''

  $: src = book.volumeInfo.imageLinks
    ? book.volumeInfo.imageLinks.thumbnail
    : 'https://via.placeholder.com/160x120?text=No+Image'
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-3">
  <div class="center">
    <img {src} alt="thumbnail" class="h-72 w-auto mx-auto" />
  </div>

  <div class="bg-white shadow overflow-hidden sm:rounded-lg col-span-2">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-black font-bold text-xl mb-2">
        {book.volumeInfo.title}
      </h3>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <Row dt="Author">
          {book.volumeInfo.authors?.join(',')}
        </Row>
        <Row dt="Description">
          {book.volumeInfo.description}
        </Row>
        <Row dt="Price">
          {price}
        </Row>
        <Row dt="Pages">
          {book.volumeInfo.pageCount}
        </Row>
        <Row dt="Published date">
          {book.volumeInfo.publishedDate}
        </Row>
        <Row dt="Publisher">
          {book.volumeInfo.publisher}
        </Row>
        <Row dt="Preview">
          {#if book.volumeInfo.previewLink}
            <a href="{book.volumeInfo.previewLink}" class="text-blue-500">
              {book.volumeInfo.previewLink}
            </a>
          {/if}
        </Row>
      </dl>
    </div>
  </div>
</div>