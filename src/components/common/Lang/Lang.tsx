import { Dropdown, DropdownItem, DropdownMenu } from "cui-solid";
import Styles from "./css/index.module.scss";
import useCommonStore from "@/stores/common/Index";

export default function Lang() {
  const [lang, setLang] = useCommonStore().lang;

  return (
    <>
      <div class={Styles["lang"]}>
        <Dropdown
          trigger="click"
          align="bottom"
          menu={
            <DropdownMenu>
              <DropdownItem name="简体">简体</DropdownItem>
              <DropdownItem name="繁体">繁体</DropdownItem>
              <DropdownItem name="English">English</DropdownItem>
            </DropdownMenu>
          }
          onSelect={(name: string) => {
            setLang(name);
          }}
        >
          <div>{lang()}</div>
        </Dropdown>
      </div>
    </>
  );
}
