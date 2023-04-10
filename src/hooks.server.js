import PocketBase from 'pocketbase';

export async function handle({ event, resolve }) {
  event.locals.pb = new PocketBase('http://localhost:8090');
  event.locals.pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

  if (event.locals.pb.authStore.isValid) {
    event.locals.user = structuredClone(event.locals.pb.authStore.model);
  } else {
    event.locals.user = '';
  }

  const response = await resolve(event);
  response.headers.set('set-cookie', event.locals.pb.authStore.exportToCookie({ secure: false }));

  return response;
}
