import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Loading from "../Loading/loading";

const Login = () => {
  const { isLoading, loginWithRedirect, user } = useAuth0();

    useEffect(() => {
      (async function login() {
        if (!isLoading) {
          await loginWithRedirect();
        }
      })();
    }, [isLoading]);
    return (
        <Loading />
    );
};

export default Login;
