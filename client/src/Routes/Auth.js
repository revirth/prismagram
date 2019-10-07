import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Input from "../Components/Input";
import Button from "../Components/Button";

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

  return (
    <Wrapper>
      <Form>
        <StateChanger>
          {action === "login" ? (
            <form>
              <Input placeholder={"Username"} />
              <Input placeholder={"Password"} />
              <Button text={"Log in"} />
            </form>
          ) : (
            <form>
              <Input placeholder={"First Name"} />
              <Input placeholder={"Last Name"} />
              <Input placeholder={"Email"} />
              <Input placeholder={"Username"} />
              <Input placeholder={"Password"} />
              <Button text={"Sign up"} />
            </form>
          )}
        </StateChanger>
      </Form>
    </Wrapper>
  );
};
