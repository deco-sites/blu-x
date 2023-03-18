import type { JSX } from "preact";

type Props = JSX.IntrinsicElements["div"];

function ContainerCustom({ class: _class = "", ...props }: Props) {
  return <div class={`mx-auto ${_class}`} {...props} />;
}

export default ContainerCustom;
