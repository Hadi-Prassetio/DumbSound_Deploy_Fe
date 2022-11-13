import { UserContext } from "./userContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { API, SetAuthToken } from "../pages/api/api";

export default function CheckAuth({ children }) {
  const [auth, setAuth] = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.token) {
      SetAuthToken(localStorage.token);
    }
  }, [auth]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      if (response.status === 404) {
        return setAuth({
          type: "AUTH_ERROR",
        });
      }
      let payload = response.data.data;
      payload.token = localStorage.token;
      // console.log(response);
      setAuth({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      if (error.response.data.code === 400) {
        router.push("/");
      }
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return <div>{children}</div>;
}
