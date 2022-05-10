
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
    'injuria',
    'desercion'
];

fetchChcrime().then(chrimes => {
    chrimes = chrimes.sort((a, b) => (a.TRES_ID_DELITO > b.TRES_ID_DELITO) ? -1 : 1);

    chrimes.forEach(function(chrime){

        //Function to build elements

        if(!chrime.TRES_ENT_ORDEN_PREGUNTA_HIJO){
            const chrimeElement = elemType(chrime);

            // Function to add classes to elements
            addClassElem(chrime, chrimeElement);

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
                
                if(chrime.TRES_NOM_DELITO == chrimeTitle && !chrime.TRES_ENT_ID_PREG_PADRE1){
                    chrimeDiv.appendChild(chrimeElement);
                } 
            });
        }

    });

    //Fetch triggers
    const triggers = [...document.querySelectorAll('.trigger')];    
    
    // Add click listener to every trigger
    triggersHandler(triggers, chrimes);
    
}); 


// Change submit event
const form = document.querySelector('#jpm_form');
submitHandler(form);
