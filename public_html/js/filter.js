/* Dropdown menus
        ==================================================== */

/* 
  Event listener to detect if the <details> element is open or closed.
  Checks whenever a <details> element is clicked.

  Resources for <details> event listener:
    https://stackoverflow.com/questions/7363117/detecting-the-opening-or-closing-of-a-details-element
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
*/

var details = document.querySelector("details");

details.addEventListener("toggle", (event) => {
    if (details.open) {
      /* The element was toggled open */
      console.log("open");
    } else {
      /* The element was toggled closed */
      console.log("close");
    }
  });

/*
  Filtering by category and type using the dropdown menus
    ========================================================
*/

/*
  Selecting all of the homepage info card elements (elements with .info-card.home as a class) using querySelectorAll
  Using Array.from() to store these values in an Array

  Resources:
    https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
    https://www.w3schools.com/jsref/met_document_queryselectorall.asp
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
*/
let all_info_cards = Array.from(document.querySelectorAll('.info-card.home'));
// console.log("all info cards: ", all_info_cards);

// Variable that stores the categories that were checked by the user in the dropdown menu, default value: empty array
let selected_categories = [];
// Variable that stores the type that was checked by the user in the dropdown menu, default value: null
let selected_type = null;
// Variable that stores the number of info cards that are currently displayed on the screen, default value: 6
let displayed_info_cards = 6;

let search_term = "";

// Event listener to capture changes in the search input
document.getElementById('searchInput').addEventListener('input', function () {
  search_term = this.value.toLowerCase(); // Capture the input and convert it to lowercase
  console.log("Search term:", search_term);
  update_filtered_info_cards();
});

/*
  Removes a category from selected_categories when it is unchecked.
*/
function uncheck_category(category_id) {
  /* 
    Using filter() to remove the unchecked categories from the array
    Resource:
      https://www.w3schools.com/jsref/jsref_filter.asp

    This checks if id is not equal to categoryId, filter will exclude these items from the selected_categories array.
  */
  selected_categories = selected_categories.filter(id => id != category_id);
}

/*
  Unchecks any selected checkboxes when a new checkbox is selected.
  Used for the "Type" dropdown, only 1 type can be selected at a time.
  Resource for .checked:
    https://www.w3schools.com/jsreF/prop_checkbox_checked.asp
*/
function allow_only_one_checkbox(checkedId) {
  // Select only the checkboxes for the Type dropdown
  const checkboxes = document.querySelectorAll('#details-type input[type="checkbox"]');
  
  checkboxes.forEach(checkbox => {
    if (checkbox.id !== checkedId) {
      checkbox.checked = false; // Uncheck all checkboxes except the selected one
    }
  });
}

/*
  Returns all of the info cards that have ALL selected categories
  Use .filter, .contains and .every to check
  Resources:
    https://www.w3schools.com/jsref/jsref_filter.asp
    https://www.w3schools.com/java/ref_string_contains.asp
    https://www.w3schools.com/jsref/jsref_every.asp
*/
function filter_by_category(selected_categories){
  /*
    Checks if each card has *every* class from the selected_categories array.
    Only cards that have all the selected categories will be returned using filter().
  */
  return all_info_cards.filter(card => {
    return selected_categories.every(category => card.classList.contains(category));
  });
}

/*
  Returns all of the info cards of the selected type
  Use .filter and .contains to check
  Resource:
    https://www.w3schools.com/jsref/jsref_filter.asp  
    https://www.w3schools.com/java/ref_string_contains.asp
*/
function filter_by_type(type) {
  /*
    Checks the cards that have the corresponding type.
    Only cards that have all the selected type will be returned using filter().
  */
  return all_info_cards.filter(card => {
    return card.classList.contains(type);
  });
}


function update_displayed_info_cards(){
  const visible_cards = document.querySelectorAll('.info-card.home.show');
  const summary_text_category = document.querySelector('.button.filter.category summary');
  const summary_text_type = document.querySelector('.button.filter.type summary');

  displayed_info_cards = visible_cards.length;
  console.log("Displaying: " + displayed_info_cards);
  /*
    Update the text thats says the number of results ('_ Results')
  */
  document.getElementById("results").innerHTML = displayed_info_cards + ' Results';

  /*
    Changing the "Category" text in the dropdown to "__ Selected"
  */
  if(selected_categories.length == 0){
    summary_text_category.innerHTML = 'Category';
    summary_text_category.style.color = "#4D4D4D";
  }
  // Using else if for readability
  else if(selected_categories.length > 0){
    summary_text_category.innerHTML = selected_categories.length + ' Selected';
    summary_text_category.style.color = "#6F9E94";
  }

  if(selected_type == null){
    summary_text_type.innerHTML = 'Type';
    summary_text_type.style.color = "#4D4D4D";
  }
  // Using else if for readability
  else if(selected_type != null){
    // Switch case to write the correct funding type in the summary text content
    switch(selected_type){
      case 'grant':
        summary_text_type.innerHTML = "Grants";
        break;
      case 'award':
        summary_text_type.innerHTML = "Awards";
        break;
      case 'program':
        summary_text_type.innerHTML = "Programs";
        break;
    }
    summary_text_type.style.color = "#6F9E94";
  }

  /* 
    Displaying a paragraph element that says "No results found with the selected filters" when there are 0 results
    Also checking if selected_categories is not empty, meaning that the filters were used. 
      -> Don't want this text to show when there are 0 opportunities in the first place, only when there are 0 from the chosen filters.
  */
  if(displayed_info_cards == 0 && selected_categories.length > 0){
    document.getElementById('no-results').style.display = 'block';
  }
  else{
    document.getElementById('no-results').style.display = 'none';
  }
  
}

function update_filtered_info_cards() {
  let filtered_by_category = filter_by_category(selected_categories);
  let filtered_by_type = selected_type ? filter_by_type(selected_type) : filtered_by_category;
  let filtered_info_cards = selected_categories.length > 0 
    ? filtered_by_category.filter(card => filtered_by_type.includes(card)) 
    : filtered_by_type;

  // Filter by search term (e.g., checking if the card title or description contains the search term)
  let search_filtered_info_cards = filtered_info_cards.filter(card => {
    let cardContent = card.textContent.toLowerCase(); // Get all text inside the card and convert to lowercase
    return cardContent.includes(search_term); // Check if the search term is in the content
  });

  all_info_cards.forEach(card => {
    card.style.display = 'none';
    card.classList.remove('show');
  });

  if (selected_categories.length == 0 && !selected_type && search_term === "") {
    // Show all cards when no filters or search term is applied
    all_info_cards.forEach(card => {
      card.style.display = 'grid';
      card.classList.add('show');
    });
  } else {
    // Show only filtered cards
    search_filtered_info_cards.forEach(card => {
      card.style.display = 'grid';
      card.classList.add('show');
    });
  }

  update_displayed_info_cards();
}

document.querySelectorAll('#details-category input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      selected_categories.push(this.id);
    } else {
      uncheck_category(this.id);
    }
    console.log("Checked categories:", selected_categories);
    update_filtered_info_cards();
  });
});

document.querySelectorAll('#details-type input[type="radio"]').forEach(radio => {
  radio.addEventListener('change', function () {
    selected_type = this.value;
    console.log("Selected type:", selected_type);
    update_filtered_info_cards();
  });
});

document.querySelectorAll('#details-type input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      selected_type = this.value;
      console.log("Selected type:", selected_type);
    } else {
      selected_type = null;
    }

    allow_only_one_checkbox(this.id);
    update_filtered_info_cards();
  });
});
