// define a classe texto
var Texto = function(texto,px,py,pz) { 

	var options = {
	    size: 1,
	    height: 0.3,
	    bevelThickness: 0.2,
	    bevelSize: 0.2,
	    bevelEnabled: true,
	    bevelSegments: 2,
	    bevelEnabled: false,
	    curveSegments: 12,
	    steps: 1,
	    font: "helvetiker",
	    weight: "normal"
	   };
        
        text2 = createMesh(new THREE.TextGeometry(texto, options));
        text2.rotation.y = Math.PI / 2;
        text2.position.x = px;
        text2.position.y = py;
        text2.position.z = pz;
        return text2;
}


function createMesh(geom) {

            // assign two materials
//            var meshMaterial = new THREE.MeshLambertMaterial({color: 0xff5555});
//            var meshMaterial = new THREE.MeshNormalMaterial();
    var meshMaterial = new THREE.MeshPhongMaterial({
        specular: 0xffffff,
        color: 0xffffff,
        shininess: 100,
        metal: true
    });
//            meshMaterial.side=THREE.DoubleSide;
            // create a multimaterial
    var plane = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial]);

    return plane;
}


// ********************************************************************************************************** //



	// options = {'font' : 'helvetiker','weight' : 'normal', 'style' : 'normal','size' : 100,'curveSegments' : 300};


	// var shape = new THREE.TextGeometry("Game Over", options );
 //    var wrapper = new THREE.MeshNormalMaterial();
 //    var words = new THREE.Mesh(shape, wrapper);
 //    return words

	// var options = {
	// 	size: 90,
	// 	height: 90,
	// 	weight: 'normal',
	// 	font: 'helvetiker',
	// 	style: 'normal',
	// 	bevelThickness: 2,
	// 	bevelSize: 4,
	// 	bevelSegments: 3,
	// 	bevelEnabled: true,
	// 	curveSegments: 12,
	// 	steps: 1
	// };
	
	// text1 = createMesh(new THREE.TextGeometry("teste", options));

	// // text1.position.z = -100;
	// // text1.position.y = 100;



	// var textShapes = THREE.FontUtils.generateShapes( "oi", options );
	// var text = new THREE.ShapeGeometry( textShapes );
	// var text1 = new THREE.Mesh( text, new THREE.MeshBasicMaterial( { color: 0xff0000 } ) ) ;
	
	// return text1;
