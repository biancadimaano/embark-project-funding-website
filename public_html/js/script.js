/* 
    Resources for closing a button when the user clicks outside of it
        https://stackoverflow.com/questions/152975/how-do-i-detect-a-click-outside-an-element
        https://jsfiddle.net/tedp/aL7Xe/1/
*/
let dropdownOpen = false; // To track whether the dropdown is open

function showDropdown(filterButtonId, dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    
    if (dropdownOpen) {
        document.getElementById(filterButtonId).style.border = "0.15rem solid #4D4D4D";
        dropdown.style.display = "none"; // Close dropdown
        dropdownOpen = false;
        document.removeEventListener('click', closeDropdownOnClickOutside(filterButtonId, dropdownId));
    } else {
        document.getElementById(filterButtonId).style.border = "0.2rem solid #6F9E94";
        dropdown.style.display = "block"; // Open dropdown
        dropdownOpen = true;
        // Add DOM event listener to close the dropdown when the user clicks outside of the dropdown
        document.addEventListener('click', closeDropdownOnClickOutside(filterButtonId, dropdownId));
    }
}

function closeDropdownOnClickOutside(event, filterButtonId, dropdownId) {
    const filterButton = document.getElementById('filterButtonId');
    const dropdown = document.getElementById('dropdownId');

    // Close dropdown if the user clicks outside of the dropdown 
    if (!dropdown.contains(event.target) && event.target !== filterButton) {
        dropdown.style.display = "none"; // Close dropdown
        dropdownOpen = false;
        // Remove the event listener after closing the dropdown
        document.removeEventListener('click', closeDropdownOnClickOutside(event,filterButtonId, dropdownId));
    }
}
