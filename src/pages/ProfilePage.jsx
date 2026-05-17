import { useState } from "react";
import {
  updateProfile
} from "firebase/auth";
import Layout from "../components/Layout";

import "../styles/profile.css";

function ProfilePage({

  user,
  notes,
  aiCount

}) {

  const [editing, setEditing] =
    useState(false);

  const [name, setName] =
    useState(

      user?.displayName

      ||

      user?.email
        ?.split("@")[0]

      ||

      ""

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

  /* IMAGE */

  const handleImage = (e) => {

    const file =
      e.target.files[0];

    if (file) {

      const imageURL =
        URL.createObjectURL(file);

      setImage(imageURL);

    }

  };
  const handleSave = async () => {

  try {

    await updateProfile(user, {

      displayName: name,

      photoURL: image

    });

    alert(
      "Profile Updated Successfully ✅"
    );

    setEditing(false);

    window.location.reload();

  } catch (error) {

    console.log(error);

    alert(
      "Failed to update profile ❌"
    );

  }

};

  /* REAL STATS */

  const uploadedNotes =

    notes.filter(

      note =>

        note.uploadedBy ===

        (

          user?.displayName

          ||

          user?.email
            ?.split("@")[0]

        )

    );

  const subjects =

    new Set(

      uploadedNotes.map(
        note => note.subject
      )

    );

  return (

    <Layout user={user}>

      <div className="profile-page">

        <div className="profile-card">

          {/* HEADER */}

          <div className="profile-header">

            <div className="profile-avatar-large">

              {

                image &&
                image.startsWith("http") ? (

                  <img

                    src={image}

                    alt="profile"

                    className="profile-img"

                  />

                ) : (

                  <span>

                    {

                      name?.charAt(0)
                        ?.toUpperCase()

                      ||

                      "S"

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
                      setName(
                        e.target.value
                      )
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
                      setEmail(
                        e.target.value
                      )
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
                      setBio(
                        e.target.value
                      )
                    }

                  />

                </div>
<button

  className="save-btn"

  onClick={handleSave}

>

  Save Changes

</button>

              </div>

            )

          }

          {/* STATS */}

          <div className="profile-stats">

            {/* AI */}

            <div className="stat-box">

              <h2>

                {aiCount}

              </h2>

              <p>
                AI Questions
              </p>

            </div>

            {/* NOTES */}

            <div className="stat-box">

              <h2>

                {
                  uploadedNotes.length
                }

              </h2>

              <p>
                Notes Uploaded
              </p>

            </div>

            {/* SUBJECTS */}

            <div className="stat-box">

              <h2>

                {
                  subjects.size
                }

              </h2>

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