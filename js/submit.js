function submitHandler(form){
    form.addEventListener('submit', function(e){
        e.preventDefault();
    
        const formGroups = [...document.querySelectorAll('.wrapper')];
    
        let payloadContent = [];
    
        const payload = {
            "IdMensaje": form.getAttribute('data-msg_id'),
            "PreguntasAndRespuestasList": payloadContent
        }
    
        formGroups.map(function(formGroup){
            let fieldName = formGroup.querySelector('.field');
            fieldName = fieldName.getAttribute('name');
            const fieldValue = form[fieldName].value;
    
            const parentIdAttr = formGroup.getAttribute('data-parent_id');
            const parentId = function(){
                if(parentIdAttr && parentIdAttr != 'undefined' && parentIdAttr != 'null'){
                    return 'ok';
                } else {
                    return '';
                }
            }
    
            const enableChildAttr = formGroup.getAttribute('data-enable_child');
            const enableChild = function(){
                if(enableChildAttr && enableChildAttr != 'undefined' && enableChildAttr != 'null'){
                    return enableChildAttr;
                } else {
                    return '';
                }
            }
    
            const payloadElement = {
                "idDelito": formGroup.getAttribute('data-chrime_id'),
                "nombreDelito": formGroup.getAttribute('data-chrime_name'),
                "ENT_ID_PREGUNTA_ABC_3": formGroup.id,
                "idPreguntaPadre": parentId(),
                "TXT_NOM_PREGUNTA_3": formGroup.getAttribute('data-question'),
                "tipoRespuesta": "ok",
                "posiblesRespuestas": formGroup.getAttribute('data-question_type'),
                "respuestaQueHabilitaRespuestaHijo": enableChild(),
                "TXT_RESPUESTA_ABC_3": fieldValue
            }
    
            payloadContent.push(payloadElement);
    
        });
    
        const sendForm = async () => {
            const url = 'https://jsonplaceholder.typicode.com/posts'; // endpoint to post data
            const settings = {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(payload), 
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
    });
}