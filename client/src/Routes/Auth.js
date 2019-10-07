import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Input from "../Components/Input";
import Button from "../Components/Button";
import useInput from "../Hooks/useInput";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius: 0px;
  width: 100%;
  max-width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

const Form = styled(Box)`
  padding: 40px;
  padding-bottom: 30px;
  margin-bottom: 15px;
  form {
    width: 100%;
    input {
      width: 100%;
      &:not(:last-child) {
        margin-bottom: 7px;
      }
    }
    button {
      margin-top: 10px;
    }
  }
`;

export default () => {
  const [action, setAction] = useState("login");
  const username = useInput("");
  const password = useInput("");
  const firstname = useInput("");
  const lastname = useInput("");
  const email = useInput("");

  return (
    <Wrapper>
      <Form>
        {action === "login" ? (
          <form>
            <Input placeholder={"Username"} {...username} />
            <Input placeholder={"Password"} {...password} type="password" />
            <Button text={"Log in"} />
          </form>
        ) : (
          <form>
            <Input placeholder={"First Name"} {...firstname} />
            <Input placeholder={"Last Name"} {...lastname} />
            <Input placeholder={"Email"} {...email} type="email" />
            <Input placeholder={"Username"} {...username} />
            <Input placeholder={"Password"} {...password} type="password" />
            <Button text={"Sign up"} />
          </form>
        )}
        <StateChanger>
          {action === "login" ? (
            <>
              Don't have an account?&nbsp;
              <Link onClick={() => setAction("signUp")}>Sign up</Link>
            </>
          ) : (
            <>
              Have an account?&nbsp;
              <Link onClick={() => setAction("login")}>Log in</Link>
            </>
          )}
        </StateChanger>
      </Form>
    </Wrapper>
  );
};
