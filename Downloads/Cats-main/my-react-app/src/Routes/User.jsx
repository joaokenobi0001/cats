import { useContext, useEffect } from "react";
import { useNavigate, Route, Routes, Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; 
import Head from "../Components/Head"; 
import UserHeader from "../Components/UserHeader"; 
import Feed from "./Feed"; 
import NotFound from "./NotFound"; 
import UserPhotoPost from "./UserPhotoPost"; 
import Users from "./Users"; 

function User() {
  const { data } = useContext(UserContext); // Removendo 'userLogout' pois não é necessário aqui
  const navigate = useNavigate();

  useEffect(() => {
    // Redirecionar para login se não houver dados de usuário
    if (!data) {
      navigate('/login');
    }
  }, [data, navigate]);

  if (!data) {
    return <div>Loading...</div>;
  }

  // Se o usuário não for admin, podemos redirecionar para uma página de acesso negado ou home
  if (data.user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <section className="container">
      <Head title="Minha conta" />
      <UserHeader />
      <Routes>
        <Route path="/" element={<Feed user={data.user.id} />} />
        <Route path="postar" element={<UserPhotoPost />} />
        <Route path="usuarios" element={<Users />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </section>
  );
}

export default User;
