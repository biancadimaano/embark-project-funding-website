/* Dropdown menus
        ==================================================== */

// }

/* 
  Resources for <details> event listener:
    https://stackoverflow.com/questions/7363117/detecting-the-opening-or-closing-of-a-details-element
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
*/

// let all_categories = document.querySelectorAll('.type input')
// for (let category of all_categories) {
//   category.addEventListener('click', name_of_function);
// }


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

/*
  Filtering by Category
    ========================================================
*/

let categoriesChecked = []; // Array for tracking the categories the user checks (for filtering by category)

function filterByCategory(){
    let categories = document.getElementsByName("category");

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
  Filtering by Type
    ========================================================
*/

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

