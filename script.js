


            //CARTE
            var map = L.map('map').setView([51.505, -0.09], 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);



            let A
            let B
            let addition
            let ID_Selectionnable = "A"

            //POLYGONES
            let geojsonData = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "id": 1,
      "properties": { "name": "Zone A", "kind": "zone", "color": "#0000ff", "motif": "basic" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [2.345, 48.853],
            [2.365, 48.853],
            [2.365, 48.863],
            [2.345, 48.863],
            [2.345, 48.853]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "id": 2,
      "properties": { "name": "Zone B", "kind": "zone", "color": "#ff0000", "motif": "basic" },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [2.346, 48.854],
            [2.366, 48.854],
            [2.366, 48.864],
            [2.346, 48.864],
            [2.346, 48.854]
          ]
        ]
      }
    },
    
  ]
}



//const button = document.querySelector("button"); //ID A METTRE

//button.addEventListener("click", (event) => {
  //button.innerHTML = `Nombre de clics : ${event.detail}`;
//});


//Fonction Trie tout les elements JSON si leur ID est correct et choisi ceux qui ont l'ID spécifié
//
function Select_by_id(nb, Mode_de_Recherche) {
      const byId = new Map(
  geojsonData.features
    .filter(f => f.id !== undefined)
    .map(f => [f.id, f])
);

if(ID_Selectionnable == "A"){ //Selectionne l'objet geojson avec l'ID ou l'index X, et défini comme "A"




if(Mode_de_Recherche == "index"){

A = geojsonData.features[nb - 1]
//console.log("nouveau A défini 1");
//console.log(A);

}else{
    
A = byId.get(nb);
//console.log("nouveau A défini 2");
//console.log(A);

};


initialisation_avant_deplacement()

//met à jour les valeurs affichées (à fonctionniser si possible)
valeur_affiche_1.value = A.properties.name
valeur_affiche_2.value = A.properties.color
valeur_affiche_3.value = A.geometry.coordinates
valeur_affiche_4.value = A.properties.name
valeur_affiche_5.value = A.properties.name
valeur_affiche_6.value = A.properties.name

};



if(ID_Selectionnable == "B"){ //Selectionne l'objet geojson avec l'ID ou l'index X, et défini comme "B"




if(Mode_de_Recherche == "index"){

B = geojsonData.features[nb - 1]
//console.log("nouveau B défini 1 ");
//console.log(B);

}else{
    
B = byId.get(nb);
//console.log("nouveau B défini 2");
//console.log(B);

};};

};
//--------------------------------------------









      //Fonction qui log les coordonées une fois cliqué *A
      function handleClick(latlng, source) {
  console.log(source, "Lat:", latlng.lat, "Lng:", latlng.lng);
}

            //Event listener click *A
      map.on("click", (e) => {
  handleClick(e.latlng, "MAP");
});




//Fonction, Trouver la prochaine ID Disponible dans le GeoJson
function Prochain_id_disponible() {
id_dispo = 0

geojsonData.features.forEach(feature => {
  if (id_dispo < feature.id){id_dispo = feature.id};
});
id_dispo++
console.log("prochain id dispo : " + id_dispo)
  
}


let derniere_caracteristiques = ["#ffffff","zone","basic","Zone A"] // à modifier par le dernier element crée/modifié


//Prochain_id_disponible()

//Fonction, Créer une forme à partir du resultat [::: A CREER AUSSI DANS GEOJSON ET PRENDRE LE PROCHAIN ID DISPO :::]
//
function Creation_Objet(CreatedObject) {


Prochain_id_disponible() //appliquer l'id
CreatedObject.id = id_dispo;



CreatedObject.properties.color = derniere_caracteristiques[0];
CreatedObject.properties.kind = derniere_caracteristiques[1];;
CreatedObject.properties.motif = derniere_caracteristiques[2];
CreatedObject.properties.name = derniere_caracteristiques[3] + " " + CreatedObject.id;

layer.addData(CreatedObject) //ajoute l'objet créé
geojsonData.features.push(CreatedObject);


Style_reload_all()
actualiser_explorateur()





  }
 //--------------------------------------------






