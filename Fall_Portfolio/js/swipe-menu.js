// Récupération des blocs par leur identifiant
var mainMenu = document.querySelector("#menu");
var burgerMenu = document.querySelector("#menu-burger");

/*===============================*/
/*=== Cliquer sur le menu burger ===*/
/*===============================*/
// Vérifie si l'événement touchstart existe et est le premier déclenché
var clickedEvent = "click"; // variable si "touchstart" n'est pas détecté
window.addEventListener('touchstart', function detectTouch() {
	clickedEvent = "touchstart"; // Transforme l'événement en "touchstart"
	window.removeEventListener('touchstart', detectTouch, false);
}, false);

// Créé un "toggle class" en Javascrit natif (compatible partout)
burgerMenu.addEventListener(clickedEvent, function(evt) {
	console.log(clickedEvent);
	// Modification du menu burger
	if(!this.getAttribute("class")) {
		this.setAttribute("class", "clicked");
	} else {
		this.removeAttribute("class");
	}
	// Variante avec x.classList (ou DOMTokenList), pas 100% compatible avant IE 11...
	// burgerMenu.classList.toggle("clicked");

	// Créé l'effet pour le menu slide (compatible partout)
	if(mainMenu.getAttribute("class") != "visible") {
		mainMenu.setAttribute("class", "visible");
	} else {
		mainMenu.setAttribute("class", "invisible");
	}
}, false);

/*===============================*/
/*=== Swipe avec Touch Events ===*/
/*===============================*/
// Si l'écran est plus petit que "x" pixels (optionnel) // 1024px ici
if(screen.width <= 1024) {
	var startX = 0; // Position de départ
	var distance = 100; // 100 px de swipe pour afficher le menu

	// Au premier point de contact
	window.addEventListener("touchstart", function(evt) {
		// Récupère les "touches" effectuées
		var touches = evt.changedTouches[0];
		startX = touches.pageX;
		between = 0;
	}, false);

	// Quand les points de contact sont en mouvement
	window.addEventListener("touchmove", function(evt) {
		// Limite les effets de bord avec le tactile...
		evt.preventDefault();
		evt.stopPropagation();
	}, false);

	// Quand le contact s'arrête
	window.addEventListener("touchend", function(evt) {
		var touches = evt.changedTouches[0];
		var between = touches.pageX - startX;

		// Détection de la direction
		if(between > 0) {
			var orientation = "ltr";
		} else {
			var orientation = "rtl";
		}

		// Modification du menu burger
		if(Math.abs(between) >= distance && orientation == "ltr" && mainMenu.getAttribute("class") != "visible") {
				burgerMenu.setAttribute("class", "clicked");
		}
		if(Math.abs(between) >= distance && orientation == "rtl" && mainMenu.getAttribute("class") != "invisible") {
				burgerMenu.removeAttribute("class");
		}

		// Créé l'effet pour le menu slide (compatible partout)
		if(Math.abs(between) >= distance && orientation == "ltr" && mainMenu.getAttribute("class") != "visible") {
			mainMenu.setAttribute("class", "visible");
		}
		if(Math.abs(between) >= distance && orientation == "rtl" && mainMenu.getAttribute("class") != "invisible") {
			mainMenu.setAttribute("class", "invisible");
		}
	}, false);
}

// pour changer la couleur des bars en fonction du scrolltop
document.onscroll = function(){
    if (document.documentElement.scrollTop > 625 && document.documentElement.scrollTop < 1720) {
        document.getElementById('bar1').style.background = "#8409a2";
        document.getElementById('bar2').style.background = "#8409a2";
        document.getElementById('bar3').style.background = "#8409a2";
       
      }else if(document.documentElement.scrollTop > 2700 && document.documentElement.scrollTop < 3800){
        document.getElementById('bar1').style.background = "#e52e2d";
        document.getElementById('bar2').style.background = "#e52e2d";
        document.getElementById('bar3').style.background = "#e52e2d";
      
      }else if(document.documentElement.scrollTop > 3800 && document.documentElement.scrollTop < 5790){
        document.getElementById('bar1').style.background = "black";
        document.getElementById('bar2').style.background = "black";
        document.getElementById('bar3').style.background = "black";
    }else if(document.documentElement.scrollTop > 5790 && document.documentElement.scrollTop < 7663){
        document.getElementById('bar1').style.background = "red";
        document.getElementById('bar2').style.background = "red";
        document.getElementById('bar3').style.background = "red";
    }else{
        document.getElementById('bar1').style.background = "white";
        document.getElementById('bar2').style.background = "white";
        document.getElementById('bar3').style.background = "white";
 
    }
}