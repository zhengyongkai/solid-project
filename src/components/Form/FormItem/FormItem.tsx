import { useContext } from "solid-js";
import { FormContext } from "..";
import { useClassList } from "cui-solid";

type FormItemProps = {
  style?: any;
  inline?: boolean;
  labelStyle?: any;
  label?: string;
  children?: any;
};

export default function FormItem(props: FormItemProps) {
  const formContext = useContext(FormContext);
  const clazzName = () =>
    useClassList(props, "cm-form-item", {
      "cm-form-item-inline": props.inline || formContext?.inline,
    });

  return (
    <div classList={clazzName()} style={props.style}>
      <label
        class="cm-form-label"
        style={{ width: formContext?.labelWidth + "px", ...props.labelStyle }}
      >
        {props.label}
      </label>

      <div class="cm-form-item-element">
        {props.children}
        <div class="cm-form-item-error-tip">lll</div>
      </div>
    </div>
  );
}
