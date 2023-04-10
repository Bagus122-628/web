import { error, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ locals, request }) => {
    const body = Object.fromEntries(await request.formData());
    body.emailVisibility = true;
    body.role = 'k3earrdxey95f1l';

    try {
      await locals.pb.collection('users').create(body);
    } catch (err) {
      console.error(err);
      throw error(500, 'something went wrong');
    }

    throw redirect(303, '/auth/login');
  }
};
