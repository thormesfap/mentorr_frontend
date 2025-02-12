import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Buscar from "./pages/Buscar";
import RootLayout from './components/layouts/RootLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/buscar" element={<Buscar />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
