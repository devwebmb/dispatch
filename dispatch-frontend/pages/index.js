import PrincipalNavbar from "../components/navbar/PrincipalNavvar";
import Image from "next/image";
import Link from "next/link";
import PrincipalSectionHeader from "../components/home-components/PrincipalSectionHeader";
import HeaderHomeNavbar from "../components/home-components/HeaderHomeNavbar";

export default function Home() {
  return (
    <div className="home-page">
      <PrincipalNavbar />
      <HeaderHomeNavbar />
      <PrincipalSectionHeader />
    </div>
  );
}
