// taste-match-results.js - Complete working version

document.addEventListener('DOMContentLoaded', function() {
    // Get filtered restaurants from sessionStorage
    const filteredRestaurants = JSON.parse(sessionStorage.getItem('filteredRestaurants')) || [];
    const resultsContainer = document.getElementById('resultsContainer');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');
    const filterBy = document.getElementById('filterBy');
    const sortBy = document.getElementById('sortBy');

    // Convert price ranges to numeric value for sorting
    function priceToNumber(price) {
        return price === '£' ? 1 : price === '££' ? 2 : price === '£££' ? 3 : 0;
    }

    // Display restaurants function
    function displayRestaurants(restaurants) {
        resultsContainer.innerHTML = '';
        resultsCount.textContent = restaurants.length;

        if (restaurants.length === 0) {
            noResults.classList.remove('d-none');
            return;
        } else {
            noResults.classList.add('d-none');
        }

        restaurants.forEach(restaurant => {
            const card = document.createElement('div');
            card.className = 'col-lg-4 col-md-6 mb-4';

            const imgPath = getImagePath(restaurant.thumbnail);
            const priceBadgeClass = getPriceBadgeClass(restaurant.price_range);

            card.innerHTML = `
                <div class="card h-100 restaurant-card">
                    <img src="${imgPath}" class="card-img-top" alt="${restaurant.alt_text || restaurant.name}" 
                         onerror="this.onerror=null;this.src='images/default-restaurant.jpg'">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title mb-0">${restaurant.name}</h5>
                            <span class="badge ${priceBadgeClass}">${restaurant.price_range}</span>
                        </div>
                        <p class="card-text">${restaurant.description}</p>
                        <p class="mb-1"><strong>Cuisine:</strong> ${restaurant.cuisine.join(', ')}</p>
                        <p class="mb-1"><strong>Address:</strong> ${restaurant.address}</p>
                        <p class="mb-1"><strong>Hours:</strong> ${restaurant.hours}</p>
                    </div>
                    <div class="card-footer bg-white border-top-0">
                        <div class="d-flex justify-content-between">
                            <a href="tel:${restaurant.phone}" class="btn btn-outline-secondary">
                                <i class="fas fa-phone me-1"></i> Call
                            </a>
                            <a href="restaurant-details.html?name=${encodeURIComponent(restaurant.name)}" class="btn btn-primary">
                                Book a Table <i class="fas fa-external-link-alt ms-1"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
            resultsContainer.appendChild(card);
        });
    }

    // Helper function for image paths
    function getImagePath(thumbnail) {
        if (!thumbnail || thumbnail.trim() === '') return 'images/default-restaurant.jpg';
        if (thumbnail.startsWith('http') || thumbnail.startsWith('/')) return thumbnail;
        if (thumbnail.startsWith('images/')) return thumbnail;
        return thumbnail.includes('.') ? `images/${thumbnail}` : `images/${thumbnail}.jpg`;
    }

    // Helper function for price badge styling
    function getPriceBadgeClass(priceRange) {
        switch (priceRange) {
            case '£': return 'bg-success';
            case '££': return 'bg-warning text-dark';
            case '£££': return 'bg-danger';
            default: return 'bg-secondary';
        }
    }

    // Filter restaurants based on selected filter
    function applyFilters(restaurants) {
        const filterValue = filterBy.value;

        if (filterValue === 'all') {
            return restaurants;
        } else if (filterValue === 'price') {
            return restaurants.filter(r => r.price_range === '£');
        } else if (filterValue === 'cuisine') {
            const uniqueCuisines = [...new Set(restaurants.flatMap(r => r.cuisine))];
            const selectedCuisine = prompt(`Filter by cuisine:\n\nAvailable: ${uniqueCuisines.join(', ')}`);

            if (selectedCuisine && uniqueCuisines.includes(selectedCuisine)) {
                return restaurants.filter(r => r.cuisine.includes(selectedCuisine));
            } else if (selectedCuisine) {
                alert(`"${selectedCuisine}" not available. Showing all.`);
            }
            return restaurants;
        }
        return restaurants;
    }

    // Sort restaurants based on selected option
    function applySorting(restaurants) {
        const sortValue = sortBy.value;
        const sorted = [...restaurants];

        if (sortValue === 'name-asc') {
            sorted.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === 'name-desc') {
            sorted.sort((a, b) => b.name.localeCompare(a.name));
        } else if (sortValue === 'price-asc') {
            sorted.sort((a, b) => priceToNumber(a.price_range) - priceToNumber(b.price_range));
        } else if (sortValue === 'price-desc') {
            sorted.sort((a, b) => priceToNumber(b.price_range) - priceToNumber(a.price_range));
        }

        return sorted;
    }

    // Main function to apply filters and sorting
    function filterAndSortRestaurants() {
        let processed = applyFilters(filteredRestaurants);
        processed = applySorting(processed);
        displayRestaurants(processed);
    }

    // Event listeners
    filterBy.addEventListener('change', filterAndSortRestaurants);
    sortBy.addEventListener('change', filterAndSortRestaurants);

    // Initial display
    filterAndSortRestaurants();

    // Show message if no results
    if (filteredRestaurants.length === 0) {
        noResults.classList.remove('d-none');
    }
});