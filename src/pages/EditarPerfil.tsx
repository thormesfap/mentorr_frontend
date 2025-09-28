import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { globalMessage } from "../services/appState";
import { useAppContext } from "../contexts/AppContext";
import { updateMentor } from "../services/mentorService";
import { profile } from "../services/authService";
import { Mentor} from "../interfaces/mentorr-interfaces";

function EditarPerfil() {
  const navigate = useNavigate();
  const { user, setUser } = useAppContext();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"user" | "mentor">("user");

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
    if (!storedUser) {
      navigate("/login");
      return;
    }

    if (!user) {
      setUser(storedUser);
    }

    // Se o usuário for mentor, buscar dados do mentor
    if (storedUser.mentor) {
      setMentor(storedUser.mentor);
    }
  }, [user, navigate, setUser]);

  async function handleUserSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      const name = formData.get("name") as string;
      const result = await profile(name);

      if (result.success) {
        globalMessage("Perfil atualizado com sucesso!", "success", 3000);
        user!.name = name;
        setUser(user);
        sessionStorage.setItem("user", JSON.stringify(user));
      } else {
        globalMessage(
          result.message || "Erro ao atualizar perfil",
          "error",
          5000
        );
      }
    } catch {
      globalMessage("Erro ao atualizar perfil", "error", 5000);
    } finally {
      setLoading(false);
    }
  }

  async function handleMentorSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);

    try {
      if (mentor && mentor.id) {
        const [preco, minutos, quantidade, biografia, curriculo] = [
          parseFloat(formData.get("preco") as string) * 100,
          parseInt(formData.get("minutos") as string),
          parseInt(formData.get("quantidade") as string),
          formData.get("biografia") as string,
          formData.get("curriculo") as string,
        ];

        const result = await updateMentor(
          mentor.id,
          preco,
          minutos,
          quantidade,
          biografia,
          curriculo
        );

        if (result.success) {
          const updatedMentor = {
            ...mentor, preco, minutos, quantidade, biografia, curriculo
          }
          setMentor(updatedMentor);
          user!.mentor = updatedMentor;
          setUser(user);
          sessionStorage.setItem("user", JSON.stringify(user));
          globalMessage(
            "Perfil de mentor atualizado com sucesso!",
            "success",
            3000
          );
        } else {
          globalMessage(
            result.message || "Erro ao atualizar perfil de mentor",
            "error",
            5000
          );
        }
      }
    } catch {
      globalMessage("Erro ao atualizar perfil", "error", 5000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="md:w-2/3 container md:p-24 p-6 mx-auto">
      <div className="flex flex-col gap-5 text-slate-600">
        <div className="flex gap-4 border-b">
          <button
            className={`py-2 px-4 ${
              activeTab === "user"
                ? "border-b-2 border-blue-600 text-blue-600"
                : ""
            }`}
            onClick={() => setActiveTab("user")}
          >
            Dados Pessoais
          </button>
          {user?.mentor && (
            <button
              className={`py-2 px-4 ${
                activeTab === "mentor"
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : ""
              }`}
              onClick={() => setActiveTab("mentor")}
            >
              Dados de Mentor
            </button>
          )}
        </div>

        {activeTab === "user" ? (
          <form method="post" onSubmit={handleUserSubmit}>
            <div className="flex flex-col gap-5">
              <h3 className="font-semibold text-xl text-slate-900">
                Editar Perfil
              </h3>
              <label className="font-medium" htmlFor="name">
                Nome Completo
              </label>
              <input
                className="border h-14 rounded-lg w-full px-4"
                type="text"
                id="name"
                name="name"
                placeholder="Seu nome completo"
                defaultValue={user?.name}
                required
                disabled={loading}
              />

              <button
                className="w-full px-6 bg-blue-600 text-white font-bold rounded-lg py-4 disabled:bg-gray-400"
                disabled={loading}
              >
                {loading ? "Atualizando..." : "Atualizar Dados Pessoais"}
              </button>
            </div>
          </form>
        ) : (
          mentor && (
            <form method="post" onSubmit={handleMentorSubmit}>
              <div className="flex flex-col gap-5">
                <h3 className="font-semibold text-xl text-slate-900">
                  Editar Perfil de Mentor
                </h3>

                <label className="font-medium" htmlFor="preco">
                  Preço
                </label>
                <input
                  className="border h-14 rounded-lg w-full px-4"
                  type="number"
                  id="preco"
                  name="preco"
                  step="0.01"
                  placeholder="Insira o preço"
                    value={mentor.preco || ""}
                    onChange={(e) => setMentor((prev) => prev ? {...prev, preco:parseFloat(e.target.value)} : null)}
                  required
                  disabled={loading}
                />

                <label className="font-medium" htmlFor="minutos">
                  Minutos por Chamada
                </label>
                <input
                  className="border h-14 rounded-lg w-full px-4"
                  type="number"
                  id="minutos"
                  name="minutos"
                  placeholder="Insira os minutos por chamada"
                  defaultValue={mentor.minutosPorChamada}
                  required
                  disabled={loading}
                />

                <label className="font-medium" htmlFor="quantidade">
                  Quantidade de Chamadas
                </label>
                <input
                  className="border h-14 rounded-lg w-full px-4"
                  type="number"
                  id="quantidade"
                  name="quantidade"
                  placeholder="Insira a quantidade de chamadas"
                  defaultValue={mentor.quantidadeChamadas}
                  required
                  disabled={loading}
                />

                <label className="font-medium" htmlFor="biografia">
                  Biografia
                </label>
                <textarea
                  className="border rounded-lg w-full px-4 py-2"
                  id="biografia"
                  placeholder="Insira sua biografia"
                  name="biografia"
                  maxLength={500}
                  defaultValue={mentor.biografia}
                  disabled={loading}
                ></textarea>

                <label className="font-medium" htmlFor="curriculo">
                  Currículo
                </label>
                <textarea
                  className="border rounded-lg w-full px-4 py-2"
                  id="curriculo"
                  placeholder="Insira seu currículo"
                  name="curriculo"
                  maxLength={2000}
                  defaultValue={mentor.curriculo}
                  disabled={loading}
                ></textarea>

                <button
                  className="w-full px-6 bg-blue-600 text-white font-bold rounded-lg py-4 disabled:bg-gray-400"
                  disabled={loading}
                >
                  {loading ? "Atualizando..." : "Atualizar Dados de Mentor"}
                </button>
              </div>
            </form>
          )
        )}
      </div>
    </section>
  );
}

export default EditarPerfil;
