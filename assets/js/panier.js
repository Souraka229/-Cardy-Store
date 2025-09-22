// Gestion du panier avec localStorage
class Panier {
    constructor() {
        this.panier = this.chargerPanier();
    }
    
    chargerPanier() {
        const panierStorage = localStorage.getItem('panierCardyStore');
        return panierStorage ? JSON.parse(panierStorage) : [];
    }
    
    sauvegarderPanier() {
        localStorage.setItem('panierCardyStore', JSON.stringify(this.panier));
    }
    
    ajouterProduit(idProduit, quantite = 1) {
        const produitExistant = this.panier.find(item => item.id === idProduit);
        
        if (produitExistant) {
            produitExistant.quantite += quantite;
        } else {
            this.panier.push({
                id: idProduit,
                quantite: quantite
            });
        }
        
        this.sauvegarderPanier();
        this.mettreAJourBadge();
    }
    
    supprimerProduit(idProduit) {
        this.panier = this.panier.filter(item => item.id !== idProduit);
        this.sauvegarderPanier();
        this.mettreAJourBadge();
    }
    
    modifierQuantite(idProduit, nouvelleQuantite) {
        const produit = this.panier.find(item => item.id === idProduit);
        
        if (produit) {
            if (nouvelleQuantite <= 0) {
                this.supprimerProduit(idProduit);
            } else {
                produit.quantite = nouvelleQuantite;
                this.sauvegarderPanier();
            }
        }
        
        this.mettreAJourBadge();
    }
    
    viderPanier() {
        this.panier = [];
        this.sauvegarderPanier();
        this.mettreAJourBadge();
    }
    
    getTotalArticles() {
        return this.panier.reduce((total, item) => total + item.quantite, 0);
    }
    
    mettreAJourBadge() {
        const badge = document.querySelector('.panier-badge');
        if (badge) {
            const total = this.getTotalArticles();
            badge.textContent = total > 0 ? total : '';
            badge.style.display = total > 0 ? 'block' : 'none';
        }
    }
    
    // Récupérer les détails complets du panier
    async getPanierComplet() {
        // Simuler une requête pour récupérer les infos produits
        const produits = {
            'ps5-slim': { nom: 'PS5 Slim', prix: 390000, image: 'assets/images/produits/ps5-slim.jpg' },
            'ps4': { nom: 'PS4 Fat', prix: 165000, image: 'assets/images/produits/ps4.jpg' },
            'ps3-slim': { nom: 'PS3 Slim', prix: 85000, image: 'assets/images/produits/ps3-slim.jpg' },
            'ps2': { nom: 'PS2 Fat', prix: 35000, image: 'assets/images/produits/ps2.jpg' },
            'ps4-slim': { nom: 'PS4 Slim', prix: 200000, image: 'assets/images/produits/ps4-slim.jpg' },
            'ps4-pro': { nom: 'PS4 Pro', prix: 275000, image: 'assets/images/produits/ps4-pro.jpg' }
        };
        
        return this.panier.map(item => {
            const produit = produits[item.id];
            return {
                ...item,
                ...produit,
                total: produit.prix * item.quantite
            };
        });
    }
    
    getTotalPanier(items) {
        return items.reduce((total, item) => total + item.total, 0);
    }
}

// Instance globale du panier
const panier = new Panier();

// Fonctions globales
function ajouterAuPanier(idProduit) {
    panier.ajouterProduit(idProduit);
    alert('Produit ajouté au panier !');
}

function afficherPanier() {
    if (!document.querySelector('.panier-container')) return;
    
    panier.getPanierComplet().then(items => {
        const container = document.querySelector('.panier-container');
        const total = panier.getTotalPanier(items);
        
        if (items.length === 0) {
            container.innerHTML = `
                <div class="panier-vide">
                    <h2>Votre panier est vide</h2>
                    <p>Découvrez nos produits PlayStation !</p>
                    <a href="catalogue.html" class="btn">Voir le catalogue</a>
                </div>
            `;
            return;
        }
        
        container.innerHTML = `
            <h1>Votre Panier</h1>
            <div class="panier-items">
                ${items.map(item => `
                    <div class="panier-item" data-id="${item.id}">
                        <img src="${item.image}" alt="${item.nom}">
                        <div class="panier-info">
                            <h3>${item.nom}</h3>
                            <div class="prix">${item.prix.toLocaleString()} FCFA</div>
                            <div class="panier-quantite">
                                <button class="quantite-btn" onclick="modifierQuantite('${item.id}', ${item.quantite - 1})">-</button>
                                <span>${item.quantite}</span>
                                <button class="quantite-btn" onclick="modifierQuantite('${item.id}', ${item.quantite + 1})">+</button>
                                <button class="supprimer-btn" onclick="supprimerDuPanier('${item.id}')">🗑️</button>
                            </div>
                        </div>
                        <div class="panier-sous-total">${item.total.toLocaleString()} FCFA</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="panier-total">
                <h2>Total: ${total.toLocaleString()} FCFA</h2>
                <div class="panier-actions">
                    <a href="catalogue.html" class="btn">Continuer mes achats</a>
                    <button class="btn" onclick="viderPanier()">Vider le panier</button>
                    <a href="#" class="whatsapp-btn" onclick="commanderWhatsApp()">
                        📱 Commander sur WhatsApp
                    </a>
                </div>
            </div>
        `;
    });
}

function modifierQuantite(idProduit, nouvelleQuantite) {
    panier.modifierQuantite(idProduit, nouvelleQuantite);
    afficherPanier();
}

function supprimerDuPanier(idProduit) {
    panier.supprimerProduit(idProduit);
    afficherPanier();
}

function viderPanier() {
    if (confirm('Voulez-vous vraiment vider votre panier ?')) {
        panier.viderPanier();
        afficherPanier();
    }
}

function commanderWhatsApp() {
    panier.getPanierComplet().then(items => {
        if (items.length === 0) return;
        
        const total = panier.getTotalPanier(items);
        let message = `Bonjour Cardy Store ! Je souhaite commander :\n\n`;
        
        items.forEach(item => {
            message += `• ${item.nom} x${item.quantite} - ${item.total.toLocaleString()} FCFA\n`;
        });
        
        message += `\nTotal: ${total.toLocaleString()} FCFA\n`;
        message += `Nom: [Votre nom]\n`;
        message += `Téléphone: [Votre numéro]\n`;
        message += `Adresse: [Votre adresse]`;
        
        const whatsappUrl = `https://wa.me/2290166364730?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    });
}

// Initialiser le badge du panier au chargement
document.addEventListener('DOMContentLoaded', function() {
    panier.mettreAJourBadge();
    
    // Afficher le panier si on est sur la page panier
    if (window.location.pathname.includes('panier.html')) {
        afficherPanier();
    }
});