import { useFormProps } from "cui-solid/types/utils/useForm";
import { createSignal } from "solid-js";

function formSet(form: useFormProps) {
  const [value, setFormValue] = createSignal<any>(form.getFormData());

  function setValue(values: any) {
    setFormValue(values);
    form.setFormData(values);
  }
  return { form, value, setValue };
}

export { formSet };
