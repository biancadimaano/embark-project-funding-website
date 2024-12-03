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

                b = document.createElement("DIV");

                // Make the matching letters bold
                b.innerHTML = arr[i].substr(0, val.length);
                b.innerHTML += arr[i].substr(val.length);

                // Insert a hidden input to hold the selected value
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";

                // When an item is clicked, set the value of the input field to the clicked value
                b.addEventListener("click", function(e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    console.log("inp.value " + inp.value);
                    closeAllLists();
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
        closeAllLists(e.target);
    });
}

// Initialize autocomplete on the search input field
var searchInput = document.getElementById("searchInput");
autocomplete(searchInput, available_opportunities);