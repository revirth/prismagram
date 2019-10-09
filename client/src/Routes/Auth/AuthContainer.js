import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("login");
  const username = useInput("");
  const firstname = useInput("");
  const lastname = useInput("");
  const email = useInput("");
  const [requestSecret] = useMutation(LOG_IN, {
    update: (_, { data }) => {
      const { requestSecret } = data;

      if (!requestSecret) {
        toast.error("You don't have an account yet, create one");
        setTimeout(() => {
          setAction("signup");
        }, 3000);
      }
    },
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
