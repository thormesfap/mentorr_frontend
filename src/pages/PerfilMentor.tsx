import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Mentor } from "../interfaces/mentorr-interfaces";
import { getMentor } from "../services/mentorService";
import { baseUrl } from "../services/apiService";
import SkillBadge from "../components/badges/SkillBadge";
import Dollar from "../assets/dollar.svg";
import Chat from "../assets/chat.svg";
import Clock from "../assets/clock.svg";
import Phone from "../assets/phone.svg";
import Headset from "../assets/headset.svg";
import { criarSolicitacaoMentoria } from "../services/solicitacaoMentoriaService";
import { useAppContext } from "../contexts/AppContext";
import { ToastContainer } from "react-toastify";

function PerfilMentor() {
  const { id } = useParams();
  const [mentor, setMentor] = useState<Mentor>();
  const navigate = useNavigate();
  const { user, showMessage } = useAppContext();
  const [alunos, setAlunos] = useState(0);
  const [hasActiveMentoring, setHasActiveMentoring] = useState(false);
  const [localUser, setLocalUser] = useState(
    JSON.parse(sessionStorage.getItem("user") ?? "{}")
  );
  const [openDialog, setOpenDialog] = useState(false);
  const [expectativa, setExpectativa] = useState("");

  //Carregar dados iniciais
  useEffect(() => {
    if (!id) {
      return;
    }
    getMentor(id).then((data) => {
      console.log(data.data);
      setMentor(data.data);
      const countAlunos =
        data?.data?.mentorias?.filter((m) => m.ativa).length ?? 0;
      setAlunos(countAlunos);
    });
  }, [id]);

  //Analisar se mentoria é do usuário
  useEffect(() => {
    if (!mentor) {
      return;
    }
    const currentUser = localUser?.id ? localUser : user;
    if (currentUser?.id) {
      const userHasActiveMentoring = mentor.mentorias?.some(
        (m) => m.ativa && m.usuarioId === currentUser.id
      );
      setHasActiveMentoring(userHasActiveMentoring ?? false);
    }
  }, [mentor, localUser, user]);

  //Verificar se o usuário está logado
  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") ?? "{}");
    if (storedUser?.id) {
      setLocalUser(storedUser);
    }
  }, [user]);

  const handleMatricula = async () => {
    const currentUser = localUser?.id ? localUser : user;
    if (!currentUser?.id) {
      navigate("/login");
      return;
    }
    setOpenDialog(true);
  };

  const handleSubmitSolicitacao = async () => {
    if (!mentor || !expectativa.trim()) return;

    const response = await criarSolicitacaoMentoria(mentor.id!, expectativa);

    if (response.success) {
      showMessage("Solicitação enviada com sucesso!", "success");
      setOpenDialog(false);
      setExpectativa("");
    } else {
      showMessage(response.message || "Erro ao enviar solicitação", "error");
    }
  };

  function getProfilePicture() {
    if (!mentor) {
      return;
    }
    if (mentor.user?.fotoPerfil) {
      return (
        <img
          src={baseUrl + "/storage/" + mentor.user.fotoPerfil}
          className="w-64 h-64 rounded-full"
          alt={mentor.user.name}
        ></img>
      );
    } else {
      return (
        <div className="w-64 h-64 bg-slate-500 flex items-center justify-center rounded-full text-6xl font-bold text-white">
          {mentor.user?.name.charAt(0)}
        </div>
      );
    }
  }

  return (
    mentor && (
      <div className="w-4/5 m-auto">
        <section className="p-4">
          <div className="flex flex-col items-center gap-2">
            <div>{getProfilePicture()}</div>
            <div className="text-2xl font-bold">{mentor?.user?.name}</div>
            <div>
              {mentor?.cargo
                ? `${mentor.cargo.nome} na ${mentor?.empresa?.nome}`
                : ""}
            </div>
          </div>
        </section>
        <hr></hr>
        <section className="flex p-4">
          <div id="esquerda" className="w-3/4 pr-4">
            <div id="cima" className="flex gap-4">
              <div id="perfil" className="w-4/5">
                <div>
                  <h2 className="text-3xl">Perfil</h2>
                  <p className="text-justify">{mentor?.biografia}</p>
                </div>
                <div></div>
              </div>
              <div id="habilidade" className="flex flex-col w-1/5">
                <h2>Habilidades</h2>
                <div>
                  <SkillBadge
                    skills={mentor?.habilidades?.map((h) => h.nome) ?? []}
                    is_small={true}
                  ></SkillBadge>
                </div>
              </div>
            </div>
            <hr></hr>
            <div id="baixo">
              <h2 className="text-3xl">Currículo</h2>
              <div>{mentor?.curriculo}</div>
            </div>
          </div>
          <div id="direita" className="w-1/4 pl-4 flex flex-col gap-4">
            <div className="bg-slate-200 rounded flex flex-col gap-4 p-4">
              <div className="text-center font-semibold text-xl">Plano</div>
              <div className="flex gap-4 items-center">
                <img src={Dollar}></img>
                <span className="text-2xl font-bold">
                  {mentor?.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
                <span>/mês</span>
              </div>
              <div className="font-semibold">Inclui:</div>
              <div className="flex gap-4 items-end">
                <img src={Phone}></img>
                <span className="text-xl font-bold">
                  {mentor?.quantidadeChamadas}
                </span>
                <span>Chamadas</span>
              </div>
              <div className="flex gap-4 items-center">
                <img src={Chat}></img>
                <span>Mensagens Ilimitadas</span>
              </div>
              <div className="flex gap-4 items-center">
                <img src={Clock}></img>
                <span className="text-xl font-bold">
                  {mentor?.minutosPorChamada}
                </span>
                <span>Minutos por chamada</span>
              </div>
              <div className="flex gap-4 items-center">
                <img src={Headset}></img>
                <span>Suporte Completo</span>
              </div>
              <div>Alunos Matriculados: {alunos}</div>
            </div>
            <div>
              {mentor && (
                <button
                  disabled={hasActiveMentoring}
                  className={`px-6 py-3 ${
                    hasActiveMentoring ? "bg-gray-400" : "bg-blue-600"
                  } text-white rounded-lg flex items-center justify-center w-full`}
                  onClick={handleMatricula}
                >
                  {hasActiveMentoring ? "Já é seu Mentor" : "Solicitar Mentoria"}
                </button>
              )}
            </div>
          </div>
        </section>

        {openDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4">Solicitar Mentoria</h2>
              <div className="mb-4">
                <textarea
                  autoFocus
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={4}
                  value={expectativa}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setExpectativa(e.target.value)
                  }
                  placeholder="Descreva o que você espera aprender ou alcançar com esta mentoria..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setOpenDialog(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitSolicitacao}
                  className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Enviar Solicitação
                </button>
              </div>
            </div>
          </div>
        )}

        <ToastContainer />
      </div>
    )
  );
}

export default PerfilMentor;
