# Glow Accessories

Site vitrine statique, simple et elegant, pour une boutique d'accessoires feminins. Le projet utilise uniquement `HTML`, `CSS` et `JavaScript`, donc il est compatible avec un hebergement gratuit sur GitHub Pages.

La commande se fait via un formulaire, puis elle est envoyee automatiquement dans une feuille **Google Sheets** (sans redirection WhatsApp).
Instagram et WhatsApp peuvent rester disponibles pour contact rapide.

## Fichiers du projet

- `index.html` : structure du site et sections principales
- `style.css` : design, responsive, animations et mise en page
- `script.js` : donnees des packs et produits, filtre par categorie, interactions
- `images/` : visuels d'exemple locaux pour les packs et les produits
- `images/stock/` : vraies photos de demonstration integrees localement

## Ouvrir le projet en local

1. Telecharge ou clone le depot sur ton ordinateur.
2. Ouvre le dossier du projet.
3. Double-clique sur `index.html`.

Tu peux aussi utiliser l'extension **Live Server** dans VS Code si tu veux un rechargement automatique pendant les modifications.

## Modifier les produits

Les produits sont definis dans `script.js` dans le tableau :

```js
const products = [
  {
    name: "Collier Perle Douce",
    category: "Colliers",
    price: "89 DH",
    description: "Un collier delicat a porter seul ou en accumulation.",
    accent: { background: "#f5dde3", detail: "#caa46a" }
  }
];
```

Pour ajouter ou modifier un produit :

1. Ouvre `script.js`.
2. Repere le tableau `products`.
3. Modifie `name`, `category`, `price`, `description`.
4. Ajuste les couleurs dans `accent` si tu veux changer le style de la carte.

Categories attendues pour le filtre :

- `Colliers`
- `Bracelets`
- `Bagues`

Si tu veux ajouter une nouvelle categorie, il faudra aussi ajouter un bouton de filtre dans `index.html`.

## Modifier les packs

Les packs sont definis dans `script.js` dans le tableau `packs`.

Tu peux changer :

- le nom
- la description
- le prix
- l'image
- les couleurs d'accent

## Changer les liens WhatsApp et Instagram

Les liens WhatsApp et Instagram sont presents directement dans `index.html` pour :

- la section contact
- le footer
- le bouton flottant WhatsApp / Instagram

Si tu changes de numero WhatsApp ou ton Instagram, remplace ces liens dans `index.html`.

## Recevoir les commandes automatiquement (Google Sheets)

Le bouton **Commander** du panier envoie la commande (nom, telephone, ville + panier) vers une URL (endpoint) configuree dans `index.html`.

### 1) Creer le Google Sheet

1. Cree une feuille Google Sheets (ex: `Glow - Commandes`).
2. Menu **Extensions** → **Apps Script**.
3. Colle ce code, puis enregistre :

```js
const SHEET_NAME = "Commandes";

function ensureHeader(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow([
    "created_at",
    "fullname",
    "phone",
    "city",
    "total_dh",
    "items",
    "items_json",
    "page_url",
    "user_agent"
  ]);
}

function doPost(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  ensureHeader(sheet);

  const raw = e && e.postData && e.postData.contents ? e.postData.contents : "";
  const data = raw ? JSON.parse(raw) : {};

  const items = Array.isArray(data.items) ? data.items : [];
  const itemsText = items
    .map((item) => {
      const name = item && item.name ? item.name : item && item.id ? item.id : "article";
      const qty = item && item.quantity ? ` x${item.quantity}` : "";
      const price = item && item.unit_price_label ? ` (${item.unit_price_label})` : "";
      return `${name}${qty}${price}`;
    })
    .join(" | ");

  sheet.appendRow([
    data.created_at || new Date().toISOString(),
    data.fullname || "",
    data.phone || "",
    data.city || "",
    data.total_dh || "",
    itemsText,
    JSON.stringify(data.items || []),
    data.page_url || "",
    data.user_agent || ""
  ]);

  return ContentService.createTextOutput("ok");
}
```

### 2) Deployer l'endpoint

