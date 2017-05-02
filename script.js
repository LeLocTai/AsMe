'use strict';
var output;
var saved = true;
var quill;
document.addEventListener("DOMContentLoaded", function () {
    var toolbarOptions = ['bold', 'italic', 'link'];
    quill = new Quill('#desc', {
        modules: {
            toolbar: toolbarOptions
        }
    });
    var draft = localStorage.draft;
    if (draft != undefined) {
        quill.setText(draft);
    }
    quill.focus();
    document.getElementsByClassName('ql-bold').item(0).className += ' fa fa-bold';
    document.getElementsByClassName('ql-italic').item(0).className += ' fa fa-italic';
    document.getElementsByClassName('ql-link').item(0).className += ' fa fa-link';
    var editor = document.getElementsByClassName('ql-editor');
    output = document.getElementById('out');
    output.innerText = editor.item(0).innerHTML;
    quill.on('text-change', function () {
        saved = false;
        output.innerText = editor.item(0).innerHTML;
    });
    new Clipboard('.fa-copy', {
        text: function () {
            return output.innerText;
        }
    })
    if (storageAvailable) {
        autosave();
    }
})

function autosave() {
    if (!saved) {
        localStorage.draft = quill.getText();
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