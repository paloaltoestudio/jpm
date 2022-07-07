
function printSentForm(){

    const printDiv = document.querySelector('#jpm_form_text');
    printDiv.innerHTML = '<ul class="list"></ul>';
    const printDivUl = printDiv.querySelector('.list');

    let data = new FormData(form);
    let chrimeName = '';

    for (let entry of data) {
        const q = document.getElementsByName(entry[0]);
        const qParent = q[0].parentNode;
        let newChrimeName = qParent.getAttribute('data-chrime_name');

        const qText = qParent.querySelector('.question_text');
    
        if(!qParent.classList.contains('hide')){
            if(qParent.classList.contains('checked') && entry[1] != ''){
                if(newChrimeName != chrimeName){
                    printDivUl.innerHTML += '<h2>' + newChrimeName + '</h2>';
                }

                printDivUl.innerHTML += '<li>' + qText.innerText + ': ' + entry[1] + '</li>';
                chrimeName = newChrimeName;

            } else if(!qParent.classList.contains('checked')) {
                if(newChrimeName != chrimeName){
                    printDivUl.innerHTML += '<h2>' + newChrimeName + '</h2>';
                }

                printDivUl.innerHTML += '<li>' + qText.innerText + ': ' + entry[1] + '</li>';
                chrimeName = newChrimeName;
            }
        }

        
    }

}
