// Define and buuld fields
function elemType(chrime){
    if(chrime.TRES_TIPO_RESPUESTAS == 'TEXTO UNA LÍNEA'){
        const chrimeElement = document.createElement('div');
        chrimeElement.id = `${chrime.TRES_ENT_ID_PREGUNTA_ABC}`;
        chrimeElement.classList.add('wrapper');
        chrimeElement.setAttribute('data-chrime_id', `${chrime.TRES_ID_DELITO}`);
        chrimeElement.setAttribute('data-chrime_name', `${chrime.TRES_NOM_DELITO}`);
        chrimeElement.setAttribute('data-question', `${chrime.TRES_TXT_NOM_PREGUNTA}`);
        chrimeElement.setAttribute('data-parent_id', `${chrime.TRES_ENT_ID_PREG_PADRE}`);
        chrimeElement.setAttribute('data-question_type', `${chrime.TRES_POSIBLES_RESPUESTAS}`);
        chrimeElement.setAttribute('data-answer_type', `${chrime.TRES_TIPO_RESPUESTAS}`);
        chrimeElement.setAttribute('data-enable_child', `${chrime.TRES_RES_HABILITA_RES_HIJO}`);
        const chrimeLabel = document.createElement('label');
        chrimeLabel.innerText = `${chrime.TRES_TXT_NOM_PREGUNTA}`;
        const chrimeField = document.createElement('input');
        chrimeField.type = 'text';
        chrimeField.classList.add('field');
        chrimeField.name = `answer_${chrime.TRES_ENT_ID_PREGUNTA_ABC}`;
        chrimeElement.append(chrimeLabel);
        chrimeElement.append(chrimeField);
        return chrimeElement;
    } 
    else if(chrime.TRES_TIPO_RESPUESTAS == 'AREA DE TEXTO'){
        const chrimeElement = document.createElement('div');
        chrimeElement.id = `${chrime.TRES_ENT_ID_PREGUNTA_ABC}`;
        chrimeElement.classList.add('wrapper');
        chrimeElement.setAttribute('data-chrime_id', `${chrime.TRES_ID_DELITO}`);
        chrimeElement.setAttribute('data-chrime_name', `${chrime.TRES_NOM_DELITO}`);
        chrimeElement.setAttribute('data-question', `${chrime.TRES_TXT_NOM_PREGUNTA}`);
        chrimeElement.setAttribute('data-parent_id', `${chrime.TRES_ENT_ID_PREG_PADRE}`);
        chrimeElement.setAttribute('data-question_type', `${chrime.TRES_POSIBLES_RESPUESTAS}`);
        chrimeElement.setAttribute('data-answer_type', `${chrime.TRES_TIPO_RESPUESTAS}`);
        chrimeElement.setAttribute('data-enable_child', `${chrime.TRES_RES_HABILITA_RES_HIJO}`);
        const chrimeLabel = document.createElement('label');
        chrimeLabel.innerText = `${chrime.TRES_TXT_NOM_PREGUNTA}`;
        const chrimeField = document.createElement('textarea');
        chrimeField.name = `answer_${chrime.TRES_ENT_ID_PREGUNTA_ABC}`;
        chrimeField.classList.add('field');
        chrimeElement.append(chrimeLabel);
        chrimeElement.append(chrimeField);
        return chrimeElement;
    } 
    else if(chrime.TRES_TIPO_RESPUESTAS == 'SI/NO') {
        const chrimeElement = document.createElement('div');
        chrimeElement.id = `${chrime.TRES_ENT_ID_PREGUNTA_ABC}`;
        chrimeElement.classList.add('wrapper');
        chrimeElement.setAttribute('data-chrime_id', `${chrime.TRES_ID_DELITO}`);
        chrimeElement.setAttribute('data-chrime_name', `${chrime.TRES_NOM_DELITO}`);
        chrimeElement.setAttribute('data-question', `${chrime.TRES_TXT_NOM_PREGUNTA}`);
        chrimeElement.setAttribute('data-parent_id', `${chrime.TRES_ENT_ID_PREG_PADRE}`);
        chrimeElement.setAttribute('data-question_type', `${chrime.TRES_POSIBLES_RESPUESTAS}`);
        chrimeElement.setAttribute('data-answer_type', `${chrime.TRES_TIPO_RESPUESTAS}`);
        chrimeElement.setAttribute('data-enable_child', `${chrime.TRES_RES_HABILITA_RES_HIJO}`);
        const chrimeSpan = document.createElement('span');
        chrimeSpan.innerText = `${chrime.TRES_TXT_NOM_PREGUNTA}`;
        const chrimeLabel = document.createElement('label');
        chrimeLabel.innerText = `Sí`;
        chrimeLabel.classList.add('radio_label');
        const chrimeField = document.createElement('input');
        chrimeField.type = 'radio';
        chrimeField.value = 'si';
        chrimeField.name = `answer_${chrime.TRES_ENT_ID_PREGUNTA_ABC}`;
        chrimeField.classList.add('field');
        
        const chrimeLabel2 = document.createElement('label');
        chrimeLabel2.innerText = `No`;
        const chrimeField2 = document.createElement('input');
        chrimeField2.type = 'radio';
        chrimeLabel2.classList.add('radio_label');
        chrimeLabel2.classList.add('field');
        chrimeField2.value = 'no';
        chrimeField2.name = `answer_${chrime.TRES_ENT_ID_PREGUNTA_ABC}`;
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
        chrimeElement.id = `${chrime.TRES_ENT_ID_PREGUNTA_ABC}`;
        
        const note = document.createTextNode(chrime.TRES_TXT_NOM_PREGUNTA); 
        chrimeElement.appendChild(note);
        return chrimeElement;
    }
}

function addClassElem(chrime, chrimeElement){
    if(chrime.TRES_ENT_ID_PREG_PADRE){
        chrimeElement.classList.add(`parent_id_${chrime.TRES_ENT_ID_PREG_PADRE}`);
        chrimeElement.classList.add('hide');
        chrimeElement.classList.add('child');
    } 
    
    if(chrime.TRES_RES_HABILITA_RES_HIJO){
        const fields = chrimeElement.querySelectorAll('input');
        [...fields].map(function(field){
            field.classList.add('trigger');
        })

        if(chrime.TRES_RES_HABILITA_RES_HIJO == 'SI'){
            [...fields].map(function(field){
                field.classList.add('trigger_yes');
            })
        } else if(chrime.TRES_RES_HABILITA_RES_HIJO == 'NO'){
            [...fields].map(function(field){
                field.classList.add('trigger_no');
            })
        }
    }
}