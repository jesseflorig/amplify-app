// AWS
import Amplify, { Auth } from "aws-amplify";
import awsmobile from "../aws-exports";

Amplify.configure(awsmobile);

export function useAuth() {
  return Auth;
}
