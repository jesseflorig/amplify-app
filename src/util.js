import jwtDecode from 'jwt-decode';

export const AUTH_USER_TOKEN_KEY = 'ReactAmplify.TokenKey';

// Given a JWT determine if it is valid
export function validateToken(token) {
  if (!token) return false;

  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp >= Date.now() / 1000;
  } catch (err) {
    return false;
  }
}
