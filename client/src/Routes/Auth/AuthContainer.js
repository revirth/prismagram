import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

export default () => {
  const [action, setAction] = useState("login");
  const username = useInput("");
  const firstname = useInput("");
  const lastname = useInput("");
  const email = useInput("");
  const [requestSecret] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });

  const onLogin = e => {
    e.preventDefault();

    if (email.value !== "") requestSecret();
  };

  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      username={username}
      firstname={firstname}
      lastname={lastname}
      email={email}
      onLogin={onLogin}
    />
  );
};
