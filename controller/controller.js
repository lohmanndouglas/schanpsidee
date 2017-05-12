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
 * \param void
 *
 */
function calcField() {
	
	/* get dots and objects */
	var charge_dots = tela.cena3D.listPontosView(); // a
	var objects = tela.cena3D.listObjView(); // o

    if(charge_dots.length >= 1 && objects.length >= 1 ){
        var Dot_POSITION = new THREE.Vector3();
        var total = new THREE.Vector3(0,0,0);
        var resultant_vector; 
        var pI = [0,0,0];
    	for (var i = 0; i < charge_dots.length; i++) { // for each dot
    		Dot_POSITION = charge_dots[i].position;
            total.set(0,0,0);
    		for(var j = 0; j < objects.length; j++){ // for each object
                
                /* TODO: get the object mesh 
                 * This is not working because the precision of the mesh vertices 
                 * The next TODO comments there were to change this.
                 */
                var vertices = []; 
                //var vertices = objects[j].geometry.vertices;
                //var x =  vertices.length;
                // var radius = objects[j].raio;
                var charge = objects[j].carga;
                var new_vertices = []; 
                var matriz_t = objects[j].matrix.clone();
                
                /* TODO: get the object mesh
                 * Change to the all switch for commented "for"
                 * for each type of object :/
                 */
                 switch (objects[j].name) {
                    case "ring":
                        var radius = objects[j].raio;
                        var n_iterations = 1000;
                        var teta = 0;
                        var dTeta = 2*Math.PI/n_iterations; 
                        for(var k = 0; k < n_iterations ; k++){
                            vertices[k] = new THREE.Vector3(radius*Math.cos(teta), radius*Math.sin(teta),0);
                            new_vertices[k]=vertices[k].applyProjection(matriz_t);
                            teta = teta + dTeta;
                        }        
                    break;
                    case "dot":
                        new_vertices[0] = objects[j].position;
                    break;
                    case "line":
                        var length_ = objects[j].raio;
                        var n_iterations = 1000;
                        var cont = length_/n_iterations;
                        var dp = cont/2; 
                        for(var k = 0; k < n_iterations ; k++){
                            vertices[k] = new THREE.Vector3(0, (-length_/2) + dp,0);
                            new_vertices[k]=vertices[k].applyProjection(matriz_t);
                            dp = dp + cont;
                        }     
                    break;
                    case "disc":
                        var radius = objects[j].raio;
                        alert("ERRO: disc");
                        var n_iterations = 1000;
                        var teta = 0;
                        var dTeta = 2*Math.PI/n_iterations; 
                        for(var k = 0; k < n_iterations ; k++){
                            vertices[k] = new THREE.Vector3(radius*Math.cos(teta), radius*Math.sin(teta),0);
                            new_vertices[k]=vertices[k].applyProjection(matriz_t);
                            teta = teta + dTeta;
                        }  
                    break;
                }
                // var k=0;
                // for(k = 0; k < n_iterations ; k++){
                //     new_vertices[k]=vertices[k].applyProjection(matriz_t);
                // }
                
                resultant_vector = calc_eletric_fild(new_vertices, Dot_POSITION, charge);
                total.add(resultant_vector);
            }
            /* TODO: change addVector and addVectorInfo to acept vector3.
             * don't do the scale here (it's addvector function)
             * remove pI vector
             */
            pI[0] = Dot_POSITION.x + (total.x/250);
            pI[1] = Dot_POSITION.y + (total.y/250);
            pI[2] = Dot_POSITION.z + (total.z/250);
            tela.cena3D.addVetor(Dot_POSITION.toArray(), pI, "E");
            tela.cena3D.addVetorInfo(Dot_POSITION.toArray(), pI, [total.x,total.y,total.z], "E");
    	}
    }
    if(charge_dots.length < 1){
        alert("Inserir Ponto");
    }
    if(objects.length < 1){
        alert("Inserir Objetos geometricos");
    }
}


