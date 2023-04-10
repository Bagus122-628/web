<script>
  import { Footer, Header } from '$lib/layouts';
  import '../app.postcss';

  /** @type {import('./$types').LayoutData} */
  export let data;
</script>

<div class="min-h-screen flex flex-col">
  <Header {data} />
  <div class="flex-1 w-ful flex flex-col">
    <slot />
  </div>
  <Footer />
</div>
