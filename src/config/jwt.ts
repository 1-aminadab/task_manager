export const jwtConfig = {
  secret: process.env.JWT_SECRET as string,
  expiresIn: '12h'
};
