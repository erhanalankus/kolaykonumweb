var welcomeScreen = document.getElementById('screenWelcome');
var getLocationScreen = document.getElementById('screenGetLocation');
var saveLocationScreen = document.getElementById('screenSaveLocation');
var successScreen = document.getElementById('screenSuccess');

var latitudeTextbox = document.getElementById('enlem');
var longitudeTextbox = document.getElementById('boylam');
var nameTextbox = document.getElementById('isim');

var resultLink = document.getElementById('resultLink');

var latitude;
var longitude;
var accuracy;
var name;
var wpid;
var userAgent = navigator.userAgent || navigator.vendor || window.opera;

function startClicked() {
    welcomeScreen.style.display = "none";
    getLocationScreen.style.display = "block";
    wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
}

function geo_error() {
    alert("Sorry, no position available.");
}

var geo_options = {
    enableHighAccuracy: true,
    maximumAge: 0,
    timeout: 5000
};

function geo_success(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    accuracy = position.coords.accuracy;
    accuracyDisplay.innerHTML = accuracy;

    if (Number(accuracy) < 10000) {
        getLocationScreen.style.display = "none";
        saveLocationScreen.style.display = "block";
        latitudeTextbox.value = latitude.toString().slice(0, 9);
        longitudeTextbox.value = longitude.toString().slice(0, 9);
        navigator.geolocation.clearWatch(wpid);
    }
}

function saveClicked() {
    // Remove spaces
    name = nameTextbox.value.replace(/\s/g, '').toLowerCase();
    saveLocationScreen.style.display = "none";
    successScreen.style.display = "block";

    resultLink.innerHTML = name + '.kolaykonum.com';

    if (/android/i.test(userAgent)) {
        resultLink.setAttribute('href', 'geo:' + latitude + ',' + longitude + '?q=' + latitude + ',' + longitude + '(' + nameWithoutSpaces + ')')
    }
    else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        resultLink.setAttribute('href', 'https://maps.apple.com/?ll=' + latitude + ',' + longitude + '&q={' + nameWithoutSpaces + '}')
    }
    else {
        resultLink.setAttribute('href', 'https://www.google.com/maps/search/?api=1&query=' + latitude + ',' + longitude)
    }
}