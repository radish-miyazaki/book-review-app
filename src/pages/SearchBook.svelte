<script lang="ts">
  import SearchBar from "../components/SearchBar.svelte";
  import type { BookItem } from "../repositories/book";
  import RepositoryFactory, { BOOK } from "../repositories/RepositoryFactory";
  import Spinner from "../components/Spinner.svelte";
  import BookCard from "../components/BookCard.svelte";
  import InfiniteScroll from "svelte-infinite-scroll";
  import { storeBooks } from "../store/book";

  const BookRepository = RepositoryFactory[BOOK]
  let q: string = ''
  let startIndex: number = 0
  let empty: boolean = false
  let totalItems: number = 0
  let promise: Promise<void>

  $: hasMore =  totalItems > $storeBooks.length

  const init = () => {
    startIndex = 0
    empty = false
    storeBooks.reset()
  }

  const getBooks = async () => {
    init()

    const res = await BookRepository.get({ q })
    empty = res.totalItems === 0
    storeBooks.add(res.items)
    totalItems = res.totalItems
  }

  const getNextPage = async () => {
    const res = await BookRepository.get({ q, startIndex })

    // 取得したデータに既に存在するものを含む可能性があるので、idでフィルタリング。
    const bookIds = $storeBooks.map(book => book.id)
    const filteredItems = res.items.filter((item: BookItem) => {
      return !bookIds.includes(item.id)
    })

    // INFO: Svelteでは配列の値をリアクティブにするには、必ず変数を直接置き換えなければならない。
    storeBooks.add(filteredItems)
  }

  const handleSubmit = () => {
    if (!q.trim()) return
    promise = getBooks()
  }

  const handleMore = () => {
    startIndex += 10
    promise = getNextPage()
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <SearchBar bind:value={q} />
</form>

<div class="text-center mt-4">
  {#if empty}
    <div>No results ...</div>
  {:else}
    <div class="grid grid-cols-1 gap-2 lg:grid-cols-2">
      {#each $storeBooks as book, index (index)}
        <BookCard {book} />
      {/each}
    </div>
    <InfiniteScroll
      window
      on:loadMore={handleMore}
      {hasMore}
    />
  {/if}

  {#await promise}
    <div class="flex justify-center">
      <Spinner />
    </div>
  {:catch e}
    <span class="text-red-600 text-sm">
      {e.message}
    </span>
  {/await}
</div>