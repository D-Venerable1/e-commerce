// JavaScript for Image Modal and Cart Functionality

let currentImageIndex = 0; //This variable keeps track of the currently selected image's index in the images array.
let quantity = 0; //This variable stores the quantity of items added to the cart.
let itemPrice = 125; // Price per item
let cartItems = 0;//This variable tracks the total number of items added to the cart

// Image paths
const images = [
    './images/image-product-1.jpg',
    './images/image-product-2.jpg',
    './images/image-product-3.jpg',
    './images/image-product-4.jpg'
];
// Select Elements
const thumbnails = document.querySelectorAll('.thumbnails img'); //This selects all the image elements within the thumbnails container.
const mainImage = document.querySelector('.selection-space img');//This selects the main image element in the selection-space
const quantityDisplay = document.getElementById('quantity');// This element shows the current quantity of items the user wants to add to the cart.
const cartAmount = document.querySelector('.cart-amount');//This element displays the total number of items in the cart
const cartDropdown = document.createElement('div');
cartDropdown.classList.add('cart-dropdown');//This dropdown is used to display the cart's contents.
document.body.appendChild(cartDropdown);

// Event Listeners
//This block adds a click event listener to each thumbnail image.
thumbnails.forEach((thumbnail, index) => { 
    thumbnail.addEventListener('click', () => {
        currentImageIndex = index;
        mainImage.src = images[index];
        openImageModal();
    });
});

document.getElementById('increase').addEventListener('click', () => {
    updateQuantity(1);
});

document.getElementById('decrease').addEventListener('click', () => {
    updateQuantity(-1);
});

document.querySelector('.add-to-cart').addEventListener('click', addToCart);
document.querySelector('.cart').addEventListener('click', toggleCartDropdown);

// Functions
function openImageModal() {
    const modal = document.createElement('div');
    modal.classList.add('image-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <img src="${images[currentImageIndex]}" alt="Product Image">
            <div class="modal-nav">
                <button class="modal-prev">&#10094;</button>
                <button class="modal-next">&#10095;</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-modal').addEventListener('click', () => {
        modal.remove();
    });

    modal.querySelector('.modal-prev').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        modal.querySelector('img').src = images[currentImageIndex];
    });

    modal.querySelector('.modal-next').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        modal.querySelector('img').src = images[currentImageIndex];
    });
}

function updateQuantity(change) {
    quantity = Math.max(0, quantity + change); //ensures the quantity never goes below zero.
    quantityDisplay.textContent = quantity; 
}

function addToCart() {
    cartItems += quantity; //adds the current quantity to the total cart items.
    cartAmount.textContent = cartItems; //show the total number of items in the cart.
    updateCartDropdown();
    quantity = 0; // Reset quantity
    quantityDisplay.textContent = quantity;
}

function toggleCartDropdown() {
    cartDropdown.classList.toggle('show');
}

function updateCartDropdown() {
    if (cartItems > 0) {
        cartDropdown.innerHTML = `
            <div class="cart-item">
                <img src="${images[0]}" alt="Product Image">
                <div>
                    <p>Fall Limited Edition Sneakers</p>
                    <p>$${itemPrice}.00 x ${cartItems} <span>= $${itemPrice * cartItems}</span></p>
                </div>
            </div>
            <button onclick="checkout()">Checkout</button>
        `;
    } else {
        cartDropdown.innerHTML = '<p>Your cart is empty.</p>';
    }
}

// Function to handle checkout
function checkout() {
    alert('Proceeding to checkout');
    cartItems = 0;
    cartAmount.textContent = cartItems;
    updateCartDropdown();
}

// CSS for the modal
const modalStyles = document.createElement('style');
modalStyles.innerHTML = `
    .image-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
    .modal-content {
        position: relative;
        max-width: 80%;
        max-height: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .modal-content img {
        width: 70%;
        max-height: 75vh;
        border-radius: 10px;
    }
    .close-modal {
        position: absolute;
        top: 20px;
        right: 20px;
        font-size: 2rem;
        color: white;
        cursor: pointer;
    }
    .modal-nav {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 10px;
    }
    .modal-prev, .modal-next {
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
    }
    .cart-dropdown {
        position: absolute;
        right: 2em;
        top: 4em;
        background: white;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        padding: 1em;
        display: none;
        z-index: 1000;
        border-radius: 5px;
    }
    .cart-dropdown.show {
        display: block;
    }
    .cart-dropdown p {
        margin: 0.5em 0;
    }
    .cart-dropdown .cart-item {
        display: flex;
        align-items: center;
        margin-bottom: 1em;
    }
    .cart-dropdown .cart-item img {
        width: 50px;
        height: auto;
        margin-right: 10px;
    }
    .cart-dropdown button {
        background: #FF7D1B;
        color: white;
        border: none;
        padding: 0.5em 1em;
        border-radius: 5px;
        cursor: pointer;
    }
`;
document.head.appendChild(modalStyles);

