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

    if(cordova.platformId == 'ios') {
        node.setAttribute('href',  'parkItios.css');
        window.statusbar.overlaysWebView(false);
        window.statusbar.styleDefault();
    }
    else {
        node.statusbar.backgroundColorByHexString('')
    }
    document.getElementsByTagName('head')[0].appendChild(node);
}