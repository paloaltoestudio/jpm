const form = document.querySelector('#jpm_form');

fetchChcrime().then(chrimes => {

    chrimes = chrimes.PreguntasAndRespuestasList;

    var unique = [];
    var distinct = [];
    for(var i = 0; i < chrimes.length; i++ ){
        if(!unique[chrimes[i].TRES_ID_DELITO]){
            distinct.push(chrimes[i]);
            unique[chrimes[i].TRES_ID_DELITO] = 1;
        }
    }

    function createChrimeDiv(chrimeList){

        [...chrimeList].map(item => {
            const chrimeDiv = document.createElement('div');
            chrimeDiv.id = 'chrime_id_' + item.TRES_ID_DELITO;

            const title = document.createElement('h2');
            title.classList.add('chrime_title'); 
            title.innerText = item.TRES_NOM_DELITO;
            
            chrimeDiv.appendChild(title);
            form.appendChild(chrimeDiv);
        });
    }

    createChrimeDiv(distinct);

    distinct.map(item => {
        const currentChrimes = chrimes.filter(chrime => chrime.TRES_ID_DELITO == item.TRES_ID_DELITO);
        
        currentChrimes.map(chrime => {
            const chrimeDiv = document.getElementById(`chrime_id_${chrime.TRES_ID_DELITO}`);
            
            if(!chrime.TRES_ENT_ID_PREG_PADRE){
                //Function to build elements
                const chrimeElement = elemType(chrime);
                
                // Function to add classes to elements
                addClassElem(chrime, chrimeElement);
    
                chrimeDiv.appendChild(chrimeElement);
    
                function getChildren(chrimeObject, chrimeDiv){
                    
                    if(chrimeObject.TRES_RES_HABILITA_RES_HIJO){
                        let children = currentChrimes.filter(currentItem => currentItem.TRES_ENT_ID_PREG_PADRE == chrimeObject.TRES_ENT_ID_PREGUNTA_ABC);
                        children = children.sort((a,b) => (a.TRES_ENT_ORDEN_PREGUNTA_HIJO > b.TRES_ENT_ORDEN_PREGUNTA_HIJO) ? 1 : -1);

                        
                        children.map(child => {
                            //Function to build elements
                            const childChrimeElement = elemType(child);
                            
                            // Function to add classes to elements
                            addClassElem(child, childChrimeElement);
                            
                            if(chrimeObject.TRES_TXT_RESPUESTA_ABC && chrime.TRES_TXT_RESPUESTA_ABC == 'si'){
                                childChrimeElement.classList.remove('hide');
                            }
                            
                            chrimeDiv.appendChild(childChrimeElement);
    
                            getChildren(child, childChrimeElement);
    
                        });
                    } 
                }
                getChildren(chrime, chrimeElement);
            }
        });

    })
    
    //Create and add submit button
    const submitWrapper = document.createElement('div');
    submitWrapper.classList.add('submit_wrapper');
    const submitContainer = document.createElement('div');
    submitContainer.classList.add('submit_container');
    const submitButton = document.createElement('button');
    submitButton.innerText = 'Guardar Respuestas';
    submitContainer.appendChild(submitButton);
    submitWrapper.appendChild(submitContainer);
    form.appendChild(submitWrapper);
    
    //Fetch triggers
    const triggers = [...document.querySelectorAll('.trigger')];
    
    // Add click listener to every trigger
    triggersHandler(triggers);
}); 


// Change submit event
submitHandler(form);
