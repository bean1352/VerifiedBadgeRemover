
console.log("Content script loaded!");
// Get the entire HTML content of the current page
var htmlContent = document.documentElement.outerHTML;

// Log the HTML content to the console (for testing purposes)
//console.log(htmlContent);

var currentUrl = window.location.href;

// Check if the current domain is "twitter.com"
if (currentUrl.includes("twitter.com") || currentUrl.includes("x.com")) {
    // Create a MutationObserver instance
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // If new nodes are added
            if (mutation.addedNodes.length) {
                // Get all SVG elements
                var svgElements = document.querySelectorAll('svg');
 
                // Loop through each SVG element
                svgElements.forEach(function (svgElement) {
                    // Check if the SVG element has the aria-label attribute equal to "Verified Account"
                    var ariaLabel = svgElement.getAttribute('aria-label');
                    if (ariaLabel && ariaLabel.toLowerCase() === 'verified account') {
                        // Set the display property to none
                        svgElement.style.display = 'none';
                    }
                });
            }
        });
    });
 
    // Start observing the document with the configured parameters
    observer.observe(document.body, { childList: true, subtree: true });
 } else {
    console.log("This is a different domain");
    // Your code for other domains goes here
 }