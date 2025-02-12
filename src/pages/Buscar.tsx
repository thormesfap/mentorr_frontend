import { useEffect, useState } from "react";
import { getEntity } from "../services/basicEntitiesService";
import { getMentores } from "../services/mentorService";
import { Empresa, Cargo, Area, Mentor } from "../interfaces/mentorr-interfaces";
import CardMentor from '../components/layouts/CardMentor';
import lupa from '../assets/lupa.svg';

function Buscar() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [empresas, setEmpresas] = useState<Empresa[]>([]);
  const [cargos, setCargos] = useState<Cargo[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);

  useEffect(() => {
    getEntity<Empresa>("empresa").then((data) => setEmpresas(data.data ?? []));
    getEntity<Cargo>("cargo").then((data) => setCargos(data.data ?? []));
      getEntity<Area>("area").then((data) => setAreas(data.data ?? []));
      getMentores().then((data) => setMentors(data.data ?? []));
  }, []);

  return (
    <>
      <section>
        <div className="container mx-auto flex flex-col md:flex-row md:gap-16 py-4">
          <div className="flex flex-col md:w-1/3 md:p-0 p-6 gap-10">
            <div className="w-full md:w-full mx-auto relative">
              <input
                className="border h-14 rounded-lg w-full px-4"
                type="text"
                placeholder="Busque por habilidades"
              />
              <img
                src={lupa}
                className="absolute top-1/3 right-4"
                alt="Search Icon"
              />
            </div>
            <div className="w-full relative">
              <label
                htmlFor="conhecimento"
                className="text-slate-800 font-semibold"
              >
                Área do Conhecimento
              </label>
              <input
                className="border h-14 rounded-lg w-full px-4"
                type="text"
                id="conhecimento"
              />
              <img
                src={lupa}
                className="absolute top-10 right-4"
                alt="Search Icon"
              />
            </div>
            <div id="area-container" className="flex flex-col gap-3">
              {areas.map((area) => {
                return (
                  <div className="flex gap-3 items-center" key={area.id}>
                    <input
                      type="checkbox"
                      className="appearance-none w-5 h-5 border rounded border-slate-300"
                    />
                    <span className="text-slate-600">{area.nome}</span>
                  </div>
                );
              })}
            </div>
            <div className="w-full relative">
              <label htmlFor="cargo" className="text-slate-800 font-semibold">
                Cargo
              </label>
              <input
                className="border h-14 rounded-lg w-full px-4"
                type="text"
                id="cargo"
              />
              <img
                src={lupa}
                className="absolute top-10 right-4"
                alt="Search Icon"
              />
            </div>
            <div id="cargo-container" className="flex flex-col gap-3">
              {cargos.map((cargo) => {
                return (
                  <div className="flex gap-3 items-center" key={cargo.id}>
                    <input
                      type="checkbox"
                      className="appearance-none w-5 h-5 border rounded border-slate-300"
                    />
                    <span className="text-slate-600">{cargo.nome}</span>
                  </div>
                );
              })}
            </div>
            <div className="w-full relative">
              <label htmlFor="empresa" className="text-slate-800 font-semibold">
                Empresas
              </label>
              <input
                className="border h-14 rounded-lg w-full px-4"
                type="text"
                id="empresa"
              />
              <img
                src={lupa}
                className="absolute top-10 right-4"
                alt="Search Icon"
              />
            </div>
            <div id="empresa-container" className="flex flex-col gap-3">
              {empresas.map((empresa) => {
                return (
                  <div className="flex gap-3 items-center" key={empresa.id}>
                    <input
                      type="checkbox"
                      className="appearance-none w-5 h-5 border rounded border-slate-300"
                    />
                    <span className="text-slate-600">{empresa.nome}</span>
                  </div>
                );
              })}
            </div>
          </div>
                  <div id="mentor-container" className="flex flex-col md:w-2/3 gap-6">
                      {mentors.map((mentor) => <CardMentor key={mentor.id!} mentor={mentor} />)}</div>
        </div>
      </section>
    </>
  );
}

export default Buscar;
