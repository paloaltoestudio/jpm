// Define and buuld fields

function createWrapperDiv(chrime){
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

    return chrimeElement;
}

function createLabel(chrime, type){
    const chrimeLabel = document.createElement('label');
    
    if(type == 'sí' || type == 'no'){
        chrimeLabel.innerText = type;
        chrimeLabel.classList.add('radio_label');
    } else {
        chrimeLabel.classList.add('question_text');
        chrimeLabel.innerText = `${chrime.TRES_TXT_NOM_PREGUNTA}`;
    }

    return chrimeLabel;
}

function elemType(chrime){
    if(chrime.TRES_TIPO_RESPUESTAS == 'TEXTO UNA LÍNEA'){
        // Print wrapper div
        const chrimeElement = createWrapperDiv(chrime);

        //Print label
        const chrimeLabel = createLabel(chrime, 'text');
        
        const chrimeField = document.createElement('input');
        chrimeField.type = 'text';
        chrimeField.value = chrime.TRES_TXT_RESPUESTA_ABC;
        chrimeField.classList.add('field');
        chrimeField.name = `answer_${chrime.TRES_ENT_ID_PREGUNTA_ABC}`;
        chrimeElement.append(chrimeLabel);
        chrimeElement.append(chrimeField);
        return chrimeElement;
    } 
    else if(chrime.TRES_TIPO_RESPUESTAS == 'AREA DE TEXTO'){
        const chrimeElement = createWrapperDiv(chrime);

        //Print label
        const chrimeLabel = createLabel(chrime, 'text');

        const chrimeField = document.createElement('textarea');
        chrimeField.name = `answer_${chrime.TRES_ENT_ID_PREGUNTA_ABC}`;
        chrimeField.classList.add('field');
        chrimeField.value = chrime.TRES_TXT_RESPUESTA_ABC;
        chrimeElement.append(chrimeLabel);
        chrimeElement.append(chrimeField);
        return chrimeElement;
    } 
    else if(chrime.TRES_TIPO_RESPUESTAS == 'SI/NO') {
        const chrimeElement = createWrapperDiv(chrime);

        const chrimeSpan = document.createElement('span');
        chrimeSpan.classList.add('question_text');
        chrimeSpan.innerText = `${chrime.TRES_TXT_NOM_PREGUNTA}`;

        //Print label
        const chrimeLabel = createLabel(chrime, 'sí');

        //Default hidden value for radio type answer
        const chrimeFieldDefault = document.createElement('input');
        chrimeFieldDefault.type = 'hidden';
        chrimeFieldDefault.name = `answer_${chrime.TRES_ENT_ID_PREGUNTA_ABC}`;
        chrimeFieldDefault.value = '';
        
        const chrimeField = document.createElement('input');
        chrimeField.type = 'radio';
        chrimeField.value = 'si';
        if(chrime.TRES_TXT_RESPUESTA_ABC == 'si'){
            chrimeField.setAttribute('checked', true)
        }
        chrimeField.name = `answer_${chrime.TRES_ENT_ID_PREGUNTA_ABC}`;
        chrimeField.classList.add('field');
        
        //Print label
        const chrimeLabel2 = createLabel(chrime, 'no');

        const chrimeField2 = document.createElement('input');
        chrimeField2.type = 'radio';
        
        chrimeField2.value = 'no';
        if(chrime.TRES_TXT_RESPUESTA_ABC == 'no'){
            chrimeField2.setAttribute('checked', true)
        }
        chrimeField2.name = `answer_${chrime.TRES_ENT_ID_PREGUNTA_ABC}`;
        chrimeField2.classList.add('field');

        if(chrime.TRES_TXT_RESPUESTA_ABC){
            chrimeElement.classList.add('checked');
        }

        chrimeElement.appendChild(chrimeSpan);
        chrimeElement.appendChild(chrimeFieldDefault);
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