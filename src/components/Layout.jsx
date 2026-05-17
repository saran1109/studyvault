import "../styles/layout.css";

import {
  LayoutDashboard,
  Upload,
  BookOpen,
  Sparkles,
  LogOut,
  Bot
} from "lucide-react";

import {
  useNavigate,
  useLocation
} from "react-router-dom";

import {
  signOut
} from "firebase/auth";

import { auth } from "../firebase";

function Layout({ children, user }) {
  console.log(user);

  const navigate = useNavigate();

  const location = useLocation();

  const handleLogout = async () => {

    try {

      await signOut(auth);

      window.location.href = "/";

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="app-layout">

      {/* SIDEBAR */}

      <aside className="sidebar">

        {/* TOP */}

        <div>

          <div
            className="sidebar-logo"
            onClick={() => navigate("/dashboard")}
          >

            <Sparkles size={28} />

            <h1>
              StudyVault
            </h1>

          </div>

          <div className="sidebar-links">

            <button
              className={
                location.pathname === "/dashboard"
                  ? "active"
                  : ""
              }
              onClick={() => navigate("/dashboard")}
            >

              <LayoutDashboard size={20} />

              Dashboard

            </button>

            <button
              className={
                location.pathname === "/upload"
                  ? "active"
                  : ""
              }
              onClick={() => navigate("/upload")}
            >

              <Upload size={20} />

              Upload

            </button>

            <button
              className={
                location.pathname === "/notes"
                  ? "active"
                  : ""
              }
              onClick={() => navigate("/notes")}
            >

              <BookOpen size={20} />

              Notes

            </button>
            <button
  className={
    location.pathname === "/ai"
      ? "active"
      : ""
  }
  onClick={() => navigate("/ai")}
>

  <Bot size={20} />

  AI Assistant

</button>

          </div>

        </div>

        {/* BOTTOM */}

        <div className="sidebar-bottom">

          <div
  className="sidebar-user"
  onClick={() => navigate("/profile")}
>

  <div className="user-avatar">

    {
      user?.photoURL ? (

        <img
          src={user.photoURL}
          alt="profile"
          className="avatar-img"
        />

      ) : (

        <span>

          {
            user?.displayName?.charAt(0)

            || user?.email
              ?.charAt(0)
              .toUpperCase()

            || "S"
          }

        </span>

      )
    }

  </div>

  <div className="user-details">

    <h4>

      {
        user?.displayName

        || user?.email
          ?.split("@")[0]

        || "Student"
      }

    </h4>

    <p>

      {user?.email}

    </p>

  </div>

</div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >

            <LogOut size={18} />

            Logout

          </button>

        </div>

      </aside>

      {/* MAIN */}

      <main className="layout-content">

        {children}

      </main>

    </div>

  );

}

export default Layout;