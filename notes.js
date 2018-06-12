const fs = require('fs');
var fetchNotes = () => {
    try{
        var noteString = fs.readFileSync("notes-data.json");
        return(JSON.parse(noteString));
    }
    catch(e){
        return [];
    }
}
var saveNotes = (notes) => {
    fs.writeFileSync("notes-data.json",JSON.stringify(notes));
}
var addNote = (title,body) => {
    var notes = fetchNotes();
    var note = {
        title,
        body
    }
    var duplicateNotes = notes.filter((note) => note.title === title);
    console.log(duplicateNotes);
    if(duplicateNotes.length === 0){
        notes.push(note);
        saveNotes(notes);
        return note;
    }
}

var getAll = () => {
    var notes = fetchNotes();
    return notes;
}

var getNote = (title) => {
    var notes = fetchNotes();
    var filteredNote = notes.filter((note) => note.title === title);
    return filteredNote[0];
}
var removeNote = (title) => {
    var notes = fetchNotes();
    var filteredNote = notes.filter((note) => note.title !== title);
    saveNotes(filteredNote);
    return notes.length !== filteredNote.length;
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};