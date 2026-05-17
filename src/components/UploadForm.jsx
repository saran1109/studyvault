import { Upload } from "lucide-react";

function UploadForm({
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

    <div className="upload-section">

      <div className="input-group">

        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <input
          type="text"
          placeholder="Semester"
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
        />

        <input
          type="text"
          placeholder="Google Drive Link"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

       <button
  onClick={() => {

    if (
      !title ||
      !subject ||
      !semester ||
      !link
    ) {

      alert("Please fill all fields 😭");

      return;
    }

    handleUpload({


      title,
      subject,
      semester,
      link

    });

    setTitle("");
    setSubject("");
    setSemester("");
    setLink("");

  }}
>

  Upload Note

</button>

      </div>

    </div>

  );

}

export default UploadForm;