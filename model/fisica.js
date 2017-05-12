/*!
 * \file phisics.js
 * \brief phisics math 
 * @author Douglas Lohmann <dlohmann0@gmail.com> 
 * 
 * This file has the phisics functions to 
 * calculate.
 *
 */

 /*!
 * This method calculate the resulting eletric fild 
 * generated by vert to dot. 
 * The charge is distributed on vert vectors. 
 *  
 * \param vert, vector of THREE.vector3
 * \param dot, THREE.vector3 represent the position
 * \param charge, the distribution of charge
 */
function calc_eletric_fild(vert, dot, charge){
    var Q = charge * Math.pow(10,-6);
	var epsilon = 8.854 * Math.pow(10,-12);
	var k = 1 / (4*Math.PI*epsilon);
    var dQ = Q/vert.length;
	var E = new THREE.Vector3();  // sum of all dots     
	var dE = new THREE.Vector3(); // for each dot of object

	var distance_vector = new THREE.Vector3(0,0,0);
    var unit_vector = new THREE.Vector3(0,0,0);
	var distance = 0;

	// cosntants
    var const_dq = 0;
    var i = 0;
	for (i = 0; i < vert.length; i++){
		// var aux = new THREE.Vector3(vert[0].x,);
		aux_1 = vert[i].clone();
		aux_2 = vert[i].clone();
		aux_3 = dot.clone();
		distance_vector = aux_3.sub(aux_1); // distance
		// alert("distance_vector: "+distance_vector.x+", "+distance_vector.y+", "+distance_vector.z);
		unit_vector = distance_vector.normalize();
		// alert("UNIT: "+unit_vector.x+", "+unit_vector.y+", "+unit_vector.z);
		distance = aux_2.distanceTo(dot); // distance module
		// alert("distance"+distance); 
        const_dq = k*(dQ/Math.pow(distance,2)); 
		dE = unit_vector.multiplyScalar(const_dq);
		E.add(dE);
		// alert("VECTOR "+i+": "+E.x+", "+E.y+", "+E.z );
	}
	return E;
};


 /*!
 * This method calculate the resulting potential 
 * generated by vert to dot. 
 * The charge is distributed on vert vectors. 
 *  
 * \param vert, vector of THREE.vector3
 * \param dot, THREE.vector3 represent the position
 * \param charge, the distribution of charge
 */
function calc_potential(vert, dot, charge){

    var Q = charge * Math.pow(10,-6);
	var epsilon = 8.854 * Math.pow(10,-12);
	var k = 1 / (4*Math.PI*epsilon);
    var dQ = Q/vert.length;
	var V = 0;  // sum of all dots     
	var dE = 0; // for each dot of object
	var distance = 0;
    var const_dq = 0;
    var i = 0;
	for (i = 0; i < vert.length; i++){
		aux_1 = vert[i].clone();
		distance = aux_1.distanceTo(dot); // distance module
		// alert("distance"+distance); 
        dV = k*(dQ/distance); 
	 	V = V + dV;
	}
	return V;
};


