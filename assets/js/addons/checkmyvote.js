const search_header = document.getElementById('search-header');
const search_inputs = [];
for (var i = 2; i > 0; i--) search_inputs.push(document.getElementById(`search-${i}`));
const clear_btns = [ document.getElementById('clear-btn') ];

function untype() {
    search_inputs.forEach((input) => {
        input.value = '';
    });
}


search_inputs.forEach((input) => {
    input.addEventListener('input', event => {
        if (input.value.length == 0) {
            if (!search_header.classList.contains('full-height')) {
                search_header.classList.add('full-height');
            }
        } else {
            if (search_header.classList.contains('full-height')) {
                search_header.classList.remove('full-height');
            }
        }
    })
});