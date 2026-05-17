import "../styles/login.css";

import {
  signInWithPopup
} from "firebase/auth";

import {
  auth,
  provider
} from "../firebase";

function Login() {

  const handleGoogleLogin = async () => {

    try {

      await signInWithPopup(
        auth,
        provider
      );

      window.location.href =
        "/dashboard";

    } catch (error) {

      console.log(error);

      alert(error.message);

    }

  };

  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-logo">

          SV

        </div>

        <h1>
          StudyVault
        </h1>

        <p>
          Your premium academic resource platform.
          Upload, explore and organize notes smarter than ever.
        </p>

        <button
          className="google-btn"
          onClick={handleGoogleLogin}
        >

          Sign in with Google

        </button>

      </div>

    </div>

  );

}

export default Login;