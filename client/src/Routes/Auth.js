import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius: 0px;
  width: 350px;
`;

const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;

export default () => {
  const [action, setAction] = useState("login");

  return (
    <Wrapper>
      <StateChanger>
        {action === "login" ? (
          <>
            Don't have an account?&nbsp;
            <Link onClick={() => setAction("signUp")}>Sign Up</Link>
          </>
        ) : (
          <>
            Have an account?&nbsp;
            <Link onClick={() => setAction("login")}>Log In</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
};
