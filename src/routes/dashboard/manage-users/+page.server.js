import { error } from '@sveltejs/kit';

export async function load({ locals }) {
  async function getUsers() {
   const response = await locals.pb.collection('users').getList(1, 50, {});
    return await structuredClone(response)
  }
  async function getRoles() {
    const response = await locals.pb.collection('roles').getFullList(10);
    return await structuredClone(response)
  }

  return {
    list: getUsers(),
    roles: getRoles()
  };
}

export const actions = {
  update: async ({ request, locals }) => {
    let data = await request.formData();
    const avatar = data.get('avatar');
    const id = data.get('userId');

    if (avatar.size === 0) {
      data.delete('avatar');
    }

    try {
      await locals.pb.collection('users').update(id, data);
    } catch (err) {
      console.error('Error: ', err);
      throw error(400, 'something went wrong updating your profile');
    }

    return {
      success: true
    };
  },

  add: async ({ request, locals }) => {
    let data = await request.formData();
    const avatar = data.get('avatar');
    const password = data.get('password');
    data.append('passwordConfirm', password);
    data.append('emailVisibility', true);

    if (avatar.size === 0) {
      data.delete('avatar');
    }

    try {
      await locals.pb.collection('users').create(data);
    } catch (err) {
      console.error('Error: ', err);
      throw error(400, 'something went wrong adding new user');
    }

    return {
      success: true
    };
  }
};
