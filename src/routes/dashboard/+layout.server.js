import { error, redirect } from '@sveltejs/kit';

export async function load({ locals }) {
  if (!locals.pb.authStore.isValid) {
    throw redirect(303, '/auth/login');
  }

  if (!locals.pb.authStore.model.role.includes('759786f5i9ps8ne')) {
    throw error(401, "don't have access");
  }
}
