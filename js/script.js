
document.addEventListener('DOMContentLoaded', function () {
    var constructionTypeSelect = document.getElementById('construction-type');
    var detailGroups = document.querySelectorAll('.construction-detail');
    var searchButton = document.querySelector('.search-button');
    var statsBlock = document.getElementById('stats-block');

    var factors = {
        'house-extension': {
            'extension_area': [5, 10, 15, 20, 25, 30],
            'extension_stories': [10, 20, 30],
            'extension_materials': {'brick': 20, 'wood': 30, 'concrete': 10},
            'extension_proximity': {'stuck': 0, 'very-near': 10, 'near': 20, 'normal': 30, 'far': 40, 'very-far': 50},
            'extension-impact': {'very-weak': 50, 'weak': 40, 'mid': 30, 'high': 20, 'very-high': 10}
        },
        'pool': {
            'pool_dimensions': [10, 20, 30, 40, 50],
            'pool_depth': [10, 20, 30],
            'pool_type': {'in-ground': 20, 'above-ground': 30},
            'pool_filtration': {'sand': 20, 'cartridge': 30, 'diatomaceous': 40},
            'pool_proximity': {'stuck': 0, 'very-near': 10, 'near': 20, 'normal': 30, 'far': 40, 'very-far': 50},
            'pool_safety': {'fence': 20, 'cover': 30, 'alarm': 40}
        },
        'garden-shed': {
            'shed_dimensions': [10, 20, 30, 40, 50],
            'shed_materials': {'wood': 30, 'metal': 20, 'plastic': 10},
            'shed_color': {'brown': 30, 'green': 20, 'grey': 10},
            'shed_location': {'backyard': 30, 'side-yard': 20, 'front-yard': 10},
            'shed_foundation': {'concrete': 30, 'wood': 20, 'none': 10},
            'shed_use': {'storage': 20, 'workshop': 30}
        },
        'garage': {
            'garage_size': [10, 20, 30],
            'garage_type': {'attached': 30, 'detached': 20},
            'garage_materials': {'brick': 30, 'wood': 20, 'concrete': 10},
            'garage_access': {'direct': 30, 'via-garden': 20},
            'garage_utilities': {'electricity': 20, 'plumbing': 20, 'both': 30}
        },
        'conservatory': {
            'conservatory_dimensions': [10, 20, 30, 40, 50],
            'conservatory_location': {'backyard': 30, 'side-yard': 20, 'front-yard': 10},
            'conservatory_glazing': {'glass': 30, 'plastic': 20},
            'conservatory_heating': {'none': 10, 'heating': 20, 'ventilation': 20, 'both': 30},
            'conservatory_connection': {'connected': 30, 'separate': 20},
            'conservatory_purpose': {'plants': 20, 'living-space': 30}
        },
        'secondary-dwelling': {
            'dwelling_area': [10, 20, 30, 40, 50],
            'dwelling_rooms': [10, 20, 30],
            'dwelling_utilities': {'electricity': 20, 'water': 20, 'both': 30},
            'dwelling_access': {'direct': 30, 'via-garden': 20},
            'dwelling_kitchen_bathroom': {'kitchen': 20, 'bathroom': 20, 'both': 30},
            'dwelling_zoning': {'compliant': 30, 'non-compliant': 10}
        },
        'roof-facade': {
            'roof_facade_materials': {'tiles': 30, 'shingles': 20, 'metal': 10, 'concrete': 40},
            'roof_facade_color_style': {'red': 20, 'grey': 20, 'brown': 30},
            'roof_facade_structural_modifications': {'none': 10, 'minor': 20, 'major': 30},
            'roof_facade_insulation_ventilation': {'none': 10, 'insulation': 20, 'ventilation': 20, 'both': 30},
            'roof_facade_compliance': {'compliant': 30, 'non-compliant': 10}
        },
        'solar-installation': {
            'solar_panel_number': [10, 20, 30, 40, 50],
            'solar_panel_angle': {'15': 10, '30': 20, '45': 30},
            'solar_grid_connection': {'yes': 30, 'no': 10},
            'solar_roof_impact': {'none': 10, 'minor': 20, 'major': 30},
            'solar_energy_regulations': {'compliant': 30, 'non-compliant': 10}
        },
        'commercial-development': {
            'commercial_size_scale': [10, 20, 30, 40, 50],
            'commercial_activity_type': {'retail': 20, 'office': 30, 'industrial': 10},
            'commercial_traffic_impact': {'very-high': 10, 'high': 20, 'medium': 30, 'low': 40, 'very-low': 50},
            'commercial_environmental_impact': {'very-high': 10, 'high': 20, 'medium': 30, 'low': 40, 'very-low': 50},
            'commercial_zoning_compliance': {'compliant': 30, 'non-compliant': 10}
        }
    };

    var advice = {
        'house-extension': {
            'extension_materials': {
                'brick': 'Considérez l’utilisation de matériaux recyclés ou renouvelables comme le bois.',
                'wood': 'Assurez-vous que le bois provient de sources durables certifiées FSC.',
                'concrete': 'Utilisez du béton avec des additifs de cendres volantes pour réduire l’empreinte carbone.'
            },
            'extension_proximity': {
                'stuck': 'Essayez de placer l’extension à une distance raisonnable pour minimiser l’impact sur la biodiversité.',
                'very-near': 'Augmentez la distance entre l’extension et les limites pour protéger l’environnement.',
                'near': 'Considérez d’augmenter encore la distance pour réduire l’impact environnemental.'
            },
            'extension_impact': {
                'very-weak': 'Continuez à minimiser les modifications structurelles pour réduire l’empreinte écologique.',
                'weak': 'Réduisez encore les modifications pour un impact moindre.',
                'mid': 'Essayez d’optimiser les plans pour diminuer les modifications nécessaires.'
            }
        },
        'pool': {
            'pool_type': {
                'in-ground': 'Considérez une piscine naturelle pour réduire l’utilisation de produits chimiques.',
                'above-ground': 'Utilisez des matériaux durables et une filtration efficace pour réduire l’empreinte écologique.'
            },
            'pool_filtration': {
                'sand': 'Utilisez un système de filtration économe en énergie.',
                'cartridge': 'Envisagez de passer à un système de filtration plus écologique.',
                'diatomaceous': 'Assurez-vous que le système de filtration est bien entretenu pour maximiser l’efficacité.'
            },
            'pool_proximity': {
                'stuck': 'Placez la piscine plus loin des limites pour minimiser l’impact environnemental.',
                'very-near': 'Augmentez la distance entre la piscine et les limites pour réduire l’impact.',
                'near': 'Essayez d’augmenter encore la distance pour un meilleur résultat écologique.'
            }
        },
        'garden-shed': {
            'shed_materials': {
                'wood': 'Assurez-vous que le bois est certifié FSC et provient de sources durables.',
                'metal': 'Utilisez du métal recyclé pour réduire l’empreinte écologique.',
                'plastic': 'Utilisez du plastique recyclé ou des matériaux alternatifs plus écologiques.'
            },
            'shed_foundation': {
                'concrete': 'Utilisez un béton écologique avec des additifs pour réduire l’empreinte carbone.',
                'wood': 'Assurez-vous que le bois de la fondation est traité écologiquement.',
                'none': 'Considérez des options de fondation minimales pour réduire l’impact sur le sol.'
            },
            'shed_location': {
                'backyard': 'Placez l’abri dans une zone ombragée pour réduire l’impact sur la biodiversité.',
                'side-yard': 'Évitez de placer l’abri trop près des limites de propriété pour protéger l’environnement.'
            }
        },
        'garage': {
            'garage_materials': {
                'brick': 'Utilisez des briques recyclées pour réduire l’empreinte écologique.',
                'wood': 'Assurez-vous que le bois provient de sources durables et certifiées.',
                'concrete': 'Optez pour du béton avec des additifs pour réduire l’empreinte carbone.'
            },
            'garage_utilities': {
                'electricity': 'Installez des systèmes d’éclairage et de ventilation économes en énergie.',
                'plumbing': 'Utilisez des dispositifs de plomberie économes en eau.',
                'both': 'Considérez l’installation de panneaux solaires pour l’électricité et des systèmes de récupération d’eau.'
            },
            'garage_access': {
                'direct': 'Aménagez une allée perméable pour réduire le ruissellement et favoriser l’absorption d’eau.',
                'via-garden': 'Assurez-vous que l’accès ne perturbe pas les espaces verts existants.'
            }
        },
        'conservatory': {
            'conservatory_glazing': {
                'glass': 'Utilisez du verre à faible émissivité pour améliorer l’efficacité énergétique.',
                'plastic': 'Optez pour des matériaux plastiques recyclés et durables.'
            },
            'conservatory_heating': {
                'none': 'Envisagez des méthodes de chauffage passif pour maintenir une température agréable.',
                'heating': 'Utilisez des systèmes de chauffage écoénergétiques.',
                'ventilation': 'Installez une ventilation naturelle pour réduire l’utilisation d’énergie.',
                'both': 'Combinez chauffage passif et ventilation naturelle pour un confort optimal.'
            },
            'conservatory_location': {
                'backyard': 'Placez la véranda dans une zone ombragée pour réduire l’utilisation de climatisation.',
                'side-yard': 'Assurez-vous que l’emplacement ne perturbe pas les habitats naturels.'
            }
        },
        'secondary-dwelling': {
            'dwelling_utilities': {
                'electricity': 'Installez des panneaux solaires pour une alimentation énergétique durable.',
                'water': 'Utilisez des systèmes de récupération d’eau de pluie.',
                'both': 'Combinez panneaux solaires et systèmes de récupération d’eau pour une efficacité maximale.'
            },
            'dwelling_zoning': {
                'compliant': 'Continuez à respecter les réglementations de zonage pour minimiser l’impact environnemental.',
                'non-compliant': 'Adaptez le projet pour se conformer aux réglementations et réduire l’empreinte écologique.'
            },
            'dwelling_access': {
                'direct': 'Aménagez des accès perméables pour réduire le ruissellement.',
                'via-garden': 'Assurez-vous que l’accès ne perturbe pas les espaces verts existants.'
            }
        },
        'roof-facade': {
            'roof_facade_materials': {
                'tiles': 'Utilisez des tuiles recyclées pour réduire l’impact environnemental.',
                'shingles': 'Optez pour des bardeaux en matériaux recyclés.',
                'metal': 'Utilisez du métal recyclé pour la toiture.',
                'concrete': 'Optez pour du béton écologique avec des additifs.'
            },
            'roof_facade_insulation_ventilation': {
                'none': 'Installez une isolation efficace pour améliorer l’efficacité énergétique.',
                'insulation': 'Utilisez des matériaux d’isolation écologiques.',
                'ventilation': 'Installez une ventilation naturelle pour réduire l’utilisation d’énergie.',
                'both': 'Combinez une bonne isolation et une ventilation naturelle pour une efficacité maximale.'
            },
            'roof_facade_compliance': {
                'compliant': 'Continuez à respecter les réglementations pour minimiser l’impact environnemental.',
                'non-compliant': 'Adaptez le projet pour se conformer aux réglementations et réduire l’empreinte écologique.'
            }
        },
        'solar-installation': {
            'solar_panel_number': {
                'default': 'Installez autant de panneaux solaires que possible pour maximiser la production d’énergie renouvelable.'
            },
            'solar_grid_connection': {
                'yes': 'Utilisez un système de stockage d’énergie pour maximiser l’utilisation de l’énergie solaire.',
                'no': 'Considérez de connecter le système solaire au réseau pour une utilisation optimale de l’énergie produite.'
            },
            'solar_roof_impact': {
                'none': 'Assurez-vous que l’installation des panneaux n’affecte pas l’isolation du toit.',
                'minor': 'Réduisez l’impact de l’installation en utilisant des techniques de montage non invasives.',
                'major': 'Adaptez le projet pour minimiser l’impact sur la structure du toit.'
            }
        },
        'commercial-development': {
            'commercial_activity_type': {
                'retail': 'Utilisez des matériaux durables pour la construction et l’aménagement intérieur.',
                'office': 'Installez des systèmes d’éclairage et de ventilation économes en énergie.',
                'industrial': 'Utilisez des technologies vertes pour réduire l’empreinte carbone de l’activité industrielle.'
            },
            'commercial_traffic_impact': {
                'very-high': 'Implémentez des solutions de transport durable pour réduire l’impact sur le trafic.',
                'high': 'Encouragez l’utilisation de transports en commun et de vélos.',
                'medium': 'Aménagez des zones de stationnement pour vélos et des bornes de recharge pour véhicules électriques.',
                'low': 'Continuez à encourager les pratiques de transport durable.',
                'very-low': 'Maintenez l’impact minimal sur le trafic en promouvant les transports durables.'
            },
            'commercial_environmental_impact': {
                'very-high': 'Mettez en place des mesures de réduction des déchets et de gestion de l’eau.',
                'high': 'Utilisez des systèmes de gestion énergétique et des matériaux durables.',
                'medium': 'Adoptez des pratiques de construction verte et de gestion durable des ressources.',
                'low': 'Continuez à améliorer l’efficacité énergétique et la gestion des ressources.',
                'very-low': 'Maintenez les pratiques écologiques actuelles et cherchez des moyens d’amélioration continue.'
            }
        }
    };

    var cityData = {
        // Les 20 plus grandes villes françaises
        'Paris': { requested: 1200, accepted: 1080 },
        'Marseille': { requested: 900, accepted: 765 },
        'Lyon': { requested: 800, accepted: 640 },
        'Toulouse': { requested: 750, accepted: 600 },
        'Nice': { requested: 700, accepted: 490 },
        'Nantes': { requested: 650, accepted: 585 },
        'Strasbourg': { requested: 600, accepted: 480 },
        'Montpellier': { requested: 550, accepted: 385 },
        'Bordeaux': { requested: 500, accepted: 425 },
        'Lille': { requested: 480, accepted: 360 },
        'Rennes': { requested: 460, accepted: 345 },
        'Reims': { requested: 440, accepted: 352 },
        'Le Havre': { requested: 420, accepted: 294 },
        'Saint-Étienne': { requested: 400, accepted: 260 },
        'Toulon': { requested: 380, accepted: 266 },
        'Grenoble': { requested: 360, accepted: 270 },
        'Dijon': { requested: 340, accepted: 272 },
        'Angers': { requested: 320, accepted: 240 },
        'Nîmes': { requested: 300, accepted: 210 },
        'Villeurbanne': { requested: 280, accepted: 196 },

        // Les 20 villes moyennes
        'Amiens': { requested: 260, accepted: 182 },
        'Metz': { requested: 240, accepted: 192 },
        'Besançon': { requested: 220, accepted: 176 },
        'Orléans': { requested: 200, accepted: 160 },
        'Rouen': { requested: 180, accepted: 126 },
        'Mulhouse': { requested: 160, accepted: 112 },
        'Caen': { requested: 140, accepted: 98 },
        'Nancy': { requested: 120, accepted: 96 },
        'Perpignan': { requested: 100, accepted: 70 },
        'Poitiers': { requested: 90, accepted: 63 },
        'Béziers': { requested: 80, accepted: 56 },
        'Valence': { requested: 70, accepted: 49 },
        'La Rochelle': { requested: 60, accepted: 42 },
        'Saint-Nazaire': { requested: 50, accepted: 35 },
        'Colmar': { requested: 40, accepted: 28 },
        'Ajaccio': { requested: 30, accepted: 21 },
        'Versailles': { requested: 20, accepted: 18 },
        'Boulogne-sur-Mer': { requested: 15, accepted: 10 },
        'Sète': { requested: 10, accepted: 7 },
        'Chambéry': { requested: 5, accepted: 4 },

        // Les 21 petites villes
        'Villejuif': { requested: 20, accepted: 18 },
        'Arles': { requested: 18, accepted: 15 },
        'Bayonne': { requested: 17, accepted: 14 },
        'Évreux': { requested: 16, accepted: 13 },
        'Vannes': { requested: 15, accepted: 12 },
        'Sartrouville': { requested: 14, accepted: 11 },
        'Meudon': { requested: 13, accepted: 10 },
        'Châteauroux': { requested: 12, accepted: 9 },
        'Cagnes-sur-Mer': { requested: 11, accepted: 8 },
        'Saint-Brieuc': { requested: 10, accepted: 7 },
        'Les Sables-d\'Olonne': { requested: 9, accepted: 6 },
        'Gap': { requested: 8, accepted: 5 },
        'Albi': { requested: 7, accepted: 5 },
        'Brive-la-Gaillarde': { requested: 6, accepted: 4 },
        'Montauban': { requested: 5, accepted: 3 },
        'Castres': { requested: 4, accepted: 3 },
        'Salon-de-Provence': { requested: 3, accepted: 2 },
        'Blois': { requested: 2, accepted: 1 },
        'Carcassonne': { requested: 1, accepted: 1 },
        'Bastia': { requested: 1, accepted: 1 },
        'Saint-Malo': { requested: 1, accepted: 1 }
    };



    var cityFactors = {};
    for (var city in cityData) {
        var data = cityData[city];
        var factor = data.accepted / data.requested;
        cityFactors[city] = factor;
    }

    console.log(cityFactors);



    constructionTypeSelect.addEventListener('change', function () {
        detailGroups.forEach(function (group) {
            group.style.display = 'none';
        });

        var selectedType = this.value;
        var detailGroupToShow = document.getElementById(selectedType + '-details');
        if (detailGroupToShow) {
            detailGroupToShow.style.display = 'block';
        }
    });

    searchButton.addEventListener('click', function (event) {
        event.preventDefault();
        updateStats();
        if (statsBlock.classList.contains('visible')) {
            statsBlock.classList.remove('visible');
        } else {
            statsBlock.classList.add('visible');
        }
    });

    function calculateChance() {
        var constructionType = constructionTypeSelect.value;
        if (!constructionType) return 0;

        var totalScore = 0;
        var maxScore = 0;
        var criteria = factors[constructionType];

        for (var criterion in criteria) {
            var element = document.querySelector(`[name="${criterion}"]`);
            if (!element) continue;

            var value = element.value;
            if (criterion.includes('area') || criterion.includes('dimensions') || criterion.includes('depth') || criterion.includes('size')) {
                var numValue = parseFloat(value);
                var maxIndex = criteria[criterion].length - 1;
                for (var i = 0; i < criteria[criterion].length; i++) {
                    if (numValue <= (i + 1) * 20) {
                        totalScore += criteria[criterion][i];
                        maxScore += criteria[criterion][maxIndex];
                        break;
                    }
                }
            } else if (criterion.includes('stories') || criterion.includes('rooms')) {
                var numStories = parseInt(value);
                totalScore += criteria[criterion][numStories - 1];
                maxScore += criteria[criterion][criteria[criterion].length - 1];
            } else if (typeof criteria[criterion] === 'object') {
                totalScore += criteria[criterion][value];
                maxScore += Math.max(...Object.values(criteria[criterion]));
            } else {
                totalScore += criteria[criterion][0];
                maxScore += criteria[criterion][criteria[criterion].length - 1];
            }
        }

        var baseChance = (totalScore / maxScore) * 100;
        console.log('Base chance:', baseChance);


        // Ajustement en fonction de la ville
        var city = document.getElementById('city').value;
        console.log('City:', city);

        var cityFactor = cityFactors[city] || 1; // Default factor is 1 if the city is not listed
        var adjustedChance = baseChance * cityFactor;
        console.log('City factor:', cityFactor);
        console.log('Adjusted chance:', adjustedChance);

        return adjustedChance;
    }


    function calculateEcologicScore() {
        var constructionType = constructionTypeSelect.value;
        if (!constructionType) return 0;

        var ecologicScore = 0;
        var maxEcologicScore = 0;
        var criteria = factors[constructionType];

        for (var criterion in criteria) {
            var element = document.querySelector(`[name="${criterion}"]`);
            if (!element) continue;

            var value = element.value;
            switch (criterion) {
                case 'extension_materials':
                case 'pool_filtration':
                case 'shed_materials':
                case 'garage_materials':
                case 'conservatory_glazing':
                case 'roof_facade_materials':
                case 'solar_panel_angle':
                case 'commercial_activity_type':
                    ecologicScore += criteria[criterion][value];
                    maxEcologicScore += 30;
                    break;
                case 'extension_proximity':
                case 'pool_proximity':
                case 'shed_location':
                case 'garage_access':
                case 'conservatory_location':
                    ecologicScore += criteria[criterion][value];
                    maxEcologicScore += 50;
                    break;
                case 'extension_impact':
                case 'pool_safety':
                case 'shed_foundation':
                case 'garage_utilities':
                case 'conservatory_heating':
                case 'dwelling_utilities':
                case 'roof_facade_insulation_ventilation':
                case 'solar_grid_connection':
                    ecologicScore += criteria[criterion][value];
                    maxEcologicScore += 50;
                    break;
                case 'solar_panel_number':
                    var numPanels = parseInt(value);
                    ecologicScore += numPanels > 20 ? 50 : (numPanels > 10 ? 30 : 10);
                    maxEcologicScore += 50;
                    break;
                case 'dwelling_zoning':
                case 'commercial_zoning_compliance':
                    ecologicScore += criteria[criterion][value];
                    maxEcologicScore += 30;
                    break;
                default:
                    maxEcologicScore += 30;
                    break;
            }
        }

        return (ecologicScore / maxEcologicScore) * 100;
    }

    function generateAdvice() {
        var constructionType = constructionTypeSelect.value;
        if (!constructionType) return [];

        var adviceList = [];
        var criteria = advice[constructionType];

        for (var criterion in criteria) {
            var element = document.querySelector(`[name="${criterion}"]`);
            if (!element) continue;

            var value = element.value;
            if (criteria[criterion][value]) {
                adviceList.push(criteria[criterion][value]);
            } else if (criteria[criterion]['default']) {
                adviceList.push(criteria[criterion]['default']);
            }
        }

        return adviceList;
    }

    function updateStats() {
        var permitChance = calculateChance();
        var ecologicScore = calculateEcologicScore();
        var adviceList = generateAdvice();

        document.getElementById('permit-chance').textContent = permitChance.toFixed(2) + '%';
        document.getElementById('permit-progress').value = permitChance;

        document.getElementById('ecologic-chance').textContent = ecologicScore.toFixed(2) + '%';
        document.getElementById('ecologic-progress').value = ecologicScore;

        var adviceContainer = document.querySelector('.improvements');
        adviceContainer.innerHTML = '';
        adviceList.forEach(function (advice) {
            var li = document.createElement('li');
            li.textContent = advice;
            adviceContainer.appendChild(li);
        });
    }


    function initAutocomplete() {
        var input = document.getElementById('city');
        var options = {
            types: ['(cities)'],
            componentRestrictions: { country: 'fr' }
        };
        var autocomplete = new google.maps.places.Autocomplete(input, options);

        autocomplete.addListener('place_changed', function () {
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                window.alert("No details available for input: '" + place.name + "'");
                return;
            }
            // Utiliser seulement la première partie du nom de la ville avant toute virgule
            var cityName = place.name.split(',')[0].trim();
            document.getElementById('city').value = cityName;
            console.log('City selected:', cityName);
        });

        input.addEventListener('keydown', function(e) {
            if (e.key === "Enter") {
                e.preventDefault();
            }
        });
    }

    window.addEventListener('load', initAutocomplete);

    document.getElementById('sub-Button').addEventListener('click', function () {
        const city = document.getElementById('city').value;
        if (!city) {
            return;
        }
        document.getElementById('map').innerHTML = `<iframe width="450" height="450" style="border:0" loading="lazy" allowfullscreen src="https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(city)}&key=AIzaSyD95RSCT8ytUMBSu1hLLjzfxQH8xpYXhmg"></iframe>`;
    });
});
