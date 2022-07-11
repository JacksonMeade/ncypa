const search_header = document.getElementById('search-header');
const search_inputs = [];
for (var i = 2; i > 0; i--) search_inputs.push(document.getElementById(`search-${i}`));
//const clear_btns = [ document.getElementById('clear-btn') ];

let counts = {};
let test = true;

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
        if (count == 0 && !test) {
             window.scrollBy({
                top: -window.innerHeight,
                left: 0,
                behavior: 'smooth'
             });
             test = true;
/*             clear_btns.forEach((btn) => {
                btn.classList.add('hidden');
            }); */
        } else if (count > 0 && test) {
            window.scrollBy({
                top: window.innerHeight,
                left: 0,
                behavior: 'smooth'
            });
            test = false;
/*             clear_btns.forEach((btn) => {
                btn.classList.remove('hidden');
            }); */
        }
    })
});