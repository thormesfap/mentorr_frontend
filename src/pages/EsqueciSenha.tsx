import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/Logo So.svg";
import { globalMessage } from "../services/appState";
import { requestPasswordReset } from '@services/authService';

function EsqueciSenha() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const response = await requestPasswordReset(email);
      if (response.success) {
        globalMessage(
          "Link de recuperação enviado para seu e-mail!",
          "success",
          3000
        );
        navigate("/login");
      }

    } catch (error) {
      globalMessage("Erro ao solicitar recuperação de senha", "error", 5000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <div className="flex w-full h-screen">
        <section className="bg-slate-900 hidden md:flex md:w-1/3 items-center justify-center p-12">
          <div className="flex flex-col w-full h-full justify-between">
            <div className="h-5/6 flex items-center justify-center">
              <figure>
                <img src={Logo} alt="Logo Mentorr" />
              </figure>
            </div>
            <div className="flex justify-start">
              <span className="text-white opacity-50">mentorr.com.br</span>
            </div>
          </div>
        </section>
        <section className="md:w-2/3 container md:p-24 p-6">
          <div className="flex flex-col gap-5 text-slate-600">
            <h3 className="font-semibold text-xl text-slate-900">
              Recuperar Senha
            </h3>
            <p>
              Digite seu e-mail para receber um link de recuperação de senha.
            </p>

            <label className="font-medium" htmlFor="email">
              E-mail
            </label>
            <input
              className="border h-14 rounded-lg w-full px-4"
              type="email"
              id="email"
              name="email"
              placeholder="Insira seu e-mail"
              required
            />

            <button
              className="w-full px-6 bg-blue-600 text-white font-bold rounded-lg py-4"
              disabled={loading}
            >
              {loading ? "Enviando..." : "Solicitar Link de Recuperação"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold"
            >
              Voltar para o Login
            </button>
          </div>
        </section>
      </div>
    </form>
  );
}

export default EsqueciSenha;
