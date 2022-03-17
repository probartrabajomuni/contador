//Vemos si existe el ServiceWorker en el navegador
//Vamos a registrar un ServiceWorker para poder trabajar
if("serviceWorker" in navigator){
//if(navigator.serviceWorker){
    console.log("si existe");
    navigator.serviceWorker.register("./serviceWorker.js")
}