import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer';
import Header from './Components/Header';
import { UserProvider } from './context/UserContext'; // Corrigido para UserProvider
import './index.css';
import Ajude from './Routes/AjudeOsAnimais';
import Home from './Routes/Home';
import Login from './Routes/Login';
import Cadastro from './Routes/Cadastro/Cadastro'; // Importando Cadastro
import NotFound from './Routes/NotFound';
import ProtectedRoute from './Routes/ProtectedRoute';
import User from './Routes/User';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <UserProvider> {/* Usando UserProvider */}
          <Header />
          <main className='App-body'>
            <Routes>
              {/* Página inicial */}
              <Route path="/" element={<Home />} />
              {/* Página Ajude os Animais */}
              <Route path="doe" element={<Ajude />} />
              {/* Página Login */}
              <Route path="login/*" element={<Login />} />
              {/* Página Cadastro */}
              <Route path="cadastro" element={<Cadastro />} /> {/* Adicionando a rota de Cadastro */}
              {/* Página Conta - Protegida */}
              <Route
                path="conta/*"
                element={
                  <ProtectedRoute>
                    <User />
                  </ProtectedRoute>
                }
              />
              {/* Página Not Found para rotas não encontradas */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </UserProvider> {/* Envolvendo a aplicação com UserProvider */}
      </BrowserRouter>
    </div>
  );
}

export default App;
