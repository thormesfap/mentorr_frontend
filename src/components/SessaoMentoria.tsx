import { SessaoMentoria } from "interfaces/mentorr-interfaces";
import Star from "./Star";
import { avaliarSessaoMentoria } from "@services/sessaoMentoriaService";
import { globalMessage } from "@services/appState";

function SessaoMentoriaCard(props: { sessao: SessaoMentoria, usuario: boolean }) {
  async function avaliarSessao(valor: number) {
    const response = await avaliarSessaoMentoria(props.sessao.id!, valor);
    if (response.success) {
      globalMessage("Avaliação registrada com sucesso", "success", 3000);
      props.sessao.avaliacao = valor;
    } else {
      globalMessage(
        response.message || "Não foi possível registrar avaliação",
        "error",
        5000
      );
    }
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div>
        <div>Início:</div>
        <div>{props.sessao.dataHoraInicio?.toLocaleDateString()}</div>
      </div>
      <div>
        <div>Término</div>
        <div>{props.sessao.dataHoraTermino?.toLocaleDateString()}</div>
      </div>
      <div>
        <div>Avaliação</div>
        <div>
          <Star
            rating={props.sessao.avaliacao ?? 0}
            updateable={props.usuario}
            is_small={true}
            mouseClick={avaliarSessao}
          />
        </div>
      </div>
    </div>
  );
}

export default SessaoMentoriaCard;
