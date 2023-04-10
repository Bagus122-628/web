<script>
  export let name,
    id,
    index,
    required,
    checked,
    names = 'roles';
</script>

<div class="form-control">
  <input
    value={id}
    name={names}
    type="checkbox"
    id={id + index}
    class="appearance-none"
    {required}
    bind:checked
  />

  <label
    class="btn btn-sm btn-outline w-fit text-capitalize {checked ? 'btn-active' : ''}"
    for={id + index}
  >
    {name}
  </label>
</div>
