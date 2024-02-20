
document.addEventListener('DOMContentLoaded', function () {
var constructionTypeSelect = document.getElementById('construction-type');
var detailGroups = document.querySelectorAll('.construction-detail');
var searchButton = document.querySelector('.search-button');
var statsBlock = document.getElementById('stats-block');

constructionTypeSelect.addEventListener('change', function () {
detailGroups.forEach(function(group) {
group.style.display = 'none';
});

var selectedType = this.value;
var detailGroupToShow = document.getElementById(selectedType + '-details');
if (detailGroupToShow) {
detailGroupToShow.style.display = 'block';
}
});

searchButton.addEventListener('click', function (event) {
event.preventDefault(); // Prevent the form from submitting
updateStats();

// Toggle the 'visible' class to unroll/hide the stats block
if (statsBlock.classList.contains('visible')) {
statsBlock.classList.remove('visible');
} else {
statsBlock.classList.add('visible');
}
});

// Function to generate a random number between 1 and 100
function getRandomChance() {
return Math.floor(Math.random() * 100) + 1;
}

// Function to update the statistics on the page
function updateStats() {
var randomChance = getRandomChance();
var ecologicChance = Math.max(100 - randomChance, 0);

document.getElementById('permit-chance').textContent = randomChance + '%';
document.getElementById('permit-progress').value = randomChance;

document.getElementById('ecologic-chance').textContent = ecologicChance + '%';
document.getElementById('ecologic-progress').value = ecologicChance;
}

// Initialize the autocomplete functionality
function initAutocomplete() {
var input = document.getElementById('city');
var options = {
types: ['(cities)'],
componentRestrictions: {country: 'fr'}
};
new google.maps.places.Autocomplete(input, options);
}

google.maps.event.addDomListener(window, 'load', initAutocomplete);
});

function loadMap() {
    // Récupérer la valeur du champ
    var ville = document.getElementById('city').value;
    console.log(ville);

    if(!ville){
        return;
    }

    // Injection du code HTML avec la valeur de la ville dans la balise <div>
    document.getElementById('map').innerHTML = `<iframe width="450" height="450" style="border:0"Loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?q=${ville}&key=AIzaSyDi2q6zJczhuf3onu0GapJtGUCNB4rGhlA"></iframe>`;
}