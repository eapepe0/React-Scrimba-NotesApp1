import React from "react";

export default function Sidebar(props) {
  const noteElements = props.notes.map((
    note,
    index // mapeamos las notas
  ) => (
    <div key={note.id}>
      <div
        className={`title ${note.id === props.currentNote.id ? "selected-note" : ""}`}
        // si el id es igual al id actual , esta seleccionado cambiamos el css (fondo violeta)
        onClick={() => props.setCurrentNoteId(note.id)}
        //  si clickeamos el id actual sera el id de donde clickeamos
      >
        <h4 className="text-snippet">{note.body.split("\n")[0]}</h4>
        {/* el nombre de la nota 
        Dividimos la string entre el caracter nueva linea \n  y lo usamos como titulo */}

        <button
          className="delete-btn" // Your onClick event handler here
          onClick={(event) => props.deleteNote(event, note.id)}
        >
          <i className="gg-trash trash-icon"></i>
        </button>
      </div>
    </div>
  ));

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          {/* clickeamos en + hacemos una nueva nota */}+
        </button>
      </div>
      {noteElements}
      {/* renderizamos los elementos  */}
    </section>
  );
}
