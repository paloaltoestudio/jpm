function submitHandler(form){
    form.addEventListener('submit', function(e){
        e.preventDefault();
        
        const formButton = document.querySelector('.submit_wrapper button');
        formButton.innerText = '...Enviando';
    
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
                    return parentIdAttr;
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
            
            const answerTypeAttr = formGroup.getAttribute('data-answer_type');
            const answerType = function(){
                if(answerTypeAttr && answerTypeAttr != 'undefined' && answerTypeAttr != 'null'){
                    return answerTypeAttr;
                } else {
                    return '';
                }
            }

            const payloadElement = {
                "TRES_ID_DELITO": formGroup.getAttribute('data-chrime_id'),
                "TRES_NOM_DELITO": formGroup.getAttribute('data-chrime_name'),
                "TRES_ENT_ID_PREG": formGroup.id,
                "TRES_ENT_ID_PREG_PADRE": parentId(),
                "TXT_NOM_PREGUNTA_3": formGroup.getAttribute('data-question'),
                "TRES_TIPO_RESPUESTAS": answerType(),
                "TRES_POSIBLES_RESPUESTAS": formGroup.getAttribute('data-question_type'),
                "TRES_RES_HABILITA_RES_HIJO": enableChild(),
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

                formButton.innerText = 'Guardar Respuestas';

                if(fetchResponse.status == 201 || fetchResponse.status == 200){
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: 'Preguntas Guardadas',
                        showConfirmButton: false,
                        timer: 1500,
                        showCloseButton: false
                    })
                } else {
                    Swal.fire({
                        position: 'top-center',
                        icon: 'error',
                        title: 'Ocurrió un error',
                        text: 'Intente guardar nuevamente',
                        showConfirmButton: false,
                        timer: 1500000000000,
                        showCloseButton: false
                    })
                }

                return data;
            } catch (e) {
                formButton.innerText = 'Guardar Respuestas';
                return e;
            }    
        }
    
        sendForm();
    });
}