import React, { useState } from "react";
import useInput from "../../Hooks/useInput";
import AuthPresenter from "./AuthPresenter";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN
} from "./AuthQueries";
import { toast } from "react-toastify";
import { validate } from "graphql";

export default () => {
  const [action, setAction] = useState("login");
  const username = useInput("");
  const firstname = useInput("");
  const lastname = useInput("");
  const email = useInput("");
  const secret = useInput("");

  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: { email: email.value }
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      userName: username.value,
      email: email.value,
      firstName: firstname.value,
      lastName: lastname.value
    }
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value
    }
  });

  const [localLogin] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    e.preventDefault();

    if (action === "login") {
      if (email.value !== "") {
        try {
          const { data } = await requestSecretMutation();
          const { requestSecret } = data;

          if (!requestSecret) {
            toast.error("You don't have an account yet, create one");
            setTimeout(() => setAction("signup"), 3000);
          } else {
            toast.success("Check your inbox for your login secret");
            setTimeout(() => setAction("secret"), 3000);
          }
        } catch (error) {
          console.warn(error);
          toast.error("Can't request secret, try again!");
        }
      } else {
        toast.error("Email is required");
      }
    } else if (action === "signup") {
      if (
        username.value !== "" &&
        email.value !== "" &&
        firstname.value !== "" &&
        lastname.value !== ""
      )
        try {
          const { data } = await createAccountMutation();
          const { createAccount } = data;

          if (!createAccount) {
            toast.error("Can't create account");
          } else {
            toast.success("Account created, login now");
            setAction(() => setAction("login"), 3000);
          }
        } catch (error) {
          toast.error(error.message);
        }
      else {
        toast.error("All fields are required");
      }
    } else if (action === "secret") {
      if (secret.value !== "")
        try {
          const {
            data: { confirmSecret: token }
          } = await confirmSecretMutation();

          if (token !== "" && token !== undefined)
            localLogin({ variables: { token } });
          else throw Error();
        } catch {
          toast.error("Secret is not validate, check again");
        }
    }
  };

  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      username={username}
      firstname={firstname}
      lastname={lastname}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