1. Bouton **Deployer** → **Nouveau deploiement** → **Application web**.
2. **Executer en tant que** : toi
3. **Qui a acces** : **Tout le monde**
4. Copie l'URL qui finit par `/exec`.

### 3) Mettre l'URL dans le site

Dans `index.html`, colle ton URL dans :

```html
<meta name="order-endpoint" content="COLLE_ICI_TON_URL_APPS_SCRIPT_EXEC" />
```

## Remplacer les images d'exemple

Actuellement, les visuels des packs et produits sont stockes localement dans `images/stock/` sous forme de vraies photos de demonstration.

Pour mettre tes vraies images :

1. Garde le dossier `images` a la racine du projet.
2. Ajoute tes photos dedans, par exemple :
   - `images/collier-perle.jpg`
   - `images/bracelet-love.jpg`
   - `images/bague-luna.jpg`
3. Dans `script.js`, remplace la valeur de `image` dans chaque objet :

```js
{
  name: "Collier Perle Douce",
  category: "Colliers",
  price: "89 DH",
  description: "Un collier delicat a porter seul ou en accumulation.",
  image: "images/collier-perle.jpg",
  accent: { background: "#f5dde3", detail: "#caa46a" }
}
```

## Publier gratuitement sur GitHub Pages

### 1. Creer un depot GitHub

1. Connecte-toi sur GitHub.
2. Clique sur **New repository**.
3. Donne-lui un nom, par exemple `glow-accessories`.
4. Cree le depot.

### 2. Envoyer les fichiers sur GitHub

Tu peux soit utiliser l'interface web, soit Git en ligne de commande.

Avec l'interface web :

1. Ouvre ton depot vide.
2. Clique sur **Add file** puis **Upload files**.
3. Ajoute :
   - `index.html`
   - `style.css`
   - `script.js`
   - `README.md`
4. Valide avec **Commit changes**.

Avec Git en ligne de commande :

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TON-UTILISATEUR/glow-accessories.git
git push -u origin main
```

### 3. Activer GitHub Pages

1. Va dans ton depot GitHub.
2. Clique sur **Settings**.
3. Dans le menu lateral, ouvre **Pages**.
4. Dans **Build and deployment**, choisis :
   - **Source** : `Deploy from a branch`
   - **Branch** : `main`
   - **Folder** : `/root`
5. Clique sur **Save**.

### 4. Recuperer le lien public

1. Attends quelques secondes ou quelques minutes.
2. GitHub affichera l'URL publique de ton site dans la page **Pages**.
3. Le lien ressemblera a :

```text
https://ton-utilisateur.github.io/glow-accessories/
```

## Personnalisation rapide

Si tu veux modifier le style general :

- ouvre `style.css`
- change les couleurs dans `:root`
- adapte les textes dans `index.html`

Les principales couleurs du site sont definies ici :

```css
:root {
  --bg: #fffaf8;
  --rose: #f6dfe4;
  --beige: #f4ebe3;
  --gold: #c9a76e;
}
```

## Conseils avant mise en ligne

- Remplace les images d'exemple par de vraies photos produit
- Mets des prix definitifs
- Verifie chaque lien WhatsApp
- Teste le site sur mobile et sur ordinateur

## Credits photos

Les photos de demonstration actuellement integrees proviennent de Pexels :

- Nurfa Khoirunnisa : https://www.pexels.com/photo/elegant-pearl-necklace-on-luxurious-fabric-29161744/
- Hatice : https://www.pexels.com/photo/elegant-wedding-rings-with-pearl-necklace-flat-lay-28436705/
- Lena Eggler : https://www.pexels.com/photo/cream-wedding-accessories-flat-lay-27495835/
- Arif khan : https://www.pexels.com/photo/pearl-necklace-on-woman-neck-17298626/
- Melike B : https://www.pexels.com/photo/close-up-shot-of-a-gold-bracelet-12168880/
- Sergei Starostin : https://www.pexels.com/photo/elegant-beaded-bracelet-on-textured-stone-surface-34372556/
- Ihsan Adityawarman : https://www.pexels.com/photo/close-up-of-rings-17261921/

## Licence

Projet librement modifiable pour Glow Accessories.
