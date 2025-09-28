import { Link } from "react-router-dom";
import { baseUrl } from "../../services/apiService";
import logo from "../../assets/logo-mentorr.svg";
import { logout as performLogout } from "../../services/authService";
import { useEffect, useState } from "react";
import { useAppContext } from "../../contexts/AppContext";
import { toast, ToastContainer } from "react-toastify";
import echo from "../../config/echo";

function Header() {
  const { user, setUser } = useAppContext();
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("jwtToken")
  );
  const storedUser = JSON.parse(sessionStorage.getItem("user") ?? "{}");

  useEffect(() => {
    if (storedUser.id) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, [setUser]);

  useEffect(() => {
    if (storedUser?.mentor?.id) {
      echo
        .channel(`mentor.${storedUser.mentor.id}`)
        .listen("MatriculaAluno", () => {
          toast.info("Novo aluno solicitou mentoria!");
        });
    }
    echo.channel(`aluno.${storedUser.id}`).listen("MentoriaRespondida", () => {
      toast.info("Um mentor respondeu sua solicitação de mentoria")
    });
    return () => {
      if (storedUser?.mentor?.id) {
        echo
          .channel(`mentor.${storedUser.mentor.id}`)
          .stopListening("MatriculaAluno");
        echo.leaveChannel(`mentor.${storedUser.mentor.id}`);
      }
      echo.channel(`aluno.${storedUser.id}`).stopListening("MentoriaRespondida");
      echo.leaveChannel(`aluno.${storedUser.id}`);
    };
  }, [storedUser]);

  function logout() {
    performLogout();
    setIsLoggedIn(false);
  }

  const [menuOpen, setMenuOpen] = useState(false);

  function getButtonLogin() {
    if (!isLoggedIn || !user) {
      return (
        <Link to="/login" className="px-2 py-1 text-center rounded-lg">
          Login
        </Link>
      );
    }

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
      <div className="relative">
        <button onClick={toggleMenu} className="flex items-center gap-2">
          {storedUser && storedUser.fotoPerfil ? (
            <img
              src={baseUrl + storedUser.fotoPerfil}
              alt={storedUser.name}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-slate-500 flex items-center justify-center rounded-full text-xl font-bold text-white">
              {storedUser.name.charAt(0)}
            </div>
          )}
          <svg
            className={`w-5 transform transition-transform ${
              menuOpen ? "rotate-90" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1">
            <Link
              to="/perfil"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Editar Perfil
            </Link>
            <Link
              to="/solicitacoes"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Solicitações de Mentoria
            </Link>
            <Link
              to="/mentorias"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={toggleMenu}
            >
              Minhas Mentorias
            </Link>
            <button
              onClick={() => {
                logout();
                toggleMenu();
              }}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Sair
            </button>
          </div>
        )}
      </div>
    );
  }

  function getMentorButton() {
    if (!isLoggedIn || !storedUser) {
      return (
        <Link
          to="/cadastro"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center"
        >
          Quero ser Mentorr
        </Link>
      );
    }
    if (storedUser && !storedUser.mentor) {
      return (
        <Link
          to="/cadastro_mentor"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center"
        >
          Quero ser Mentorr
        </Link>
      );
    }
    return null;
  }

  return (
    <>
      <header className="px-8 md:px-0">
        <div className="container mx-auto flex flex-col md:flex-row py-6 md:py-0 gap-6 md:gap-0 justify-between items-center md:h-24">
          <div>
            <Link to="/">
              <img src={logo} alt="logotipo Mentorr" />
            </Link>
          </div>
          <div className="flex gap-4 md:gap-12 items-center">
            <div className="flex gap-2">
              <Link to="/">For Business</Link>
              <svg
                className="w-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m19.5 8.25-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            {getMentorButton()}
            {getButtonLogin()}
          </div>
        </div>
      </header>

      <HeaderMenu />
      <ToastContainer />
    </>
  );
}

function HeaderMenu() {
  return (
    <div className="md:border h-14 flex items-center">
      <div className="container mx-auto">
        <nav className="hidden md:block">
          <ul className="flex justify-between">
            <li>
              <Link to="/buscar?search=UX/UI">UX/UI</Link>
            </li>
            <li>
              <Link to="/buscar?search=Frontend">Front-end</Link>
            </li>
            <li>
              <Link to="/buscar?search=Backend">Back-end</Link>
            </li>
            <li>
              <Link to="/buscar?search=DevOps">DevOps</Link>
            </li>
            <li>
              <Link to="/buscar?search=Agile">Agile</Link>
            </li>
            <li>
              <Link to="/buscar?search=Cloud Computing">Cloud Computing</Link>
            </li>
            <li>
              <Link to="/buscar?search=Inteligência Artificial">
                Inteligência Artificial
              </Link>
            </li>
            <li>
              <Link to="/buscar?search=Segurança da Informação">
                Segurança da Informação
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
