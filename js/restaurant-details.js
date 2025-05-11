document.addEventListener('DOMContentLoaded', function() {
    // Get restaurant name from URL
    const urlParams = new URLSearchParams(window.location.search);
    const restaurantName = decodeURIComponent(urlParams.get('name'));

    // Get restaurant data from JSON
    const restaurantData = JSON.parse(document.getElementById('restaurantData').textContent);
    const restaurant = restaurantData.restaurants.find(r => r.name === restaurantName);

    if (!restaurant) {
        // Redirect if restaurant not found
        window.location.href = 'taste-match-results.html';
        return;
    }

    // Populate page elements
    populateRestaurantDetails(restaurant);

    // Add event listener to book button
    document.getElementById('bookBtn').addEventListener('click', function(e) {
        handleBookTable(e, restaurant.name);
    });
});

function populateRestaurantDetails(restaurant) {
    // Basic info
    document.getElementById('restaurantName').textContent = restaurant.name;
    document.getElementById('restaurantDescription').textContent = restaurant.description;
    document.getElementById('restaurantAddress').textContent = restaurant.address;
    document.getElementById('restaurantHours').textContent = restaurant.hours;
    document.getElementById('restaurantPhone').textContent = restaurant.phone;
    document.getElementById('restaurantDietary').textContent = restaurant.dietary_restrictions.join(', ');
    document.getElementById('bookBtn').href = restaurant.book_url;

    // Image with error handling
    const imgElement = document.getElementById('restaurantImage');
    imgElement.src = restaurant.thumbnail || 'images/default-restaurant.jpg';
    imgElement.alt = restaurant.alt_text || restaurant.name;
    imgElement.onerror = function() {
        this.src = 'images/default-restaurant.jpg';
    };

    // Price badge
    const priceBadge = document.getElementById('priceBadge');
    priceBadge.textContent = restaurant.price_range;
    priceBadge.className = `badge me-2 mb-2 ${getPriceBadgeClass(restaurant.price_range)}`;

    // Cuisine badges
    const cuisineBadges = document.getElementById('cuisineBadges');
    cuisineBadges.innerHTML = ''; // Clear existing badges
    restaurant.cuisine.forEach(cuisine => {
        const badge = document.createElement('span');
        badge.className = 'badge bg-secondary me-2 mb-2';
        badge.textContent = cuisine;
        cuisineBadges.appendChild(badge);
    });
}

function getPriceBadgeClass(priceRange) {
    switch(priceRange) {
        case '£': return 'bg-success';
        case '££': return 'bg-warning text-dark';
        case '£££': return 'bg-danger';
        default: return 'bg-secondary';
    }
}

function handleBookTable(event, restaurantName) {
    event.preventDefault();
    const bookUrl = document.getElementById('bookBtn').href;

    // Create and show modal
    const modalHTML = `
        <div class="modal fade" id="bookingModal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Booking Instructions</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <p>You're being taken to ${restaurantName}'s booking page.</p>
                        <p>After completing your reservation, please return to continue exploring Edinburgh!</p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" id="confirmBooking">Continue to Booking</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    const modal = new bootstrap.Modal(document.getElementById('bookingModal'));
    modal.show();

    document.getElementById('confirmBooking').addEventListener('click', function() {
        window.open(bookUrl, '_blank'); // Open in a new tab
        modal.hide();
    });

    // Clean up modal after close
    document.getElementById('bookingModal').addEventListener('hidden.bs.modal', function() {
        this.remove();
    });
}