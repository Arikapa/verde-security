import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";

function Home() {
  return <h1>Bienvenido al sistema 🔐</h1>;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
