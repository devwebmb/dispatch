import { React, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import SimpleLogo from "../../public/images/logo-simple-dispatch.png";

export default function PrincipalNavvar() {
  const [navActive, setNavActive] = useState(null);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setNavActive(null);
    });
  }, []);

  return (
    <div className="principal-navbar">
      <nav>
        <div className="left-navbar-container">
          <div className="logo-container">
            <Image src={SimpleLogo} width={100} height={100} />
            <p>Dispatch</p>
          </div>
          <div>
            <Link href="/">
              <a href="">Contactez-nous</a>
            </Link>
          </div>
        </div>
        <div
          className={`${navActive ? "active" : ""} bars-solid`}
          onClick={() => {
            setNavActive(!navActive);
          }}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
        <ul className={`${navActive ? "active" : ""} ul-style`}>
          {navActive ? <hr /> : ""}
          <li>
            <Link href="/">
              <a href="">S'inscrire</a>
            </Link>
          </li>
          {navActive ? <hr /> : ""}
          <li>
            <Link href="/">
              <a href="">Se connecter</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
