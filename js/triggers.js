
function triggersHandler(triggers, chrimes){
    triggers.map(function(trigger){
        trigger.addEventListener('click', function(e){
            
            if(e.target.parentNode.classList.contains('active_yes') && e.target.value == 'si'){
                return;
            } else if(e.target.parentNode.classList.contains('active_no') && e.target.value == 'no'){
                return;
            }

            if(e.target.value == 'si'){
                e.target.parentNode.classList.add('active_yes');
                e.target.parentNode.classList.remove('active_no');

                // Get parent padding
                let parentPadding = window.getComputedStyle(e.target.parentNode, null).getPropertyValue('margin-left');
                parentPadding = parentPadding.split('px');
                parentPadding = parseInt(parentPadding[0]);
                
                // Fetch trigger's children and remove hide class
                const elemsShow = document.querySelectorAll(`.parent_id_${e.target.parentNode.id}`);
                //console.log(elemsShow);
    
    
                let filterChrimes = chrimes.filter(chrime => chrime.TRES_ENT_ID_PREG_PADRE && chrime.TRES_ENT_ID_PREG_PADRE == e.target.parentNode.id )
                filterChrimes = filterChrimes.sort((a, b) => (a.TRES_ENT_ORDEN_PREGUNTA_HIJO > b.TRES_ENT_ORDEN_PREGUNTA_HIJO) ? 1 : -1)
    
                filterChrimes.map(chrime => {
                    const chrimeElement = elemType(chrime);
    
                    // Function to add classes to elements
                    addClassElem(chrime, chrimeElement);
    
                    // Add up parent padding to indent child
                    const childPadding = parentPadding + 40;
                    chrimeElement.style.marginLeft = `${childPadding}px`;
    
                    //console.log(chrimeElement)
                    e.target.parentNode.appendChild(chrimeElement)
    
                });

            } if(e.target.value == 'no'){
                e.target.parentNode.classList.remove('active_yes');
                e.target.parentNode.classList.add('active_no');

                const children = [...e.target.parentNode.querySelectorAll('.child')];

                children.map(child => e.target.parentNode.removeChild(child));

            }


            //Fetch triggers
            const triggers = [...document.querySelectorAll('.trigger')];    
            
            // Add click listener to every trigger
            triggersHandler(triggers, chrimes);
        })
    }); 
}
