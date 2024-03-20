import { onCleanup, onMount } from "solid-js";

export default function useResize(fn: () => void) {
  onMount(() => {
    window.addEventListener("resize", fn);
  });
  onCleanup(() => {
    window.removeEventListener("resize", fn);
  });
}
