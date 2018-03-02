ALL_BREEDS = null
GENERATED = false

function getAllBreeds(){
	fetch('http://dog.ceo/api/breeds/list')
	  .then( response => {
	  	ALL_BREEDS = response
	  } )
	  .catch( error => console.log("ERROR", error))		
}

function getRandomDogImage(){
	fetch('http://dog.ceo/api/breeds/image/random')
	  .then( response => {
	  		json = response.json()
	  		return json
	  	}).then(jsonResponse => {
			if (GENERATED) {
			        removePrevious()
			    }	  	
			var img = new Image()
    		var div = document.getElementById('random')
    		img.src = jsonResponse["message"]
    		div.appendChild(img)
    		GENERATED = true;
	  	})
	  
	  .catch( error => console.log("ERROR", error))	
}

function removePrevious() {
    var remove = document.getElementById('random')
    remove.removeChild(remove.childNodes[0])
}
