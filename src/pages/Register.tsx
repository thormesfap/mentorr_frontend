import { useState } from "react";
import Logo from "../assets/Logo So.svg";
import Eye from "../assets/eye.svg";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { globalMessage } from "../services/appState";

function Register() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  function getType() {
    if (visible) {
      return "text";
    }
    return "password";
  }
  function toggleVisible() {
    setVisible(!visible);
  }
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const [name, email, password] = [
      formData.get("name") as string,
      formData.get("email") as string,
      formData.get("senha") as string,
    ];
    register(email, password, name).then((response) => {
      if (response.success) {
        globalMessage("Registro!", "success", 3000);
        navigate("/login");
      } else {
        globalMessage(response.message, "error", 5000);
      }
    });
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className="flex w-full h-screen">
        <section className="bg-slate-900 hidden md:flex md:w-1/3 items-center justify-center p-12">
          <div className="flex flex-col w-full h-full justify-between">
            <div className="h-5/6 flex items-center justify-center">
              <figure>
                <img src={Logo} />
              </figure>
            </div>
            <div className="flex justify-start">
              <span className="text-white opacity-50">mentorr.com.br</span>
            </div>
          </div>
        </section>
        <section className="md:w-2/3 container md:p-24 p-6">
          <div className="flex flex-col gap-5 text-slate-600">
            <h3 className="font-semibold text-xl text-slate-900">Registrar</h3>
            <label className="font-medium" htmlFor="name">
              Nome Completo
            </label>
            <input
              className="border h-14 rounded-lg w-full px-4"
              type="text"
              id="name"
              placeholder="Insira seu nome completo"
              name="name"
            />
            <label className="font-medium" htmlFor="email">
              E-mail
            </label>
            <input
              className="border h-14 rounded-lg w-full px-4"
              type="text"
              id="email"
              name="email"
              placeholder="Insira seu e-mail"
            />
            <label htmlFor="senha" className="font-medium">
              Senha
            </label>
            <div className="w-full relative">
              <input
                className="border h-14 rounded-lg w-full px-4 "
                type={getType()}
                id="senha"
                name="senha"
              />
              <img
                src={Eye}
                className="absolute top-4 right-4 cursor-pointer"
                id="visibility"
                alt="Change Visibility"
                onClick={toggleVisible}
              />
            </div>
            <button className="w-full px-6 bg-blue-600 text-white font-bold rounded-lg py-4">
              Registrar
            </button>
            <div className="flex justify-between items-center">
              <div className="h-[1px] bg-slate-400 w-4/6"></div>
              <div className="text-slate-600 text-center w-1/6">ou</div>
              <div className="h-[1px] bg-slate-400 w-4/6"></div>
            </div>
            <div className="font-semibold block ">Já tem uma conta?</div>
            <Link
              to="/login"
              className="text-blue-600 font-semibold underline block"
            >
              Faça login
            </Link>
          </div>
        </section>
      </div>
    </form>
  );
}

export default Register;
