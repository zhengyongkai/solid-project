import { createSignal } from "solid-js";
import { MonacoEditor } from "solid-monaco";

export default function CodeEditer() {
  let [_code, setCode] = createSignal(
    "function fn(data:string){console.log(data)};\nfn('我是代码编辑器')"
  );

  function onChange(data: string) {
    setCode(data);
  }
  return (
    <MonacoEditor onChange={onChange} language="typescript" value={_code()} />
  );
}
