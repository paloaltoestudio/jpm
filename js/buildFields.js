// Define and buuld fields
function elemType(chrime){
    if(chrime.tipoDePregunta == 'TEXTO UNA LÍNEA'){
        const chrimeElement = document.createElement('div');
        chrimeElement.id = `${chrime.idPregunta}`;
        chrimeElement.classList.add('wrapper');
        chrimeElement.setAttribute('data-chrime_id', `${chrime.idDelito}`);
        chrimeElement.setAttribute('data-chrime_name', `${chrime.nombreDelito}`);
        chrimeElement.setAttribute('data-question', `${chrime.nombrePreguntas}`);
        chrimeElement.setAttribute('data-parent_id', `${chrime.idPreguntaPadre}`);
        chrimeElement.setAttribute('data-question_type', `${chrime.tipoDePregunta}`);
        chrimeElement.setAttribute('data-enable_child', `${chrime.respuestaQueHabilitaRespuestaHijo}`);
        const chrimeLabel = document.createElement('label');
        chrimeLabel.innerText = `${chrime.nombrePreguntas}`;
        const chrimeField = document.createElement('input');
        chrimeField.type = 'text';
        chrimeField.classList.add('field');
        chrimeField.name = `answer_${chrime.idPregunta}`;
        chrimeElement.append(chrimeLabel);
        chrimeElement.append(chrimeField);
        return chrimeElement;
    } 
    else if(chrime.tipoDePregunta == 'AREA DE TEXTO'){
        const chrimeElement = document.createElement('div');
        chrimeElement.id = `${chrime.idPregunta}`;
        chrimeElement.classList.add('wrapper');
        chrimeElement.setAttribute('data-chrime_id', `${chrime.idDelito}`);
        chrimeElement.setAttribute('data-chrime_name', `${chrime.nombreDelito}`);
        chrimeElement.setAttribute('data-question', `${chrime.nombrePreguntas}`);
        chrimeElement.setAttribute('data-parent_id', `${chrime.idPreguntaPadre}`);
        chrimeElement.setAttribute('data-question_type', `${chrime.tipoDePregunta}`);
        chrimeElement.setAttribute('data-enable_child', `${chrime.respuestaQueHabilitaRespuestaHijo}`);
        const chrimeLabel = document.createElement('label');
        chrimeLabel.innerText = `${chrime.nombrePreguntas}`;
        const chrimeField = document.createElement('textarea');
        chrimeField.name = `answer_${chrime.idPregunta}`;
        chrimeField.classList.add('field');
        chrimeElement.append(chrimeLabel);
        chrimeElement.append(chrimeField);
        return chrimeElement;
    } 
    else if(chrime.tipoDePregunta == 'SI/NO') {
        const chrimeElement = document.createElement('div');
        chrimeElement.id = `${chrime.idPregunta}`;
        chrimeElement.classList.add('wrapper');
        chrimeElement.setAttribute('data-chrime_id', `${chrime.idDelito}`);
        chrimeElement.setAttribute('data-chrime_name', `${chrime.nombreDelito}`);
        chrimeElement.setAttribute('data-question', `${chrime.nombrePreguntas}`);
        chrimeElement.setAttribute('data-parent_id', `${chrime.idPreguntaPadre}`);
        chrimeElement.setAttribute('data-question_type', `${chrime.tipoDePregunta}`);
        chrimeElement.setAttribute('data-enable_child', `${chrime.respuestaQueHabilitaRespuestaHijo}`);
        const chrimeSpan = document.createElement('span');
        chrimeSpan.innerText = `${chrime.nombrePreguntas}`;
        const chrimeLabel = document.createElement('label');
        chrimeLabel.innerText = `Sí`;
        chrimeLabel.classList.add('radio_label');
        const chrimeField = document.createElement('input');
        chrimeField.type = 'radio';
        chrimeField.value = 'si';
        chrimeField.name = `answer_${chrime.idPregunta}`;
        chrimeField.classList.add('field');
        
        const chrimeLabel2 = document.createElement('label');
        chrimeLabel2.innerText = `No`;
        const chrimeField2 = document.createElement('input');
        chrimeField2.type = 'radio';
        chrimeLabel2.classList.add('radio_label');
        chrimeLabel2.classList.add('field');
        chrimeField2.value = 'no';
        chrimeField2.name = `answer_${chrime.idPregunta}`;
        chrimeField2.classList.add('field');

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
        
        const note = document.createTextNode(chrime.nombrePreguntas); 
        chrimeElement.appendChild(note);
        return chrimeElement;
    }
}

function addClassElem(chrime, chrimeElement){
    if(chrime.idPreguntaPadre){
        chrimeElement.classList.add(`parent_id_${chrime.idPreguntaPadre}`);
        chrimeElement.classList.add('hide');
        chrimeElement.classList.add('child');
    } 
    
    if(chrime.respuestaQueHabilitaRespuestaHijo){
        const fields = chrimeElement.querySelectorAll('input');
        [...fields].map(function(field){
            field.classList.add('trigger');
        })

        if(chrime.respuestaQueHabilitaRespuestaHijo == 'SI'){
            [...fields].map(function(field){
                field.classList.add('trigger_yes');
            })
        } else if(chrime.respuestaQueHabilitaRespuestaHijo == 'NO'){
            [...fields].map(function(field){
                field.classList.add('trigger_no');
            })
        }
    }
}