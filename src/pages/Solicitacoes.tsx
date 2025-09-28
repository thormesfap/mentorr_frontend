import { useEffect, useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import {
  SolicitacaoMentoria,
  getSolicitacoesUsuario,
  getSolicitacoesMentor,
  responderSolicitacaoMentoria,
} from "../services/solicitacaoMentoriaService";

import { globalMessage } from "@services/appState";

function SolicitacoesPage() {
  const [activeTab, setActiveTab] = useState<"usuario" | "mentor">("usuario");
  const [solicitacoesUsuario, setSolicitacoesUsuario] = useState<
    SolicitacaoMentoria[]
  >([]);
  const [solicitacoesMentor, setSolicitacoesMentor] = useState<
    SolicitacaoMentoria[]
  >([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedSolicitacao, setSelectedSolicitacao] =
    useState<SolicitacaoMentoria | null>(null);
  const [justificativa, setJustificativa] = useState("");
  const { user } = useAppContext();
  const isMentor = user?.mentor !== undefined;

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    const resUsuario = await getSolicitacoesUsuario();
    if (resUsuario.success) {
      setSolicitacoesUsuario(resUsuario.data);
    }

    if (isMentor) {
      const resMentor = await getSolicitacoesMentor();
      if (resMentor.success) {
        setSolicitacoesMentor(resMentor.data);
      }
    }
  };

  const handleResponder = (solicitacao: SolicitacaoMentoria) => {
    setSelectedSolicitacao(solicitacao);
    setShowDialog(true);
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setSelectedSolicitacao(null);
    setJustificativa("");
  };

  const handleConfirmResposta = async (aceita: boolean) => {
    if (!selectedSolicitacao) return;

    if (!aceita && !justificativa.trim()) {
      globalMessage(
        "É necessário informar uma justificativa para não aceitar a solicitação",
        "error",
        5000
      );
      return;
    }

    const response = await responderSolicitacaoMentoria(
      selectedSolicitacao.id!,
      aceita,
      !aceita ? justificativa : undefined
    );

    if (response.success) {
      globalMessage("Solicitação respondida com sucesso!","success", 3000);
      loadData();
    } else {
        globalMessage(response.message || "Erro ao responder solicitação", "error", 5000);
    }
    handleCloseDialog();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Solicitações de Mentoria</h1>

      <div className="flex gap-4 border-b mb-6">
        <button
          className={`py-2 px-4 ${
            activeTab === "usuario"
              ? "border-b-2 border-blue-600 text-blue-600"
              : ""
          }`}
          onClick={() => setActiveTab("usuario")}
        >
          Minhas Solicitações
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
            Solicitações Recebidas
          </button>
        )}
      </div>

      <div>
        {activeTab === "usuario" ? (
          solicitacoesUsuario.length > 0 ? (
            <div className="flex flex-col gap-4">
              {solicitacoesUsuario.map((solicitacao) => (
                <div
                  key={solicitacao.id}
                  className="bg-white shadow-md rounded-lg p-6"
                >
                  <h2 className="text-xl font-bold mb-4">
                    Mentor: {solicitacao.mentor?.user?.name}
                  </h2>
                  <div className="text-gray-600 space-y-2">
                    <p>
                      <span className="font-semibold">Expectativa:</span>{" "}
                      {solicitacao.expectativa}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      {solicitacao.aceita === null
                        ? "Pendente"
                        : solicitacao.aceita
                        ? "Aceita"
                        : "Recusada"}
                    </p>
                    {solicitacao.justificativa && (
                      <p>
                        <span className="font-semibold">Justificativa:</span>{" "}
                        {solicitacao.justificativa}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Você não possui solicitações de mentoria.
            </p>
          )
        ) : (
          isMentor &&
          (solicitacoesMentor.length > 0 ? (
            <div className="flex flex-col gap-4">
              {solicitacoesMentor.map((solicitacao) => (
                <div
                  key={solicitacao.id}
                  className="bg-white shadow-md rounded-lg p-6"
                >
                  <h2 className="text-xl font-bold mb-4">
                    Aluno: {solicitacao.usuario?.name}
                  </h2>
                  <div className="text-gray-600 space-y-2">
                    <p>
                      <span className="font-semibold">Expectativa:</span>{" "}
                      {solicitacao.expectativa}
                    </p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      {solicitacao.aceita === null
                        ? "Pendente"
                        : solicitacao.aceita
                        ? "Aceita"
                        : "Recusada"}
                    </p>
                    {solicitacao.justificativa && (
                      <p>
                        <span className="font-semibold">Justificativa:</span>{" "}
                        {solicitacao.justificativa}
                      </p>
                    )}
                  </div>
                  {solicitacao.aceita === null && (
                    <div className="mt-4">
                      <button
                        onClick={() => handleResponder(solicitacao)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                      >
                        Responder
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">
              Você não possui solicitações de mentoria pendentes.
            </p>
          ))
        )}
      </div>

      {showDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Responder Solicitação</h2>
            <div className="flex flex-col gap-4">
              <textarea
                placeholder="Justificativa (obrigatória em caso de recusa)"
                value={justificativa}
                onChange={(e) => setJustificativa(e.target.value)}
                className="w-full border rounded p-2"
                rows={4}
              />
              <div className="flex gap-4 justify-end">
                <button
                  onClick={handleCloseDialog}
                  className="px-4 py-2 border rounded hover:bg-gray-100"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleConfirmResposta(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Aceitar
                </button>
                <button
                  onClick={() => handleConfirmResposta(false)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Recusar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SolicitacoesPage;
