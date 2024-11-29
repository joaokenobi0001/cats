import React from 'react';
import LoginCreate from './LoginCreate'; // Importa o componente já criado

function Cadastro() {
  return (
    <div className="container">
      <header className="header">
        <h1>Bem-vindo ao Cadastro</h1>
      </header>
      <main>
        {/* Chama o componente LoginCreate */}
        <LoginCreate />
      </main>
      <footer className="footer">
        <p>© 2024 Cats.</p>
      </footer>
    </div>
  );
}

export default Cadastro;
