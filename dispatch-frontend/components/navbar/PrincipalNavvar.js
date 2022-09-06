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
            <span className="mb-0 white">Dispatch</span>
          </div>
          <div>
            <Link href="/">
              <a href="">
                <span className="white">Contactez-nous</span>
              </a>
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
              <a href="">
                <span className="white">S'inscrire</span>
              </a>
            </Link>
          </li>
          {navActive ? <hr /> : ""}
          <li>
            <Link href="/">
              <a href="">
                <span className="white">Se connecter</span>
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
