import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { MdEdit } from "react-icons/md";
import { useAuth } from "../../providers/authProvider";
import { useScroll } from "../../providers/scrollProvider";

const Note = ({ note, patchNote }) => {
  const { backendUser } = useAuth();
  const { scrollData } = useScroll();
  const [isOwner, setIsOwner] = useState(false);
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };
  useEffect(() => {
    setIsOwner(
      backendUser && scrollData && backendUser._id === scrollData.owner
    );
  }, [backendUser, scrollData]);

  const [name, setName] = useState(note.name);
  const [content, setContent] = useState(note.content || "");
  const [save, setSave] = useState(false);
  const handleContentSubmit = async () => {
    if (isOwner && patchNote) {
      await patchNote(note._id, { content: content });
    }
    setSave(false);
  };
  const handleChange = (e) => {
    setSave(true);
    setContent(e);
  };
  const handleNameSubmit = async () => {
    if (isOwner && patchNote) {
      await patchNote(note._id, { name: name });
    }
  };
  const handleName = (e) => {
    setName(e.target.innerText);
  };
  return (
    <div className="notes__currentnote">
      <h1
        className="notes__cureentheading"
        contentEditable={isOwner}
        onInput={handleName}
        onBlur={handleNameSubmit}
        style={{ outlineWidth: "0px" }}
      >
        {name}
        <span style={{ marginLeft: "5%", cursor: "pointer" }}>
          {" "}
          {isOwner && <MdEdit onClick={() => setSave(true)} size="24px" />}
        </span>
      </h1>
      <ReactQuill
        modules={modules}
        theme="bubble"
        className="notes__body"
        value={content}
        onChange={handleChange}
        readOnly={!save}
      />
      <div className="notes__footer">
        <div className="notes__time">{note.start_time}s</div>
        {save ? (
          <div onClick={handleContentSubmit} className="notes__save">
            SAVE
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Note;
