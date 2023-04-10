<script>
  import Checkbox from './checkbox.svelte';

  export let label,
    items,
    names,
    required = false,
    defaultValue = [];
</script>

<div class="form-controll w-full max-w-xl mb-3">
  {#if label}
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="label">
      <span class="labe-text text-capitalize text-left">{label}</span>
    </label>
  {/if}
  <div class="flex flex-row flex-wrap w-full gap-2">
    {#each items as { name, id }, index (index)}
      <Checkbox
        {name}
        {names}
        {id}
        {index}
        checked={defaultValue != '' ? defaultValue.includes(id) : ''}
        {required}
      />
    {/each}
  </div>
</div>
