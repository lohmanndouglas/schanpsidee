/*!
 * \file controller.js
 * \brief Controller between model and view 
 * @author Douglas Lohmann <dlohmann0@gmail.com> 
 * 
 * This file has the translate function for every 
 * calls from view to model.
 *
 */

 /*!
 * This method tranlate function calls 
 * to calculate the electric field. 
 *  
 * \param object, any webGL object
 * \param dot, any dot in scene
 */
function calcField() {
	alert("Calcula campo");
	// get dots and objects
	var charge_dots = tela.cena3D.listPontosView(); // a
	var objects = tela.cena3D.listObjView(); // o
   // var field_vector = X; 

    var Dot_POSITION = new THREE.Vector3();
    var vectorT;
    var i = 0;
    var j = 0;
	var k = 0;
	var vector = new THREE.Vector3();
	for (i = 0; i < charge_dots.length; i++) { // for each dot
		alert(i);
		Dot_POSITION = charge_dots.position;
		for(j = 0; j < objects.length; j++){ // for each object
			//* Make the transformations */
            var x = objects[j].geometry.vertices.length;
            var vectorT = objects[j].geometry.vertices;
			for(k = 0; k < x ; k++){ 
				vector = objects[j].geometry.vertices[k];
				vectorT[k] = obj.matrix.multiplyVector3(vector);
			}
			// calculate
			calc_eletric_fild(vectorT, Dot_POSITION);
		}
	}

	// for each dot "i"
	// 	Dot_POSITION = i.position
 // 		for each object j
 // 			OBJECTS_VERTICES = "j".[vertices] * "j".scale * "j".rotation + "j".position 
 // 			calculate fiel{OBJECTS_VERTICES, Dot_POSITION}
 // 		X = X + (vector of electric fild from OBJ j)
 // 	plot vector for dot "i"
 // 	fild = add electric fild to the dot "i"
}


        // var vector = new THREE.Vector3(4,0,0);
        // var vectorT = new THREE.Vector3();
        // vector = obj.geometry.vertices[0];
        // // alert(obj.matrix.elements);
        // alert(vector.x);
        // vectorT = obj.matrix.multiplyVector3(vector);
        // alert(vectorT.x);