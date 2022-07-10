const search_header = document.getElementById('search-header');
const search_input = document.getElementById('search-input');
const clear_btn = document.getElementById('clear-btn');

search_input.addEventListener('focusout', event => {
    close_search();
});

function untype() {
    search_input.value = '';
}

function close_search() {
    if (search_input.value == '') {
        
    }
    else {
        search_header.classList.toggle('full-height');
    }
}

search_input.addEventListener('input', event => {
    if (search_input.value.length == 0) {
        if (!search_header.classList.contains('full-height')) {
            search_header.classList.add('full-height');
        }
    } else {
        if (search_header.classList.contains('full-height')) {
            search_header.classList.remove('full-height');
        }
    }
});