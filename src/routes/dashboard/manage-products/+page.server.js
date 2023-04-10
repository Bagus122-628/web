import { error } from '@sveltejs/kit';

export async function load({ locals }) {
  async function getProducts() {
    const response = await locals.pb.collection('products').getList(1, 50, {});
    return await structuredClone(response);
  }

  async function getSizes() {
    const response = await locals.pb.collection('sizes').getFullList(10);
    return await structuredClone(response);
  }

  async function getColors() {
    const response = await locals.pb.collection('colors').getFullList(10);
    return await structuredClone(response);
  }

  async function getTags() {
    const response = await locals.pb.collection('tags').getFullList(10);
    return await structuredClone(response);
  }

  return {
    products: getProducts(),
    sizes: getSizes(),
    colors: getColors(),
    tags: getTags()
  };
}

export const actions = {
  add: async ({ request, locals }) => {
    const data = await request.formData();
    data.append('publisher', locals.user.id);

    try {
      await locals.pb.collection('products').create(data);
    } catch (err) {
      console.error('Error: ', err);
      throw error(400, 'something went wrong adding new product');
    }

    return {
      success: true
    };
  },

  update: async ({ request, locals }) => {
    const data = await request.formData();
    const id = data.get('productId');
    const image = data.get('image');

    if (image.size === 0) {
      data.delete('image');
    }

    try {
      await locals.pb.collection('products').update(id, data);
    } catch (err) {
      console.error('Error: ', err);
      throw error(400, 'something went wrong updating your product');
    }

    return {
      success: true
    };
  }
};
