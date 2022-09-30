import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Eye from "../../public/icons/eye.svg";
import EyeSlash from "../../public/icons/eye-slash.svg";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch } from "react-redux";
import { connexion } from "../../../../MIROUART/Mirouart-front/frontend/slices/connexionStatusSlice";
import { setClientData } from "../../feature/clientSlice";

export default function LoginFreelance() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const MySwal = withReactContent(Swal);

  const onSubmit = (data) => {
    axios
      .post(`http://localhost:3080/api/user/client/login`, {
        email: data.email,
        password: data.password,
      })
      .then((data) => {
        dispatch(connexion());
        dispatch(
          setClientData({
            token: data.data.data.token,
            email: data.data.data.client.email,
            societyname: data.data.data.client.societyName,
            clientId: data.data.data.client.id,
          })
        );
        router.push("/");
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data.message);
          MySwal.fire({
            title: <p>Problème de connexion</p>,
            text:
              error.response.data.message +
              ", si vous n'êtes pas inscrit veuillez vous inscrire",
            showCloseButton: true,
            confirmButtonText: `
              <a href="/freelance/signup">
                <span className="white">S'inscrire</span>
              </a>
          `,
            confirmButtonColor: "#0b5ed7",
          });
          router.push("/freelance/login");
        }
      });
  };

  return (
    <div className="login-freelance-form">
      <form
        action=""
        className="mx-auto row g-3 col-10 col-md-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input
            required
            type="text"
            className="form-control"
            name="email"
            id="email"
            {...register("email")}
          />
        </div>
        <div className="">
          <label className="form-label">Mot de passe</label>
          <div className="position-relative">
            <input
              required
              type={passwordVisible ? "text" : "password"}
              className="form-control"
              placeholder="Entrez votre mot de passe"
              name="password"
              id="password"
              {...register("password")}
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
        </div>{" "}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            S'inscrire
          </button>
        </div>
      </form>
    </div>
  );
}
