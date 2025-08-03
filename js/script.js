document.addEventListener('DOMContentLoaded', function() {
    // Category Switching
    const categoryLinks = document.querySelectorAll('.category-link');
    const categorySections = document.querySelectorAll('.category-section');

    categoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            categoryLinks.forEach(l => l.classList.remove('active'));
            categorySections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const category = this.getAttribute('data-category');
            document.getElementById(category).classList.add('active');
        });
    });

    // Product View Toggle (Grid/List)
    const viewButtons = document.querySelectorAll('.view-btn');
    const productView = document.getElementById('product-view');

    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            viewButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            if (this.getAttribute('data-view') === 'grid') {
                productView.classList.remove('list-view');
                productView.classList.add('grid-view');
            } else {
                productView.classList.remove('grid-view');
                productView.classList.add('list-view');
            }
        });
    });

    // Price Range Slider
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');
    const priceMax = document.getElementById('priceMax');

    if (priceRange) {
        priceValue.textContent = priceRange.value;
        priceMax.textContent = priceRange.max;

        priceRange.addEventListener('input', function() {
            priceValue.textContent = this.value;
        });
    }

    // Product Image Thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainProductImage = document.getElementById('mainProductImage');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // In a real app, you would change the main image source
            // mainProductImage.src = this.src.replace('-thumb', '-large');
        });
    });

    // Product Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Quantity Selector
    const minusButtons = document.querySelectorAll('.qty-btn.minus');
    const plusButtons = document.querySelectorAll('.qty-btn.plus');
    const quantityInputs = document.querySelectorAll('.qty-input');

    minusButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            let value = parseInt(quantityInputs[index].value);
            if (value > 1) {
                quantityInputs[index].value = value - 1;
            }
        });
    });

    plusButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            let value = parseInt(quantityInputs[index].value);
            quantityInputs[index].value = value + 1;
        });
    });

    // Add to Cart Functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.querySelector('.cart-count');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // In a real app, you would add the product to the cart
            let count = parseInt(cartCount.textContent);
            cartCount.textContent = count + 1;
            
            // Show a notification
            const notification = document.createElement('div');
            notification.className = 'notification';
            notification.textContent = 'Product added to cart!';
            document.body.appendChild(notification);
            
            setTimeout(() => {
                notification.classList.add('show');
            }, 10);
            
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 300);
            }, 3000);
        });
    });

    // Remove Item from Cart
    const removeButtons = document.querySelectorAll('.remove-item');

    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.style.animation = 'fadeOut 0.3s forwards';
            
            setTimeout(() => {
                cartItem.remove();
                updateCartTotal();
            }, 300);
        });
    });

    // Update Cart Total
    function updateCartTotal() {
        const cartItems = document.querySelectorAll('.cart-item');
        const cartItemCount = document.querySelector('#cart-item-count');
        cartItemCount.textContent = cartItems.length;
        
        // In a real app, you would also update the total price
    }

    // Initialize cart count
    if (addToCartButtons.length > 0 && !cartCount.textContent) {
        cartCount.textContent = '0';
    }

    // Mobile Menu Toggle (for smaller screens)
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const navContainer = document.querySelector('.nav-container');
    if (navContainer) {
        navContainer.prepend(mobileMenuButton);
        
        mobileMenuButton.addEventListener('click', function() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('show');
        });
    }

    // Dark Mode Toggle (Bonus Feature)
    const darkModeToggle = document.createElement('div');
    darkModeToggle.className = 'dark-mode-toggle';
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    
    document.body.appendChild(darkModeToggle);
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            this.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            this.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Check for saved dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Notification Style
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: var(--success-color);
            color: white;
            padding: 15px 25px;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
            opacity: 0;
            transition: opacity 0.3s;
            z-index: 1000;
        }
        .notification.show {
            opacity: 1;
        }
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
        }
        .dark-mode {
            background-color: #1a1a1a;
            color: #f0f0f0;
        }
        .dark-mode .navbar, 
        .dark-mode .category-nav,
        .dark-mode .product-card,
        .dark-mode .filters,
        .dark-mode .order-summary,
        .dark-mode .cart-item,
        .dark-mode .tab-content,
        .dark-mode .footer {
            background-color: #2a2a2a;
            color: #f0f0f0;
        }
        .dark-mode .search-bar input,
        .dark-mode .qty-input,
        .dark-mode .coupon-section input,
        .dark-mode .search-questions input {
            background-color: #3a3a3a;
            color: #f0f0f0;
            border-color: #4a4a4a;
        }
        .dark-mode .footer-section ul li a,
        .dark-mode .breadcrumb,
        .dark-mode .rating-count,
        .dark-mode .review-count,
        .dark-mode .question-meta {
            color: #b0b0b0;
        }
    `;
    document.head.appendChild(style);
});