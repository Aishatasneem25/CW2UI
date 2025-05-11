document.addEventListener('DOMContentLoaded', function() {
    // Get filtered restaurants from sessionStorage
    const filteredRestaurants = JSON.parse(sessionStorage.getItem('filteredRestaurants')) || [];
    const resultsContainer = document.getElementById('resultsContainer');
    const noResults = document.getElementById('noResults');
    const resultsCount = document.getElementById('resultsCount');

    // Utility: Converts price ranges to numeric value for sorting
    function priceToNumber(price) {
        return price === '£' ? 1 : price === '££' ? 2 : price === '£££' ? 3 : 0;
    }

    // Display restaurants
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

            // Handle image path
            const imgPath = getImagePath(restaurant.thumbnail);

            // Handle price badge class
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
                            <a href="${restaurant.book_url}" class="btn btn-primary" target="_blank">
                                Book a Table <i class="fas fa-external-link-alt ms-1"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;

            resultsContainer.appendChild(card);
        });
    }

    // Image path resolver
    function getImagePath(thumbnail) {
        if (!thumbnail || thumbnail.trim() === '') return 'images/default-restaurant.jpg';
        if (thumbnail.startsWith('http') || thumbnail.startsWith('/')) return thumbnail;
        if (thumbnail.startsWith('images/')) return thumbnail;
        return thumbnail.includes('.') ? `images/${thumbnail}` : `images/${thumbnail}.jpg`;
    }

    // Price badge class
    function getPriceBadgeClass(priceRange) {
        switch (priceRange) {
            case '£': return 'bg-success';
            case '££': return 'bg-warning text-dark';
            case '£££': return 'bg-danger';
            default: return 'bg-secondary';
        }
    }

    // Initial display of restaurants
    displayRestaurants(filteredRestaurants);

    // If no results were passed, show a message and provide link back to search
    if (filteredRestaurants.length === 0) {
        noResults.classList.remove('d-none');
    }
});