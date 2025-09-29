import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import {
  getMentoriasUsuario,
  getMentoriasMentor,
} from "../services/mentoriaService";
import { globalMessage } from "../services/appState";
import { Mentoria } from "interfaces/mentorr-interfaces";
import Star from "@components/Star";
import SessaoMentoriaCard from "@components/SessaoMentoria";

function MentoriasPage() {
  const [activeTab, setActiveTab] = useState<"usuario" | "mentor">("usuario");
  const [mentoriasUsuario, setMentoriasUsuario] = useState<Mentoria[]>([]);
  const [mentoriasMentor, setMentoriasMentor] = useState<Mentoria[]>([]);
  const { user } = useAppContext();
  const isMentor = user?.mentor !== undefined;

  const loadData = useCallback(async () => {
    const resUsuario = await getMentoriasUsuario();
    if (resUsuario.success) {
      setMentoriasUsuario(resUsuario.data);
    } else {
      globalMessage(
        resUsuario.message || "Erro ao obter mentorias",
        "error",
        5000
      );
    }

    if (isMentor) {
      const resMentor = await getMentoriasMentor();
      if (resMentor.success) {
        setMentoriasMentor(resMentor.data);
      } else {
        globalMessage(
          resMentor.message || "Erro ao carregar mentorias como mentor",
          "error",
          5000
        );
      }
    }
  }, [isMentor]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, loadData]);

  const renderMentoria = (mentoria: Mentoria) => (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg p-6 gap-8">
      <div key={mentoria.id}>
        <h2 className="text-xl font-bold mb-4">
          {mentoria.usuarioId != user?.id
            ? `Aluno: ${mentoria.usuario?.name}`
            : `Mentor: ${mentoria.mentor?.user?.name}`}
        </h2>
        <div className="text-gray-600 space-y-2">
          <p>
            <span className="font-semibold">Valor:</span>{" "}
            {mentoria.valor.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          <p>
            <span className="font-semibold">Quantidade de Sessões:</span>{" "}
            {mentoria.quantidadeSessoes}
          </p>
          <p>
            <span className="font-semibold">Status:</span>{" "}
            {mentoria.ativa ? "Ativa" : "Encerrada"}
          </p>
          {mentoria.avaliacao && (
            <p>
              <span className="font-semibold">Avaliação:</span>{" "}
              <Star
                rating={mentoria.avaliacao}
                is_small={false}
                updateable={false}
                mouseClick={() => {}}
              />
            </p>
          )}
          {mentoria.dataHoraInicio && (
            <p>
              <span className="font-semibold">Início:</span>{" "}
              {mentoria.dataHoraInicio.toLocaleString("pt-BR")}
            </p>
          )}
          {mentoria.dataHoraTermino && (
            <p>
              <span className="font-semibold">Término:</span>{" "}
              {mentoria.dataHoraTermino.toLocaleString("pt-BR")}
            </p>
          )}
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">Sessões</h2>
        {mentoria.sessoes?.length ?? 0 > 0
          ? mentoria.sessoes?.map((sessao) => (
              <SessaoMentoriaCard
                key={sessao.id}
                sessao={sessao}
                usuario={mentoria.usuarioId == user?.id}
              />
            ))
          : "Nenhuma sessão registrada"}
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Minhas Mentorias</h1>

      <div className="flex gap-4 border-b mb-6">
        <button
          className={`py-2 px-4 ${
            activeTab === "usuario"
              ? "border-b-2 border-blue-600 text-blue-600"
              : ""
          }`}
          onClick={() => setActiveTab("usuario")}
        >
          Mentorias que Participo
        </button>
        {isMentor && (
          <button
            className={`py-2 px-4 ${
              activeTab === "mentor"
                ? "border-b-2 border-blue-600 text-blue-600"
                : ""
            }`}
            onClick={() => setActiveTab("mentor")}
          >
            Mentorias que Ministro
          </button>
        )}
      </div>

      <div>
        {activeTab === "usuario" ? (
          mentoriasUsuario.length > 0 ? (
            <div className="flex flex-col gap-4">
              {mentoriasUsuario.map(renderMentoria)}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Você não possui mentorias ativas.
            </p>
          )
        ) : (
          isMentor &&
          (mentoriasMentor.length > 0 ? (
            <div className="flex flex-col gap-4">
              {mentoriasMentor.map(renderMentoria)}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Você não possui mentorias ativas como mentor.
            </p>
          ))
        )}
      </div>
    </div>
  );
}

export default MentoriasPage;
