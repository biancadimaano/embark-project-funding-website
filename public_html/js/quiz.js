/* Quiz results
        ==================================================== */

/*
  Selecting all of the quiz result info card elements (elements with .info-card.quiz as a class) using querySelectorAll
  Using Array.from() to store these values in an Array

  Resources:
    https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll
    https://www.w3schools.com/jsref/met_document_queryselectorall.asp
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
*/
let all_info_cards = Array.from(document.querySelectorAll('.info-card.quiz'));
// console.log("all info cards: ", all_info_cards);
// Variable that stores the funding range that was checked by the user in quiz question 1, default value: empty array
let selected_grant_amounts = [];
// Variable that stores the categories that were checked by the user in quiz question 2, default value: empty array
let selected_categories = [];
// Variable that stores the type that was checked by the user in quiz question 3, default value: empty array
let selected_types = [];

/*
    Function to filter the results by the user's chosen grant amounts
    Resource for filter() https://www.w3schools.com/jsref/jsref_filter.asp
*/
function filter_by_grant_amount(selected_grant_amounts) {
    // Return all of the info cards where its grant amount is within the specified range 
    return all_info_cards.filter(card => {
        /*
            Gets the dataset attributes of data-grant-amount and converts the amount into an integer
            Need this value to be an integer so that we can compare it correctly in the conditional statements below.
            Resources for parseInt(): 
                https://stackoverflow.com/questions/1133770/how-to-convert-a-string-to-an-integer-in-javascript
                https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
            Resource for getAttribute(): https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute
        */
        const cardAmount = parseInt(card.getAttribute('data-grant-amount'), 10);

        // If no grant amounts are selected, show all cards
        if (selected_grant_amounts.length === 0) {
            return true;
        }

        // Using a switch case to check if the card amount falls into any (some) of the selected ranges
        // Resource for some: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
        return selected_grant_amounts.some(amount => {
            switch (amount) {
                case '0-500':
                    return cardAmount <= 500;
                case '500-1000':
                    return cardAmount > 500 && cardAmount <= 1000;
                case '1000-5000':
                    return cardAmount > 1000 && cardAmount <= 5000;
                case '5000-plus':
                    return cardAmount > 5000;
                default:
                    return false;
            }
        });
    });
}


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
  Returns all of the info cards that have ANY selected categories
  Use .filter, .contains and .some to check
  Resources:
    https://www.w3schools.com/jsref/jsref_filter.asp
    https://www.w3schools.com/java/ref_string_contains.asp
    https://www.w3schools.com/jsreF/jsref_some.asp
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
function filter_by_type(selected_types) {
    /*
        Checks the cards that have the corresponding type.
        Only cards that have all the selected type will be returned using filter().
    */
    return all_info_cards.filter(card => {
        return selected_types.every(type => card.classList.contains(type));
    });
}

function update_displayed_info_cards(){
    // Selecting all of the info cards that have the .show class
    const visible_cards = document.querySelectorAll('.info-card.quiz.show');

    displayed_info_cards = visible_cards.length;
    // console.log("Displaying: " + displayed_info_cards);
}
  
function update_filtered_info_cards() {
    // Filter by grant amount first 
    let filtered_by_grant_amount = filter_by_grant_amount(selected_grant_amounts);
    
    // Filter by categories
    let filtered_by_category = filter_by_category(selected_categories);
    
    // Filter by type 
    let filtered_by_type = filter_by_type(selected_types);

    // Filter all of the cards by the selected grant amounts, categories, and types.
    let filtered_info_cards = filtered_by_grant_amount.filter(card => 
        filtered_by_category.includes(card) && filtered_by_type.includes(card)
    );

    // Hide all cards first
    all_info_cards.forEach(card => {
        card.style.display = 'none';
    });

    // Display only the filtered cards
    filtered_info_cards.forEach(card => {
        card.style.display = 'grid';
    });

    // Update the number of displayed cards
    update_displayed_info_cards();
}

/* Adding the user's selected grant amounts to the selected_grant_amounts array.
    Resource: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
              Attribute selector: https://www.w3schools.com/css/css_attribute_selectors.asp
              forEach() -> https://www.w3schools.com/jsref/jsref_foreach.asp
*/ 
document.querySelectorAll('#question-grant-amounts input[type="checkbox"]').forEach(checkbox => {
    /*
        Detecting a change event: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
            Listens for changes in the grant amounts checkboxes
            If the checkbox is checked for a grant amount, the grant amount id will be added to the selected_grant_amounts array.
            If the checkbox is unchecked for a grant amount that was previously checked, that grant amount id will be removed from the array.
    */
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            selected_grant_amounts.push(this.id);  
        } else {
            selected_grant_amounts = selected_grant_amounts.filter(amount => amount !== this.id); 
        }
        console.log("Checked grant amounts:", selected_grant_amounts);
        update_filtered_info_cards();
    });
});

/* Adding the user's selected categories to the selected_categories array.
    Resource: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
              Attribute selector: https://www.w3schools.com/css/css_attribute_selectors.asp
              forEach() -> https://www.w3schools.com/jsref/jsref_foreach.asp
*/  
document.querySelectorAll('#question-categories input[type="checkbox"]').forEach(checkbox => {
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
      console.log("Checked categories:", selected_categories);
      update_filtered_info_cards();
    });
  });
  
/* Setting the selected_type value to the user's selected type.
    Resource: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
              Attribute selector: https://www.w3schools.com/css/css_attribute_selectors.asp
              forEach() -> https://www.w3schools.com/jsref/jsref_foreach.asp
*/  
document.querySelectorAll('#question-types input[type="checkbox"]').forEach(checkbox => {
    /*
        Detecting a change event: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event
        Listens for changes in the type checkboxes
        If the checkbox is checked for a type, the selected_type will be set to the type id.
        If the selected type is unchecked, set selected_type to its default value of null.
    */
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            selected_types.push(this.id);
        } else {
            selected_types = selected_types.filter(type => type !== this.id);
        }
        console.log("Checked types:", selected_types);
        update_filtered_info_cards();
    });
});
  
