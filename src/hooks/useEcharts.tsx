import { Accessor, Signal, createEffect, on } from "solid-js";

type useEchartsInf = Signal<any>;

export default function useEcharts(
  options: useEchartsInf,
  data?: Accessor<unknown>
) {
  let [option, setOption] = options;

  if (data) {
    createEffect(
      on(data, () => {
        setOption(data());
      })
    );
  }

  return [option, setOption];
}
