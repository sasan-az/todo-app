import PlusIcon from "svgs/plus-thick.svg";
import { ButtonContainer } from "./styles";

type Prop = {
  onClick: () => void;
};

const PlusButton = (prop: Prop): JSX.Element => {
  return (
    <ButtonContainer
      onClick={prop.onClick}
      component={PlusIcon}
      size={20}
      fill={"#8a8a8a"}
    />
  );
};

export default PlusButton;
