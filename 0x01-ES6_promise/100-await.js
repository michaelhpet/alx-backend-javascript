import { uploadPhoto, createUser } from './utils';

export default async function asyncUploadUser() {
  try {
    return {
      photo: await uploadPhoto('photo-profile-1'),
      user: await createUser('Guillaume', 'Salva'),
    };
  } catch (error) {
    return {
      photo: null,
      user: null,
    };
  }
}
