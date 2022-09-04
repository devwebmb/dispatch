import PrincipalNavbar from "../components/navbar/PrincipalNavvar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="accueil-page">
      <PrincipalNavbar />
      <div>
        <p>Trouvez votre freelance ou inscrivez vous facilement sur Dispatch</p>
      </div>
    </div>
  );
}
