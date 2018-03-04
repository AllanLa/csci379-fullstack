ALL_BREEDS = null
GENERATED = 0

function getAllBreeds(){
	fetch('http://dog.ceo/api/breeds/list')
	  .then( response => {
	  	ALL_BREEDS = response
	  } )
	  .catch( error => console.log("ERROR", error))		
}

function get12RandomDogs(){
	for(var i = 0; i < 12; i++){
		getRandomDogImage()
	}
}

function getRandomDogImage(){
	fetch('http://dog.ceo/api/breeds/image/random')
	  .then( response => {
	  		json = response.json()
	  		return json
	  	}).then(jsonResponse => {
			if (GENERATED == 12) {
				   GENERATED = 0
			       removePrevious()
			    }	  	
			var img = new Image()
    		var div = document.getElementById('random')
    		img.src = jsonResponse["message"]
    		img.id = "Image" + GENERATED
    		img.class = "col-sm-1 col-md-1 col-lg-1"
    		div.appendChild(img)
    		GENERATED ++    		
	  	})
	  
	  .catch( error => console.log("ERROR", error))	
}

function removePrevious() {
    
    for(var i = 0; i < 12; i++){
    	var div = document.getElementById('Image' + i)
		div.parentNode.removeChild(div)
	}    
}