//function Remove_Objet_2(objectL){

    //layer.removeLayer(objectL)
    //console.log("DELETE")
//}

function Remove_Objet(id_B) {
//Fonction, Supprimer un objet (layer) [::: A SUPPRIMER AUSSI DANS GEOJSON :::]
//
layer.eachLayer(function (lyr) { //supprime l'objet avec ...
  if (lyr.feature && lyr.feature.id === id_B) { //...l'id 2.
  geojsonData.features = geojsonData.features.filter(f => f.id !== id_B);
  layer.removeLayer(lyr);
  }
});

actualiser_explorateur()

}
 //--------------------------------------------








//.............................................
// Fonction Applique une opération
//.............................................
function Operation(operation_choisie) {
if(operation_choisie == 1){
resultOperation = turf.union(A, B);}else if(operation_choisie == 3){resultOperation = turf.intersect(A, B);}else if(operation_choisie == 2){resultOperation = turf.difference(A, B);}

//ajoute une forme (addition)
resultOperation = structuredClone(resultOperation); // casse toute référence partagée

Creation_Objet(resultOperation)
ID_Selectionnable = "A"

}
 //--------------------------------------------








//Appeler fonction création d'element
//--------------------------------------------


function load_Data(){ //fonction charge tout
layer.clearLayers();      // nettoie l’affichage
layer.addData(geojsonData);







//Select_by_id() //SUPPRIMER SI BESOIN
//Operation(3) //SUPPRIMER SI BESOIN
//Remove_Objet(3) //SUPPRIMER SI BESOIN
Style_reload_all() //LAISSER
actualiser_explorateur() //LAISSER





} //-----------------------------------------------------


let A_Leaf

function Objet_Leaf_Correspondant(){
    


layer.eachLayer((lyr) => {
  if (lyr.feature && lyr.feature.id === A.id) {
    A_Leaf = lyr
    console.log(A_Leaf)
  }

  //map.fitBounds(A_Leaf.getBounds());

});

} //nécessaire pour une ou deux Fonction



//Fonction actualiser caractéristiques
//
function Style_reload(Shape){
    console.log(Shape)
        Shape.setStyle({ color: Shape.feature.properties.color });  // -------------
}
//----------------------------------------------------





//Fonction actualiser caractéristiques
//
function Style_reload_all(){
layer.eachLayer((lyr) => {
//console.log(lyr)
  Style_reload(lyr)
})
};
//----------------------------------------------------


// Event lorsque le fichier est chargé, Lance toute l'actualisation





document.getElementById("fileInput").addEventListener("change", function (event) {

  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function (e) {
    try {
      geojsonData = JSON.parse(e.target.result);

      // Nettoyer la carte
      layer.clearLayers();

      //Réajouter les coordonées
      layer.addData(geojsonData);

      // Optionnel : zoom auto
      //map.fitBounds(layer.getBounds());

      load_Data()
      


    } catch (err) {
      console.error("Fichier invalide", err);
    }
  };

  reader.readAsText(file);

});


const fileInput = document.getElementById("fileInput");
const fakeButton = document.getElementById("fakeButton");

document.getElementById("importer").addEventListener("click", () => {
  document.getElementById("fileInput").click();
});



// 3) Ajout à la carte + style minimal + popup (Event) *A. Pour tout les éléments envoyés
let layer = L.geoJSON(null, {
  style: (feature) => {
    //if (feature.properties.kind === "zone") {
     // return { color: "#333", weight: 2, fillColor: "#66c2ff", fillOpacity: 0.4 };
    //}
    //if (feature.properties.kind === "route") {
    //  return { color: "#ff4d4d", weight: 4 };
    //}
    //return { color: "#3388ff" };

    //layer.setStyle((feature) => ({ color: feature.properties.color }));
    //return { color: feature.properties.color };


  },
  onEachFeature: (feature, lyr) => {
    lyr.on("click", (e) => handleClick(e.latlng, "LAYER")); //ajoute l'écouteur de clic sur chque formes
    //console.log(lyr) //applique chaque propriétés
    //lyr.setStyle((feature) => ({ fillColor: "#00ff00" }));
    //lyr.setStyle((feature) => ({ color: "#00ff00" }));
  }
}).addTo(map);







