<script>
  import { page } from '$app/stores';

  const navigation = [
    {
      title: 'Profile',
      href: '/settings/profile'
    },
    {
      title: 'Account',
      href: '/settings/account'
    },
    {
      title: 'Security',
      href: '/settings/security'
    }
  ];
</script>

<div class="flex w-full h-full space-x-4 text-center">
  <ul class="menu bg-base-100 w-1/3 p-2 rounded-box">
    {#each navigation as navItem}
      <li>
        <a
          href={navItem.href}
          class="font-medium {$page.url.pathname === navItem.href ? 'active' : ''}"
          >{navItem.title}</a
        >
      </li>
    {/each}
  </ul>
  <div class="w-full">
    <slot />
  </div>
</div>
