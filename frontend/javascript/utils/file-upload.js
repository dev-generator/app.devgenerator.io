const fileTempl = document.getElementById('file-template');
const empty = document.getElementById('empty');
const FILES = {};

function addFile(target, file) {
  const objectURL = URL.createObjectURL(file);
  const clone = fileTempl.content.cloneNode(true);

  clone.querySelector('h1').textContent = file.name;
  clone.querySelector('li').id = objectURL;
  clone.querySelector('.delete').dataset.target = objectURL;
  clone.querySelector('.size').textContent =
    file.size > 1024 ? file.size > 1048576 ?
      Math.round(file.size / 1048576) + 'mb' : Math.round(file.size / 1024) + 'kb' : file.size + 'b';

  empty.classList.add('hidden');
  var reader = new FileReader();
  reader.readAsText(file, 'UTF-8');
  reader.onload = function(evt) {
    document.getElementById('document').value = evt.target.result;
  };

  target.prepend(clone);

  FILES[objectURL] = file;
}

const gallery = document.getElementById('gallery');
const hidden = document.getElementById('file-hidden-input');
const uploadButton = document.getElementById('upload-button');
if (uploadButton) {
  uploadButton.onclick = () => hidden.click();
  hidden.onchange = (e) => {
    for (const file of e.target.files) {
      addFile(gallery, file);
    }
  };
}

const hasFiles = ({dataTransfer: {types = []}}) => types.indexOf('Files') > -1;
let counter = 0;

const dropzone = document.getElementById('dropzone');
if (dropzone) {
  dropzone.addEventListener('drop', dropHandler);
  dropzone.addEventListener('dragover', dragEnterHandler);
  dropzone.addEventListener('dragleave', dragLeaveHandler);
  dropzone.addEventListener('dragenter', dragOverHandler);
}

function dropHandler(ev) {
  ev.preventDefault();
  for (const file of ev.dataTransfer.files) {
    addFile(gallery, file);
    counter = 0;
  }
}

function dragEnterHandler(e) {
  e.preventDefault();
  if (!hasFiles(e)) {
    return;
  }
  ++counter;
}

function dragLeaveHandler() {
  1 > --counter;
}

function dragOverHandler(e) {
  if (hasFiles(e)) {
    e.preventDefault();
  }
}

if (gallery) {
  gallery.onclick = ({target}) => {
    if (target.classList.contains('delete')) {
      const ou = target.dataset.target;
      document.getElementById(ou).remove(ou);
      gallery.children.length === 1 && empty.classList.remove('hidden');
      delete FILES[ou];
      document.getElementById('document').value = '';
    }
  };
}

export {FILES};