//Initialisation de variables
let NB_DuPremierBouton = 0
let Explorateur_Liste_Noms = ["Elem 1",0,0,0,0,0,0,0,0,0]
let Explorateur_Bouton_1 = document.getElementById("Explorateur_Objet_1");
let Explorateur_Bouton_2 = document.getElementById("Explorateur_Objet_2");
let Explorateur_Bouton_3 = document.getElementById("Explorateur_Objet_3");
let Explorateur_Bouton_4 = document.getElementById("Explorateur_Objet_4");
let Explorateur_Bouton_5 = document.getElementById("Explorateur_Objet_5");
let Explorateur_Bouton_6 = document.getElementById("Explorateur_Objet_6");
let Explorateur_Bouton_7 = document.getElementById("Explorateur_Objet_7");
let Explorateur_Bouton_8 = document.getElementById("Explorateur_Objet_8");
let Explorateur_Bouton_9 = document.getElementById("Explorateur_Objet_9");
let Explorateur_Bouton_10 = document.getElementById("Explorateur_Objet_10");





//Actualisation des boutons
//
function actualiser_explorateur(){


let i_A = 0


Explorateur_Liste_Noms = [" - "," - "," - "," - "," - "," - "," - "," - "," - "," - "]
geojsonData.features
  .slice(NB_DuPremierBouton, NB_DuPremierBouton + 9) // de l'index 1 inclus à 3 exclus
  .forEach(feature => {
    console.log(feature.id);
    console.log(feature.properties.name);
    Explorateur_Liste_Noms[i_A] = feature.properties.name
    i_A++
  });


Explorateur_Bouton_1.textContent = Explorateur_Liste_Noms[0]
Explorateur_Bouton_2.textContent = Explorateur_Liste_Noms[1]
Explorateur_Bouton_3.textContent = Explorateur_Liste_Noms[2]
Explorateur_Bouton_4.textContent = Explorateur_Liste_Noms[3]
Explorateur_Bouton_5.textContent = Explorateur_Liste_Noms[4]
Explorateur_Bouton_6.textContent = Explorateur_Liste_Noms[5]
Explorateur_Bouton_7.textContent = Explorateur_Liste_Noms[6]
Explorateur_Bouton_8.textContent = Explorateur_Liste_Noms[7]
Explorateur_Bouton_9.textContent = Explorateur_Liste_Noms[8]
Explorateur_Bouton_10.textContent = Explorateur_Liste_Noms[9]

}
//----------------------------------------------------



//EVENT Click bouton haut
//
document.getElementById("Explorateur_Fleche_Haut").addEventListener("click", function () {



        if(NB_DuPremierBouton>0){NB_DuPremierBouton = NB_DuPremierBouton - 1
          actualiser_explorateur()
        ;}

});
//----------------------------------------------------


//EVENT Click bouton bas
//
document.getElementById("Explorateur_Fleche_Bas").addEventListener("click", function () {


    NB_DuPremierBouton = NB_DuPremierBouton + 1
    actualiser_explorateur();

});
//----------------------------------------------------

//EVENT Click bouton all explorateur
//
document.querySelectorAll(".Ligne_explorateur").forEach((btn) => {
  btn.addEventListener("click", () => {
    const index = Number(btn.dataset.index);
    Selection_depuis_explorateur(index);
  });
});
//----------------------------------------------------


//Fonction Selection d'une forme depuis l'explorateur
//
function Selection_depuis_explorateur(n) {

  if(n + NB_DuPremierBouton <= geojsonData.features.length){
  Select_by_id(n + NB_DuPremierBouton, "index") //index pour selectionner en fonction de l'emplacement de l'élément dans la liste.
  console.log("Objet", n + NB_DuPremierBouton);

  }else{
      console.log("Pas d'objets attribués")
  }

}
//----------------------------------------------------


let Mode_Choix_Operation = false

