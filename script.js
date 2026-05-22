const packs = [
  {
    id: "pack-elegance",
    name: "Pack Elegance",
    category: "Packs",
    price: "249 DH",
    description:
      "Un collier fin, un bracelet lumineux et une bague delicate pour une allure raffinee.",
    image: "images/stock/pack-elegance.jpg",
    accent: { background: "#f5dde3", detail: "#caa46a" }
  },
  {
    id: "pack-love",
    name: "Pack Love",
    category: "Packs",
    price: "219 DH",
    description:
      "Des tons doux et romantiques pour un style feminin, leger et facile a offrir.",
    image: "images/stock/pack-love.jpg",
    accent: { background: "#f1e2d9", detail: "#bb8f52" }
  },
  {
    id: "pack-chic",
    name: "Pack Chic",
    category: "Packs",
    price: "269 DH",
    description:
      "Une composition moderne et minimaliste pour illuminer les looks du quotidien.",
    image: "images/stock/pack-chic.jpg",
    accent: { background: "#f6e9e1", detail: "#c48f97" }
  }
];

const products = [
  {
    id: "collier-perle-douce",
    name: "Collier Perle Douce",
    category: "Colliers",
    price: "89 DH",
    description: "Un collier delicat a porter seul ou en accumulation.",
    image: "images/stock/collier-pearl-closeup.jpg",
    accent: { background: "#f5dde3", detail: "#caa46a" }
  },
  {
    id: "collier-dore-fin",
    name: "Collier Dore Fin",
    category: "Colliers",
    price: "95 DH",
    description: "Une piece fine et lumineuse pour sublimer toutes vos tenues.",
    image: "images/stock/collier-pearl-model.jpg",
    accent: { background: "#f2e3d7", detail: "#c19454" }
  },
  {
    id: "collier-luna",
    name: "Collier Luna",
    category: "Colliers",
    price: "105 DH",
    description: "Un pendentif chic au style simple et moderne.",
    image: "images/stock/collier-pearl-closeup.jpg",
    accent: { background: "#f8e6ea", detail: "#c38f97" }
  },
  {
    id: "bracelet-love",
    name: "Bracelet Love",
    category: "Bracelets",
    price: "69 DH",
    description: "Un bracelet fin et doux, facile a associer au quotidien.",
    image: "images/stock/bracelet-beaded.jpg",
    accent: { background: "#f4dfe4", detail: "#be8f61" }
  },
  {
    id: "bracelet-elegance",
    name: "Bracelet Elegance",
    category: "Bracelets",
    price: "79 DH",
    description: "Une touche chic et legere pour illuminer le poignet.",
    image: "images/stock/bracelet-gold.jpg",
    accent: { background: "#f4e7df", detail: "#c39c62" }
  },
  {
    id: "bracelet-etoile",
    name: "Bracelet Etoile",
    category: "Bracelets",
    price: "74 DH",
    description: "Un design feminin avec un joli detail inspire des etoiles.",
    image: "images/stock/bracelet-gold.jpg",
    accent: { background: "#f8eae4", detail: "#c38f97" }
  },
  {
    id: "bague-luna",
    name: "Bague Luna",
    category: "Bagues",
    price: "59 DH",
    description: "Une bague minimaliste pour une finition moderne et elegante.",
    image: "images/stock/ring-closeup.jpg",
    accent: { background: "#f8e1e4", detail: "#b98f4b" }
  },
  {
    id: "bague-chic",
    name: "Bague Chic",
    category: "Bagues",
    price: "65 DH",
    description: "Une silhouette fine et raffinee, parfaite pour tous les jours.",
    image: "images/stock/ring-closeup.jpg",
    accent: { background: "#f5e8df", detail: "#c59378" }
  },
  {
    id: "bague-glow",
    name: "Bague Glow",
    category: "Bagues",
    price: "72 DH",
    description: "Une bague lumineuse au charme discret et feminin.",
    image: "images/stock/ring-closeup.jpg",
    accent: { background: "#f6dce4", detail: "#c69d5f" }
  }
];

const catalog = [...packs, ...products];
const catalogById = new Map(catalog.map((item) => [item.id, item]));

