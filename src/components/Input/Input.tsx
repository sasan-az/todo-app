import * as Styled from "./styles";
import { InputHTMLAttributes } from "react";

const Input = (prop: InputHTMLAttributes<HTMLInputElement>): JSX.Element => {
  const { children, ...rest } = prop;
  return (
    <Styled.InputContainer>
      <div>
        <Styled.Circle>⬤</Styled.Circle>
        <input autoFocus={true} placeholder={"Type here .."} {...rest} />
      </div>
      {children}
    </Styled.InputContainer>
  );
};

export default Input;
