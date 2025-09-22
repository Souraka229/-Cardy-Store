// Barre de recherche
document.addEventListener('DOMContentLoaded', function() {
    const searchBar = document.querySelector('.search-bar input');
    const searchBtn = document.querySelector('.search-btn');
    
    if (searchBar && searchBtn) {
        function effectuerRecherche() {
            const terme = searchBar.value.trim();
            if (terme) {
                // Stocker le terme de recherche
                localStorage.setItem('termeRecherche', terme);
                // Rediriger vers la page catalogue avec filtre
                window.location.href = 'catalogue.html?recherche=' + encodeURIComponent(terme);
            }
        }
        
        searchBtn.addEventListener('click', effectuerRecherche);
        searchBar.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                effectuerRecherche();
            }
        });
    }
    
    // Filtrer les produits sur la page catalogue si recherche
    if (window.location.pathname.includes('catalogue.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const termeRecherche = urlParams.get('recherche');
        
        if (termeRecherche) {
            filtrerProduits(termeRecherche);
        }
    }
});

function filtrerProduits(terme) {
    const produits = document.querySelectorAll('.produit-card');
    const termeMin = terme.toLowerCase();
    
    produits.forEach(produit => {
        const nom = produit.querySelector('img').alt.toLowerCase();
        if (nom.includes(termeMin)) {
            produit.style.display = 'block';
        } else {
            produit.style.display = 'none';
        }
    });
}