const packsGrid = document.querySelector("#packs-grid");
const productsGrid = document.querySelector("#products-grid");
const filterButtons = document.querySelectorAll(".filter-button");
const categoryLinks = document.querySelectorAll(".category-link");
const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const navCartButton = document.querySelector("#nav-cart-button");
const navCartCount = document.querySelector("#nav-cart-count");
const cartOverlay = document.querySelector("#cart-overlay");
const cartDrawer = document.querySelector("#cart-drawer");
const cartClose = document.querySelector("#cart-close");
const cartList = document.querySelector("#cart-list");
const cartEmpty = document.querySelector("#cart-empty");
const cartCount = document.querySelector("#cart-count");
const cartItemsTotal = document.querySelector("#cart-items-total");
const cartTotal = document.querySelector("#cart-total");
const cartCheckout = document.querySelector("#cart-checkout");
const cartClear = document.querySelector("#cart-clear");

const checkoutOverlay = document.querySelector("#checkout-overlay");
const checkoutModal = document.querySelector("#checkout-modal");
const checkoutClose = document.querySelector("#checkout-close");
const checkoutForm = document.querySelector("#checkout-form");
const checkoutFullname = document.querySelector("#checkout-fullname");
const checkoutPhone = document.querySelector("#checkout-phone");
const checkoutCity = document.querySelector("#checkout-city");
const checkoutStatus = document.querySelector("#checkout-status");

let cart = loadCart();
let revealObserver;

function loadCart() {
  try {
    const saved = window.localStorage.getItem("glow-cart");
    const parsed = saved ? JSON.parse(saved) : [];

    return parsed.filter((item) => catalogById.has(item.id) && item.quantity > 0);
  } catch (error) {
    return [];
  }
}

function saveCart() {
  window.localStorage.setItem("glow-cart", JSON.stringify(cart));
}

function parsePrice(price) {
  return Number.parseInt(price.replace(/[^\d]/g, ""), 10) || 0;
}

function formatPrice(amount) {
  return `${amount} DH`;
}

function getCartCountLabel(count) {
  return `${count} ${count > 1 ? "articles" : "article"}`;
}

function openCart() {
  document.body.classList.add("cart-open");
  cartOverlay.hidden = false;
  cartDrawer.setAttribute("aria-hidden", "false");
}

