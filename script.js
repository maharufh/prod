document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('productForm');
    const productCard = document.getElementById('productCard');
    const productImageInput = document.getElementById('productImage');

    // Load stored product data on page load
    loadProduct();

    // Form submit event
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const productName = document.getElementById('productName').value;
        const productDescription = document.getElementById('productDescription').value;

        const imageFile = productImageInput.files[0];
        if (imageFile) {
            const reader = new FileReader();
            reader.onload = function (event) {
                const productImageBase64 = event.target.result;

                // Create product object
                const product = {
                    name: productName,
                    image: productImageBase64,
                    description: productDescription
                };

                // Store product in local storage
                localStorage.setItem('product', JSON.stringify(product));

                // Display product card
                displayProduct(product);
            };

            // Read image as Base64 string
            reader.readAsDataURL(imageFile);
        }

        // Clear form
        form.reset();
    });

    // Function to load product from localStorage and display it
    function loadProduct() {
        const storedProduct = localStorage.getItem('product');
        if (storedProduct) {
            const product = JSON.parse(storedProduct);
            displayProduct(product);
        }
    }

    // Function to display product card
    function displayProduct(product) {
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
        `;
        productCard.style.display = 'block';
    }
});
