import { useNavigate } from "react-router-dom";
import { globalMessage } from "../services/appState";
import { cadastraMentor } from "../services/mentorService";
function CadastroMentor() {
  const navigate = useNavigate();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const [preco, minutos, quantidade, biografia, curriculo] = [
      parseFloat(formData.get("preco") as string),
      parseInt(formData.get("minutos") as string),
      parseInt(formData.get("quantidade") as string),
      formData.get("biografia") as string,
      formData.get("curriculo") as string,
    ];
    cadastraMentor(preco, minutos, quantidade, biografia, curriculo).then(
      (response) => {
        if (response.success) {
          globalMessage("Registro!", "success", 3000);
          navigate("/buscar");
        } else {
          globalMessage(response.message, "error", 5000);
        }
      }
    );
  }
  return (
    <form method="post" onSubmit={handleSubmit}>
      <section className="md:w-2/3 container md:p-24 p-6 mx-auto">
        <div className="flex flex-col gap-5 text-slate-600">
          <h3 className="font-semibold text-xl text-slate-900">
            Cadastro de Mentor
          </h3>
          <label className="font-medium" htmlFor="preco">
            Preço
          </label>
          <input
            className="border h-14 rounded-lg w-full px-4"
            type="number"
            id="preco"
            name="preco"
            placeholder="Insira o preço"
            required
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
            required
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
            required
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
          ></textarea>
          <button className="w-full px-6 bg-blue-600 text-white font-bold rounded-lg py-4">
            Cadastrar
          </button>
        </div>
      </section>
    </form>
  );
}

export default CadastroMentor;
