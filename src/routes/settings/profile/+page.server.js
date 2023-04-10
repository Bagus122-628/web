import { error } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, locals }) => {
    let data = await request.formData();
    const avatar = data.get('avatar');

    if (avatar.size === 0) {
      data.delete('avatar');
    }

    try {
      const { name, avatar } = await locals.pb.collection('users').update(locals?.user?.id, data);

      locals.user.name = name;
      locals.user.avatar = avatar;
    } catch (err) {
      console.error('Error: ', err);

      throw error(400, 'something went wrong updating your profile');
    }

    return {
      success: true
    };
  }
};
