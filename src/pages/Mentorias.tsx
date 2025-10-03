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
import { createSessaoMentoria } from "../services/sessaoMentoriaService";

function MentoriasPage() {
  const [activeTab, setActiveTab] = useState<"usuario" | "mentor">("usuario");
  const [mentoriasUsuario, setMentoriasUsuario] = useState<Mentoria[]>([]);
  const [mentoriasMentor, setMentoriasMentor] = useState<Mentoria[]>([]);
  const [showAgendarDialog, setShowAgendarDialog] = useState(false);
  const [selectedMentoria, setSelectedMentoria] = useState<Mentoria | null>(
    null
  );
  const [dataHoraInicio, setDataHoraInicio] = useState("");
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

  const handleAbrirAgendamento = (mentoria: Mentoria) => {
    setSelectedMentoria(mentoria);
    setShowAgendarDialog(true);

    // Define data/hora inicial como agora + 1 hora
    const agora = new Date();
    agora.setHours(agora.getHours() + 1);
    agora.setMinutes(0);
    const dataHoraFormatada = agora.toISOString().slice(0, 16);
    setDataHoraInicio(dataHoraFormatada);
  };

  const handleFecharAgendamento = () => {
    setShowAgendarDialog(false);
    setSelectedMentoria(null);
    setDataHoraInicio("");
  };

  const handleConfirmarAgendamento = async () => {
    if (!selectedMentoria || !dataHoraInicio) {
      globalMessage("Selecione uma data e hora válidas", "error", 3000);
      return;
    }

    // Converte o datetime-local para Date
    const dataInicio = new Date(dataHoraInicio);

    // Valida se a data não é no passado
    if (dataInicio < new Date()) {
      globalMessage("A data deve ser no futuro", "error", 3000);
      return;
    }

    const response = await createSessaoMentoria(
      dataInicio,
      selectedMentoria.id!
    );

    if (response.success) {
      globalMessage("Sessão agendada com sucesso!", "success", 3000);
      loadData(); // Recarrega as mentorias para mostrar a nova sessão
      handleFecharAgendamento();
    } else {
      globalMessage(
        response.message || "Erro ao agendar sessão",
        "error",
        5000
      );
    }
  };

  const renderMentoria = (mentoria: Mentoria) => (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg p-6 gap-8 even:bg-gray-200">
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
          {activeTab == "mentor" && mentoria.ativa ? (
            <div className="mt-4">
              <button onClick={() => handleAbrirAgendamento(mentoria)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                Agendar Nova Sessão
              </button>
            </div>
          ) : null}
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
      {showAgendarDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Agendar Sessão de Mentoria
            </h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Data e Hora de Início
                </label>
                <input
                  type="datetime-local"
                  value={dataHoraInicio}
                  onChange={(e) => setDataHoraInicio(e.target.value)}
                  className="w-full border rounded p-2"
                  min={new Date().toISOString().slice(0, 16)}
                />
              </div>

              <div className="text-sm text-gray-600">
                <p className="font-semibold">Mentoria com:</p>
                <p>{selectedMentoria?.usuario?.name}</p>
              </div>

              <div className="flex gap-4 justify-end mt-4">
                <button
                  onClick={handleFecharAgendamento}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirmarAgendamento}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Confirmar Agendamento
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MentoriasPage;
