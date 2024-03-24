const username = JSON.parse(localStorage.getItem('username'))
const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
const placesVisited = JSON.parse(localStorage.getItem('placesVisited'));

if (!isLoggedIn){
    window.location.href = "https://signin.wahoowanderings.co"
}


var numPlaces = 0;




// Define an object to store the original text for each checkbox
var originalText = {
    "loc1": "Location 1",
    "loc2": "Location 2",
    "loc3": "Location 3",
    "loc4": "Location 4",
    "loc5": "Location 5",
    "loc6": "Location 6",
    "loc7": "Location 7",
    "loc8": "Location 8",
    "loc9": "Location 9",
    "loc10": "Location 10",
    "loc11": "Location 11",
    "loc12": "Location 12"
};

function toggleCrossOut(checkbox) {
    var label = checkbox.parentElement;
    if (checkbox.checked) {
        label.classList.toggle('checked');
        // Set the text based on the checkbox id and increment the number of places
        // window.open(url,'_blank')
        originalText[checkbox.id] = getPlaceName(checkbox.id);
        numPlaces++;
    } else {
        label.classList.toggle('checked');
        // Set the text back to the original and decrement the number of places
        originalText[checkbox.id] = "Location " + checkbox.id.slice(3);
        numPlaces--;
    
    }
    updateVisitedPlacesCount(); // Update the count of visited places
    updateCheckboxText(checkbox); // Update the text of the checkbox
}

function getPlaceName(checkboxId) {
    // Define function to get name of the place based on checkbox id
    var placeNames = {
        "loc1": "Scott Stadium",
        "loc2": "John Paul Jones Arena",
        "loc3": "Aquatic Fitness Center",
        "loc4": "Alumni Hall",
        "loc5": "Libraries",
        "loc6": "Arts Grounds",
        "loc7": "The Lawn",
        "loc8": "Ohill Trails",
        "loc9": "The Corner",
        "loc10": "Historic Downtown",
        "loc11": "Dairy Market",
        "loc12": "Barracks"
    };
    return placeNames[checkboxId];
}



function updateVisitedPlacesCount() {
    // Update the text displaying the count of visited places
    var countElement = document.getElementById('visited-count');
    countElement.textContent = "Visited: " + numPlaces + "/12 Places!";
}

function updateCheckboxText(checkbox) {
    // Update the text of the checkbox based on checkbox id and its state
    var label = checkbox.parentElement;
    label.innerHTML = '<input class = "checkbox" type="checkbox" id="' + checkbox.id + '"' + (checkbox.checked ? 'checked' : '') + '> ' + originalText[checkbox.id]+'';
}


