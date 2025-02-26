import { Link } from "react-router-dom";
import { baseUrl } from "../../services/apiService";
import logo from "../../assets/logo-mentorr.svg";
import { logout as performLogout } from "../../services/authService";
import { useState } from "react";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("jwtToken")
  );
  const user = JSON.parse(sessionStorage.getItem("user") ?? "{}");

  function logout() {
    performLogout();
    setIsLoggedIn(false);
  }

  function getButtonLogin() {
    if (!isLoggedIn || !user) {
      return (
        <Link
          to="/login"
          className="px-2 py-1 text-center rounded-lg"
        >
          Login
        </Link>
      );
    }
    if (user.foto_perfil) {
      return (
        <>
          <Link to="/perfil">
            <img
              src={baseUrl + user.foto_perfil}
              alt={user.nome}
              className="w-10 h-10 rounded-full"
            />
          </Link>
          <button
            className="text-center rounded-lg"
            onClick={logout}
          >
            Logout
          </button>
        </>
      );
    } else {
      return (
        <Link to="/perfil">
          <div className="w-10 h-10 bg-slate-500 flex items-center justify-center rounded-full text-xl font-bold text-white">
            {user.nome.charAt(0)}
          </div>
        </Link>
      );
    }
  }

  function getMentorButton() {
    if (!isLoggedIn || !user) {
      return (
        <Link
          to="/cadastro"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center justify-center"
        >
          Quero ser Mentorr
        </Link>
      );
    }
    if (user && !user.mentor) {
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
            <img src={logo} alt="logotipo Mentorr" />
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
              <Link to="/">UX/UI</Link>
            </li>
            <li>
              <Link to="/">Front-end</Link>
            </li>
            <li>
              <Link to="/">Back-end</Link>
            </li>
            <li>
              <Link to="/">DevOps</Link>
            </li>
            <li>
              <Link to="/">Agile</Link>
            </li>
            <li>
              <Link to="/">Cloud Computing</Link>
            </li>
            <li>
              <Link to="/">Inteligência Artificial</Link>
            </li>
            <li>
              <Link to="/">Segurança da Informação</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
