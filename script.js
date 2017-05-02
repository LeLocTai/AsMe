'use strict';
var quill, editor, output;
var saved = true;
document.addEventListener("DOMContentLoaded", function () {
    var toolbarOptions = ['bold', 'italic', 'link'];
    quill = new Quill('#desc', {
        modules: {
            toolbar: toolbarOptions
        }
    });
    var draft = localStorage.draft;
    if (draft != undefined) {
        quill.setContents(JSON.parse(draft));
    }
    quill.focus();
    document.getElementsByClassName('ql-bold').item(0).className += ' fa fa-bold';
    document.getElementsByClassName('ql-italic').item(0).className += ' fa fa-italic';
    document.getElementsByClassName('ql-link').item(0).className += ' fa fa-link';
    editor = document.getElementsByClassName('ql-editor').item(0);
    output = document.getElementById('out');
    convert();
    quill.on('text-change', function () {
        saved = false;
        convert();
    });
    new Clipboard('.fa-copy', {
        text: function () {
            return output.value;
        }
    })
    if (storageAvailable) {
        autosave();
    }
})

function convert() {
    output.value = editor.innerHTML.replace(/target="_blank"/g, '').replace(/<p><br><\/p>/g, '<br>').replace(/<p[^>]*>((?:(?!<\/p>).)*)<\/p>/g, '$1\n<br>');
}

function autosave() {
    if (!saved) {
        localStorage.draft = JSON.stringify(quill.getContents());
        saved = true;
    }
    setTimeout(function () {
        autosave();
    }, 5000);
}

function storageAvailable() {
    try {
        var storage = window['localStorage']
            , x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch (e) {
        return false;
    }
}