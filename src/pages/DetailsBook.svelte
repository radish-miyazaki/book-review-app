<script lang="ts">
  import Spinner from "../components/Spinner.svelte";
  import RepositoryFactory, { BOOK } from "../repositories/RepositoryFactory";
  import { find, storeBooks } from "../store/book";
  import type {BookItem} from "../repositories/book";
  import type {Readable} from "svelte/store";
  import BookInfo from "../components/BookInfo.svelte";

  const BookRepository = RepositoryFactory[BOOK];
  type Params = { id: string };
  export let params: Params;
  let book: Readable<BookItem>
  let promise: Promise<void>;


  const findById = async (id: string) => {
    const book = await BookRepository.find(id);
    storeBooks.add([book])
  }

  console.log(findById(params.id).then(res => console.log(res)))

  // storeの中にparam_queryで渡ってきたIDと同じものがあればそれを取得する
  book = find(params.id)
  if (!book) {
    promise = findById(params.id)
  }
  console.log(book)
</script>

<div>
  {#await promise}
    <div class="flex justify-center">
      <Spinner />
    </div>
  {:then res}
    <BookInfo book={$book} />
  {:catch e}
    <span class="text-red-600 text-sm">
      {e.message}
    </span>
  {/await}
</div>