/*!
 * This method tranlate function calls 
 * to calculate the force generated 
 * by an eletric field to a set of dots. 
 *  
 * \param void
 *
 */
function calcForce(){

    /* get dots and objects */
    var charge_dots = tela.cena3D.listPontosView(); // a
    var objects = tela.cena3D.listObjView(); // o

    if(charge_dots.length >= 1 && objects.length >= 1 ){
        var Dot_POSITION = new THREE.Vector3();
        var total = new THREE.Vector3(0,0,0);
        var resultant_vector; 
        var pI = [0,0,0];
        for (var i = 0; i < charge_dots.length; i++) { // for each dot
            Dot_POSITION = charge_dots[i].position;
            total.set(0,0,0);
            for(var j = 0; j < objects.length; j++){ // for each object
                
                /* TODO: get the object mesh 
                 * This is not working because the precision of the mesh vertices 
                 * The next TODO comments there were to change this.
                 */
                var vertices = []; 
                //var vertices = objects[j].geometry.vertices;
                //var x =  vertices.length;
                // var radius = objects[j].raio;
                var charge = objects[j].carga;
                var new_vertices = []; 
                var matriz_t = objects[j].matrix.clone();
                
                /* TODO: get the object mesh
                 * Change to the all switch for commented "for"
                 * for each type of object :/
                 */
                 switch (objects[j].name) {
                    case "ring":
                        var radius = objects[j].raio;
                        var n_iterations = 1000;
                        var teta = 0;
                        var dTeta = 2*Math.PI/n_iterations; 
                        for(var k = 0; k < n_iterations ; k++){
                            vertices[k] = new THREE.Vector3(radius*Math.cos(teta), radius*Math.sin(teta),0);
                            new_vertices[k]=vertices[k].applyProjection(matriz_t);
                            teta = teta + dTeta;
                        }        
                    break;
                    case "dot":
                        new_vertices[0] = objects[j].position;
                    break;
                    case "line":
                        var length_ = objects[j].raio;
                        var n_iterations = 1000;
                        var cont = length_/n_iterations;
                        var dp = cont/2; 
                        for(var k = 0; k < n_iterations ; k++){
                            vertices[k] = new THREE.Vector3(0, (-length_/2) + dp,0);
                            new_vertices[k]=vertices[k].applyProjection(matriz_t);
                            dp = dp + cont;
                        }     
                    break;
                    case "disc":
                        var radius = objects[j].raio;
                        alert("ERRO: disc");
                        var n_iterations = 1000;
                        var teta = 0;
                        var dTeta = 2*Math.PI/n_iterations; 
                        for(var k = 0; k < n_iterations ; k++){
                            vertices[k] = new THREE.Vector3(radius*Math.cos(teta), radius*Math.sin(teta),0);
                            new_vertices[k]=vertices[k].applyProjection(matriz_t);
                            teta = teta + dTeta;
                        }  
                    break;
                }
                // var k=0;
                // for(k = 0; k < n_iterations ; k++){
                //     new_vertices[k]=vertices[k].applyProjection(matriz_t);
                // }
                
                resultant_vector = calc_eletric_fild(new_vertices, Dot_POSITION, charge);
                resultant_vector.multiplyScalar(charge_dots[i].carga*Math.pow(10,-6));
                total.add(resultant_vector);
            }
            /* TODO: change addVector and addVectorInfo to acept vector3.
             * don't do the scale here (it's addvector function)
             * remove pI vector
             */
            pI[0] = Dot_POSITION.x + (total.x*500);
            pI[1] = Dot_POSITION.y + (total.y*500);
            pI[2] = Dot_POSITION.z + (total.z*500);
            tela.cena3D.addVetor(Dot_POSITION.toArray(), pI, "F");
            tela.cena3D.addVetorInfo(Dot_POSITION.toArray(), pI, [total.x,total.y,total.z], "F");
        }
    }
    if(charge_dots.length < 1){
        alert("Inserir Ponto");
    }
    if(objects.length < 1){
        alert("Inserir Objetos geometricos");
    }
}

