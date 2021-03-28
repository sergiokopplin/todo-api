import { loginPath, signupPath, todosPath } from './paths/';

export default {
  '/login': loginPath,
  '/signup': signupPath,
  ...todosPath,
};
