import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@chakra-ui/react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button
      className="logout__btn"
      backgroundColor="#0784E4"
      width="128px"
      height="32px"
      fontFamily="inter"
      fontWeight="500"
      fontSize="14px"
      marginTop="10px"
      color="#fff"
      borderRadius="0px"
      _hover={{ bg: "#66a3ff" }}
      onClick={() => logout({ returnTo: window.location.origin + "/login" })}
    >
      Log out
    </Button>
  );
};

export default LogoutButton;
