<script>
  import { page } from '$app/stores';

  const navigation = [
    { title: 'Manage Product', href: '/dashboard/manage-products' },
    { title: 'Manage User', href: '/dashboard/manage-users' }
  ];
</script>

<div class="w-full flex flex-1">
  <nav class="border-r grow">
    <ul class="menu">
      {#each navigation as navItem}
        <li>
          <a
            href={navItem.href}
            class=" font-medium px-8 {$page.url.pathname === navItem.href
              ? 'active'
              : ''} rounded-none">{navItem.title}</a
          >
        </li>
      {/each}
    </ul>
  </nav>

  <slot />
</div>