function closeCart() {
  document.body.classList.remove("cart-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  cartOverlay.hidden = true;
}

function applyRevealDelay(containerSelector, itemSelector, startDelay = 0.08) {
  const container = document.querySelector(containerSelector);

  if (!container) {
    return;
  }

  container.querySelectorAll(itemSelector).forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${startDelay + index * 0.12}s`);
  });
}

function createPlaceholder(label, background, detail) {
  const safeLabel = label.replace(/&/g, "&amp;");
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600" role="img" aria-label="${safeLabel}">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${background}" />
          <stop offset="100%" stop-color="#fffaf8" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg)" rx="40" />
      <circle cx="650" cy="120" r="88" fill="${detail}" fill-opacity="0.18" />
      <circle cx="160" cy="470" r="120" fill="${detail}" fill-opacity="0.12" />
      <path d="M210 292c52-76 129-115 230-115 79 0 143 23 194 70" fill="none" stroke="${detail}" stroke-opacity="0.55" stroke-width="9" stroke-linecap="round"/>
      <path d="M266 354c42-38 96-57 163-57 54 0 102 14 144 40" fill="none" stroke="${detail}" stroke-opacity="0.42" stroke-width="7" stroke-linecap="round"/>
      <circle cx="337" cy="246" r="20" fill="${detail}" fill-opacity="0.25" />
      <circle cx="510" cy="330" r="16" fill="${detail}" fill-opacity="0.22" />
      <text x="400" y="500" text-anchor="middle" fill="#6d5357" font-family="Cormorant Garamond, Georgia, serif" font-size="50" font-weight="600">${safeLabel}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function addToCart(itemId) {
  const existingItem = cart.find((item) => item.id === itemId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: itemId, quantity: 1 });
  }

  saveCart();
  renderCart();
}

function updateCartItem(itemId, delta) {
  cart = cart
    .map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + delta } : item
    )
    .filter((item) => item.quantity > 0);

  saveCart();
  renderCart();
}

function removeFromCart(itemId) {
  cart = cart.filter((item) => item.id !== itemId);
  saveCart();
  renderCart();
}

function clearCart() {
  cart = [];
  saveCart();
  renderCart();
}

function normalizeField(value) {
  return String(value || "")
    .trim()
    .replace(/\s+/g, " ");
}

function getOrderEndpoint() {
  const meta = document.querySelector('meta[name="order-endpoint"]');
  if (!meta) {
    return "";
  }

  return normalizeField(meta.getAttribute("content"));
}

function loadCheckoutInfo() {
  try {
    const raw = window.localStorage.getItem("glow-checkout");
    const parsed = raw ? JSON.parse(raw) : null;
    if (!parsed || typeof parsed !== "object") {
      return { fullname: "", phone: "", city: "" };
    }

    return {
      fullname: normalizeField(parsed.fullname),
      phone: normalizeField(parsed.phone),
      city: normalizeField(parsed.city)
    };
  } catch (error) {
    return { fullname: "", phone: "", city: "" };
  }
}

function saveCheckoutInfo(info) {
  window.localStorage.setItem("glow-checkout", JSON.stringify(info));
}

function getCartDetails() {
  let total = 0;
  const lines = [];
  const items = [];

  cart.forEach((item) => {
    const catalogItem = catalogById.get(item.id);
    const unitPrice = parsePrice(catalogItem.price);
    const lineTotal = unitPrice * item.quantity;
    total += lineTotal;

    lines.push(
      `- ${catalogItem.name} x${item.quantity} (${catalogItem.price}) = ${formatPrice(lineTotal)}`
    );

    items.push({
      id: catalogItem.id,
      name: catalogItem.name,
      category: catalogItem.category,
      quantity: item.quantity,
      unit_price_label: catalogItem.price,
      unit_price_dh: unitPrice,
      line_total_dh: lineTotal
    });
  });

  return { lines, total, items };
}

function buildOrderMessage(info) {
  const cartDetails = getCartDetails();

  const lines = [
    "Bonjour Glow Accessories, je souhaite commander :",
    "",
    "Informations client :",
    `Nom complet : ${info.fullname}`,
    `Telephone : ${info.phone}`,
    `Ville : ${info.city}`,
    "",
    "Panier :",
    ...cartDetails.lines,
    "",
    `Total estime : ${formatPrice(cartDetails.total)}`
  ];

  return lines.join("\n");
}

function setCheckoutStatus(message, type = "") {
  if (!checkoutStatus) {
    return;
  }

  checkoutStatus.textContent = message || "";
  checkoutStatus.classList.toggle("is-error", type === "error");
  checkoutStatus.classList.toggle("is-success", type === "success");
}

async function submitOrder(info) {
  const endpoint = getOrderEndpoint();

  if (!endpoint) {
    throw new Error(
      "Endpoint manquant. Ajoutez votre URL Google Sheets dans la balise meta order-endpoint."
    );
  }

  const cartDetails = getCartDetails();
  const payload = {
    created_at: new Date().toISOString(),
    fullname: info.fullname,
    phone: info.phone,
    city: info.city,
    total_dh: cartDetails.total,
    items: cartDetails.items,
    message: buildOrderMessage(info),
    page_url: window.location.href,
    user_agent: window.navigator.userAgent
  };

  const body = JSON.stringify(payload);

  if ("sendBeacon" in navigator) {
    const ok = navigator.sendBeacon(endpoint, body);
    if (!ok) {
      throw new Error("Envoi bloque par le navigateur.");
    }
    return true;
  }

  const response = await fetch(endpoint, {
    method: "POST",
    mode: "no-cors",
    headers: {
      "Content-Type": "text/plain;charset=utf-8"
    },
    body
  });

  return response;
}

function openCheckout() {
  if (!checkoutOverlay || !checkoutModal) {
    return;
  }

  setCheckoutStatus("");
  const saved = loadCheckoutInfo();
  checkoutFullname.value = saved.fullname;
  checkoutPhone.value = saved.phone;
  checkoutCity.value = saved.city;

  document.body.classList.add("checkout-open");
  checkoutOverlay.hidden = false;
  checkoutModal.hidden = false;

  window.setTimeout(() => {
    if (checkoutFullname) {
      checkoutFullname.focus();
    }
  }, 0);
}

function closeCheckout() {
  if (!checkoutOverlay || !checkoutModal) {
    return;
  }

  document.body.classList.remove("checkout-open");
  checkoutModal.hidden = true;
  checkoutOverlay.hidden = true;
  setCheckoutStatus("");
}

function renderCart() {
  cartList.innerHTML = "";

  const itemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = cart.reduce((sum, item) => {
    const catalogItem = catalogById.get(item.id);
    return sum + parsePrice(catalogItem.price) * item.quantity;
  }, 0);

  cart.forEach((item) => {
    const catalogItem = catalogById.get(item.id);
    const lineTotal = parsePrice(catalogItem.price) * item.quantity;
    const cartItem = document.createElement("article");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <img class="cart-item-image" src="${catalogItem.image}" alt="${catalogItem.name}" loading="lazy" />
      <div class="cart-item-content">
        <div class="cart-item-top">
          <div>
            <h4>${catalogItem.name}</h4>
            <p>${catalogItem.category}</p>
          </div>
          <strong>${formatPrice(lineTotal)}</strong>
        </div>
        <div class="cart-item-actions">
          <div class="quantity-control" aria-label="Quantite">
            <button type="button" data-action="decrease" data-item-id="${catalogItem.id}">-</button>
            <span>${item.quantity}</span>
            <button type="button" data-action="increase" data-item-id="${catalogItem.id}">+</button>
          </div>
          <button class="remove-link" type="button" data-action="remove" data-item-id="${catalogItem.id}">
            Retirer
          </button>
        </div>
      </div>
    `;

    cartList.appendChild(cartItem);
  });

  const isEmpty = cart.length === 0;
  cartEmpty.hidden = !isEmpty;
  cartCount.textContent = getCartCountLabel(itemsCount);
  navCartCount.textContent = String(itemsCount);
  cartItemsTotal.textContent = String(itemsCount);
  cartTotal.textContent = formatPrice(total);

  if (isEmpty) {
    cartCheckout.setAttribute("href", "#");
    cartCheckout.setAttribute("aria-disabled", "true");
    cartCheckout.classList.add("disabled");
  } else {
    cartCheckout.setAttribute("href", "#");
    cartCheckout.setAttribute("aria-disabled", "false");
    cartCheckout.classList.remove("disabled");
  }
}

