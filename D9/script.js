document.addEventListener("DOMContentLoaded", function() {
    fetchProducts();
});

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = `
            <div class="col">
                <div class="card h-100">
                    <img src="${product.image}" class="card-img-top" alt="${product.title}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">${truncateText(product.description, 100)}</p>
                    </div>
                    <div class="card-footer text-center">
                        <small class="text-muted">$${product.price}</small>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCard;
    });
}

function truncateText(text, maxLength) {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
}