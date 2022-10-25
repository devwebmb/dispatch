import Image from "next/image";
import React from "react";
import RedBackground from "../../public/images/design-page-accueil/Fichier4.png";
import Design from "../../public/images/design-page-accueil/Fichier1.png";
import ProfilPhoto from "../../public/images/design-page-accueil/deagreez190500567.jpg";

export default function PrincipalSectionHeader() {
  return (
    <div className="principal-section-home position-relative">
      <div className="position-absolute design end-0 z-index-30 d-none d-xl-block ">
        <Image src={Design} height={800} />
      </div>


      <div className="first-part col-12 d-flex">
        <div className="col-xl-6   p-5 white helvetica-regular blue-part-content">
          <h3 className="text-center mb-5">
            Une sélection adaptée de freelances pour votre projet
          </h3>
          <h5 className="mb-4 ps-5">Gagnez du temps facilement</h5>
          <p>
            Dispatch vous offre un accès soigneusement préparé de Freelance.
            Vous ne recevrez que des réponses pertinentes pour vos votre projet.{" "}
            <br />
            Définissez vos conditions et nous nous occupons du reste.
          </p>
          <h5 className="mb-4 ps-5">
            Votre devis en quelques minutes seulement.
          </h5>
          <p>
            Une fois votre Freelance trouvé, vous obtenez votre contact et votre
            devis en quelques instants pour commencer votre projet rapidement.
          </p>
          <h5 className="mb-4 ps-5">Des paiements surs et sécurisés</h5>
          <p>
            Une fois le devis réalisé et le contact avec votre freelance créé.
            Vous ne payez que ce que vous avez estimé. Rien de plus rien de
            moins. <br />
            Votre paiement passe par une plateforme sécurisée et ne se débloque
            pas avant votre validation.
          </p>
          <h5 className="mb-4 ps-5">Une assistance 24h/24</h5>
          <p>
            Vous avez besoin d'aide ou de renseignements ? Notre équipe est
            disponible pour vous répondre à chaque instant.
          </p>
        </div>
      </div>

      <div className="second-part col-12 position-relative d-flex flex-column flex-xl-row">
        <div className="col-12 position-absolute red-background-position">
          <Image
            src={RedBackground}
            width={3000}
            height={865}
            layout="responsive"
          />
        </div>
        <div className="col-xl-6 p-5">
          <div className="col-8 mx-auto d-flex align-items-center ">
            <Image src={ProfilPhoto}></Image>
          </div>
        </div>
        <div className="col-xl-6 white z-index-30 d-flex align-items-end px-5 pb-xl-5">
          <p className="col-xl-8 mx-auto helvetica-regular">
            "Ayant connu les deux situations tels que Freelance et prestataire
            de projet : Dispatch cherche à concilier les deux parties en offrant
            pour le client la meilleure sélection possible selon ses propres
            critères. "
          </p>
        </div>
      </div>
    </div>
  );
}