document.addEventListener('DOMContentLoaded', function() {

    
    // Initialize the Leaflet map
    var map = L.map('map').setView([38.038065843512854, -78.51076797898688], 14);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 14, // Set the minimum zoom level
        maxZoom: 18,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // Define the bounds for the initial view (a closer view)
    var southWest = L.latLng(38.03, -78.515); // Latitude and longitude of southwest corner with a shift to the right
    var northEast = L.latLng(38.05, -78.495); // Latitude and longitude of northeast corner with a shift to the right
    var bounds = L.latLngBounds(southWest, northEast);

    // Set the maximum bounds to restrict the view
    map.setMaxBounds(bounds);
    map.on('drag', function() {
        map.panInsideBounds(bounds, { animate: false });
    });
    

    var oldDorms = L.marker([38.035598986775234, -78.51176321871749]).addTo(map);
    oldDorms.bindPopup("McCormick Road Dorms, also called old dorms");

    var goochDillard = L.marker([38.02944481727204, -78.51736600018195]).addTo(map);
    goochDillard.bindPopup("Gooch Dillard Dorms");

    var runk = L.marker([38.0291532756468, -78.5192334166224]).addTo(map);
    runk.bindPopup("Runk Dining Hall");
    
    var ohill = L.marker([38.03499901072083, -78.51516425978383]).addTo(map);
    ohill.bindPopup("Observatory Hill Dining Hall, also called Ohill");

    var newDorms = L.marker([38.0334610214834, -78.51607621086124]).addTo(map);
    newDorms.bindPopup("Alderman Road Dorms, also called new dorms");

    var newcomb = L.marker([ 38.0359352431111, -78.50647493710946]).addTo(map);
    newcomb.bindPopup("Newcomb Dining Hall");


    var circles = [
        //On Grounds Locations
        {latlng: [38.03146861853904, -78.5137279680974], radius: 200, options: {color: '#0f4c5c', fillColor: '#fb8b24', fillOpacity: 1}, popupContent: "Scott Location 1: Head over to this energetic venue on fall weekends"},
        {latlng: [38.046362307664666, -78.50696837839942], radius: 200, options: {color: '#0f4c5c', fillColor: '#fb8b24', fillOpacity: 1}, popupContent: "JPJ Location 2: Take a stroll or catch the bus to this center of entertainment"},
        {latlng: [38.0336925083408, -78.51364378385784], radius: 100, options: {color: '#0f4c5c', fillColor: '#fb8b24', fillOpacity: 1}, popupContent: "AFC Location 3: Push yourself to the limits at this spot popular around-the-clock"},
        {latlng: [38.038979349625585, -78.50815506851339], radius: 150, options: {color: '#0f4c5c', fillColor: '#fb8b24', fillOpacity: 1}, popupContent: "Alumni Location 4: Check out an event here within the first few weeks of school"},
        {latlng: [38.03670436591803, -78.50616479919685], radius: 120, options: {color: '#0f4c5c', fillColor: '#fb8b24', fillOpacity: 1}, popupContent: "Libraries Location 5: Discover which floors are your favorite"},
        {latlng: [38.03839277648057, -78.50283030193668], radius: 230, options: {color: '#0f4c5c', fillColor: '#fb8b24', fillOpacity: 1}, popupContent: "Arts Grounds Location 6: Wander over to get your creativity flowing"},
        {latlng: [38.0346071998912, -78.5040759983814], radius: 150, options: {color: '#0f4c5c', fillColor: '#fb8b24', fillOpacity: 1}, popupContent: "Lawn Location 7: A historical spot for a sunny picnic"},
        {latlng: [38.034966193265916, -78.52149712896262], radius: 250, options: {color: '#0f4c5c', fillColor: '#fb8b24', fillOpacity: 1}, popupContent: "Ohill Trails Location 8: Get lost in nature after a good meal"},
        
        //Off Grounds Locations
        {latlng: [38.03441703692699, -78.50008047941772], radius: 150, options: {color: '#fb8b24', fillColor: '#0f4c5c', fillOpacity: 1}, popupContent: "Corner Location 9: Eat, shop, and hang out"},
        {latlng: [38.03075051876609, -78.48084024205902], radius: 250, options: {color: '#fb8b24', fillColor: '#0f4c5c', fillOpacity: 1}, popupContent: "Downtown Location 10: Get a feel for the local Charlottesville scene"},
        {latlng: [38.03833607325096, -78.49103540317081], radius: 250, options: {color: '#fb8b24', fillColor: '#0f4c5c', fillOpacity: 1}, popupContent: "Dairy Location 11: Sample flavors of the Charlottesville community"},
        {latlng: [38.051270274500226, -78.50237768101981], radius: 300, options: {color: '#fb8b24', fillColor: '#0f4c5c', fillOpacity: 1}, popupContent: "Barracks Location 12: Catch the bus here to restock on essential study snacks"},
    ];
    

    var allLayers = new Array();
    
    // Loop through the circles array and add each circle to the map
    circles.forEach(function(circle) {
        var circleObject = L.circle(circle.latlng, circle.radius, circle.options);
        let layer = L.layerGroup();
        circleObject.addTo(layer)

        layer.addTo(map)
        allLayers.push(layer)
        circleObject.bindPopup(circle.popupContent); 
    });

    
    let url;
    document.addEventListener('click',function(event){
        if (event.target.classList.contains("checkbox")){
            toggleCrossOut(event.target)
            url = `http://wahoo.us-east-1.elasticbeanstalk.com/user/${username}/visited/${getPlaceName(event.target.id)}/`
            if (!event.target.checked){
                allLayers[parseInt(event.target.id.substring(3))-1].addTo(map)
                url+='false'
            }
            else{
                map.removeLayer(allLayers[parseInt(event.target.id.substring(3))-1])
                url+='true'
            }
        }
        const newTab = window.open(url,'_blank')

        setTimeout(() => {
            newTab.close();
        }, 100);
    })

});
