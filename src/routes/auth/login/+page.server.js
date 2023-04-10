import { error, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ locals, request }) => {
    const { email, password } = Object.fromEntries(await request.formData());

    try {
      await locals.pb.collection('users').authWithPassword(email, password);
      if (!locals.pb?.authStore?.model?.verified) {
        locals.pb.authStore.clear();
        return { notVerified: true };
      }
    } catch (err) {
      console.error(err);
      throw error(500, 'something went wrong logging in');
    }

    throw redirect(303, '/');
  }
};
