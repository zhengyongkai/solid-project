import { useClassList } from "cui-solid";
import { Accessor, Signal, createContext, splitProps } from "solid-js";

export type FormContextOptions = {
  inline?: boolean;
  labelWidth?: number;
  form: Signal<{}>;
  onChange?: Function;
  errorMessage: [];
};

export type FormProps = {
  classlist?: any;
  style?: any;
  labelWidth?: number;
  onChange?: Function;
  onSubmit?: Function;
  inline?: boolean;
  form: Signal<{}>;
  children: any;
  ref?: any;
};
const FormContext = createContext<FormContextOptions>();

export default function Form(props: FormProps) {
  const classList = useClassList(props, "cm-form", {
    "cm-form-inline": props.inline,
  });
  const [local, others] = splitProps(props, [
    "inline",
    "labelWidth",
    "onChange",
    "onSubmit",
    "style",
    "form",
    "children",
  ]);
  const ctx: FormContextOptions = {
    labelWidth: local.labelWidth || 120,
    inline: local.inline,
    form: local.form,
    onChange: local.onChange,
    errorMessage: [],
  };

  const onSubmitFn = (e: Event) => {
    e.preventDefault();
    if (local.onSubmit) {
      return local.onSubmit();
    }
    return false;
  };

  return (
    <FormContext.Provider value={ctx}>
      <form classList={classList} {...others} onSubmit={onSubmitFn}></form>
      <button type="submit" style={{ display: "none" }} />
      <>{local.children}</>
    </FormContext.Provider>
  );
}

export { FormContext };
