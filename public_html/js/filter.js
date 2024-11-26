/* Dropdown menus
        ==================================================== */

// }

/* 
  Resources for <details> event listener:
    https://stackoverflow.com/questions/7363117/detecting-the-opening-or-closing-of-a-details-element
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
*/

var details = document.querySelector("details");

details.addEventListener("toggle", (event) => {
    if (details.open) {
      /* the element was toggled open */
      console.log("open");
    } else {
      /* the element was toggled closed */
      console.log("close");
    }
  });

function filterByCategory(){
    let categories = document.getElementsByName("category");
    let categoriesChecked = []; // Array for tracking the categories the user checks (for filtering by category)

    for(var i = 0; i < categories.length; i++){
      // Checkbox checked resource: https://www.w3schools.com/howto/howto_js_display_checkbox_text.asp
      if(categories[i].checked){
        // includes resource: https://www.w3schools.com/jsref/jsref_includes_array.asp
        if(!(categoriesChecked.includes(categories[i].value))){
          categoriesChecked.push(categories[i].value);

        }
      }
    }
    
    console.log(categoriesChecked);
}

/*
  https://www.w3schools.com/jsref/prop_radio_checked.asp
*/
function filterByType(fundingType){
    let type = document.getElementById(fundingType);
    let typeChecked;

    if(type.checked){
      typeChecked = type.value;
    }

    console.log(typeChecked);
}

