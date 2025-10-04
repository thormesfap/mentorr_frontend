import { useState, useEffect } from "react";

import {
  setMentorCargo,
  setMentorEmpresa,
  setMentorHabilidades,
} from "@services/mentorService";
import { globalMessage } from "@services/appState";
import { Cargo, Empresa, Habilidade, Mentor } from 'interfaces/mentorr-interfaces';
import { getEntity, searchEntity } from '@services/basicEntitiesService';

interface DadosProfissionaisMentorProps {
  mentor: Mentor;
  onUpdate: () => void;
}

function DadosProfissionaisMentor({
  mentor,
  onUpdate,
}: DadosProfissionaisMentorProps) {
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [habilidades, setHabilidades] = useState<Habilidade[]>([]);
  const [selectedCargo, setSelectedCargo] = useState<number | undefined>(
    mentor.cargo?.id
  );
  const [selectedEmpresa, setSelectedEmpresa] = useState<number | undefined>(
    mentor.empresa?.id
  );
  const [selectedHabilidades, setSelectedHabilidades] = useState<number[]>(
    mentor.habilidades?.map((h:Habilidade) => h.id!).filter((id:number) => id !== undefined) || []
  );
  const [cargoSearch, setCargoSearch] = useState("");
  const [empresaSearch, setEmpresaSearch] = useState("");
  const [habilidadeSearch, setHabilidadeSearch] = useState("");

  useEffect(() => {
    loadCargos();
    loadEmpresas();
    loadHabilidades();
  }, []);

  async function loadCargos(search = "") {
    if (search) {
      const response = await searchEntity<Cargo>("cargo", search);
      if (response.success && response.data) {
        setCargos(response.data);
      }
    } else {
      const response = await getEntity<Cargo>("cargo");
      if (response.success && response.data) {
        setCargos(response.data);
      }
    }
  }

  async function loadEmpresas(search = "") {
    if (search) {
      const response = await searchEntity<Empresa>("empresa", search);
      if (response.success && response.data) {
        setEmpresas(response.data);
      }
    } else {
      const response = await getEntity<Empresa>("empresa");
      if (response.success && response.data) {
        setEmpresas(response.data);
      }
    }
  }

  async function loadHabilidades(search = "") {
    if (search) {
      const response = await searchEntity<Habilidade>("habilidade", search);
      if (response.success && response.data) {
        setHabilidades(response.data);
      }
    } else {
      const response = await getEntity<Habilidade>("habilidade");
      if (response.success && response.data) {
        setHabilidades(response.data);
      }
    }
  }

  async function handleCargoSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedCargo) {
      globalMessage("Selecione um cargo", "error", 3000);
      return;
    }
    const response = await setMentorCargo(selectedCargo);
    if (response.success) {
      globalMessage("Cargo atualizado com sucesso!", "success", 3000);
      onUpdate();
    } else {
      globalMessage(
        response.message || "Erro ao atualizar cargo",
        "error",
        5000
      );
    }
  }

  async function handleEmpresaSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedEmpresa) {
      globalMessage("Selecione uma empresa", "error", 3000);
      return;
    }
    const response = await setMentorEmpresa(selectedEmpresa);
    if (response.success) {
      globalMessage("Empresa atualizada com sucesso!", "success", 3000);
      onUpdate();
    } else {
      globalMessage(
        response.message || "Erro ao atualizar empresa",
        "error",
        5000
      );
    }
  }

  async function handleHabilidadesSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!mentor.id) {
      globalMessage("ID do mentor não encontrado", "error", 3000);
      return;
    }
    const response = await setMentorHabilidades(mentor.id, selectedHabilidades);
    if (response.success) {
      globalMessage("Habilidades atualizadas com sucesso!", "success", 3000);
      onUpdate();
    } else {
      globalMessage(
        response.message || "Erro ao atualizar habilidades",
        "error",
        5000
      );
    }
  }

  function handleHabilidadeToggle(id: number) {
    setSelectedHabilidades((prev) => {
      if (prev.includes(id)) {
        return prev.filter((hId) => hId !== id);
      } else {
        return [...prev, id];
      }
    });
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Formulário de Cargo */}
      <form
        onSubmit={handleCargoSubmit}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <h4 className="font-semibold text-lg text-slate-900 mb-4">Cargo</h4>
        <div className="flex flex-col gap-4">
          <div>
            <label
              className="font-medium text-slate-600 block mb-2"
              htmlFor="cargo-search"
            >
              Buscar Cargo
            </label>
            <input
              type="text"
              id="cargo-search"
              className="border h-10 rounded-lg w-full px-4 mb-2"
              placeholder="Digite para buscar..."
              value={cargoSearch}
              onChange={(e) => {
                setCargoSearch(e.target.value);
                loadCargos(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              className="font-medium text-slate-600 block mb-2"
              htmlFor="cargo"
            >
              Selecione o Cargo
            </label>
            <select
              id="cargo"
              className="border h-14 rounded-lg w-full px-4"
              value={selectedCargo || ""}
              onChange={(e) => setSelectedCargo(Number(e.target.value))}
            >
              <option value="">Selecione um cargo</option>
              {cargos.map((cargo) => (
                <option key={cargo.id} value={cargo.id}>
                  {cargo.nome}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-6 bg-blue-600 text-white font-bold rounded-lg py-3 hover:bg-blue-700 transition"
          >
            Salvar Cargo
          </button>
        </div>
      </form>

      {/* Formulário de Empresa */}
      <form
        onSubmit={handleEmpresaSubmit}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <h4 className="font-semibold text-lg text-slate-900 mb-4">Empresa</h4>
        <div className="flex flex-col gap-4">
          <div>
            <label
              className="font-medium text-slate-600 block mb-2"
              htmlFor="empresa-search"
            >
              Buscar Empresa
            </label>
            <input
              type="text"
              id="empresa-search"
              className="border h-10 rounded-lg w-full px-4 mb-2"
              placeholder="Digite para buscar..."
              value={empresaSearch}
              onChange={(e) => {
                setEmpresaSearch(e.target.value);
                loadEmpresas(e.target.value);
              }}
            />
          </div>
          <div>
            <label
              className="font-medium text-slate-600 block mb-2"
              htmlFor="empresa"
            >
              Selecione a Empresa
            </label>
            <select
              id="empresa"
              className="border h-14 rounded-lg w-full px-4"
              value={selectedEmpresa || ""}
              onChange={(e) => setSelectedEmpresa(Number(e.target.value))}
            >
              <option value="">Selecione uma empresa</option>
              {empresas.map((empresa) => (
                <option key={empresa.id} value={empresa.id}>
                  {empresa.nome}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-6 bg-blue-600 text-white font-bold rounded-lg py-3 hover:bg-blue-700 transition"
          >
            Salvar Empresa
          </button>
        </div>
      </form>

      {/* Formulário de Habilidades */}
      <form
        onSubmit={handleHabilidadesSubmit}
        className="bg-white p-6 rounded-lg shadow-sm border"
      >
        <h4 className="font-semibold text-lg text-slate-900 mb-4">
          Habilidades
        </h4>
        <div className="flex flex-col gap-4">
          <div>
            <label
              className="font-medium text-slate-600 block mb-2"
              htmlFor="habilidade-search"
            >
              Buscar Habilidade
            </label>
            <input
              type="text"
              id="habilidade-search"
              className="border h-10 rounded-lg w-full px-4 mb-2"
              placeholder="Digite para buscar..."
              value={habilidadeSearch}
              onChange={(e) => {
                setHabilidadeSearch(e.target.value);
                loadHabilidades(e.target.value);
              }}
            />
          </div>
          <div className="max-h-96 overflow-y-auto border rounded-lg p-4">
            {habilidades.length === 0 ? (
              <p className="text-slate-500 text-center py-4">
                Nenhuma habilidade encontrada
              </p>
            ) : (
              <div className="flex flex-col gap-3">
                {habilidades.map((habilidade) => (
                  <label
                    key={habilidade.id}
                    className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      className="w-5 h-5 text-blue-600"
                      checked={selectedHabilidades.includes(habilidade.id!)}
                      onChange={() => handleHabilidadeToggle(habilidade.id!)}
                    />
                    <span className="text-slate-700">
                      {habilidade.nome}
                      {habilidade.area && (
                        <span className="text-slate-500 text-sm ml-2">
                          ({habilidade.area.nome})
                        </span>
                      )}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
          <div className="text-sm text-slate-600">
            Selecionadas: {selectedHabilidades.length} habilidade(s)
          </div>
          <button
            type="submit"
            className="w-full px-6 bg-blue-600 text-white font-bold rounded-lg py-3 hover:bg-blue-700 transition"
          >
            Salvar Habilidades
          </button>
        </div>
      </form>
    </div>
  );
}

export default DadosProfissionaisMentor;
