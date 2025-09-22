// Navigation entre pages produit
function ouvrirProduit(idProduit) {
    // Stocker l'ID du produit pour la page de détails
    localStorage.setItem('produitSelectionne', idProduit);
    
    // Rediriger vers la page produit
    window.location.href = 'produit.html';
}

// Charger les détails du produit sur la page produit.html
function chargerDetailsProduit() {
    const idProduit = localStorage.getItem('produitSelectionne');
    if (!idProduit) {
        window.location.href = 'catalogue.html';
        return;
    }
    
    // Données des produits (à remplacer par une base de données réelle)
    const produits = {
        'ps5-slim': {
            nom: 'PS5 Slim',
            prix: '390.000 FCFA',
            image: 'assets/images/produits/ps5-slim.jpg',
            description: 'Console PlayStation 5 Slim neuve scellée avec garantie',
            caracteristiques: [
                'Version la plus récente avec design compact',
                'Performances optimisées',
                'Offre spéciale: +10 jeux au choix',
                'Prix sans jeux: 375.000 FCFA',
                'État: Neuf scellé avec garantie'
            ]
        },
        'ps4': {
            nom: 'PS4 Fat',
            prix: '165.000 FCFA',
            image: 'assets/images/produits/ps4.jpg',
            description: 'Console PlayStation 4 reconditionnée avec garantie',
            caracteristiques: [
                'Version originale robuste',
                'Performances fiables',
                'Offre: +10 à 15 jeux + 500Go',
                'Accessoires tous inclus (manette, câbles, support)',
                'État: Reconditionné avec garantie'
            ]
        },
        'ps3-slim': {
            nom: 'PS3 Slim & Ultra Slim',
            prix: '85.000 FCFA',
            image: 'assets/images/produits/ps3-slim.jpg',
            description: 'Console PlayStation 3 reconditionnée avec garantie',
            caracteristiques: [
                'Design élégant et compact',
                'Large bibliothèque de jeux classiques',
                'Offre: 256Go + 25 jeux',
                'Accessoires tous inclus',
                'État: Reconditionné avec garantie'
            ]
        },
        'ps2': {
            nom: 'PS2 Fat',
            prix: '35.000 FCFA',
            image: 'assets/images/produits/ps2.jpg',
            description: 'Console PlayStation 2 légendaire reconditionnée',
            caracteristiques: [
                'Console légendaire avec immense bibliothèque de jeux',
                'Offre: 34 jeux + clé 32Go',
                'Accessoires tous inclus',
                'État: Reconditionné avec garantie'
            ]
        },
        'ps4-slim': {
            nom: 'PS4 Slim',
            prix: '200.000 FCFA',
            image: 'assets/images/produits/ps4-slim.jpg',
            description: 'Console PlayStation 4 Slim reconditionnée',
            caracteristiques: [
                'Design 30% plus mince',
                'Consommation réduite et silencieuse',
                'Offre: 500Go + 10 à 15 jeux',
                'Accessoires tous inclus',
                'État: Reconditionné avec garantie'
            ]
        },
        'ps4-pro': {
            nom: 'PS4 Pro',
            prix: '275.000 FCFA',
            image: 'assets/images/produits/ps4-pro.jpg',
            description: 'Console PlayStation 4 Pro haute performance',
            caracteristiques: [
                'Performances 4K avec graphismes améliorés',
                'Version haute performance',
                'Offre: 1To + 20 jeux',
                'Accessoires tous inclus',
                'État: Reconditionné avec garantie'
            ]
        }
    };
    
    const produit = produits[idProduit];
    if (!produit) {
        window.location.href = 'catalogue.html';
        return;
    }
    
    // Mettre à jour la page avec les détails du produit
    document.title = `${produit.nom} - Cardy Store`;
    
    const produitDetails = document.querySelector('.produit-details');
    if (produitDetails) {
        produitDetails.innerHTML = `
            <h1>${produit.nom}</h1>
            <p>${produit.description}</p>
            
            <div class="produit-info">
                <div class="produit-image">
                    <img src="${produit.image}" alt="${produit.nom}">
                </div>
                
                <div class="produit-caracteristiques">
                    <h3>Caractéristiques</h3>
                    <ul>
                        ${produit.caracteristiques.map(carac => `<li>${carac}</li>`).join('')}
                    </ul>
                    
                    <div class="prix-details">${produit.prix}</div>
                    <button class="ajouter-panier" onclick="ajouterAuPanier('${idProduit}')">
                        Ajouter au panier
                    </button>
                </div>
            </div>
        `;
    }
}

// Vérifier si on est sur la page produit
if (window.location.pathname.includes('produit.html')) {
    document.addEventListener('DOMContentLoaded', chargerDetailsProduit);
}