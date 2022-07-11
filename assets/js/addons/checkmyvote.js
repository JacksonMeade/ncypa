const search_header = document.getElementById('search-header');
const search_inputs = [];
for (var i = 2; i > 0; i--) search_inputs.push(document.getElementById(`search-${i}`));
//const clear_btns = [ document.getElementById('clear-btn') ];

let counts = {};

function untype() {
    search_inputs.forEach((input) => {
        input.value = '';
    });
}


search_inputs.forEach((input) => {
    counts[input.id] = 0;

    input.addEventListener('input', event => {
        let count = 0;
        search_inputs.forEach((input) => {
            count += input.value.length;
        });
        let test = search_header.classList.contains('full-height');
        if (count == 0 && !test) {
            search_header.classList.add('full-height');
/*             clear_btns.forEach((btn) => {
                btn.classList.add('hidden');
            }); */
        } else if (count > 0 && test) {
            search_header.classList.remove('full-height');
/*             clear_btns.forEach((btn) => {
                btn.classList.remove('hidden');
            }); */
        }
    })
});