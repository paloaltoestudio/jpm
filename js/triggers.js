function triggersHandler(triggers){
    triggers.map(function(trigger){
        trigger.addEventListener('click', function(e){
            //Add checked class to parent element
            e.target.parentNode.classList.add('checked');

            // Get parent padding
            let parentPadding = window.getComputedStyle(e.target.parentNode, null).getPropertyValue('margin-left');
            parentPadding = parentPadding.split('px');
            parentPadding = parseInt(parentPadding[0]);
            
            // Fetch trigger's children and remove hide class
            const elemsShow = document.querySelectorAll(`.parent_id_${e.target.parentNode.id}`);
            
            [...elemsShow].map(elem => {
                
                if(trigger.value == 'si'){
                    elem.classList.remove('hide');
                } else {
                    elem.classList.add('hide');

                    // Get children fields
                    childrenFields = document.querySelectorAll(`.parent_id_${e.target.parentNode.id} input`);
                    [...childrenFields].map(function(childrenField){
                        childrenField.checked = false;  
                        childrenField.parentNode.classList.add('hide');
                    });

                    childrenTextAreas = document.querySelectorAll(`.parent_id_${e.target.parentNode.id} textarea`);
                    [...childrenTextAreas].map(function(childrenTextArea){ 
                        childrenTextArea.value = '';
                        childrenTextArea.parentNode.classList.add('hide');
                    });

                    childrenInputTexts = document.querySelectorAll(`.parent_id_${e.target.parentNode.id} input[type='text']`); 
                    [...childrenInputTexts].map(function(childrenInputText){ 
                        childrenInputText.value = '';
                        childrenInputText.parentNode.classList.add('hide');
                    });
                }

                // Add up parent padding to indent child
                const childPadding = parentPadding + 40;
                elem.style.marginLeft = `${childPadding}px`;
            })
        })
    }); 
}
