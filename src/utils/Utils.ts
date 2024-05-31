import bcrypt from "bcrypt";
import * as jwt from 'jsonwebtoken';
import 'dotenv/config';

const secretKey = process.env.SECRET_KEY as string;

export const createHash = async (password: string): Promise<string> => {
    const saltRounds = 10;
  
    try {
      const hash: string = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (err) {
      console.error('Erro ao gerar hash:', err);
      return "";
    }
};

export const comparePasswordToHash = async (enteredPassword: string, storedHash: string): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(enteredPassword, storedHash);
    return match;
  } catch (err) {
    console.error('Erro ao comparar senhas:', err);
    return false;
  }
};

export const createToken = (payload: object): string => {
  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
  return token;
}

export const validateToken = (token: string): boolean => {
  try {
    const decoded = jwt.verify(token, secretKey) as object;
    return true;
  } catch (error) {
    console.error('Error validating token:', error);
    return false;
  }
}
