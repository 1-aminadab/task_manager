import bcrypt from 'bcrypt';

export const hashPassword = (password: string): string => bcrypt.hashSync(password, 10);

export const comparePassword = (password: string, hash: string): boolean => bcrypt.compareSync(password, hash);
