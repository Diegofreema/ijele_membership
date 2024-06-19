import * as bcrypt from 'bcrypt-ts';

export const hashPasswordBcrypt = async (
  password: string
): Promise<string | null> => {
  let hash = null;
  try {
    const salt = await bcrypt.genSalt(10);
    hash = await bcrypt.hash(password, salt);
  } catch (error) {
    console.log('Could not hash password: ', error);
    return null;
  }

  return hash;
};

export const verifyPasswordBcrypt = async (
  hashPassword: string,
  password: string
): Promise<boolean> => {
  let res;
  try {
    res = await bcrypt.compare(password, hashPassword);
  } catch (error) {
    console.log('Could not verify password: ', error);
    return false;
  }

  return res;
};
