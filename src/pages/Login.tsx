import logo from "../assets/Logo So.svg";
import visibility from "../assets/eye.svg";
import google from "../assets/google.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { login } from "../services/authService";
import { globalMessage } from "../services/appState";

function Login() {
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
    const [email, password] = [
      formData.get("email") as string,
      formData.get("password") as string,
    ];
    login(email, password).then((response) => {
      if (response.success) {
        globalMessage("Login efetuado com sucesso!", "success", 3000);
        navigate("/");
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
                <img src={logo} />
              </figure>
            </div>
            <div className="flex justify-start">
              <span className="text-white opacity-50">mentorr.com.br</span>
            </div>
          </div>
        </section>
        <section className="md:w-2/3 container md:p-24 p-6">
          <div className="flex flex-col gap-5 text-slate-600">
            <h3 className="font-semibold text-xl text-slate-900">Log In</h3>
            <div className="flex w-full text-center border-b-2">
              <div className="w-full border-b-4 border-blue-600 text-blue-600 text-xl py-4">
                Sou cliente
              </div>
              <div className="w-full text-xl py-4">Sou mentor</div>
            </div>
            <label className="font-medium" htmlFor="email">
              E-mail
            </label>
            <input
              className="border h-14 rounded-lg w-full px-4"
              type="text"
              id="email"
              placeholder="Insira seu usuário ou e-mail"
              name="email"
            />
            <label htmlFor="senha" className="font-medium">
              Senha
            </label>
            <div className="w-full relative">
              <input
                className="border h-14 rounded-lg w-full px-4 "
                type={getType()}
                id="senha"
                name="password"
              />
              <img
                src={visibility}
                onClick={toggleVisible}
                className="absolute top-4 right-4 cursor-pointer"
                id="visibility"
                alt="Change Visibility"
              />
            </div>
            <button className="w-full px-6 bg-blue-600 text-white font-bold rounded-lg py-4">
              Logar
            </button>
            <div className="flex justify-between items-center">
              <div className="h-[1px] bg-slate-400 w-4/6"></div>
              <div className="text-slate-600 text-center w-1/6">ou</div>
              <div className="h-[1px] bg-slate-400 w-4/6"></div>
            </div>
            <button className="flex justify-center items-center gap-4 border border-slate-300 px-12 py-4 rounded-lg hover:bg-blue-600 group">
              <figure>
                <img src={google} />
              </figure>
              <div className="font-semibold text-slate-600 group-hover:text-white">
                Entrar com o Google
              </div>
            </button>
            <Link
              to="/esqueci-senha"
              className="text-blue-600 font-semibold underline block"
            >
              Esqueci a Senha
            </Link>
            <div className="font-semibold block ">Ainda não tem uma conta?</div>
            <Link
              to="/cadastro"
              className="text-blue-600 font-semibold underline block"
            >
              Cadastre-se
            </Link>
          </div>
        </section>
      </div>
    </form>
  );
}
export default Login;
