// Attend que le contenu DOM soit complètement chargé avant d'exécuter le script
document.addEventListener('DOMContentLoaded', function () {
    // Récupère des éléments du DOM nécessaires pour la logique
    var constructionTypeSelect = document.getElementById('construction-type');
    var detailGroups = document.querySelectorAll('.construction-detail');
    var searchButton = document.querySelector('.search-button');
    var statsBlock = document.getElementById('stats-block');

    // Gère le changement de sélection du type de construction
    constructionTypeSelect.addEventListener('change', function () {
        // Cache tous les groupes de détails
        detailGroups.forEach(function (group) {
            group.style.display = 'none';
        });

        // Affiche le groupe de détails correspondant au type sélectionné
        var selectedType = this.value;
        var detailGroupToShow = document.getElementById(selectedType + '-details');
        if (detailGroupToShow) {
            detailGroupToShow.style.display = 'block';
        }
    });

    // Gère le clic sur le bouton de recherche
    searchButton.addEventListener('click', function (event) {
        event.preventDefault(); // Empêche la soumission du formulaire
        updateStats(); // Met à jour les statistiques

        // Bascule la classe 'visible' pour afficher/cacher le bloc de statistiques
        if (statsBlock.classList.contains('visible')) {
            statsBlock.classList.remove('visible');
        } else {
            statsBlock.classList.add('visible');
        }
    });

    // Génère un nombre aléatoire entre 1 et 100
    function getRandomChance() {
        return Math.floor(Math.random() * 100) + 1;
    }

    // Met à jour les statistiques sur la page avec des valeurs aléatoires
    function updateStats() {
        var randomChance = getRandomChance();
        var ecologicChance = Math.max(100 - randomChance, 0);

        document.getElementById('permit-chance').textContent = randomChance + '%';
        document.getElementById('permit-progress').value = randomChance;

        document.getElementById('ecologic-chance').textContent = ecologicChance + '%';
        document.getElementById('ecologic-progress').value = ecologicChance;
    }

    // Initialise la fonctionnalité d'autocomplétion Google Maps
    function initAutocomplete() {
        var input = document.getElementById('city');
        var options = {
            types: ['(cities)'],
            componentRestrictions: { country: 'fr' }
        };
        new google.maps.places.Autocomplete(input, options);
    }

    // Ajoute un écouteur d'événement pour initialiser l'autocomplétion lors du chargement de la page
    google.maps.event.addDomListener(window, 'load', initAutocomplete);
});

// Fonction pour charger une carte Google Maps basée sur la valeur de la ville entrée
function loadMap() {
    var city = document.getElementById('city').value; // Récupère la valeur entrée pour la ville
    console.log(city); // Affiche la ville dans la console pour débogage

    // Vérifie si une ville a été saisie avant de continuer
    if (!city) {
        return;
    }

    // Injecte le code HTML pour l'iframe de la carte Google Maps avec la ville spécifiée
    document.getElementById('map').innerHTML = `<iframe width="450" height="450" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?q=${city}&key=AIzaSyDi2q6zJczhuf3onu0GapJtGUCNB4rGhlA"></iframe>`;
}
