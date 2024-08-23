import * as bcrypt from 'bcrypt-ts';
import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

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

export function generateRandomString() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export const trimText = (text: string) => {
  if (text.length > 15) return text.substring(0, 15) + '...';
  return text;
};
