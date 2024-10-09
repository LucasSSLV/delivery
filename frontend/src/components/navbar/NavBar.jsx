import style from "./navbar.module.css";
import { LuShoppingCart, LuUserCircle, LuMenu } from "react-icons/lu";
import { useState } from "react";
import { Drawer } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [openMenu, setOpenMenu] = useState(false);

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <nav className={style.navBarContainer}>
      <div className={style.navbarItems}>
        <Link to="/">
          <img className={style.logo} src="../../public/logo.png" alt="" />
        </Link>
        <div className={style.navbarLinksContainer}>
          <Link to="/" className={style.navBarLink}>
            home
          </Link>
          <Link to="/plates" className={style.navBarLink} href="/">
            Pratos
          </Link>
          <Link to="/cart">
            <LuShoppingCart className={style.navBarLink} />
          </Link>
          <Link to="/profile">
            <LuUserCircle className={style.navBarLink} />
          </Link>
        </div>
      </div>
      {/* mobile navbar */}
      <div className={style.mobileNavbarItems}>
        <Link to="/">
          <img className={style.logo} src="../../public/logo.png" alt="" />
        </Link>
        <div className={style.mobileNavbarButtons}>
          <Link to="/cart">
            <LuShoppingCart className={style.navBarLink} />
          </Link>
          <LuMenu className={style.navBarLink} onClick={handleOpenMenu} />
        </div>
      </div>
      {/* mobile drawer com links para pages home/plates/profile */}
      <Drawer anchor="right" open={openMenu} onClose={handleOpenMenu}>
        <div className={style.drawer}>
          <Link to="/" className={style.navBarLink} href="/">
            Home
          </Link>
          <Link to="/plates" className={style.navBarLink} href="/">
            Pratos
          </Link>
          <Link to="/profile" className={style.navBarLink} href="/">
            Profile
          </Link>
        </div>
      </Drawer>
    </nav>
  );
}