//EVENT Click bouton opération
//
document.getElementById("Choix_Operation").addEventListener("click", function () {


if(Mode_Choix_Operation == false){
Mode_Choix_Operation = true
ID_Selectionnable = "B"
console.log("mode opération actif")
}else{
Mode_Choix_Operation = false
ID_Selectionnable = "A"
console.log("mode opération inactif")
}

});
//----------------------------------------------------

//EVENT Click bouton appliquer operation 1
//
document.getElementById("Operation_Mode_1").addEventListener("click", function () {


if(Mode_Choix_Operation == true){
    Operation(1)
    Mode_Choix_Operation = false
}

});
//----------------------------------------------------
//EVENT Click bouton appliquer operation 2
//
document.getElementById("Operation_Mode_2").addEventListener("click", function () {


if(Mode_Choix_Operation == true){
    Operation(2)
    Mode_Choix_Operation = false
}

});
//----------------------------------------------------
//EVENT Click bouton appliquer operation 3
//
document.getElementById("Operation_Mode_3").addEventListener("click", function () {


if(Mode_Choix_Operation == true){
    Operation(3)
    Mode_Choix_Operation = false
}

});
//----------------------------------------------------


let valeur_affiche_1 = document.getElementById("valeur_affiche_1")
let valeur_affiche_2 = document.getElementById("valeur_affiche_2")
let valeur_affiche_3 = document.getElementById("valeur_affiche_3")
let valeur_affiche_4 = document.getElementById("valeur_affiche_4")
let valeur_affiche_5 = document.getElementById("valeur_affiche_5")
let valeur_affiche_6 = document.getElementById("valeur_affiche_6")

//EVENT Modifier une valeur dans les champs
valeur_affiche_1.addEventListener("change", (modifs) => {
  console.log("nouvelle valeur:", modifs.target.value);
    A.properties.name = modifs.target.value
    actualiser_explorateur()
});

valeur_affiche_2.addEventListener("change", (modifs) => {
  console.log("nouvelle valeur:", modifs.target.value);
    A.properties.color = modifs.target.value
    actualiser_explorateur()
    Style_reload_all()
});

valeur_affiche_3.addEventListener("change", (modifs) => {
  console.log("nouvelle valeur:", modifs.target.value);
    A.geometry.coordinates = [[[2.3,48.85],[2.36,48.85],[2.36,48.86],[2.3,48.86],[2.3,48.85]]] // A GÊRER
    actualiser_explorateur()
    load_Data()
});
//-----------------------------------------------------

//EVENT Click bouton appliquer operation 3
//
document.getElementById("Bouton_supprimer").addEventListener("click", function () {


Remove_Objet(A.id)
console.log(A.id)

});
//----------------------------------------------------



//EVENT Click bouton appliquer operation 3
//
document.getElementById("Bouton_duppliquer").addEventListener("click", function () {


//const nouvel_objet = geojsonData.features.push(A);
//layer.addData(A)
A = structuredClone(A); // casse toute référence partagée
console.log("------------ DUPLI -----------------")
console.log(A)
console.log("------------ DUPLI -----------------")
derniere_caracteristiques[3] = A.properties.name
Creation_Objet(A)

console.log(geojsonData.features)
//load_Data()

});
//----------------------------------------------------



let liste_coords_dynamique = []
let liste_coords_initiales = []


//FUNCTION reformer les coordonées
//
function convertir_coords(coords_json){
 try {
    const parsed = JSON.parse(coords_json); // transforme en vrai tableau JS

    const result = [];

    // parsed = [[[lng,lat],[lng,lat],...]]
    parsed.forEach(ring => {
      ring.forEach(pair => {
        result.push([pair[0], pair[1]]);
      });
    });


    console.log(result)
    liste_coords_dynamique = result //renvoie le résultat

  } catch (err) {
    console.error("Format invalide");
    return [];
  }
}








//----------------------------------------------------






