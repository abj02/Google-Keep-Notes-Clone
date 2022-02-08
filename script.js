const addButton = document.querySelector('.btn');

//Adding Data on Local Storage

const updateLSData = () => {
    const textAreaData = document.querySelectorAll('textarea');
    const notes = [];

    textAreaData.forEach((note)=>{
        return notes.push(note.value);
    });

    localStorage.setItem('notes',JSON.stringify(notes));
}


const addNewNote = (text = '')=>{
    const note = document.createElement('div');
    note.classList.add('note');
    const htmlData = `
        <div class="operation">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
    <textarea class="${text ? "hidden" : ""}"></textarea>  `;

    note.insertAdjacentHTML('afterbegin',htmlData);
    // console.log(note);

    const editButton = note.querySelector('.edit');
    const deleteButton = note.querySelector('.delete');
    const mainDiv = note.querySelector('.main');
    const textArea = note.querySelector('textarea');

    // Deleting the note

    deleteButton.addEventListener('click',()=> {
        note.remove();
        updateLSData();
    });


    // show data in main div

    textArea.addEventListener('change',(event)=>{
        const value = event.target.value;
        mainDiv.innerHTML = value;

        updateLSData();
    })

    // Toggle using Edit button

    textArea.value=text;
    mainDiv.innerHTML=text;

    editButton.addEventListener('click',()=>{
        mainDiv.classList.toggle('hidden');

        textArea.classList.toggle('hidden');
    });

    document.body.appendChild(note);
}

// getting data back from localStorage

const notes = JSON.parse(localStorage.getItem('notes'));

if(notes){ notes.forEach((note)=> {
    return addNewNote(note);
})};


addButton.addEventListener('click',()=> addNewNote());