import Login from "../components/Login";

function Home({ handleLogin }) {

  return (

    <div className="home-page">

      <div className="home-box">

        <h1>StudyVault 🚀</h1>

        <p>
          Share and access student notes easily
        </p>

        <Login handleLogin={handleLogin} />

      </div>

    </div>

  );

}

export default Home;