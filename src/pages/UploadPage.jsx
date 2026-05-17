import Layout from "../components/Layout";

import "../styles/upload.css";

import {
  UploadCloud,
  FileText,
  ShieldCheck
} from "lucide-react";

import UploadForm from "../components/UploadForm";

function UploadPage({

  user,

  title,
  setTitle,

  subject,
  setSubject,

  semester,
  setSemester,

  link,
  setLink,

  handleUpload

}) {

  return (

    <Layout user={user}>

      <div className="upload-page">

        {/* BACKGROUND GLOWS */}

        <div className="bg-glow glow1"></div>
        <div className="bg-glow glow2"></div>

        {/* LEFT */}

        <div className="upload-left">

          <h1>
            Share Your
            <br />
            Knowledge
            <br />
            With Everyone.
          </h1>

          <p>
            Upload academic resources securely
            and help students learn smarter.
          </p>

          {/* FEATURES */}

          <div className="feature-list">

            <div className="feature-item">

              <UploadCloud size={22} />

              <span>
                Easy Upload System
              </span>

            </div>

            <div className="feature-item">

              <FileText size={22} />

              <span>
                Organized Semester Notes
              </span>

            </div>

            <div className="feature-item">

              <ShieldCheck size={22} />

              <span>
                Secure Cloud Storage
              </span>

            </div>

          </div>

          {/* STATS */}

          <div className="upload-stats">

            <div className="stat-item">

              <h2>5K+</h2>

              <p>Notes Shared</p>

            </div>

            <div className="stat-item">

              <h2>1K+</h2>

              <p>Students</p>

            </div>

            <div className="stat-item">

              <h2>24/7</h2>

              <p>Access</p>

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="upload-right">

          <div className="upload-panel">

            <h2>
              Upload Notes
            </h2>

            <UploadForm
              title={title}
              setTitle={setTitle}

              subject={subject}
              setSubject={setSubject}

              semester={semester}
              setSemester={setSemester}

              link={link}
              setLink={setLink}

              handleUpload={handleUpload}
            />

          </div>

        </div>

      </div>

    </Layout>

  );

}

export default UploadPage;