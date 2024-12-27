// Function to add an item to the basket
function addToBasket(name, price, src) {
    const item = { name, price, src };

    try {
        // Get current basket from localStorage or initialize empty array
        let basket = JSON.parse(localStorage.getItem('basket')) || [];

        // Add new item to basket
        basket.push(item);

        // Save updated basket to localStorage
        localStorage.setItem('basket', JSON.stringify(basket));

        // Optional: Alert user or update UI
        alert("Item added to basket!");
    } catch (error) {
        console.error("Failed to add item to basket:", error);
    }
}

// Function to load and display items in the basket
function loadBasket() {
    const basketContainer = document.getElementById('basket-container');
    const subtotalElement = document.getElementById('subtotal');
    const deliveryFeesElement = document.getElementById('delivery-fees');
    const serviceFeesElement = document.getElementById('service-fees');
    const totalAmountElement = document.getElementById('Total-amount');
    const totalCostElement = document.getElementById('total-cost');
    let basket = [];

    try {
        // Retrieve and parse basket from localStorage
        basket = JSON.parse(localStorage.getItem('basket')) || [];
    } catch (error) {
        console.error("Failed to load basket from localStorage:", error);
        basket = [];
    }

    if (basket.length === 0) {
        basketContainer.innerHTML = '<p>Your basket is empty.</p>';
        subtotalElement.textContent = '0.00';
        deliveryFeesElement.textContent = '0.00';
        serviceFeesElement.textContent = '0.00';
        totalAmountElement.textContent = '0.00';
        totalCostElement.textContent = '0.00';
        return;
    }

    // Calculate subtotal
    let subtotal = 0;
    basket.forEach(item => {
        subtotal += parseFloat(item.price) || 0; // Ensure that price is a number
    });

    // Define fixed values for delivery and service fees
    const deliveryFees = 2.00; // Example value
    const serviceFees = 0.50;  // Example value

    // Calculate total amount
    const totalAmount = subtotal + deliveryFees + serviceFees;

    // Update display
    subtotalElement.textContent = `${subtotal.toFixed(2)}`;
    deliveryFeesElement.textContent = `${deliveryFees.toFixed(2)}`;
    serviceFeesElement.textContent = `${serviceFees.toFixed(2)}`;
    totalAmountElement.textContent = `${totalAmount.toFixed(2)}`;
    totalCostElement.textContent = `${subtotal.toFixed(2)}`; // Total Amount matches Total Cost

    // Display basket items
    basketContainer.innerHTML = basket.map(item => `
        <div class="menu-item">
            <img src="${item.src}" alt="${item.name}" style="width: 100px; height: auto;">
            <div>
                <h3>${item.name} <span class="primary-text">${item.price}</span></h3>
            </div>
        </div>
    `).join('');
}

// Function to clear the basket
function clearBasket() {
    try {
        localStorage.removeItem('basket');
        loadBasket(); // Reload the basket to reflect the cleared state
    } catch (error) {
        console.error("Failed to clear the basket:", error);
    }
}

// Load the basket when the page is ready
document.addEventListener('DOMContentLoaded', loadBasket);