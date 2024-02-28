import Styles from './css/header.module.scss';

export default function Header() {
  console.log('dd');
  return (
    <>
      <div class={Styles['layout_header']}>header</div>
    </>
  );
}
