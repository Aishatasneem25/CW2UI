document.addEventListener('DOMContentLoaded', function() {
    // Get restaurant data from JSON
    const restaurantData = JSON.parse(document.getElementById('restaurantData').textContent);
    const restaurants = restaurantData.restaurants;

    // Get all unique cuisine types
    const allCuisines = new Set();
    restaurants.forEach(restaurant => {
        restaurant.cuisine.forEach(cuisine => allCuisines.add(cuisine));
    });

    // Populate cuisine selection
    const cuisineContainer = document.getElementById('cuisine-container');
    allCuisines.forEach(cuisine => {
        const cuisineId = cuisine.toLowerCase().replace(/\s+/g, '-');
        const div = document.createElement('div');
        div.className = 'col-md-4 col-6 mb-2';
        div.innerHTML = `
            <div class="form-check">
                <input class="form-check-input" type="checkbox" id="${cuisineId}" name="cuisine" value="${cuisine}">
                <label class="form-check-label" for="${cuisineId}">
                    ${cuisine}
                </label>
            </div>
        `;
        cuisineContainer.appendChild(div);
    });

    // Handle dietary restriction checkbox logic
    document.querySelectorAll('.dietary-options input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.id === 'dietaryNone' && this.checked) {
                // If "No Restrictions" is checked, uncheck other options
                document.querySelectorAll('.dietary-options input[type="checkbox"]:not(#dietaryNone)').forEach(cb => {
                    cb.checked = false;
                });
            } else if (this.checked) {
                // If any other option is checked, uncheck "No Restrictions"
                document.getElementById('dietaryNone').checked = false;
            }
            // If no checkboxes are checked, check "No Restrictions" by default
            const anyChecked = Array.from(document.querySelectorAll('.dietary-options input[type="checkbox"]')).some(cb => cb.checked);
            if (!anyChecked) {
                document.getElementById('dietaryNone').checked = true;
            }
        });
    });

    // Form submission handler
    document.getElementById('tasteForm').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission

        // Get form data
        // Get selected occasion
        const occasion = document.getElementById('occasionSelect').value;

        // Get selected cuisines
        const selectedCuisines = [];
        document.querySelectorAll('#cuisine-container input:checked').forEach(checkbox => {
            selectedCuisines.push(checkbox.value);
        });

        // Get price range
        const priceRange = document.querySelector('input[name="priceRange"]:checked').value;

        // Get dietary restrictions
        const dietaryRestrictions = [];
        document.querySelectorAll('.dietary-options input[type="checkbox"]:checked').forEach(checkbox => {
            dietaryRestrictions.push(checkbox.value);
        });

        // Filter restaurants based on selections
        const filteredRestaurants = restaurants.filter(restaurant => {
            // Check occasion (if "Any" is selected, don't filter by occasion)
            if (occasion !== 'Any' && !restaurant.occasion.includes(occasion)) {
                return false;
            }

            // Check cuisine (if any selected)
            if (selectedCuisines.length > 0) {
                const hasMatchingCuisine = selectedCuisines.some(cuisine =>
                    restaurant.cuisine.includes(cuisine)
                );
                if (!hasMatchingCuisine) return false;
            }

            // Check price range (if "Any" is selected, don't filter by price)
            if (priceRange !== 'Any' && restaurant.price_range !== priceRange) {
                return false;
            }

            // Check dietary restrictions (only apply if not "No Restrictions")
            if (dietaryRestrictions.length > 0 && !dietaryRestrictions.includes('No Restrictions')) {
                const hasMatchingDietary = dietaryRestrictions.some(dietary =>
                    restaurant.dietary_restrictions.includes(dietary)
                );
                if (!hasMatchingDietary) return false;
            }

            return true;
        });

        // Store filtered restaurants in sessionStorage
        sessionStorage.setItem('filteredRestaurants', JSON.stringify(filteredRestaurants));

        // Store original form selections for reference
        sessionStorage.setItem('tasteMatchFormData', JSON.stringify({
            occasion,
            selectedCuisines,
            priceRange,
            dietaryRestrictions
        }));

        // Redirect to results page
        window.location.href = 'taste-match-results.html';
    });
});