//FONCTIONS DEPLACER LES POINTS
//
function Deplacement(){ //deplace la forme par rapport à la position de la souris sur l'écran (relativement depuis le clic et l'emplacement initiale de la forme)
  let i2 = 0
  console.log(liste_coords_initiales)
liste_coords_dynamique.forEach(pair => {


  pair[0] = liste_coords_initiales[i2][0] + 0.0001 * Math.max(Math.min((1 * coords_souris_X - coords_initiales_souris_X),10000),-10000);
  console.log(Leaf_map_Zoom)
  console.log((20 - Leaf_map_Zoom) * 1)
  console.log(0.0001 * Math.max(Math.min((1 * coords_souris_X - coords_initiales_souris_X),10000),-10000))
  pair[1] = liste_coords_initiales[i2][1] - 0.0001 * Math.max(Math.min((1 * coords_souris_Y - coords_initiales_souris_Y),10000),-10000);


    i2++
});
appliquer_coords_leaflet()
}

function Deplacement2(){ //EXEMPLE
liste_coords_dynamique.forEach(pair => {
  pair[0] += 0.001;
  pair[1] += 0.001;
});
appliquer_coords_leaflet()
}
//----------------------------------------------------


//Applique les coordonées modifiées, sur leaflet
function appliquer_coords_leaflet() { 

  //liste_coords_dynamique[2][1] = 48.95 // A MODIFIER
  A_Leaf.setLatLngs(liste_coords_dynamique.map(([lng, lat]) => [lat, lng])); //appliquer sur leaflet - et latitude / longitude inversées pour être correctes
  //return [];

}
//----------------------------------------------------


//Applique les coordonées modifiées, sur le json
function appliquer_coords_json() { 
appliquer_coords_leaflet(); // array Leaflet
  A.geometry.coordinates = [liste_coords_dynamique]; //appliquer sur le json
console.log("OK")

}
//----------------------------------------------------



//EVENT Conversions des coordonées (1x) pour les modifier dynamiquement sur la carte
//
function initialisation_avant_deplacement(){


  
    Objet_Leaf_Correspondant()
    console.log(A)
        console.log(A_Leaf)
        
        convertir_coords(JSON.stringify(A.geometry.coordinates)); //convertir les données dans une variable pour les modifier plus facilement
        liste_coords_initiales = structuredClone(liste_coords_dynamique) //garder une copier pour certains déplacements (purement optionnelle pour un mouvement avec la souris)
        console.log(liste_coords_initiales)

        appliquer_coords_leaflet();   //appliquer sur la carte/leaflet (visuel)
        appliquer_coords_json();  //appliquer sur json (sauvegarde)

}
//----------------------------------------------------



//EVENT bouton désactiver les déplacements
//
document.getElementById("CD_OFF").addEventListener("click", function () {

if (mode_deplacement == 1){
  map.dragging.enable();
map.keyboard.enable();
  mode_deplacement = 0
}



});
//----------------------------------------------------

//EVENT bouton activer dles éplacements
//
document.getElementById("CD_ON").addEventListener("click", function () {

if(mode_deplacement == 0){
  map.dragging.disable();
map.keyboard.disable();
  mode_deplacement = 1
}



});
//----------------------------------------------------

var coords_souris_X = 0
var coords_souris_Y = 0
let mode_deplacement = 0
var coords_initiales_souris_X = 0
var coords_initiales_souris_Y = 0


//Souris pressée (deplacement en mode 2)
//


document.addEventListener("pointerdown", (e) => {


if (document.getElementById("map").matches(":hover") == true){


  console.log("Souris pressée");

  if(mode_deplacement == 1){
    initialisation_avant_deplacement(); // a mettre en bas dans move
  coords_initiales_souris_X = coords_souris_X
  coords_initiales_souris_Y = coords_souris_Y
    mode_deplacement = 2
    }
    }
});
//----------------------------------------------------

//Souris relachée (deplacement en mode 1)
//



document.addEventListener("pointerup", (e) => {



    console.log("Souris relâchée");
  if(mode_deplacement == 2){

mode_deplacement = 1
  appliquer_coords_leaflet();   //appliquer sur la carte/leaflet (visuel)
  appliquer_coords_json();  //appliquer sur json (sauvegarde)
  }
});
//----------------------------------------------------


