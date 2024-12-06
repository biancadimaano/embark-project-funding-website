/* Dropdown menus
        ==================================================== */

/*
  Filtering by category and type using the dropdown menus
    ========================================================
*/

// Variable for <details> elements
var details = document.querySelector("details");
/* 
  Event listener to detect if the <details> element is open or closed.
  Checks whenever a <details> element is clicked.

  Resources for <details> event listener:
    https://stackoverflow.com/questions/7363117/detecting-the-opening-or-closing-of-a-details-element
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
*/

// details.addEventListener("toggle", (event) => {
//     if (details.open) {
//       /* The element was toggled open */
//       console.log("open");
//     } else {
//       /* The element was toggled closed */
//       console.log("close");
//     }
//   });

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
// Variable that stores the user's search input
let search_term = document.getElementById('searchInput').value;
// Variable for the search input element
var searchInput = document.getElementById("searchInput");

/* 
  Clear All button
*/
const clear_all = document.querySelector('#clear-all');

/*
  Event listener for the "Clear All" button
  When clicked, all of the filter dropdowns and search input will get reset, and the displayed cards will also reset. 
    Resource: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
*/

clear_all.addEventListener('click', () => {
  // Clear the selected categories (set to default value)
  selected_categories = [];
  // Clear the selected type (set to default value)
  selected_type = null;
  // Reset the number of displayed cards to the default number
  displayed_info_cards = 6;
  // Clear the search input
  search_term = "";
  // Hide the search input "x" button
  clearButton.style.display = 'none';
  // console.log("Click clear All");

  /* Resetting the category and type dropdown checkboxes and search input
      Resource: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
                Attribute selector: https://www.w3schools.com/css/css_attribute_selectors.asp
                forEach() -> https://www.w3schools.com/jsref/jsref_foreach.asp
  */  
  document.querySelectorAll('#details-category input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });

  document.querySelectorAll('#details-type input[type="checkbox"]').forEach(checkbox => {
    checkbox.checked = false;
  });

  document.getElementById('searchInput').value = "";

  // console.log("Filters cleared.");
  update_filtered_info_cards(); // Call the function to update the displayed info cards
});

/* Event listener to listen to changes in the search input
    Resource: https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event  
*/
document.getElementById('searchInput').addEventListener('input', function () {
  search_term = this.value.toLowerCase(); // Convert the input to lowercase
  update_filtered_info_cards(); // Call the function to update the displayed info cards
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
  // Resource for attribute selector: https://www.w3schools.com/css/css_attribute_selectors.asp
  const checkboxes = document.querySelectorAll('#details-type input[type="checkbox"]');
  
  // Resource for forEach() -> https://www.w3schools.com/jsref/jsref_foreach.asp
  checkboxes.forEach(checkbox => {
    // If the checkbox is not the same as the selected checkbox, uncheck it.
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

// Variables for the category dropdown and type dropdown
var detailsCategoryDropdown = document.querySelector("#details-category");
var detailsTypeDropdown = document.querySelector("#details-type");

/* 
  Event listener to detect if the filter dropdowns are open.
  If they are open, highlight the box with a green outline. 

  Resources for <details> event listener:
    https://stackoverflow.com/questions/7363117/detecting-the-opening-or-closing-of-a-details-element
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/details
*/
detailsCategoryDropdown.addEventListener("toggle", (event) => {
  const categoryDropdown = document.querySelector(".button.filter.category");
  if (!detailsCategoryDropdown.open){
    // Remove outline when dropdown closes
    categoryDropdown.style.outline = "none";
  }
});

detailsTypeDropdown.addEventListener("toggle", (event) => {
  const typeDropdown = document.querySelector(".button.filter.type");
  if (!detailsTypeDropdown.open) {
    // Remove outline when dropdown closes
    typeDropdown.style.outline = "none";
  }
});

/*
  Close the dropdowns when the user clicks outside of it

  AI USAGE - ChatGPT
  Prompt: 'how do i close a details menu when clicking outside of it'

  Answer: 
  document.addEventListener('click', (event) => {
    document.querySelectorAll('details[open]').forEach((details) => {
      // Check if the click was outside the <details> element
      if (!details.contains(event.target)) {
        details.removeAttribute('open');
      }
    });
  });

  Further resources about event.target: 
    https://www.w3schools.com/jsref/event_target.asp
    https://developer.mozilla.org/en-US/docs/Web/API/Event/target

  Resource for matches(): https://developer.mozilla.org/en-US/docs/Web/API/Element/matches

  Closing the specific dropdown menu (category or type <details> element) when the user clicks outside of the area.
*/
document.addEventListener("click", (event) => {
  if (!detailsCategoryDropdown.contains(event.target) && !event.target.matches(".button.filter.category")) {
    detailsCategoryDropdown.open = false;
  }

  if (!detailsTypeDropdown.contains(event.target) && !event.target.matches(".button.filter.type")) {
    detailsTypeDropdown.open = false;
  }
});

// Variables for the search input box, and the clear button ('x' button inside the search box)
var searchInput = document.getElementById("searchInput");
var clearButton = document.getElementById("searchInput-clear");

/*
  Updates the displayed info cards on the homepage
*/
function update_displayed_info_cards(){
  // Variable for all of the visible info cards
  const visible_cards = document.querySelectorAll('.info-card.home.show');
  // Variables for the category and type filter dropdowns
  const summary_text_category = document.querySelector('.button.filter.category summary');
  const summary_text_type = document.querySelector('.button.filter.type summary');

  displayed_info_cards = visible_cards.length;
  // console.log("Displaying: " + displayed_info_cards);
  /*
    Update the text thats says the number of results ('_ Results')
    Use the displayed_info_cards variable to write the number
  */
  document.getElementById("results").innerHTML = displayed_info_cards + ' Results';

  /*
    Changing the "Category" text in the dropdown to "__ Selected"
    Use the length of the selected_categories array to write the number

    If there is nothign selected, it will say 'Category'
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

  /*
    Changing the "Type" text in the dropdown to "Grants", "Awards", or "Programs" based on the user's input
    Use the value of selected_type to write the type

    If there is nothing selected, it will say 'Type'
  */
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

/*
  Updates the filtered info cards
*/
function update_filtered_info_cards() {
  // Filter by category
  let filtered_by_category = filter_by_category(selected_categories);

  // Filter by type
  let filtered_by_type;
  
  if (selected_type) {
    // Call the function to filter the cards by the selected type
    filtered_by_type = filter_by_type(selected_type);
  } else {
    // Filter by categories if a type is not selected 
    filtered_by_type = filtered_by_category;
  }
  
  // Combine the category and type filters, choose the cards that fall under both the selected categories and selected type
  let filtered_info_cards;
  
  // Execute if there is a selected category
  if (selected_categories.length > 0) {
    /* Filter the cards by the categories using .filter() and .includes()
        Resources:
          https://www.w3schools.com/jsref/jsref_filter.asp
          https://www.w3schools.com/jsref/jsref_includes_array.asp
    */
    filtered_info_cards = filtered_by_category.filter(card => filtered_by_type.includes(card));
  } else {
    // Filter by types if a category is not selected
    filtered_info_cards = filtered_by_type;
  }
  
  // Apply the search filter on the already filtered results
  let search_filtered_info_cards;
  
  /*  
    Filter the cards by the search term using .filter() and .includes()
      Resources:
        https://www.w3schools.com/jsref/jsref_filter.asp
        https://www.w3schools.com/jsref/jsref_includes_array.asp
        https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
    Note: This also allows users to search for content such as categories or type, we will keep this feature and just encourage the search of titles. 
  */
  if (search_term) {
    search_filtered_info_cards = filtered_info_cards.filter(card => {
      // Using lowerCase() to account for any upper case input values
      // Retrieving the text contents of the card 
      let cardContent = card.textContent.toLowerCase();
      // Returns card that have the same text content
      return cardContent.includes(search_term.toLowerCase());
    });
  } else {
    search_filtered_info_cards = filtered_info_cards;
  }

  // Resource for forEach() -> https://www.w3schools.com/jsref/jsref_foreach.asp
  // Reset card visibility
  all_info_cards.forEach(card => {
    card.style.display = 'none';
    card.classList.remove('show');
  });

  // If no filters or search term, show all cards
  if (selected_categories.length === 0 && !selected_type && search_term === "") {
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

  // Update the displayed info cards
  update_displayed_info_cards();
}

/* Adding the user's selected categories to the selected_categories array.
    Resource: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
              Attribute selector: https://www.w3schools.com/css/css_attribute_selectors.asp
              forEach() -> https://www.w3schools.com/jsref/jsref_foreach.asp
*/  
document.querySelectorAll('#details-category input[type="checkbox"]').forEach(checkbox => {
  /*
    Detecting a change event: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
      Listens for changes in the category checkboxes
      If the checkbox is checked for a category, the category id will be added to the selected_categories array.
      If the checkbox is unchecked for a category that was previously checked, that category id will be removed from the array.
  */
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      selected_categories.push(this.id);
    } else {
      uncheck_category(this.id);
    }
    // console.log("Checked categories:", selected_categories);
    update_filtered_info_cards();
  });
});

/* Setting the selected_type value to the user's selected type.
    Resource: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
              Attribute selector: https://www.w3schools.com/css/css_attribute_selectors.asp
              forEach() -> https://www.w3schools.com/jsref/jsref_foreach.asp
*/  
document.querySelectorAll('#details-type input[type="checkbox"]').forEach(checkbox => {
  /*
    Detecting a change event: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
      Listens for changes in the type checkboxes
      If the checkbox is checked for a type, the selected_type will be set to the type id.
      If the selected type is unchecked, set selected_type to its default value of null.
  */
  checkbox.addEventListener('change', function () {
    if (this.checked) {
      selected_type = this.value;
      // console.log("Selected type:", selected_type);
    } else {
      selected_type = null;
    }

    // Call the function to only allow one checkbox to be checked at a time for types. 
    allow_only_one_checkbox(this.id);
    update_filtered_info_cards();
  });
});

// When the user is inputting a value to the search input, show a button to be able to clear the search input.
searchInput.addEventListener('input', function() {
  if (searchInput.value.trim() !== '') {
    clearButton.style.display = 'inline';  // Show the button
  }
});

// Function to clear the search input and close autocomplete lists
clearButton.addEventListener("click", function() {
  searchInput.value = ""; // Clear the input field
  search_term = ""; // Set the search_term to its default value
  clearButton.style.display = 'none'; // Hide the button
  update_filtered_info_cards(); // Update the info cards
});

/* Search bar
        ==================================================== */

/*
    The following code is referenced from W3Schools
        https://www.w3schools.com/howto/howto_css_searchbar.asp
*/

var available_opportunities = 
[
    'EcoAction Community Funding Program',
    'BC Hydro Broad Impact Grants',
    'Assembly Grant',
    'Ocean Action Grant',
    'National Youth Climate Activism Award',
    'Abundance Fellowship'
]


function autocomplete(inp, arr) {
    var currentFocus;

    // Execute when someone types in the text field
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        var found = false; // Flag to track if matches are found

        // Close any already open lists of autocompleted values
        closeAllLists();

        if (!val) { return false; }

        currentFocus = -1;

        // Loop through the array of available opportunities
        for (i = 0; i < arr.length; i++) {
            // Check if the item starts with the same letters as the input
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                if (!found) {
                    // Create a DIV element to contain the items (autocomplete suggestions)
                    a = document.createElement("div");
                    a.setAttribute("id", this.id + "autocomplete-list");
                    a.setAttribute("class", "autocomplete-items");

                    // Append the DIV element as a child of the autocomplete container
                    this.parentNode.appendChild(a);
                }

                found = true; // Set the flag to true if a match is found

                b = document.createElement("div");

                // Make the matching letters bold
                b.innerHTML = arr[i].substr(0, val.length);
                b.innerHTML += arr[i].substr(val.length);

                // Insert a hidden input to hold the selected value
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                // When an item is clicked, set the value of the input field to the clicked value
                b.addEventListener("click", function(e) {
                  inp.value = this.getElementsByTagName("input")[0].value.trim(); // Trim spaces
                  search_term = inp.value.toLowerCase(); // Normalize search term
                  console.log("Selected search_term: " + search_term); 
              
                  closeAllLists();
                  update_filtered_info_cards(); // Update cards based on the selected term
                });

                // Append the item to the autocomplete list
                a.appendChild(b);
            }
        }

        // If no matches found, close the list
        if (!found) {
            closeAllLists();
        }
    });

    // Handle keyboard navigation
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");

        if (e.keyCode == 40) { // Down arrow
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) { // Up arrow
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) { // Enter key
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });

    // Function to add "active" class to an item
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    // Function to remove "active" class from all items
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    // Function to close all autocomplete lists
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    // Close the autocomplete lists when clicking anywhere outside the input field
    document.addEventListener("click", function (e) {
        // Hide the search 'x' button when the user clicks outside of the search input, when they have not typed anything
        if(search_term == ''){
          clearButton.style.display = 'none';
        }
        closeAllLists(e.target);
    });
}

