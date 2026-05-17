import { useState } from "react";

import Layout from "../components/Layout";

import "../styles/profile.css";

function ProfilePage({ user }) {

  const [editing, setEditing] =
    useState(false);

  const [name, setName] =
    useState(
      user?.displayName
      || user?.email?.split("@")[0]
      || ""
    );

  const [email, setEmail] =
    useState(
      user?.email || ""
    );

  const [bio, setBio] =
    useState(
      "Passionate student using StudyVault 🚀"
    );

 const [image, setImage] =
  useState(
    user?.photoURL &&
    user.photoURL !== "null"
      ? user.photoURL
      : ""
  );

  const handleImage = (e) => {

    const file =
      e.target.files[0];

    if (file) {

      const imageURL =
        URL.createObjectURL(file);

      setImage(imageURL);

    }

  };

  return (

    <Layout user={user}>

      <div className="profile-page">

        <div className="profile-card">

          {/* HEADER */}

          <div className="profile-header">

            <div className="profile-avatar-large">

             {
  image &&
  image !== "" ? (

    <img
      src={image}
      alt="profile"
      className="profile-img"
      onError={(e) => {

        e.target.style.display = "none";

      }}
    />

  ) : (

    <span>

      {
        name?.charAt(0)
          ?.toUpperCase()
          || "S"
      }

    </span>

  )
}

            </div>

            <div className="profile-header-info">

              <h1>
                {name}
              </h1>

              <p>
                {email}
              </p>

            </div>

            <button
              className="edit-btn"
              onClick={() =>
                setEditing(!editing)
              }
            >

              {
                editing
                  ? "Cancel"
                  : "Edit Profile"
              }

            </button>

          </div>

          {/* ABOUT */}

          <div className="profile-about">

            <h3>
              About
            </h3>

            <p>
              {bio}
            </p>

          </div>

          {/* EDIT FORM */}

          {

            editing && (

              <div className="profile-form">

                <div className="form-group">

                  <label>
                    Profile Picture
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImage}
                  />

                </div>

                <div className="form-group">

                  <label>
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) =>
                      setName(e.target.value)
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    Email
                  </label>

                  <input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                  />

                </div>

                <div className="form-group">

                  <label>
                    About You
                  </label>

                  <textarea
                    value={bio}
                    onChange={(e) =>
                      setBio(e.target.value)
                    }
                  />

                </div>

                <button className="save-btn">

                  Save Changes

                </button>

              </div>

            )

          }

          {/* STATS */}

          <div className="profile-stats">

            <div className="stat-box">

              <h2>

                {
                  Number(
                    localStorage.getItem("aiCount")
                  ) || 0
                }

              </h2>

              <p>
                AI Questions
              </p>

            </div>

            <div className="stat-box">

              <h2>12</h2>

              <p>
                Notes Uploaded
              </p>

            </div>

            <div className="stat-box">

              <h2>5</h2>

              <p>
                Subjects
              </p>

            </div>

          </div>

        </div>

      </div>

    </Layout>

  );

}

export default ProfilePage;