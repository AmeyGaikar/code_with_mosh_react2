import { Dispatch } from "react";
import { authAction } from "../reducers/authReducer";
import React from "react";

interface AuthContextType {
    user: string,
    dispatch: Dispatch<authAction>
}

const AuthContext =  React.createContext<AuthContextType>( {} as AuthContextType);

export default AuthContext