// Initialize autocomplete on the search input field
autocomplete(searchInput, available_opportunities);

// END code from w3schools --> https://www.w3schools.com/howto/howto_css_searchbar.asp

/*
  AI USAGE - ChatGPT
  Issue: When clicking the details elements (for our filter dropdown buttons), it would open and then close immediately.
        At first, I thought this issue only persisted when clicking on the padding of the <details> element.
        I tried to remove the padding on this element, then add the padding back onto the <summary> element. 
        It worked somewhat, since the issue only happened on the first click and did not happen again after.
        I asked ChatGPT why it was happening on the first click, since I did not know what the issue was.
  Prompt: 'the first click of a details element always closes for me, why is that'
  AI answer: Provided with HTML, CSS, and JavaScript code for a <details> dropdown.
    We utilized the JavaScript answer to stop propogation.
    ** Comments in the function are also from the AI
  More resources to understand event propogation:
    https://medium.com/@mdsatriaalamshah/event-propagation-in-javascript-dd5d87e4ce55
    https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation
*/
document.querySelectorAll('details').forEach((detailsElement) => {
  // Prevent the default toggle behavior when clicking the details box
  detailsElement.addEventListener('click', function(event) {
    // If clicked inside the summary, allow the toggle
    if (event.target.tagName.toLowerCase() === 'summary') {
      return; // Let the click on summary toggle the dropdown
    }
    // Prevent the immediate close when clicking inside the details box
    event.stopPropagation();
  });
});
