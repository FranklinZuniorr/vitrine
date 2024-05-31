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

export const calculatePasswordSimilarity = (password1: string, password2: string): number => {
  const calculateLevenshteinDistance = (s: string, t: string): number => {
    if (s === t) return 0;
    if (s.length === 0) return t.length;
    if (t.length === 0) return s.length;

    let v0: number[] = new Array(t.length + 1);
    let v1: number[] = new Array(t.length + 1);

    for (let i = 0; i < v0.length; i++) {
      v0[i] = i;
    }

    for (let i = 0; i < s.length; i++) {
      v1[0] = i + 1;

      for (let j = 0; j < t.length; j++) {
        const cost = s[i] === t[j] ? 0 : 1;
        v1[j + 1] = Math.min(v1[j] + 1, v0[j + 1] + 1, v0[j] + cost);
      }

      for (let j = 0; j < v0.length; j++) {
        v0[j] = v1[j];
      }
    }

    return v1[t.length];
  };

  // Função para verificar se uma senha está incluída inteiramente na outra
  const isSubstring = (s: string, t: string): boolean => {
    return s.includes(t) || t.includes(s);
  };

  // Calcular a similaridade baseada na distância de Levenshtein
  const distance: number = calculateLevenshteinDistance(password1, password2);
  const similarity = 1 - distance / Math.max(password1.length, password2.length);
  
  // Se uma senha estiver incluída inteiramente na outra, retornar 1
  if (isSubstring(password1, password2) || isSubstring(password2, password1)) {
    return 1;
  }
  
  return similarity;
};



