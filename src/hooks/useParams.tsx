import { useParams } from '@solidjs/router';
import { createEffect, createMemo, createSignal } from 'solid-js';

export default function useParamsData() {
  const params = useParams();
  const paramsMeno = createMemo(() => params);
  const [paramsSigals, setParamsSigals] = createSignal({});

  createEffect(() => {
    // console.log("ddd", paramsMeno());
    setParamsSigals(paramsMeno());
  });

  return [paramsSigals];
}
