const cards = document.querySelectorAll('.card');
const lists = document.querySelectorAll('.list');

for (const card of cards) {
    card.addEventListener('dragstart', dragStart)
    card.addEventListener('dragend', dragEnd)
}

for (const list of lists) {
    list.addEventListener('dragover', dragOver)
    list.addEventListener('dragenter', dragEnter)
    list.addEventListener('dragleave', dragLeave)
    list.addEventListener('drop', dragDrop)
}

function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.id);
    event.target.classList.add('dragging');
}

function dragEnd(event) {
    event.target.classList.remove('dragging');
    console.log('Drag ended');
}

function dragOver(event) {
    event.preventDefault();
}

function dragEnter(event) {
    event.preventDefault();
    event.target.classList.add('over');
}

function dragLeave(event) {
    event.target.classList.remove('over');
}

function dragDrop(event) {
    const id = event.dataTransfer.getData('text/plain');
    const card = document.getElementById(id);
    event.target.appendChild(card);
    event.target.classList.remove('over');
}