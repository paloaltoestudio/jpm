
const chrimeList = [
    'insubordinacion', 
    'insubordinacion_exigencia', 
    'desobediencia',
    'desobediencia_personal_retirado',
    'desobediencia_reservistas',
    'ataque_superior',
    'ataque_inferior',
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
    'injuria',
    'desercion'
];

fetchChcrime().then(chrimes => {

    chrimes = chrimes.PreguntasAndRespuestasList;

    console.log(chrimes)
    
    chrimes.forEach(function(chrime){

        // //Function to build elements
        // const chrimeElement = elemType(chrime);
        
        // // Function to add classes to elements
        // addClassElem(chrime, chrimeElement);


        // Print fields on each chrime group
        chrimeList.map(function(chrimeName){
            const chrimeDiv = document.getElementById(`${chrimeName}`);

            const getTitle = function(){
                if(chrimeDiv){
                    let chrimeTitle = chrimeDiv.querySelector('.chrime_title');
                    chrimeTitle = chrimeTitle.textContent;
                    return chrimeTitle;
                } else {
                    return chrimeTitle = '';
                }
            }
            
            chrimeTitle = getTitle();

            if(chrime.TRES_NOM_DELITO == chrimeTitle){

                if(!chrime.TRES_ENT_ID_PREG_PADRE){
                    //Function to build elements
                    const chrimeElement = elemType(chrime);
                    
                    // Function to add classes to elements
                    addClassElem(chrime, chrimeElement);
    
                    chrimeDiv.appendChild(chrimeElement);
                }

                if(chrime.TRES_RES_HABILITA_RES_HIJO){
                    let children = chrimes.filter(item => item.TRES_ENT_ID_PREG_PADRE == chrime.TRES_ENT_ID_PREGUNTA_ABC);
                    children = children.sort((a,b) => (a.TRES_ENT_ORDEN_PREGUNTA_HIJO > b.TRES_ENT_ORDEN_PREGUNTA_HIJO) ? 1 : -1);

                    children.map(child => {
                        //Function to build elements
                        const chrimeElement = elemType(child);
    
                        // Function to add classes to elements
                        addClassElem(child, chrimeElement);

                        if(chrime.TRES_TXT_RESPUESTA_ABC && chrime.TRES_TXT_RESPUESTA_ABC == 'si'){
                            chrimeElement.classList.remove('hide');
                        }
    
                        chrimeDiv.appendChild(chrimeElement);

                    });
                    
                }

            } 
            // else if(chrime.TRES_NOM_DELITO == chrimeTitle && chrime.TRES_RES_HABILITA_RES_HIJO){
            //     const parentElem = document.getElementById(`${chrime.TRES_ENT_ID_PREG_PADRE}`);
            //     parentElem.append(chrimeElement);
            // } 
        });
    });

    //Fetch triggers
    const triggers = [...document.querySelectorAll('.trigger')];
    
    // Add click listener to every trigger
    triggersHandler(triggers);
    
}); 


// Change submit event
const form = document.querySelector('#jpm_form');
submitHandler(form);
