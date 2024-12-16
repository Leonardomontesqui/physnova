import { ReactNode } from "react";

const IfElseRender = ({
  condition,
  ifTrue,
  ifFalse,
}: {
  condition: boolean;
  ifTrue?: ReactNode | null;
  ifFalse: ReactNode | null;
}) => {
  return <>{!!condition ? ifTrue : ifFalse}</>;
};

export default IfElseRender;
