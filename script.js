'use strict';
var editor, preview;
var saved = true;
document.addEventListener("DOMContentLoaded", function () {
    editor = document.getElementById('editor');
    preview = document.getElementById('preview');
    editor.onchange = editor.onkeyup = convert;
    if (storageAvailable) {
        editor.value = localStorage.draft || '';
        convert();
        autosave();
    }
    new Clipboard('#copy', {
        text: function () {
            return preview.innerHTML;
        }
    })
})

function convert() {
    saved = false;
    var out = editor.value;
    out = out.replace(/( (?= ))/g, '&nbsp');
    out = out.replace(/(\*{3})(.*?)\1/g, '<strong><em>$2</em>/strong>');
    out = out.replace(/(\*{3})(.+?)\*{2}(.+?)\*/g, '<em><strong>$2</strong>$3</em>');
    out = out.replace(/(\*{2})(.*?)\1/g, '<strong>$2</strong>');
    out = out.replace(/(\*)(.*?)\1/g, '<em>$2</em>');
    out = out.replace(/\[([^\[]+)\]\(([^\)]+)\)/g, '<a href=\'$2\'>$1</a>');
    out = out.replace(/\n/g, '<br>');
    preview.innerHTML = out;
}

function autosave() {
    if (!saved) {
        localStorage.draft = editor.value;
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