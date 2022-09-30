import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Eye from "../../public/icons/eye.svg";
import EyeSlash from "../../public/icons/eye-slash.svg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useRouter } from "next/router";

export default function SignupClient() {
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validationSchema = Yup.object().shape({
    societyname: Yup.string().required(
      "Veuillez entrer le nom de votre entreprise ou votre nom propre."
    ),

    email: Yup.string()
      .email("Veuillez entrer une adresse mail valide")
      .required("Veuillez entrer une adresse email"),
    password: Yup.string()
      .required("Veuillez entrer un mot de passe")
      .matches(/([0-9])/, "Le mot de passe doit contenir un chiffre au moins")
      .matches(
        /[a-z]/,
        "le mot de passe doit comporter une lettre en minuscule"
      )
      .matches(
        /[A-Z]/,
        "le mot de passe doit comporter une lettre en majuscule"
      )
      .matches(
        /[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]/,
        "Le mot de passe doit comporter un caractère spécial"
      )
      .min(8, "Le mot de passe doit comporter 8 caractères minimum")
      .max(50, "Le mot de passe ne doit pas comporter plus de 50 caractères"),
  });

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  const { isSubmitting } = formState;

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:3080/api/user/client/signup`, {
        email: data.email,
        password: password,
        societyName: data.societyname,
        
      })
      .then((data) => {
        console.log(data);
        MySwal.fire({
          title: <p>Félicitations !</p>,
          text: "Vous êtes maintenant inscrit comme client sur la plateforme, veuillez maintenant vous connecter.",
        });
        router.push("/client/login");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.message);
          MySwal.fire({
            title: <p>Adresse email indisponible</p>,
            text: error.response.data.message,
            showCloseButton: true,
            confirmButtonText: `
              <a href="/freelance/login">
                <span className="white">Se connecter</span>
              </a>
          `,
          });
        }
      });
  };

  const passwordHasValidLength = password.length >= 8;
  const passwordHasLowercaseLetter = /[a-z]/.test(password);
  const passwordHasUppercaseLetter = /[A-Z]/.test(password);
  const passwordHasSpecialCharacter =
    /[!@#$%^&*()\\[\]{}\-_+=~`|:;"'<>,./?]/.test(password);
  const passwordHasNumber = /[0-9]/.test(password);

  return (
    <div className="signup-freelance-form">
      <form
        className="row g-3 col-10 col-md-6 mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        {" "}
        <div className="">
          <label className="form-label">Nom d'entreprise (ou nom propre)</label>
          <input
            type="text"
            className="form-control"
            name="lastname"
            id="lastname"
            {...register("societyname")}
          />
          <span className="red">
            {errors.societyname && errors.societyname.message}
          </span>
        </div>
        <div className="">
          <label className="form-label">email</label>
          <input
            type="email"
            className="form-control "
            name="email"
            id="email"
            {...register("email")}
          />{" "}
          <span className="red">{errors.email && errors.email.message}</span>
        </div>
        <div className="">
          <label className="form-label">Mot de passe</label>
          <div className="position-relative">
            <input
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              placeholder="Entrez votre mot de passe"
              name="password"
              id="password"
              {...register("password")}
              onChange={(e) => {
                setPassword(e.currentTarget.value);
              }}
            />

            <a
              className="position-absolute end-0 top-50 translate-middle"
              href=""
              onClick={(e) => {
                e.preventDefault();
                setPasswordVisible((prevState) => !prevState);
              }}
            >
              {passwordVisible ? (
                <Image
                  src={EyeSlash}
                  alt="Icone représentant un oeil barré"
                ></Image>
              ) : (
                <Image src={Eye} alt="Icone représentant un oeil"></Image>
              )}
            </a>
          </div>
          <span className="red">
            {errors.password && errors.password.message}
          </span>
          <div className="form-text">
            <ul>
              <li className={passwordHasUppercaseLetter ? "green" : "red"}>
                Une majuscule
              </li>
              <li className={passwordHasLowercaseLetter ? "green" : "red"}>
                Une minuscule
              </li>
              <li className={passwordHasNumber ? "green" : "red"}>
                Un chiffre
              </li>
              <li className={passwordHasSpecialCharacter ? "green" : "red"}>
                Un caractère spécial
              </li>
              <li className={passwordHasValidLength ? "green" : "red"}>
                8 caractères minimum
              </li>
            </ul>
          </div>
        </div>
        <div className="col-12">
          <button
            disabled={isSubmitting}
            type="submit"
            className="btn btn-primary"
          >
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
}
