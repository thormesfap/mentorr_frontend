import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Buscar from "./pages/Buscar";
import RootLayout from "./components/layouts/RootLayout";
import Login from "./pages/Login";
import { AppProvider } from "./contexts/AppContext";
import Loader from "./components/Loader";
import Snackbar from "./components/Snackbar";
import Register from "./pages/Register";
import CadastroMentor from "./pages/CadastroMentor";

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
          </Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/cadastro" element={<Register />}></Route>
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