/* Using query strings (URL parameters) to retrieve answers from previous quiz pages 
    https://webdesign.tutsplus.com/update-webpage-content-based-on-url-parameters--cms-108803t
*/

/*
    Function to get URL parameters
    Resources:
        https://www.sitepoint.com/get-url-parameters-with-javascript/
        https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_loc_search
        https://stackoverflow.com/questions/14395090/what-is-location-search-in-javascript
*/
function getQueryParams() {
    // Object with key-value pairs to store the parameters
    const params = {};
    // Extracting the URL parameters
    const queryString = window.location.search;
    if (queryString) {
        /*  
            Creates a URLSearchParams object to be able to parse the query string
            This will help to store values of the url parameters, access them, and manipulate them.
            Resources for URLSearchParams: 
                https://webdesign.tutsplus.com/update-webpage-content-based-on-url-parameters--cms-108803t
                https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
        */
        const urlParams = new URLSearchParams(queryString);
        urlParams.forEach((value, key) => {
            // Split values that are separated by commas into an array
            params[key] = value.split(','); 
        });
    }
    return params;
}

// Update the URL with new parameters
function updateQueryParams(newParams) {
    /*  
        Creates a URLSearchParams object to be able to parse the query string
        This will help to store values of the url parameters, access them, and manipulate them.
        Resources for URLSearchParams: 
            https://webdesign.tutsplus.com/update-webpage-content-based-on-url-parameters--cms-108803t
            https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams
    */
    const urlParams = new URLSearchParams(window.location.search);

    // Add/Update new parameters using the URLSearchParams object that was created
    for (const [key, values] of Object.entries(newParams)) {
        urlParams.set(key, values.join(',')); // Join array values into a string
    }

    // Redirect to the same page with the updated query string
    // https://stackoverflow.com/questions/14395090/what-is-location-search-in-javascript
    window.location.search = urlParams.toString();
}

// Function to handle navigation between quiz pages
function handleNextButton(event, currentKey) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault
    // Prevents the page from refreshing
    event.preventDefault();

    // Get selected values for the current question in an array
    // Detects all of the checked checkboxes and maps their values into an array
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    const selectedValues = Array.from(document.querySelectorAll('input:checked')).map(input => input.value);

    if (selectedValues.length === 0) {
        // If the user did not select anything, creates a popup on the screen to please select something before proceeding to the next question
        alert('Please select at least one option before proceeding.');
        return;
    }

    // Update the query parameters with the current selections
    const queryParams = getQueryParams();
    queryParams[currentKey] = selectedValues;

    // Redirect to the next page with updated query parameters
    const nextPage = event.target.dataset.nextPage; // Set this in the button's 'data-next-page' dataset attribute
    // Call the function to update the URL with new parameters to store the current answers and send it to the next page 
    updateQueryParams(queryParams);
    // Set the URL to navigate to the next page, appending the updated query parameters
    // This will change the browser's URL and load the page specified in nextPage, while preserving the parameters
    // URLSearchParams(queryParams).toString() converts the queryParams object into a URL-encoded query string
    // https://www.w3schools.com/js/js_window_location.asp
    window.location.href = nextPage + '?' + new URLSearchParams(queryParams).toString();
}

// Function to filter and display results on the results page
function filterResults() {
    const queryParams = getQueryParams(); // Call the function that returns the URL parameters
    const allSelections = Object.values(queryParams).flat(); // Combine all query params into a single array using flat() https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat

    // Creating an array of all info cards
    const infoCards = Array.from(document.querySelectorAll('.info-card.quiz'));
    // Filter the info cards based on the user's seletcions of grant amounts, categories, and types.
    const filteredCards = infoCards.filter(card => {
        return allSelections.some(selection => card.classList.contains(selection));
    });

    // Hide all cards and display only the filtered ones
    infoCards.forEach(card => (card.style.display = 'none'));
    filteredCards.forEach(card => (card.style.display = 'grid'));

    // Display a paragraph element if no results match
    if (filteredCards.length === 0) {
        const resultsContainer = document.querySelector('.grid.results');
        resultsContainer.innerHTML = '<p>No results match your selections.</p>';
    }
}

function initializeQuiz() {
    /* Using datasets to allow JavaScript to access information about the HTML webpages, to be able to retrieve values for the quiz results
        https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
        https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes */
    const pageType = document.body.dataset.pageType; // Set 'data-page-type' in the '<body>' tag for each page
    // Using a switch case to  decide what to do based on which page the user is currently on
    switch (pageType) {
        case 'quiz-q1':
        case 'quiz-q2':
        case 'quiz-q3':
            // Resource: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
            const currentKey = pageType.replace('quiz-', ''); // Changing quiz-q1 into just q1
            
            // Use querySelector to select the anchor tag with the correct class
            const nextLink = document.querySelector('.button.green[data-next-page]');
            
            if (nextLink) {
                // Call the function for page navigation
                nextLink.addEventListener('click', (event) => handleNextButton(event, currentKey));
            } 
            break;

        case 'quiz-results':
            // If on the results page, filter the results.
            filterResults();
            break;
    }
}

// Run the initialization when the DOM content is fully loaded
// https://developer.mozilla.org/en-US/docs/Web/API/Document/DOMContentLoaded_event
document.addEventListener('DOMContentLoaded', function() {
    all_info_cards.forEach(card => {
        card.style.display = 'none';  // Initially hide all cards
    });
    initializeQuiz();
});