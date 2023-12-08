import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../App";

const PrivateRouting = (props) => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      {isLoggedIn === true ? (
        <>{props.children}</>
      ) : (
        <>
          <Navigate to="/login" />
        </>
      )}
    </>
  );
};

export default PrivateRouting;
