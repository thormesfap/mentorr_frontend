import logo from "../../assets/logo-mentorr.svg";

function Header() {
    return (
      <>
        <header className="px-8 md:px-0">
          <div className="container mx-auto flex flex-col md:flex-row py-6 md:py-0 gap-6 md:gap-0 justify-between items-center md:h-24">
            <div>
              <img src={logo} alt="logotipo Mentorr" />
            </div>
            <div className="flex gap-4 md:gap-12 items-center">
              <div className="flex gap-2">
                <a href="/">For Business</a>
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
  
              <button className="bg-blue-600 text-white px-8 py-3 font-semibold rounded-lg">
                Quero ser Mentorr
              </button>
              <a href="/">Login</a>
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
                <a href="/">UX/UI</a>
              </li>
              <li>
                <a href="/">Front-end</a>
              </li>
              <li>
                <a href="/">Back-end</a>
              </li>
              <li>
                <a href="/">DevOps</a>
              </li>
              <li>
                <a href="/">Agile</a>
              </li>
              <li>
                <a href="/">Cloud Computing</a>
              </li>
              <li>
                <a href="/">Inteligência Artificial</a>
              </li>
              <li>
                <a href="/">Segurança da Informação</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
  

  export default Header;