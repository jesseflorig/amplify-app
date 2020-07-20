import Amplify, { Auth } from 'aws-amplify';
import awsmobile from '../aws-exports';

// Configure Amplify with local profile
Amplify.configure(awsmobile);

export function useAuth() {
  return Auth;
}
