var lat;
var long;
var parkedLat;
var parkedLong;

var storage;

function init(){
    document.addEventListener("deviceready", onDeviceReady,false);
    storage = window.localStorage;
}

function onDeviceReady(){
    var node = document.createElement('link');//creating liknk  element
    node.setAttribute('rel','stylesheet');
    node.setAttribute('type','text/css');

    if(cordova.platformId == 'ios') { //use ios.css 
        node.setAttribute('href',  'parkItios.css');
        window.StatusBar.overlaysWebView(false);
        window.StatusBar.styleDefault();
    }
    else { //android for others
        node.setAttribute('href', 'parkItandroid.css'); //set the andriod css for all other than ios 
        window.StatusBar.backgroundColorByHexString('#1565C0');
    }
    document.getElementsByTagName('head')[0].appendChild(node); //need to documetnt what this line does 
}

function setCss(elm,prop,val){
    var node = document.getElementById(elm).style;
    node.setProperty(prop,val);
}

function setParkingLocation(){
    navigator.geolocation.getCurrentPosition(setParkingLocationSuccess, locationError, {enableHighAccuracy: true});
}
function setParkingLocationSuccess(position){
    lat = position.coords.latitude;
    long = position.coords.longitude;
    storage.setItem('parkedLatitude', lat);
    storage.setItem('parkedLongitude', long);
    navigator.notification.alert("parking saved  my guy"  );
}

function showParkingLocation(){
    setCss('directions','visibility','hidden');
    setCss('instructions','display','none');

    //create latlng object 
    var latLong= new google.maps.LatLng(lat,long);
    var map = new google.maps.Map(document.getElementById('map')); //map variable pass in theat reps the display of the map , (map)

    map.setZoom(16);
    map.setCenter(latLong);

    //creating marker object 
    var marker = new google.maps.Marker({
        position : latLong,//properties, position and map
        map: map
    });
    setCss('map','visibility','visible'); //maping map visable 
}

function locationError(error){
    navigator.notification.alert("error "+ error.code+ "/nErr"+ error.message);
}

function getParkingLocation(){
    navigator.geolocation.getCurrentPosition(getParkingLocationSuccess, locationError, {enableHighAccuracy: true});
}

function getParkingLocationSuccess(position){
    lat = position.coords.latitude;
    long = position.coords.longitude;
    parkedLat = storage.getItem('parkedLatitude');
    parkedLong = storage.getItem('parkedLongitude');
    navigator.notification.alert("parking location saved")

    showDirections();
}

function showDirections(){
    var dRenderer = new google.maps.DirectionsRenderer;
    var dService = new google.maps.DirectionsService;

    var curLatLong = new google.maps.LatLng(lat,long);

    var parkedLatLong = new google.maps.LatLng(parkedLat,parkedLong);
    var map = new google.maps.Map(document.getElementById('map'));
    map.setZoom(16);
    map.setCenter(curLatLong);
    dRenderer.setMap(map);
    dService.route({
        origin: curLatLong,
        destination: parkedLatLong,
        travelMode: 'WALKING'
    },  function(response,status){
            if(status == 'OK'){
                dRenderer.setDirections(response);
                document.getElementById('directions').innerHTML ='';
                dRenderer.setPanel(document.getElementById('directions'));
            }
            else{
                navigator.notification.alert("directs failed due to "+  status);
            }
    });
    //now show map 
    setCss('map','visibility','visible');
    setCss('directions','visibility','visible');
    setCss('instructions','display','none');
}