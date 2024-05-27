// Function to place the order
function placeOrder() {
    // Fetch form values
    var fullName = document.getElementById('fullName').value;
    var address = document.getElementById('address').value;
    var contactNumber = document.getElementById('contactNumber').value;
    var note = document.getElementById('note').value;
    var paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    // Initialize cardDetails variable
    var cardDetails = "";

    // Check if required fields are empty
    if (fullName === "" || address === "" || contactNumber === "") {
        document.getElementById('validation').classList.remove('hidden');
        return; // Stop further processing if validation fails
    }

    // Check if contact number contains non-numeric characters
    if (!/^\d+$/.test(contactNumber)) {
        document.getElementById('wrongChar').classList.remove('hidden');
        return; // Stop further processing if validation fails
    }

    // If payment method is card, get card details
    if (paymentMethod === 'card') {
        // Check if card details contain non-numeric characters
        cardDetails = document.getElementById('cardDetails').value;
        if (!/^\d+$/.test(cardDetails)) {
            document.getElementById('wrongChar').classList.remove('hidden');
            return; // Stop further processing if validation fails
        }
    }
    
    // Display order placed popup message
    document.getElementById('orderPlacedPopup').classList.remove('hidden');
    
    // Reset form fields
    resetForm();
}


// Function to close the popup message
function closePopup() {
    document.getElementById('orderPlacedPopup').classList.add('hidden');
}

// Add event listener to the payment radio buttons
var paymentRadios = document.querySelectorAll('input[name="payment"]');
paymentRadios.forEach(function(radio) {
    radio.addEventListener('change', function() {
        if (this.value === 'card') {
            // Show card details input if "Card" option is selected
            document.getElementById('cardDetails').style.display = 'block';
        } else {
            // Hide card details input for other payment options
            document.getElementById('cardDetails').style.display = 'none';
            // Hide wrongChar message
            document.getElementById('wrongChar').classList.add('hidden');
        }
    });
});

// Function to reset the form fields
function resetForm() {
    document.getElementById('fullName').value = "";
    document.getElementById('address').value = "";
    document.getElementById('contactNumber').value = "";
    document.getElementById('note').value = "";
    document.getElementById('cardDetails').value = "";
    document.getElementById('wrongChar').classList.add('hidden');
    document.getElementById('validation').classList.add('hidden');
}
