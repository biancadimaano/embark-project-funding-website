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


function filter_by_grant_amount(selected_grant_amounts) {
    return all_info_cards.filter(card => {
        const cardAmount = parseInt(card.getAttribute('data-grant-amount'), 10);

        // If no grant amounts are selected, show all cards
        if (selected_grant_amounts.length === 0) {
            return true;
        }

        // Check if the card amount falls into any of the selected ranges
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
    return all_info_cards.filter(card => {
        return selected_types.some(type => card.classList.contains(type));
    });
}

function update_displayed_info_cards(){
    const visible_cards = document.querySelectorAll('.info-card.quiz.show');

    displayed_info_cards = visible_cards.length;
    console.log("Displaying: " + displayed_info_cards);
}
  
function update_filtered_info_cards() {
    let filtered_by_grant_amount = filter_by_grant_amount(selected_grant_amounts);
    let filtered_by_category = filter_by_category(selected_categories);
    let filtered_by_type = filter_by_type(selected_types);

    // Combine all filters, ensuring that only the cards matching any of the selected criteria are shown
    let filtered_info_cards = filtered_by_grant_amount.concat(filtered_by_category, filtered_by_type);

    // Remove duplicates by using a Set (since some cards may match multiple filters)
    filtered_info_cards = [...new Set(filtered_info_cards)];

    // Hide all cards
    all_info_cards.forEach(card => {
        card.style.display = 'none';
    });

    // Display only the filtered cards
    filtered_info_cards.forEach(card => {
        card.style.display = 'grid';
    });

    update_displayed_info_cards();
}


document.querySelectorAll('#question-categories input[type="checkbox"]').forEach(checkbox => {
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
  
document.querySelectorAll('#question-types input[type="checkbox"]').forEach(checkbox => {
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
  
document.querySelectorAll('#question-grant-amounts input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        if (this.checked) {
            selected_grant_amounts.push(this.id);  // Add the selected range to the array
        } else {
            selected_grant_amounts = selected_grant_amounts.filter(amount => amount !== this.id);  // Remove it if unchecked
        }
        console.log("Checked grant amounts:", selected_grant_amounts);
        update_filtered_info_cards();
    });
});

// Utility function to get URL parameters
function getQueryParams() {
    const params = {};
    const queryString = window.location.search;
    if (queryString) {
        const urlParams = new URLSearchParams(queryString);
        urlParams.forEach((value, key) => {
            params[key] = value.split(','); // Split values into an array
        });
    }
    return params;
}

// Utility function to update the URL with new parameters
function updateQueryParams(newParams) {
    const urlParams = new URLSearchParams(window.location.search);

    // Add/Update new parameters
    for (const [key, values] of Object.entries(newParams)) {
        urlParams.set(key, values.join(',')); // Join array values into a string
    }

    // Redirect to the same page with the updated query string
    window.location.search = urlParams.toString();
}

// Function to handle quiz navigation
function handleNextButton(event, currentKey) {
    event.preventDefault();

    // Get selected values for the current question
    const selectedValues = Array.from(document.querySelectorAll('input:checked')).map(input => input.value);

    if (selectedValues.length === 0) {
        alert('Please select at least one option before proceeding.');
        return;
    }

    // Update the query parameters with the current selections
    const queryParams = getQueryParams();
    queryParams[currentKey] = selectedValues;

    // Redirect to the next page with updated query parameters
    const nextPage = event.target.dataset.nextPage; // Set this in the button's `data-next-page` attribute
    updateQueryParams(queryParams);
    window.location.href = nextPage + '?' + new URLSearchParams(queryParams).toString();
}

// Function to filter and display results on the results page
function filterResults() {
    const queryParams = getQueryParams();
    const allSelections = Object.values(queryParams).flat(); // Combine all query params into a single array

    const infoCards = Array.from(document.querySelectorAll('.info-card.quiz'));
    const filteredCards = infoCards.filter(card => {
        return allSelections.some(selection => card.classList.contains(selection));
    });

    // Hide all cards and display only the filtered ones
    infoCards.forEach(card => (card.style.display = 'none'));
    filteredCards.forEach(card => (card.style.display = 'grid'));

    // Display a message if no results match
    if (filteredCards.length === 0) {
        const resultsContainer = document.querySelector('.grid.results');
        resultsContainer.innerHTML = '<p>No results match your selections.</p>';
    }
}

function initializeQuiz() {
    const pageType = document.body.dataset.pageType; // Set `data-page-type` in the `<body>` tag for each page

    switch (pageType) {
        case 'quiz-q1':
        case 'quiz-q2':
        case 'quiz-q3':
            const currentKey = pageType.replace('quiz-', ''); // e.g., 'quiz-q1' -> 'q1'
            
            // Use querySelector to select the anchor tag with the correct class
            const nextLink = document.querySelector('.button.green[data-next-page]');
            
            if (nextLink) {
                nextLink.addEventListener('click', (event) => handleNextButton(event, currentKey));
            } else {
                console.error('Next button link not found!');
            }
            break;

        case 'quiz-results':
            filterResults();
            break;

        default:
            console.error('Unsupported page type');
    }
}

// Run the initialization when the DOM content is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeQuiz();
});