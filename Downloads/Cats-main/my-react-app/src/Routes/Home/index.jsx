import Head from '../../Components/Head';
import FeedHome from '../FeedHome';
import './style.css';

function Home() {
  return (
    <section className="StyledHome container main-container">
      <Head title="Fotos" description="Home da rede social cats, com o feed de fotos." />
      <FeedHome />
    </section>
  );
}

export default Home;
