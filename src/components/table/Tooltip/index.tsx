import { Tooltip } from "cui-solid";
import { createComputed, createSignal, onMount } from "solid-js";

interface childrenProps {
  children: any;
}

export default function TableTooltip(props: childrenProps) {
  let [ref] = createSignal<HTMLDivElement | undefined>(undefined);

  onMount(() => {});

  const children = createComputed(() => {
    console.log(ref()?.parentElement, ref);
    if (ref()?.parentElement && ref()) {
      let parentWidth = ref()?.parentElement.clientWidth - 36;
      let width = ref()?.clientWidth;
      if (width > parentWidth) {
        return <Tooltip>{props.children}</Tooltip>;
      } else {
        return <div>{props.children}</div>;
      }
    }
  }, ref);

  console.log(children);

  return <span ref={ref()}>{props.children}</span>;
}
