import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import Logo from "../assets/Logo So.svg";
import Eye from "../assets/eye.svg";
import { globalMessage } from "../services/appState";
import { resetPassword } from "@services/authService";

function ResetSenha() {
  const navigate = useNavigate();
  const { token } = useParams(); // Token extraído da rota
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email"); // Email extraído da query string
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!token || !email) {
    navigate("/login");
    return null;
  }


  function getType() {
    return visible ? "text" : "password";
  }

  function toggleVisible() {
    setVisible(!visible);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const senha = formData.get("senha") as string;
      const confirmaSenha = formData.get("confirmaSenha") as string;

      if (senha !== confirmaSenha) {
        globalMessage("As senhas não coincidem", "error", 5000);
        return;
      }

      const response = await resetPassword(
        token!,
        senha,
        confirmaSenha,
        email!
      );
      if (response.success) {
        globalMessage("Senha alterada com sucesso!", "success", 3000);
        navigate("/login");
      } else {
        globalMessage(response.message || "Erro ao redifinir senha", "error", 5000);
        
      }
    } catch (error) {
      globalMessage("Erro ao redefinir senha", "error", 5000);
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
              Redefinir Senha
            </h3>
            <p>Digite sua nova senha.</p>

            <label htmlFor="senha" className="font-medium">
              Nova Senha
            </label>
            <div className="w-full relative">
              <input
                className="border h-14 rounded-lg w-full px-4"
                type={getType()}
                id="senha"
                name="senha"
                required
                minLength={6}
              />
              <img
                src={Eye}
                className="absolute top-4 right-4 cursor-pointer"
                alt="Mostrar/Ocultar Senha"
                onClick={toggleVisible}
              />
            </div>

            <label htmlFor="confirmaSenha" className="font-medium">
              Confirmar Nova Senha
            </label>
            <div className="w-full relative">
              <input
                className="border h-14 rounded-lg w-full px-4"
                type={getType()}
                id="confirmaSenha"
                name="confirmaSenha"
                required
                minLength={6}
              />
              <img
                src={Eye}
                className="absolute top-4 right-4 cursor-pointer"
                alt="Mostrar/Ocultar Senha"
                onClick={toggleVisible}
              />
            </div>

            <button
              className="w-full px-6 bg-blue-600 text-white font-bold rounded-lg py-4"
              disabled={loading}
            >
              {loading ? "Redefinindo..." : "Redefinir Senha"}
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

export default ResetSenha;
