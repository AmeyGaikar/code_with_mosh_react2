import { ReactNode, useReducer } from "react";
import AuthContext from "./authContext";

interface loginAction {
  type: "LOGIN";
  username: string;
}

interface logoutAction {
  type: "LOGOUT";
}

export type authAction = loginAction | logoutAction;

const authReducer = (state: string, action: authAction): string => {
  if (action.type === "LOGIN") return action.username;
  if (action.type === "LOGOUT") return "";

  return state;
};

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, dispatch] = useReducer(authReducer, "");
  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
