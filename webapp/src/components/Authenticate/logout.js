import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import AltButton from "../altButton";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <AltButton onClick={() => logout({ returnTo: window.location.origin })}>
      Log Out
    </AltButton>
  );
};

export default LogoutButton;