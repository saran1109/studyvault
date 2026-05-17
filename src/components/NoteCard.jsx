import { motion } from "framer-motion";

function NoteCard({ note }) {

  return (

    <motion.div
      className="note-card"

      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}

      whileHover={{ scale: 1.03 }}
    >

      <h3>{note.title}</h3>

      <p>
        <b>Subject:</b> {note.subject}
      </p>

      <p>
        <b>Semester:</b> {note.semester}
      </p>

      <p>
        <b>Uploaded By:</b> {note.uploadedBy}
      </p>

      <a
        href={note.link}
        target="_blank"
        rel="noreferrer"
      >
        Open PDF
      </a>

    </motion.div>

  );

}

export default NoteCard;