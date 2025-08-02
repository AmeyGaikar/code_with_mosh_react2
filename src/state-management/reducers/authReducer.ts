interface loginAction {
  type: "LOGIN";
  username: string;
}

interface logoutAction {
  type: "LOGOUT";
}

type authAction = loginAction | logoutAction;
const authReducer = (state: string, action: authAction): string => {
  if (action.type === 'LOGIN') return action.username;
  if (action.type === 'LOGOUT') return '';

  return state;
};

export default authReducer;
