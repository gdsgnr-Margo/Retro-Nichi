document.addEventListener('DOMContentLoaded', function() {

  var showFormBtns = document.querySelectorAll('.showFormBtn');

  // Initialization
  showFormBtns.forEach(function(btn) {
      btn.addEventListener('click', function() {
          var productName = this.closest('.card-content').querySelector('.card-title').textContent;
          var priceText = this.closest('.card-content').querySelector('.card-price').textContent;
          var price = parseFloat(priceText.match(/([\d.]+)/)[1]); // Extract price from the text
          
          // Populate the form fields
          document.getElementById('productName').value = productName;
          document.getElementById('price').value = price.toFixed(2);
          document.getElementById('formContainer').classList.remove('hidden');
      });
  });

  // Add event listener for the close button
  document.getElementById('closeform').addEventListener('click', function() {
      document.getElementById('formContainer').classList.add('hidden');
  });

  // Add event listener for the form submit
  document.getElementById('productForm').addEventListener('submit', function(event) {
      event.preventDefault();
    
      var productName = document.getElementById('productName').value;
      var quantity = parseInt(document.getElementById('quantity').value);
      var size = document.getElementById('size').value;
      var price = parseFloat(document.getElementById('price').value);
      var additional = 0;
    
      // Set additional charges based on size
      switch(size) {
          case 'S':
              additional = 0;
              break;
          case 'M':
              additional = 10;
              break;
          case 'L':
              additional = 15;
              break;
      }
    
      var total = quantity * (price + additional);

      // My cart display
      var orderItem = document.createElement('div');
      orderItem.classList.add('order-item'); // Add the 'order-item' class
      orderItem.innerHTML = `
          <div class='box'>
              <div class='img-box'>
                  <img src="products/${productName}.png" alt="${productName}">
              </div>
              <div class='bottom'>
                  <h3>${productName}</h3>
                  <p>Size ${size}</p>
                  <p>Quantity ${quantity}</p>
                  <p>Php${total.toFixed(2)}</p>
              </div>
          </div>

          <button class="deleteBtn">Delete</button>
      `;

      // Append the styled order item to the order container
      document.getElementById('orderContainer').appendChild(orderItem);

      // Display of updated price
      var totalItemsElement = document.getElementById('total');
      var currentTotal = parseFloat(totalItemsElement.textContent.split(' ')[0]); // Extract numerical value from total text
      var newTotal = currentTotal + total;
      totalItemsElement.textContent = newTotal.toFixed(2) + ' Php';
    
      // Reset form
      document.getElementById('productForm').reset();
      document.getElementById('formContainer').classList.add('hidden');
    
      // Check if the order container is empty
      if (document.getElementById('orderContainer').childElementCount > 0) {
          document.querySelector('.cartItem').classList.add('hidden');
          // Show the "Place order" button
          document.querySelector('.place').style.display = 'inline-block';
      }
  });

  // Add event listener for deleting items from the order container
  document.getElementById('orderContainer').addEventListener('click', function(event) {
      if (event.target.classList.contains('deleteBtn')) {
          var deletedItem = event.target.parentElement;
          var totalPriceText = deletedItem.querySelector('.bottom').textContent;
          var deletedTotal = parseFloat(totalPriceText.match(/Php([\d.]+)/)[1]); // Parsing the amount prefixed with Php
      
          // Remove the item from the container
          deletedItem.remove();
      
          // Update the total by subtracting the price of the deleted item
          var totalItemsElement = document.getElementById('total');
          var currentTotal = parseFloat(totalItemsElement.textContent);
          var newTotal = currentTotal - deletedTotal;
      
          // Update the total displayed on the page
          totalItemsElement.textContent = newTotal.toFixed(2) + ' Php';
      
          // Show the "Your cart is empty" message if there are no items left
          if (document.getElementById('orderContainer').childElementCount === 0) {
              document.querySelector('.cartItem').classList.remove('hidden');
              // Hide the "Place order" button
              document.querySelector('.place').style.display = 'none';
          }
      }
  });
});
