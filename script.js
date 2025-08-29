// ==============================
// SLIDER
// ==============================
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const hero = document.querySelector(".hero");
let autoPlay;

function showSlide(n) {
  slides.forEach((slide, i) => {
    slide.classList.toggle("active", i === n);
  });
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === n);
  });
  slideIndex = n;
}
function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
}
function prevSlide() {
  slideIndex = (slideIndex - 1 + slides.length) % slides.length;
  showSlide(slideIndex);
}

if (nextBtn) nextBtn.addEventListener("click", nextSlide);
if (prevBtn) prevBtn.addEventListener("click", prevSlide);
dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));

function startAutoPlay() { autoPlay = setInterval(nextSlide, 5000); }
function stopAutoPlay() { clearInterval(autoPlay); }

if (slides.length > 0) {
  showSlide(slideIndex);
  startAutoPlay();
}
if (hero) {
  hero.addEventListener("mouseenter", stopAutoPlay);
  hero.addEventListener("mouseleave", startAutoPlay);
}

// ==============================
// CARRITO LATERAL
// ==============================
let cart = [];
const cartBtn = document.querySelector(".cart");
const cartCount = document.querySelector(".cart-count");
const cartPanel = document.getElementById("cart-panel");
const overlay = document.getElementById("overlay");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const closeCartBtn = document.querySelector(".close-cart");
const checkoutBtn = document.getElementById("checkout-btn");
const clearCartBtn = document.getElementById("clear-cart");

function openCart() {
  cartPanel.classList.add("active");
  overlay.classList.add("active");
}
function closeCart() {
  cartPanel.classList.remove("active");
  overlay.classList.remove("active");
}
if (cartBtn) cartBtn.addEventListener("click", openCart);
if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);
if (overlay) overlay.addEventListener("click", closeCart);

function updateCart() {
  cartCount.textContent = cart.length;
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="empty">⚠️ No tienes productos aún</p>`;
    cartTotal.textContent = "0.00";
    return;
  }
  let total = 0;
  cart.forEach((item, index) => {
    total += item.precio;
    let div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.img}" alt="${item.nombre}">
      <div class="cart-item-info">
        <h4>${item.nombre}</h4>
        <span>S/ ${item.precio.toFixed(2)}</span>
      </div>
      <button class="remove-btn" title="Eliminar">❌</button>
    `;
    div.querySelector(".remove-btn").addEventListener("click", () => removeFromCart(index));
    cartItems.appendChild(div);
  });
  cartTotal.textContent = total.toFixed(2);
}
function addToCart(nombre, precio, img = "https://picsum.photos/60") {
  cart.push({ nombre, precio, img });
  updateCart();
}
function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}
function clearCart() {
  if (cart.length === 0) return;
  if (confirm("🗑️ ¿Vaciar todo el carrito?")) {
    cart = [];
    updateCart();
  }
}
function checkout() {
  if (cart.length === 0) {
    alert("⚠️ Tu carrito está vacío.");
    return;
  }
  alert("✅ Gracias por tu compra en JONZKO!");
  cart = [];
  updateCart();
  closeCart();
}
if (clearCartBtn) clearCartBtn.addEventListener("click", clearCart);
if (checkoutBtn) checkoutBtn.addEventListener("click", checkout);

// ==============================
// BOTONES "AÑADIR" + MODAL RÁPIDO
// ==============================
const modal = document.getElementById("modal-rapido");
const modalImg = document.getElementById("modal-img");
const modalNombre = document.getElementById("modal-nombre");
const modalPrecio = document.getElementById("modal-precio");
const modalAddBtn = document.getElementById("modal-add");
const cerrarModal = document.querySelector(".cerrar");

let tempProducto = null;

document.querySelectorAll(".btn-rapido").forEach(btn => {
  btn.addEventListener("click", () => {
    const nombre = btn.dataset.name;
    const precio = parseFloat(btn.dataset.price);
    const img = btn.dataset.img;

    tempProducto = { nombre, precio, img };

    modalNombre.textContent = nombre;
    modalPrecio.textContent = `S/ ${precio}`;
    modalImg.src = img;

    modal.style.display = "flex";
  });
});

if (cerrarModal) {
  cerrarModal.addEventListener("click", () => { modal.style.display = "none"; });
}
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});

if (modalAddBtn) {
  modalAddBtn.addEventListener("click", () => {
    if (tempProducto) {
      addToCart(tempProducto.nombre, tempProducto.precio, tempProducto.img);
      modal.style.display = "none";
      openCart();
    }
  });
}

// ==============================
// MENÚ HAMBURGUESA
// ==============================
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// ==============================
// INICIAR CON CARRITO VACÍO
// ==============================
updateCart();