function createCard(item, type) {
  const card = document.createElement("article");
  card.className = `${type}-card reveal`;

  const image =
    item.image ||
    createPlaceholder(item.name, item.accent.background, item.accent.detail);

  const categoryMarkup =
    type === "product"
      ? `<span class="product-category">${item.category}</span>`
      : `<span class="pack-price">${item.price}</span>`;

  const priceMarkup =
    type === "product"
      ? `<span class="product-price">${item.price}</span>`
      : "";

  card.innerHTML = `
    <div class="card-media">
      <img src="${image}" alt="${item.name}" loading="lazy" />
    </div>
    <div class="card-body">
      <div class="card-meta">
        ${categoryMarkup}
        ${priceMarkup}
      </div>
      <div>
        <h3>${item.name}</h3>
        <p>${item.description}</p>
      </div>
      <div class="card-actions">
        <button class="button button-secondary add-to-cart-button" type="button" data-item-id="${item.id}">
          Ajouter au panier
        </button>
      </div>
    </div>
  `;

  return card;
}

function renderPacks() {
  packsGrid.innerHTML = "";
  packs.forEach((pack) => {
    packsGrid.appendChild(createCard(pack, "pack"));
  });

  applyRevealDelay("#packs-grid", ".pack-card", 0.1);
}

