import { BrowserRouter, Routes, Route } from "react-router-dom";
import Showusuarios from './components/Showusuarios';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Showusuarios></Showusuarios>}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
