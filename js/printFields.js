
const chrimeList = [
    'insubordinacion', 
    'insubordinacion_exigencia', 
    'desobediencia',
    'desobediencia_personal_retirado',
    'desobediencia_reservistas',
    'ataque_superior',
    'amenazas',
    'abandono_puesto',
    'abandono_servicio',
    'abandono_servicio_soldados_voluntarios_profesionales',
    'delito_centinela',
    'libertad_indebida_prisioneros_guerra',
    'omision_abastecimiento',
    'inutilizacion_voluntaria',
    'cobardia',
    'cobardia_omision',
    'comercio_enemigo',
    'injuria'
];

fetchChcrime().then(chrimes => {
    
    chrimes.forEach(function(chrime){
        
        // Define which type of field
        function elemType(){
            if(chrime.tipoDePregunta3chkabcsiNo3chksolodescripcion == 'TEXTO UNA LÍNEA'){
                const chrimeElement = document.createElement('div');
                chrimeElement.id = `${chrime.idPregunta}`;
                chrimeElement.classList.add('wrapper');
                const chrimeLabel = document.createElement('label');
                chrimeLabel.innerText = `${chrime.nombrePreguntanmpreguntas}`;
                const chrimeField = document.createElement('input');
                chrimeField.type = 'text';
                chrimeField.name = `${chrime.idPregunta}`;
                chrimeElement.append(chrimeLabel);
                chrimeElement.append(chrimeField);
                return chrimeElement;
            } 
            else if(chrime.tipoDePregunta3chkabcsiNo3chksolodescripcion == 'AREA DE TEXTO'){
                const chrimeElement = document.createElement('div');
                chrimeElement.id = `${chrime.idPregunta}`;
                chrimeElement.classList.add('wrapper');
                const chrimeLabel = document.createElement('label');
                chrimeLabel.innerText = `${chrime.nombrePreguntanmpreguntas}`;
                const chrimeField = document.createElement('textarea');
                chrimeField.name = `${chrime.idPregunta}`;
                chrimeElement.append(chrimeLabel);
                chrimeElement.append(chrimeField);
                return chrimeElement;
            } 
            else if(chrime.tipoDePregunta3chkabcsiNo3chksolodescripcion == 'SI/NO') {
                const chrimeElement = document.createElement('div');
                chrimeElement.id = `${chrime.idPregunta}`;
                chrimeElement.classList.add('wrapper');
                const chrimeSpan = document.createElement('span');
                chrimeSpan.innerText = `${chrime.nombrePreguntanmpreguntas}`;
                const chrimeLabel = document.createElement('label');
                chrimeLabel.innerText = `Sí`;
                chrimeLabel.classList.add('radio_label');
                const chrimeField = document.createElement('input');
                chrimeField.type = 'radio';
                chrimeField.value = 'si';
                chrimeField.name = `${chrime.idPregunta}`;

                const chrimeLabel2 = document.createElement('label');
                chrimeLabel2.innerText = `No`;
                const chrimeField2 = document.createElement('input');
                chrimeField2.type = 'radio';
                chrimeLabel2.classList.add('radio_label');
                chrimeField2.value = 'no';
                chrimeField2.name = `${chrime.idPregunta}`;

                chrimeElement.appendChild(chrimeSpan);
                chrimeElement.appendChild(chrimeLabel);
                chrimeElement.appendChild(chrimeField);
                chrimeElement.appendChild(chrimeLabel2);
                chrimeElement.appendChild(chrimeField2);
                return chrimeElement;
            } 
            else {
                const chrimeElement = document.createElement('p');
                chrimeElement.id = `${chrime.idPregunta}`;
                
                const note = document.createTextNode(chrime.nombrePreguntanmpreguntas); 
                chrimeElement.appendChild(note);
                return chrimeElement;
            }
        }

        const chrimeElement = elemType();
        
        if(chrime.idePreguntaPadre){
            chrimeElement.classList.add(`parent_id_${chrime.idePreguntaPadre}`);
            chrimeElement.classList.add('hide');
            chrimeElement.classList.add('child');
        } 
        
        if(chrime.respuestaQueHabilitaRespuestaHijo){
            const fields = chrimeElement.querySelectorAll('input');
            [...fields].map(function(field){
                field.classList.add('trigger');
            })
        }

        // Print fields on each chrime group
        chrimeList.map(function(chrimeName){
            const chrimeDiv = document.querySelector(`#${chrimeName}`);
            let chrimeTitle = chrimeDiv.querySelector('.chrime_title');
            chrimeTitle = chrimeTitle.textContent;

            if(chrime.nombreDelito == chrimeTitle && chrime.idePreguntaPadre){
                const parentElem = document.getElementById(`${chrime.idePreguntaPadre}`);
                parentElem.append(chrimeElement);
            } else if(chrime.nombreDelito == chrimeTitle){
                chrimeDiv.appendChild(chrimeElement);
            }
        });
    });

    //Fetch triggers
    const triggers = document.querySelectorAll('.trigger');
    
    // Add click listener to every trigger
    [...triggers].map(function(trigger){
        trigger.addEventListener('click', function(e){
            // Get parent padding
            let parentPadding = window.getComputedStyle(e.target.parentNode, null).getPropertyValue('margin-left');
            parentPadding = parentPadding.split('px');
            parentPadding = parseInt(parentPadding[0]);
            
            // Fetch trigger's children and remove hide class
            const elemsShow = document.querySelectorAll(`.parent_id_${e.target.parentNode.id}`);
            console.log(elemsShow);
            [...elemsShow].map(elem => {
                if(trigger.value == 'si'){
                    elem.classList.remove('hide');
                } else {
                    elem.classList.add('hide');

                    // Get children fields
                    childrenFields = document.querySelectorAll(`.parent_id_${e.target.parentNode.id} input`);
                    [...childrenFields].map(function(childrenField){
                        childrenField.checked = false;  
                        childrenField.parentNode.classList.add('hide');
                    });

                    childrenTextAreas = document.querySelectorAll(`.parent_id_${e.target.parentNode.id} textarea`);
                    [...childrenTextAreas].map(function(childrenTextArea){ 
                        childrenTextArea.value = '';
                        childrenTextArea.parentNode.classList.add('hide');
                    });

                    childrenInputTexts = document.querySelectorAll(`.parent_id_${e.target.parentNode.id} input[type='text']`); 
                    [...childrenInputTexts].map(function(childrenInputText){ 
                        console.log(childrenInputText)
                        childrenInputText.value = '';
                        childrenInputText.parentNode.classList.add('hide');
                    });
                    console.log(childrenFields)
                }

                // Add up parent padding to indent child
                const childPadding = parentPadding + 40;
                elem.style.marginLeft = `${childPadding}px`;
            })
        })
    }); 
}); 


// Change submit event
const form = document.querySelector('#jpm_form');

form.addEventListener('submit', function(e){
    e.preventDefault();

    // Serialize form data function
    const serializeForm = function (form) {
        var obj = {};
        var formData = new FormData(form);
        for (var key of formData.keys()) {
            obj[key] = formData.get(key);
        }
        return obj;
    };

    const sendForm = async () => {
        const url = 'https://jsonplaceholder.typicode.com/posts'; // endpoint to post data
        const settings = {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(serializeForm(e.target)), 
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }};

        try {
            const fetchResponse = await fetch(`${url}`, settings);
            const data = await fetchResponse.json();
            return data;
        } catch (e) {
            return e;
        }    
    }

    sendForm();

    // fetch(url, {
    // method: 'POST', // or 'PUT'
    // body: JSON.stringify(serializeForm(e.target)), // data can be `string` or {object}!
    // headers:{
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    // }
    // }).then(res => res.json())
    // .catch(error => console.error('Error:', error))
    // .then(response => console.log('Success:', response));
});