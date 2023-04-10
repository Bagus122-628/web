<script>
  import { applyAction, enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { Badge, Checkboxes, Input } from '$lib/components';
  import { getImageURL } from '$lib/utils';
  import { Icon, Pencil } from 'svelte-hero-icons';

  export let data;

  let selected = { name: '' };
  let src = `https://ui-avatars.com/api/?name=john smith`;

  $: loading = false;
  const showPreview = (event) => {
    const target = event.target;
    const files = target.files;

    if (files.length > 0) {
      src = URL.createObjectURL(files[0]);
    }
  };

  const submitUpdateProfile = () => {
    loading = true;
    return async ({ result }) => {
      switch (result.type) {
        case 'success':
          await invalidateAll();
          break;
        case 'error':
          break;
        default:
          await applyAction(result);
      }
      loading = false;
    };
  };
</script>

<div class="py-5 px-10 shadow-inner">
  <div class="flex items-center mb-4">
    <h3 class="text-bold text-2xl">Search</h3>
    <form action="" method="get" class="ml-auto mb-0">
      <input type="text" name="keyword" class="input input-bordered input-sm" />
    </form>
    <button on:click={() => (selected = { name: '' })} class="btn btn-sm btn-success ml-4"
      >Add New</button
    >
  </div>
  <div class="overflow-x-auto w-full">
    <table class="table w-full border">
      <!-- head -->
      <thead class="text-center bg-base-200">
        <tr>
          <th> # </th>
          <th>Name</th>
          <th>Create</th>
          <th>Colors</th>
          <th>Sizes</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {#each data.products.items as product, index (product.id)}
          <!-- row 1 -->
          <tr>
            <td>
              <!-- svelte-ignore a11y-label-has-associated-control -->
              <label>
                {index + 1}
              </label>
            </td>
            <td>
              <div class="flex items-center space-x-3">
                <div class="avatar">
                  <div class="mask mask-squircle w-12 h-12">
                    <img
                      src={product.image != ''
                        ? getImageURL(product)
                        : `https://ui-avatars.com/api/?name=${product?.name}`}
                      alt="Avatar Tailwind CSS Component"
                    />
                  </div>
                </div>
                <div>
                  <div class="font-bold">{product.name}</div>
                  <div class="text-sm opacity-50">{product.quantity}</div>
                </div>
              </div>
            </td>
            <td>
              <span class=""
                >{new Date(product.created).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span
              >
            </td>
            <td>
              <div class="flex flex-wrap w-44 gap-y-3 gap-x-2">
                <Badge items={data.colors} values={product.colors} />
              </div>
            </td>
            <td>
              <div class="flex flex-wrap w-44 gap-y-3 gap-x-2">
                <Badge items={data.sizes} values={product.sizes} />
              </div>
            </td>
            <th>
              <button class="btn btn-warning" on:click={() => (selected = product)}>details</button>
            </th>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>

<div class="border-l p-6 w-80">
  {#if selected.name == ''}
    <div class="flex flex-col">
      <form
        action="?/add"
        method="post"
        enctype="multipart/form-data"
        class=" space-y-2 flex flex-col items-center"
        use:enhance={submitUpdateProfile}
      >
        <div class="form-control w-full max-w-lg items-center">
          <label for="avatar-preview" class="avatar w-32 rounded-full hover:cursor-pointer">
            <label
              for="avatar-preview"
              class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer"
            >
              <span class="btn btn-circle btn-sm btn-warning">
                <Icon id="pencil" src={Pencil} class="w-4 h-4" />
              </span>
            </label>
            <div class="w-32 rounded-full">
              <img {src} alt="product avatar" />
            </div>
          </label>
          <input
            type="file"
            name="image"
            id="avatar-preview"
            value=""
            accept="image/*"
            hidden
            on:change={showPreview}
            disabled={loading}
          />
        </div>
        <Input name="name" label="Name" disabled={loading} />
        <Input name="description" label="Description" disabled={loading} />
        <div class="flex gap-4">
          <Input name="quantity" type="number" label="Quantity" disabled={loading} />
          <Input type="number" name="price" label="Price" disabled={loading} />
        </div>
        <Checkboxes label="Colors" names="colors" items={data.colors} />
        <Checkboxes label="Sizes" names="sizes" items={data.sizes} />
        <Checkboxes label="Tags" names="tags" items={data.tags} />

        <div class="w-full max-w-lg pt-3">
          <button class="btn btn-success w-full max-w-lg" type="submit" disabled={loading}>
            Add New product
          </button>
        </div>
      </form>
    </div>
  {:else}
    <div class="flex flex-col w-fit mx-auto">
      <form
        action="?/update"
        method="post"
        enctype="multipart/form-data"
        class=" space-y-2 flex flex-col items-center"
        use:enhance={submitUpdateProfile}
      >
        <div class="form-control w-full max-w-lg items-center">
          <label for="avatar-preview" class="avatar w-32 rounded-full hover:cursor-pointer">
            <label
              for="avatar-preview"
              class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer"
            >
              <span class="btn btn-circle btn-sm btn-warning">
                <Icon id="pencil" src={Pencil} class="w-4 h-4" />
              </span>
            </label>
            <div class="w-32 rounded-full">
              <img
                src={selected?.image
                  ? getImageURL(selected)
                  : `https://ui-avatars.com/api/?name=${selected?.name}`}
                alt="product avatar"
              />
            </div>
          </label>
          <input
            type="file"
            name="image"
            id="avatar-preview"
            value=""
            accept="image/*"
            hidden
            on:change={showPreview}
            disabled={loading}
          />
        </div>
        <input name="productId" type="text" value={selected.id} hidden />
        <Input name="name" label="Name" value={selected?.name} disabled={loading} />
        <Input
          name="description"
          label="Description"
          value={selected?.description}
          disabled={loading}
        />
        <div class="flex gap-4">
          <Input
            name="quantity"
            type="number"
            label="Quantity"
            value={selected?.quantity}
            disabled={loading}
          />
          <Input
            type="number"
            name="price"
            label="Price"
            value={selected?.price}
            disabled={loading}
          />
        </div>
        <Checkboxes
          label="Colors"
          names="colors"
          items={data.colors}
          defaultValue={selected.colors}
        />
        <Checkboxes label="Sizes" names="sizes" items={data.sizes} defaultValue={selected.sizes} />
        <Checkboxes label="Tags" names="tags" items={data.tags} defaultValue={selected.tags} />
        <div class="w-full max-w-lg pt-3">
          <button class="btn btn-warning w-full max-w-lg" type="submit" disabled={loading}>
            Update Profile
          </button>
        </div>
      </form>
    </div>

    <style>
      span.btn {
        @apply rounded-full;
      }
    </style>
  {/if}
</div>
