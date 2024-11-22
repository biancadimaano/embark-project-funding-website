/* 
    Resources for closing a button when the user clicks outside of it
        https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element
        https://jsfiddle.net/tedp/aL7Xe/1/
*/
let dropdownOpen = false; // To track whether the dropdown is open
let closeDropdownListener = null;

function showDropdown(filterButtonId, dropdownId) {
    const filterButton = document.getElementById(filterButtonId);
    const dropdown = document.getElementById(dropdownId);
    
    if (dropdownOpen) {
        filterButton.style.border = "0.15rem solid #4D4D4D";
        dropdown.style.display = "none"; // Close dropdown
        dropdownOpen = false;

        if (closeDropdownListener) {
            document.removeEventListener('click', closeDropdownListener);
        }
    } else {
        filterButton.style.border = "0.2rem solid #6F9E94";
        dropdown.style.display = "block"; // Open dropdown
        dropdownOpen = true;
        // Add DOM event listener to close the dropdown when the user clicks outside of the dropdown
        closeDropdownListener = function(event) {
            closeDropdownOnClickOutside(event, filterButtonId, dropdownId);
        };

        document.addEventListener('click', closeDropdownListener);
    }
}

function closeDropdownOnClickOutside(event, filterButtonId, dropdownId) {
    const filterButton = document.getElementById(filterButtonId);
    const dropdown = document.getElementById(dropdownId);

    // Close dropdown if the user clicks outside of the dropdown 
    if (!dropdown.contains(event.target) && event.target !== filterButton) {
        dropdown.style.display = "none"; // Close dropdown
        dropdownOpen = false;
        // Remove the event listener after closing the dropdown
        closeDropdownListener = function(event) {
            closeDropdownOnClickOutside(event, filterButtonId, dropdownId);
        };
    }
}

document.addEventListener('DOMContentLoaded', function () {
    let checkboxes = document.getElementsByName('category');
    let categories = [];
    let type; 

    // Function to update the result array whenever a checkbox is checked/unchecked
    function updateCheckedItems() {
        let selectedType = document.querySelector('input[name="type"]:checked');
        categories = [];  // Reset result array

        if (selectedType) {
            type = selectedType.value;  // Update type with the selected radio value
        }

        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                categories.push(checkboxes[i].value);  // Add the checked value to result
            }
        }
        console.log(categories);  // Log the current checked items
        console.log(type); 
    }

    // Add event listener to each checkbox
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('change', updateCheckedItems);  // Listen for changes
    }

    let radioButtons = document.getElementsByName('type');
    for (let i = 0; i < radioButtons.length; i++) {
        radioButtons[i].addEventListener('change', updateCheckedItems);  // Listen for changes on radio buttons
    }
});