<script>
  import { Vite } from '$lib/icons';
  import { getImageURL } from '$lib/utils';
  import { Icon, ShoppingCart } from 'svelte-hero-icons';

  export let data;
</script>

<header class="bg-base-100 border-b">
  <nav class="navbar max-w-7xl mx-auto">
    <div class="flex-1">
      <a href="/" class="btn btn-ghost normal-case text-xl">
        <Vite />
        ECommerce
      </a>
    </div>
    <div class="flex-none">
      {#if !data.user}
        <div class="dropdown dropdown-end">
          <a href="/auth/login" class="btn btn-primary">Login</a>
          <a href="/auth/register" class="btn btn-secondary">Register</a>
        </div>
      {:else}
        <div class="dropdown dropdown-end">
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <label tabindex="0" for="shopping-cart" class="btn btn-ghost btn-circle">
            <div class="indicator" id="shopping-cart">
              <Icon src={ShoppingCart} class="w-5" />
              <span class="badge badge-sm indicator-item">8</span>
            </div>
          </label>
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <div tabindex="0" class="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow">
            <div class="card-body">
              <span class="font-bold text-lg">8 Items</span>
              <span class="text-info">Subtotal: $999</span>
              <div class="card-actions">
                <button class="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown dropdown-end">
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <label tabindex="0" for="avatar" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img
                src="{data.user?.avatar
                  ? getImageURL(data.user)
                  : `https://ui-avatars.com/api/?name=${data.user?.name}`}}"
                alt="user-avatar"
                id="avatar"
              />
            </div>
          </label>
          <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
          {#if (data.user.role.includes('759786f5i9ps8ne'))}
             <!-- content here -->
             <li><a href="/dashboard/manage-products">Dashboard</a></li>
          {/if}
            <li><a href="/settings">Setting</a></li>
            <li>
              <form action="/auth/logout" method="post">
                <button type="submit" class="w-full text-start">Logout</button>
              </form>
            </li>
          </ul>
        </div>
      {/if}
    </div>
  </nav>
</header>