/*!
 * This method tranlate function calls 
 * to calculate the potencial generated 
 * by an eletric field to a set of dots. 
 *  
 * \param void
 *
 */
function calcPot(){

    /* get dots and objects */
    var charge_dots = tela.cena3D.listPontosView(); // a
    var objects = tela.cena3D.listObjView(); // o

    if(charge_dots.length >= 1 && objects.length >= 1 ){
        var Dot_POSITION = new THREE.Vector3();
        var total = 0; 
        var pI = [0,0,0];
        for (var i = 0; i < charge_dots.length; i++) { // for each dot
            Dot_POSITION = charge_dots[i].position;
            total = 0;
            for(var j = 0; j < objects.length; j++){ // for each object
                
                /* TODO: get the object mesh 
                 * This is not working because the precision of the mesh vertices 
                 * The next TODO comments there were to change this.
                 */
                var vertices = []; 
                //var vertices = objects[j].geometry.vertices;
                //var x =  vertices.length;
                // var radius = objects[j].raio;
                var charge = objects[j].carga;
                var new_vertices = []; 
                var matriz_t = objects[j].matrix.clone();
                
                /* TODO: get the object mesh
                 * Change to the all switch for commented "for"
                 * for each type of object :/
                 */
                 switch (objects[j].name) {
                    case "ring":
                        var radius = objects[j].raio;
                        var n_iterations = 1000;
                        var teta = 0;
                        var dTeta = 2*Math.PI/n_iterations; 
                        for(var k = 0; k < n_iterations ; k++){
                            vertices[k] = new THREE.Vector3(radius*Math.cos(teta), radius*Math.sin(teta),0);
                            new_vertices[k]=vertices[k].applyProjection(matriz_t);
                            teta = teta + dTeta;
                        }        
                    break;
                    case "dot":
                        new_vertices[0] = objects[j].position;
                    break;
                    case "line":
                        var length_ = objects[j].raio;
                        var n_iterations = 1000;
                        var cont = length_/n_iterations;
                        var dp = cont/2; 
                        for(var k = 0; k < n_iterations ; k++){
                            vertices[k] = new THREE.Vector3(0, (-length_/2) + dp,0);
                            new_vertices[k]=vertices[k].applyProjection(matriz_t);
                            dp = dp + cont;
                        }     
                    break;
                    case "disc":
                        var radius = objects[j].raio;
                        alert("ERRO: disc");
                        var n_iterations = 1000;
                        var teta = 0;
                        var dTeta = 2*Math.PI/n_iterations; 
                        for(var k = 0; k < n_iterations ; k++){
                            vertices[k] = new THREE.Vector3(radius*Math.cos(teta), radius*Math.sin(teta),0);
                            new_vertices[k]=vertices[k].applyProjection(matriz_t);
                            teta = teta + dTeta;
                        }  
                    break;
                }
                // var k=0;
                // for(k = 0; k < n_iterations ; k++){
                //     new_vertices[k]=vertices[k].applyProjection(matriz_t);
                // }
                
                total = total + calc_potential(new_vertices, Dot_POSITION, charge);
            }
            /* TODO: change addVector and addVectorInfo to acept vector3.
             * don't do the scale here (it's addvector function)
             * remove pI vector
             */
            tela.cena3D.addVetorInfo(Dot_POSITION.toArray(), 0, total, "V");
        }
    }
    if(charge_dots.length < 1){
        alert("Inserir Ponto");
    }
    if(objects.length < 1){
        alert("Inserir Objetos geometricos");
    }
};


