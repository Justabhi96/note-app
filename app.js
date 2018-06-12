const fs = require('fs');
const os = require('os');
const _ = require('lodash');
//yargs is a cool library for parsing the command line arguments in a useful manner
const yargs = require('yargs');

const notes = require('./notes');
//this is title options for the help command
const title = {
    describe: 'title of note',
    demand: true,
    alias: 't'
}
//this is body options for the --help command of add
const body = {
    describe: 'body of note',
    demand: true,
    alias: 'b'
}
//here we are setting the help options while running the "app.js --help" command
//using the .command method and .help method
var argv = yargs
    .command('add', 'add a new note', {
        title,
        body 
    })
    .command('list','list all notes')
    .command('read','read a note with specific title',{
        title
    })
    .command('remove','remove a note with specific title',{
        title
    })
    .help()
    .argv;
var command = argv._[0];
if(command==='add'){
    var note = notes.addNote(argv.title, argv.body);
    note==undefined ? console.log("Failed: Title taken already") : console.log("Title created");
}else if(command==='list'){
    var allNotes = notes.getAll();
    console.log("printing "+ allNotes.length+ " notes(s)");
    allNotes.map((note,index) => {
        console.log(index+1+"--");
        console.log(note.title);
        console.log(note.body);
    })
}else if(command==='remove'){
    var deleted =  notes.removeNote(argv.title);
    deleted ? console.log("Removed note: "+ argv.title) : console.log("Note not found");
}else if(command==='read'){
    var note = notes.getNote(argv.title);
    if(note == undefined){
        console.log("Note not found");
    }
    else{
        console.log("title: "+ note.title);
        console.log("body: "+ note.body);
    }
}else{
    console.log('Command not recognised');
}