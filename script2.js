let allProducts = [];

// Fetch the data from the API
fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
    .then(response => response.json())
    .then(data => {
        allProducts = data.categories.reduce((acc, category) => {
            category.category_products.forEach(product => {
                product.category = category.category_name;
                acc.push(product);
            });
            return acc;
        }, []);

        displayProducts(allProducts);
    })
    .catch(error => console.error('Error fetching data:', error));

// Function to display products
function displayProducts(products) {
    const container = document.getElementById('productContainer');
    container.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: ₹${product.price}</p>
            <p>Compare at Price: ₹${product.compare_at_price}</p>
            <p>Vendor: ${product.vendor}</p>
            <p>${product.badge_text ? product.badge_text : ''}</p>
            <button onclick="addToCart('${product.id}', '${product.title}', '${product.price}', '${product.image}')">Add to Cart</button>
        `;
        container.appendChild(productElement);
    });
}

// Function to add a product to the cart
function addToCart(id, title, price, image) {
    const product = { id, title, price, image };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

// Function to filter products by category
function filterProducts(category) {
    // Remove 'active' class from all links
    const links = document.querySelectorAll('nav ul li a');
    links.forEach(link => link.classList.remove('active'));

    // Add 'active' class to the clicked link
    const activeLink = Array.from(links).find(link => link.textContent.toLowerCase() === category.toLowerCase());
    if (activeLink) {
        activeLink.classList.add('active');
    }

    if (category === 'all') {
        displayProducts(allProducts);
    } else {
        const filteredProducts = allProducts.filter(product =>
            product.category.toLowerCase() === category.toLowerCase()
        );
        displayProducts(filteredProducts);
    }
}

// Function to search products
function searchProducts() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchInput) ||
        product.vendor.toLowerCase().includes(searchInput)
    );
    displayProducts(filteredProducts);
}
