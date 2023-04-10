<script>
  import { applyAction, enhance } from '$app/forms';
  import { invalidateAll } from '$app/navigation';
  import { Input } from '$lib/components';
  import { getImageURL } from '$lib/utils';
  import { Icon, Pencil } from 'svelte-hero-icons';

  export let data;

  let src = data.user?.avatar
    ? getImageURL(data.user)
    : `https://ui-avatars.com/api/?name=${data.user?.name}`;

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

<div class="flex flex-col w-fit mx-auto">
  <form
    method="post"
    enctype="multipart/form-data"
    class=" space-y-2 flex flex-col items-center"
    use:enhance={submitUpdateProfile}
  >
    <h3 class="text-2xl font-medium">Update Profile</h3>
    <div class="form-control w-full max-w-lg items-center">
      <label for="avatar-preview" class="avatar w-32 rounded-full hover:cursor-pointer">
        <label for="avatar-preview" class="absolute -bottom-0.5 -right-0.5 hover:cursor-pointer">
          <span class="btn btn-circle btn-sm btn-warning ">
            <Icon id="pencil" src={Pencil} class="w-4 h-4" />
          </span>
        </label>
        <div class="w-32 rounded-full">
          <img {src} alt="user avatar"/>
        </div>
      </label>
      <input
        type="file"
        name="avatar"
        id="avatar-preview"
        value=""
        accept="image/*"
        hidden
        on:change={showPreview}
        disabled={loading}
      />
    </div>
    <Input name="name" label="Name" value={data?.user?.name} disabled={loading} />
    <div class="w-full max-w-lg pt-3">
      <button class="btn btn-primary w-full max-w-lg" type="submit" disabled={loading}>
        Update Profile
      </button>
    </div>
  </form>
</div>

<style>

  span.btn {
    @apply rounded-full
  }

</style>