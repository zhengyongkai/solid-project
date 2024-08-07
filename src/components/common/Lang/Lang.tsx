import { Dropdown, DropdownItem, DropdownMenu } from 'cui-solid'
import Styles from './css/index.module.scss'
import { useI18n } from 'solid-i18n'
import locale, { langMap } from '@/locale'
import { langInf } from '@/types'

export default function Lang() {
  function langMenus() {
    return [...langMap.entries()].map((res) => {
      return <DropdownItem name={res[0]}>{res[1]}</DropdownItem>
    })
  }

  return (
    <>
      <div class="text-12 cursor-pointer">
        <Dropdown
          trigger="click"
          align="bottom"
          menu={<DropdownMenu>{langMenus}</DropdownMenu>}
          onSelect={(name: langInf) => {
            return locale.setLanguage(name)
          }}
        >
          <div>{locale.getLanguage().name}</div>
        </Dropdown>
      </div>
    </>
  )
}
