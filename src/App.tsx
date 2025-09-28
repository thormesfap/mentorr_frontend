import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@pages/Home.tsx";
import Buscar from "@pages/Buscar.tsx";
import RootLayout from "@components/layouts/RootLayout.tsx";
import Login from "@pages/Login.tsx";
import { AppProvider } from "@contexts/AppContext.tsx";
import Loader from "@components/Loader.tsx";
import Snackbar from "@components/Snackbar.tsx";
import Register from "@pages/Register.tsx";
import CadastroMentor from "@pages/CadastroMentor.tsx";
import PerfilMentor from "@pages/PerfilMentor.tsx";
import EditarPerfil from "@pages/EditarPerfil";
import Solicitacoes from "@pages/Solicitacoes.tsx";
import Mentorias from "@pages/Mentorias.tsx";
import EsqueciSenha from "@pages/EsqueciSenha";
import ResetSenha from "@pages/ResetSenha";

function App() {
  return (
    <AppProvider>
      <Router>
        <Loader />
        <Snackbar />
        <Routes>
          <Route element={<RootLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/buscar" element={<Buscar />} />
            <Route path="cadastro_mentor" element={<CadastroMentor />} />
            <Route path="perfil" element={<EditarPerfil />} />
            <Route path="mentor/:id" element={<PerfilMentor />} />
            <Route path="solicitacoes" element={<Solicitacoes />} />
            <Route path="mentorias" element={<Mentorias />} />
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/esqueci-senha" element={<EsqueciSenha />} />
          <Route path="/password-reset/:token" element={<ResetSenha />} />
          <Route path="/cadastro" element={<Register />}></Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
