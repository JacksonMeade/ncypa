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
    if (search_input.value.length <= 1) {
        search_header.classList.toggle('full-height');
    } else {
        // FOR NOW, DO NOTHING
    }
});