function renderProducts(filter = "Tous") {
  productsGrid.innerHTML = "";

  const filteredProducts =
    filter === "Tous"
      ? products
      : products.filter((product) => product.category === filter);

  filteredProducts.forEach((product) => {
    productsGrid.appendChild(createCard(product, "product"));
  });

  applyRevealDelay("#products-grid", ".product-card", 0.08);
  initReveal();
}

function initFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");

      renderProducts(filter);
    });
  });

  categoryLinks.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filterTarget;
      const targetButton = [...filterButtons].find(
        (item) => item.dataset.filter === filter
      );

      filterButtons.forEach((item) => item.classList.remove("active"));

      if (targetButton) {
        targetButton.classList.add("active");
      }

      renderProducts(filter);
      document.querySelector("#produits").scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    });
  });
}

function initMenu() {
  if (!menuToggle || !siteNav) {
    return;
  }

  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initCartEvents() {
  [packsGrid, productsGrid].forEach((grid) => {
    grid.addEventListener("click", (event) => {
      const button = event.target.closest(".add-to-cart-button");

      if (!button) {
        return;
      }

      addToCart(button.dataset.itemId);
    });
  });

  cartList.addEventListener("click", (event) => {
    const control = event.target.closest("[data-action]");

    if (!control) {
      return;
    }

    const { action, itemId } = control.dataset;

    if (action === "increase") {
      updateCartItem(itemId, 1);
      return;
    }

    if (action === "decrease") {
      updateCartItem(itemId, -1);
      return;
    }

    if (action === "remove") {
      removeFromCart(itemId);
    }
  });

  cartClear.addEventListener("click", clearCart);

  cartCheckout.addEventListener("click", (event) => {
    if (cart.length === 0) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    openCheckout();
  });
}

function initCartDrawer() {
  navCartButton.addEventListener("click", () => {
    if (siteNav.classList.contains("is-open")) {
      siteNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    }

    openCart();
  });
  cartClose.addEventListener("click", closeCart);
  cartOverlay.addEventListener("click", closeCart);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (document.body.classList.contains("checkout-open")) {
        closeCheckout();
      } else {
        closeCart();
      }
    }
  });
}

function initCheckoutForm() {
  if (!checkoutOverlay || !checkoutModal || !checkoutForm) {
    return;
  }

  if (checkoutClose) {
    checkoutClose.addEventListener("click", closeCheckout);
  }
  checkoutOverlay.addEventListener("click", closeCheckout);

  checkoutForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    setCheckoutStatus("");

    if (cart.length === 0) {
      closeCheckout();
      return;
    }

    if (!checkoutForm.reportValidity()) {
      return;
    }

    const info = {
      fullname: normalizeField(checkoutFullname.value),
      phone: normalizeField(checkoutPhone.value),
      city: normalizeField(checkoutCity.value)
    };

    saveCheckoutInfo(info);

    const submitButton = checkoutForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
    }

    try {
      setCheckoutStatus("Envoi de la commande...", "");
      await submitOrder(info);
      setCheckoutStatus("Commande envoyee. Merci !", "success");
      clearCart();
      window.setTimeout(() => {
        closeCheckout();
        closeCart();
      }, 900);
    } catch (error) {
      setCheckoutStatus(
        `Impossible d'envoyer la commande. ${error && error.message ? error.message : ""}`.trim(),
        "error"
      );
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}

function initReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.16
      }
    );
  }

  items.forEach((item) => {
    if (!item.classList.contains("is-visible")) {
      revealObserver.observe(item);
    }
  });
}

function initSlowMotion() {
  document.querySelectorAll(".category-card").forEach((card, index) => {
    card.style.setProperty("--reveal-delay", `${0.1 + index * 0.12}s`);
  });

  document.querySelectorAll(".showcase-card").forEach((card, index) => {
    card.style.setProperty("--reveal-delay", `${0.18 + index * 0.16}s`);
  });

  window.requestAnimationFrame(() => {
    document.body.classList.add("is-loaded");
  });
}

renderPacks();
renderProducts();
renderCart();
initFilters();
initMenu();
initCartEvents();
initCartDrawer();
initCheckoutForm();
initSlowMotion();
initReveal();
