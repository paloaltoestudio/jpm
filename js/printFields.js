
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
    
    chrimes.forEach(function(chrime){
        console.log(chrime)

        //Function to build elements
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
            
            if(chrime.TRES_NOM_DELITO == chrimeTitle && chrime.TRES_ENT_ID_PREG_PADRE){
                const parentElem = document.getElementById(`${chrime.TRES_ENT_ID_PREG_PADRE}`);
                parentElem.append(chrimeElement);
            } else if(chrime.TRES_NOM_DELITO == chrimeTitle){
                chrimeDiv.appendChild(chrimeElement);
            } 
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
