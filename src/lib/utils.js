const { randomBytes } = await import('node:crypto');

export function serializeNonPOJOs(obj) {
  return structuredClone(obj);
}

export function generateUsername(name) {
  const id = randomBytes(2).toString('hex');
  return `${name.slice(0, 5)}${id}`;
}

export function getImageURL(user, size = '0x0') {
  return `http://localhost:8090/api/files/${user?.collectionName}/${user?.id}/${user?.avatar || user?.image}?thumb=${size}`;
}
