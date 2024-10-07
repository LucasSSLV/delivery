import style from "./navbar/navbar.module.css";
import { LuShoppingCart, LuUserCircle } from "react-icons/lu";
export default function NavBar() {
  return (
    <nav className={style.navBarContainer}>
      <div className={style.navbarItems}>
        <img className={style.logo} src="../../public/logo.jpeg" alt="" />
        <div className={style.navbarLinksContainer}>
          <a className={style.navBarLink} href="/">
            Home
          </a>
          <a className={style.navBarLink} href="/">
            Pratos
          </a>
          <LuShoppingCart className={style.navBarLink} />
          <LuUserCircle className={style.navBarLink} />
        </div>
      </div>
    </nav>
  );
}
