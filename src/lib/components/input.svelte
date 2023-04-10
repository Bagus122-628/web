<script>
  export let value = '',
    placeholder,
    name,
    label,
    type = 'text',
    disabled = false,
    required = false,
    clazz;

  export { clazz as class };
</script>

<div class="form-control w-full max-w-lg {clazz}">
  {#if label}
    <label for={name} class="label font-medium pb-1">
      <span class="label-text">{label}</span>
    </label>
  {/if}
  <input
    id={name}
    {type}
    {placeholder}
    {required}
    {disabled}
    {name}
    {value}
    class="input input-bordered w-full max-w-lg"
  />
</div>