document.addEventListener("keydown", (e) => {
  if (e.code === "KeyA") {
    console.log("Touche A pressée");
    Deplacement(); // a mettre en bas dans move


      //partie souris lors du clic

    

  }
});

document.addEventListener("keydown", (e) => {
  if (e.code === "KeyD") {
    console.log("Touche D pressée (initialisation_avant_deplacement)");
    initialisation_avant_deplacement(); // a mettre en bas dans move

  coords_initiales_souris_X = coords_souris_X
  coords_initiales_souris_Y = coords_souris_Y
  }
});


document.addEventListener("mousemove", (e) => {

  coords_souris_X = e.clientX
  coords_souris_Y = e.clientY

  console.log(mode_deplacement)
  if(mode_deplacement == 2){
    Deplacement();
  }

});


let Leaf_map_Zoom = map.getZoom(); //obtenir le zoom de la carte (uniquement pour le déplacememnt de formes)
map.on("zoomend", function () {
  Leaf_map_Zoom = map.getZoom();
});




//EVENT bouton créer triangle
//
document.getElementById("Bouton_creation_triangle").addEventListener("click", function () {

const centre = map.getCenter();
console.log(centre + "centre                  .................................")
const centre_X = centre.lng;
const centre_Y = centre.lat;

const json_object_1 = {
  type: "Feature",
  id: 5,
  properties: {
    name: "Zone A",
    kind: "zone",
    color: "#0000ff",
    motif: "basic"
  },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [centre_X, centre_Y + 0.008],
        [centre_X - 0.015, centre_Y - 0.01],
        [centre_X + 0.015, centre_Y - 0.01],
        [centre_X, centre_Y + 0.008]
      ]
    ]
  }
};

console.log(json_object_1)
Creation_Objet(json_object_1)

});
//----------------------------------------------------

//EVENT bouton créer une carré
//
document.getElementById("Bouton_creation_carre").addEventListener("click", function () {

const centre = map.getCenter();
console.log(centre + "centre                  .................................")
const centre_X = centre.lng;
const centre_Y = centre.lat;

const json_object_1 = {
  type: "Feature",
  id: 5,
  properties: {
    name: "Zone A",
    kind: "zone",
    color: "#0000ff",
    motif: "basic"
  },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [centre_X - 0.015, centre_Y - 0.01],
        [centre_X + 0.015, centre_Y - 0.01],
        [centre_X + 0.015, centre_Y + 0.01],
        [centre_X - 0.015, centre_Y + 0.01],
        [centre_X - 0.015, centre_Y + 0.01]
      ]
    ]
  }
};

console.log(json_object_1)
Creation_Objet(json_object_1)

});
//----------------------------------------------------

//EVENT bouton créer une pentagone
//
document.getElementById("Bouton_creation_pentagone").addEventListener("click", function () {

const centre = map.getCenter();
console.log(centre + "centre                  .................................")
const centre_X = centre.lng;
const centre_Y = centre.lat;

const json_object_1 = {
  type: "Feature",
  id: 5,
  properties: {
    name: "Zone A",
    kind: "zone",
    color: "#0000ff",
    motif: "basic"
  },
  geometry: {
    type: "Polygon",
    coordinates: [
      [
        [centre_X, centre_Y + 0.012],
        [centre_X + 0.014, centre_Y + 0.005],
        [centre_X + 0.009, centre_Y - 0.006],
        [centre_X - 0.009, centre_Y - 0.006],
        [centre_X - 0.014, centre_Y + 0.005],
        [centre_X, centre_Y + 0.012]
      ]
    ]
  }
};

console.log(json_object_1)
Creation_Objet(json_object_1)

});
//----------------------------------------------------


//FIN SCRIPT / INITIALISATION DE FIN


load_Data()

console.log("----------------")
Select_by_id(1, "index")
ID_Selectionnable = "B"
console.log("----------------")
Select_by_id(2, "index")
ID_Selectionnable = "A"

map.setView([48.853, 2.345], 13);


//Operation(1) //SUPPRIMER SI BESOIN
//Remove_Objet(3) //SUPPRIMER SI BESOIN
Style_reload_all()
actualiser_explorateur()

