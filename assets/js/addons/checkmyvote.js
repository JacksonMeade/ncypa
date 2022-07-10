const search_header = document.getElementById('search-header');
const search_input = document.getElementById('search-input');

document.body.addEventListener('click', event => {
    if (event.target != searchbar && event.target != clearbtn) {
        close_search();
    }
});

search_input.addEventListener('focusout', event => {
    close_search();
});

function untype() {
    searchbar.value = '';
    clearbtn.hidden = true;
    projectsearchview_table.innerHTML = '';
}

function close_search() {
    if (search_input.value == '') {
        search_header.classList.toggle('full-height');
    }
}

search_input.addEventListener('input', event => {
    if (searchbar.value.length == 1) {
        search_header.classList.toggle('full-height');
    } else {
        // FOR NOW, DO NOTHING
    }
});