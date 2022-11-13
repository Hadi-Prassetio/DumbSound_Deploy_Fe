import { createContext, useReduce, useReducer } from "react";

export const UserContext = createContext();

const initial = {
  isLogin: false,
  user: {},
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "USER_SUCCESS":
    case "LOGIN":
      localStorage.setItem("token", payload.token);
      return {
        isLogin: true,
        user: payload,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        isLogin: false,
        user: {},
      };
    default:
      throw new Error();
  }
};

export const UserContextProvider = ({ children }) => {
  const [auth, setAuth] = useReducer(reducer, initial);

  return (
    <UserContext.Provider value={[auth, setAuth]}>
      <div>{children}</div>
    </UserContext.Provider>
  );
};
