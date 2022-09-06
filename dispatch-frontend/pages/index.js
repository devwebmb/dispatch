import PrincipalNavbar from "../components/navbar/PrincipalNavvar";
import Image from "next/image";
import selectionImage from "../public/images/image-1.png"
import Link from "next/link";

export default function Home() {
  return (
    <div className="home-page">
      <PrincipalNavbar />

      <div className="home-page-header d-flex flex-column justify-content-center">
        <p className="text-center fs-5 col-10 mx-auto col-md-12">
          Trouvez votre freelance ou inscrivez vous facilement sur Dispatch
        </p>
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-sm-between col-10 col-md-8 col-lg-4 col-7  mx-auto my-5">
          <Link href="/addFreelanceProfil">
            <button className="btn bg-freelanceColorLight  white fs-4 mb-4 mb-sm-0">
              Je suis freelance
            </button>
          </Link>
          <Link href="/addClientProfil">
            <button className="btn bg-clientColorLight white fs-4">
              Je suis client
            </button>
          </Link>
        </div>
      </div>
      <div className="home-page-selection">
        <div className="col-12 bg-pink-link">
          <div className="col-sm-10 mx-auto d-flex flex-column flex-xl-row">
            
            <div className="col-xl-6 p-5 ">
              <h3 className="text-center mb-5">
                Une sélection adaptée de freelances pour votre projet
              </h3>
              <h5 className="mb-4 ps-5">Gagnez du temps facilement</h5>
              <p>
                Dispatch vous offre un accès soigneusement préparé de Freelance.
                Vous ne recevrez que des réponses pertinentes pour vos votre
                projet. <br />
                Définissez vos conditions et nous nous occupons du reste.
              </p>
              <h5 className="mb-4 ps-5">
                Votre devis en quelques minutes seulement.
              </h5>
              <p>
                Une fois votre Freelance trouvé, vous obtenez votre contact et
                votre devis en quelques instants pour commencer votre projet
                rapidement.
              </p>
              <h5 className="mb-4 ps-5">Des paiements surs et sécurisés</h5>
              <p>
                Une fois le devis réalisé et le contact avec votre freelance
                créé. Vous ne payez que ce que vous avez estimé. Rien de plus
                rien de moins. <br />
                Votre paiement passe par une plateforme sécurisée et ne se
                débloque pas avant votre validation.
              </p>
              <h5 className="mb-4 ps-5">Une assistance 24h/24</h5>
              <p>
                Vous avez besoin d'aide ou de renseignements ? Notre équipe est
                disponible pour vous répondre à chaque instant.
              </p>
            </div>
            <div
              className="col-xl-6 p-5 pt-0 pt-xl-5 d-flex
            align-items-center justify-content-center"
            >
              <Image src={selectionImage} ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
