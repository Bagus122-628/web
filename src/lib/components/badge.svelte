<script>
  import { Icon, InformationCircle } from 'svelte-hero-icons';
  export let items,
    values = [];
</script>

{#each items as item}
  {#if values.includes(item.id)}
    <!-- content here -->
    <span class="badge badge-ghost badge-lg rounded-full gap-1">
      <Icon src={InformationCircle} size="14" mini />
      {item.name}
    </span>
  {/if}
{/each}