/*! 
 * This method tranlate function calls 
 * to calculate the necessary work 
 * to move from initial dot to final dot. 
 *  
 * \param i_initial, possitions of initial dot
 *                   on list of dots
 * \param i_final, possitions of final dot
 *                   on list of dots
 *
 * TODO: pass the position and not the
 *       positions on the list
 */
function calcJob(i_initial, i_final){
    /* get dots and objects */
    var w = 0;
    var list_dots = tela.cena3D.listPontosView();
    var charge_dots = [];
    charge_dots[0] = list_dots[i_initial]; // initial dot
    charge_dots[1] = list_dots[i_final]; // final dot
    var objects = tela.cena3D.listObjView(); 
    if(!charge_dots[0].position.equals(charge_dots[1].position)){
        var Dot_POSITION = new THREE.Vector3(); 
        var pI = [0,0,0];
        var total = [0,0];
        for (var i = 0; i < charge_dots.length; i++) { // for each dot
            Dot_POSITION = charge_dots[i].position;
            for(var j = 0; j < objects.length; j++){ // for each object
                
                /* TODO: get the object mesh 
                 * This is not working because the precision of the mesh vertices 
                 * The next TODO comments there were to change this.
                 */
                var vertices = []; 
                //var vertices = objects[j].geometry.vertices;
                //var x =  vertices.length;
                // var radius = objects[j].raio;
                var charge = objects[j].carga;
                var new_vertices = []; 
                var matriz_t = objects[j].matrix.clone();
                
                /* TODO: get the object mesh
                 * Change to the all switch for commented "for"
                 * for each type of object :/
                 */
                 switch (objects[j].name) {
                    case "ring":
                        var radius = objects[j].raio;
                        var n_iterations = 1000;
                        var teta = 0;
                        var dTeta = 2*Math.PI/n_iterations; 
                        for(var k = 0; k < n_iterations ; k++){
                            vertices[k] = new THREE.Vector3(radius*Math.cos(teta), radius*Math.sin(teta),0);
                            new_vertices[k]=vertices[k].applyProjection(matriz_t);
                            teta = teta + dTeta;
                        }        
                    break;
                    case "dot":
                        new_vertices[0] = objects[j].position;
                    break;
                    case "line":
                        var length_ = objects[j].raio;
                        var n_iterations = 1000;
                        var cont = length_/n_iterations;
                        var dp = cont/2; 
                        for(var k = 0; k < n_iterations ; k++){
                            vertices[k] = new THREE.Vector3(0, (-length_/2) + dp,0);
                            new_vertices[k]=vertices[k].applyProjection(matriz_t);
                            dp = dp + cont;
                        }     
                    break;
                    case "disc":
                        var radius = objects[j].raio;
                        alert("ERRO: disc");
                        var n_iterations = 1000;
                        var teta = 0;
                        var dTeta = 2*Math.PI/n_iterations; 
                        for(var k = 0; k < n_iterations ; k++){
                            vertices[k] = new THREE.Vector3(radius*Math.cos(teta), radius*Math.sin(teta),0);
                            new_vertices[k]=vertices[k].applyProjection(matriz_t);
                            teta = teta + dTeta;
                        }  
                    break;
                }
                // var k=0;
                // for(k = 0; k < n_iterations ; k++){
                //     new_vertices[k]=vertices[k].applyProjection(matriz_t);
                // }
                total[i] = total[i] + calc_potential(new_vertices, Dot_POSITION, charge);   
            } // end of for
        }
        /* TODO: change addVector and addVectorInfo to acept vector3.
         * don't do the scale here (it's addvector function)
         * remove pI vector
         */
        w = charge_dots[0].carga*(total[1] - total[0]);
        tela.cena3D.addVetor(charge_dots[0].position.toArray(), charge_dots[1].position.toArray(), "W");
    } else {
        w = 0;
    }
    tela.cena3D.addVetorInfo(charge_dots[1].position.toArray(), charge_dots[0].position.toArray(), w, "W");
};
