import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import { data } from "./data";
import Split from "react-split";
import { nanoid } from "nanoid";

export default function App() {
  const [notes, setNotes] = React.useState(() => JSON.parse(localStorage.getItem("notes")) || []);
  // se inicializa las notas con un arrow function asi no busca en el localStorage cada vez que se re-renderiza el componente
  //incializamos las notas sino existen creamos uno vacio
  // guardamos las notas en const useState vacia
  const [currentNoteId, setCurrentNoteId] = React.useState((notes[0] && notes[0].id) || "");
  // const useState , donde esta el id de la nota si existe notes[0] && notes[0].id es el current noteId O vacio
  // esta vacio cuando recien arranca cuando le damos a crear nueva nota genera un id nuevo ,
  React.useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    // aca podemos ir probando funciones cada vez que se modifican las notas
  }, [notes]); // cada vez que se modifican las notas , se crea un item llamado notes
  // ese notes se crea un json
  function createNewNote() {
    // funcion que crea una nueva nota
    const newNote = {
      // nueva nota
      id: nanoid(), // generamos un id
      body: "# Type your markdown note's title here" // cuerpo por defecto
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]); // agregamos la nota nueva en notas
    setCurrentNoteId(newNote.id); // cambiamos el id actual por el id nuevo generado
  }

  function updateNote(text) {
    setNotes((oldNotes) => {
      const newArray = []; // creamos array vacio
      for (let i = 0; i < oldNotes.length; i++) {
        // recorremos
        const oldNote = oldNotes[i]; // el item donde estamos se llama oldNote
        if (oldNote.id === currentNoteId) {
          // si el id de donde estamos es igual a donde estamos
          newArray.unshift({ ...oldNote, body: text }); //agrega un elemento al inicio del array
        } else {
          // de lo contrario
          newArray.push(oldNote); // ponemos al final
        }
      }
      return newArray;
    });
  }

  function findCurrentNote() {
    return (
      notes.find((note) => {
        // buscamos en notas la nota
        return note.id === currentNoteId; // si la nota.id es igual al id actual
      }) || notes[0]
    );
  }

  function deleteNote(event, noteId) {
    event.stopPropagation();
    setNotes((oldNotes) => oldNotes.filter((note) => note.id !== noteId));
    // buscamos el oldNotes, filtramos en cada nota individual , si el id no es igual al que queremos borrar, devuelve verdadero
    // lo cual sigue existiendo en el array
  }
  return (
    <main>
      {/* si notas es mayor a 0 renderizamos los componentes*/}
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={notes}
            currentNote={findCurrentNote()}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          {currentNoteId && notes.length > 0 && (
            <Editor currentNote={findCurrentNote()} updateNote={updateNote} />
          )}
        </Split>
      ) : (
        /* de lo contrario mostramos el cartel no hay notas */
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
