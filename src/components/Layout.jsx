import "../styles/layout.css";

import {
  LayoutDashboard,
  Upload,
  BookOpen,
  Sparkles,
  LogOut,
  Bot,
  Shield,
  Menu
}
from "lucide-react";

import {
  useNavigate,
  useLocation
}
from "react-router-dom";

import {
  signOut
}
from "firebase/auth";

import {
  useState
}
from "react";

import { auth }
from "../firebase";

function Layout({ children, user }) {

  const navigate =
    useNavigate();

  const location =
    useLocation();

  const [sidebarOpen,
    setSidebarOpen] =
      useState(false);

  const handleLogout =
    async () => {

      try {

        await signOut(auth);

        window.location.href = "/";

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="app-layout">

      {/* MENU BUTTON */}

      <button

        className="menu-btn"

        onClick={() =>
          setSidebarOpen(
            !sidebarOpen
          )
        }
      >

        <Menu size={24} />

      </button>

      {/* SIDEBAR */}

      <aside

        className={`sidebar ${
          sidebarOpen
            ? "open"
            : ""
        }`}
      >

        {/* TOP */}

        <div>

          <div

            className="sidebar-logo"

            onClick={() =>
              navigate("/dashboard")
            }
          >

            <Sparkles size={28} />

            <h1>
              StudyVault
            </h1>

          </div>

          <div className="sidebar-links">

            {/* DASHBOARD */}

            <button

              className={
                location.pathname ===
                "/dashboard"

                  ? "active"

                  : ""
              }

              onClick={() =>
                navigate("/dashboard")
              }
            >

              <LayoutDashboard size={20} />

              Dashboard

            </button>

            {/* UPLOAD */}

            <button

              className={
                location.pathname ===
                "/upload"

                  ? "active"

                  : ""
              }

              onClick={() =>
                navigate("/upload")
              }
            >

              <Upload size={20} />

              Upload

            </button>

            {/* NOTES */}

            <button

              className={
                location.pathname ===
                "/notes"

                  ? "active"

                  : ""
              }

              onClick={() =>
                navigate("/notes")
              }
            >

              <BookOpen size={20} />

              Notes

            </button>

            {/* AI */}

            <button

              className={
                location.pathname ===
                "/ai"

                  ? "active"

                  : ""
              }

              onClick={() =>
                navigate("/ai")
              }
            >

              <Bot size={20} />

              AI Assistant

            </button>

            {/* ADMIN */}

            {

              user?.email ===
              "gollapallisaran74@gmail.com"

              && (

                <button

                  className={
                    location.pathname ===
                    "/admin"

                      ? "active"

                      : ""
                  }

                  onClick={() =>
                    navigate("/admin")
                  }
                >

                  <Shield size={20} />

                  Admin

                </button>

              )

            }

          </div>

        </div>

        {/* BOTTOM */}
{/* BOTTOM */}

<div className="sidebar-bottom">

  {/* CLICKABLE PROFILE CARD */}

  <div

    className="sidebar-user"

    onClick={() => navigate("/profile")}

    style={{ cursor: "pointer" }}

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

              user?.displayName
                ?.charAt(0)
                ?.toUpperCase()

              ||

              user?.email
                ?.charAt(0)
                ?.toUpperCase()

              ||

              "S"

            }

          </span>

        )

      }

    </div>

    <div className="user-details">

      <h4>

        {

          user?.displayName

          ||

          user?.email
            ?.split("@")[0]

          ||

          "Student"

        }

      </h4>

      <p>

        {user?.email}

      </p>

    </div>

  </div>

  {/* LOGOUT */}

  <button

    className="logout-btn"

    onClick={handleLogout}
  >

    <LogOut size={18} />

    Logout

  </button>

</div>

      </aside>

      {/* MAIN CONTENT */}

      <main

        className={`layout-content ${
          sidebarOpen
            ? "shifted"
            : ""
        }`}
      >

        {children}

      </main>

    </div>

  );

}

export default Layout;