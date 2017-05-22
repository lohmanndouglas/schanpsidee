// define a classe Anel
var RingView = function(raio,carga,px,py,pz,rpx,rpy,rpz) { 
    var torusGeometry = new THREE.TorusGeometry(raio, 0.4, 20, 60, Math.PI*5 ); 
    var torusMaterial = new THREE.MeshLambertMaterial({color: 0xff0000,wireframe: true});
    var torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.x = px;
    torus.position.y = py;
    torus.position.z = pz;
    torus.raio = raio;
    torus.carga = carga;
    torus.name = "ring";
    torus.rotation.x = rpx;
    torus.rotation.y = rpy;
    torus.rotation.z = rpz;
    return torus;
}


// define a classe Ponto
var DotView = function(raio,carga,px,py,pz) { 
    var sphereGeometry = new THREE.SphereGeometry( 0.25, 8, 8 );
    var sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.position.x = px;
    sphere.position.y = py;
    sphere.position.z = pz;
    sphere.carga = carga;
    sphere.name = "dot";
    return sphere;
}

var ChargeView = function(raio,carga,px,py,pz) { 
    var sphereGeometry = new THREE.SphereGeometry( 0.25, 8, 8 );
    var sphereMaterial = new THREE.MeshBasicMaterial( {color: 0x000000} );
    var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.position.x = px;
    sphere.position.y = py;
    sphere.position.z = pz;
    sphere.carga = carga;
    sphere.name = "dcharge";
    return sphere;
}

var DiscView = function(raio,carga,px,py,pz,rpx,rpy,rpz){
    
    var geometry = new THREE.CircleGeometry(raio, 100);
    var material = new THREE.MeshBasicMaterial( { color: 0x00FFFF} );
    material.side = THREE.DoubleSide;
    var circle = new THREE.Mesh( geometry, material );
    circle.position.x = px;
    circle.position.y = py;
    circle.position.z = pz;
    circle.raio = raio;
    circle.carga = carga;
    circle.rotation.x = rpx;
    circle.rotation.y = rpy;
    circle.rotation.z = rpz;
    circle.name = "disc";
    // var geo = new THREE.WireframeGeometry( circle.geometry ); // or WireframeGeometry
    // var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 1 } );
    // var wireframe = new THREE.LineSegments( geo, mat );
    // circle.add( wireframe );
    return circle;
}

var LineView = function(raio,carga,px,py,pz,rpx,rpy,rpz){
    var geometry = new THREE.CylinderGeometry( 0.7, 0.7, raio, 32 );
    var material = new THREE.MeshBasicMaterial( { color: 0xFF4500} );
    var disco = new THREE.Mesh( geometry, material );
    disco.position.x = px;
    disco.position.y = py;
    disco.position.z = pz;
    disco.raio = raio;
    disco.carga = carga;
    disco.name = "line";
    disco.rotation.x = rpx;
    disco.rotation.y = rpy;
    disco.rotation.z = rpz;
    return disco;
}

var VetorView =  function(pInicio, pFim, tipo){
    
    // var from = new THREE.Vector3( 4, 4, 4 );
    // var to = new THREE.Vector3( 0, 0, 0 );
    this.cor = 0xff0000;

    var from = new THREE.Vector3( pInicio[0], pInicio[1], pInicio[2] );
    var to = new THREE.Vector3( pFim[0], pFim[1], pFim[2] );

    var direction = to.clone().sub(from);
    var length = direction.length();
    var headLength = length/6;
    var headWidth = length/3;
    if (headLength < 0.65){
        headLength = 0.65;
    }
    if (headLength > 1){
        headLength = 1;
    }
    if (headWidth < 0.65){
        headWidth = 0.65;
    }
    if (headWidth > 2){
        headWidth = 2;
    }
    // ArrowHelper(dir, origin, length, hex, headLength, headWidth )
    if(tipo == "F"){
        this.cor = 0x0000ff;
        var arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, this.cor, headWidth, headLength );
        arrowHelper.line.material.linewidth = 3;
    }
    if(tipo == "E"){
        this.cor = 0xFFFF00;
        var arrowHelper = new THREE.ArrowHelper(direction.normalize(), from, length, this.cor, headWidth, headLength );
        arrowHelper.line.material.linewidth = 3;
    }

    if(tipo == "W"){

        var material = new THREE.LineDashedMaterial({
            color: 0xffaa00, 
            dashSize: 3,
            gapSize: 1,
            linewidth: 2        
        });

        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( pInicio[0], pInicio[1], pInicio[2] ),
            new THREE.Vector3( pFim[0], pFim[1], pFim[2] )
        );

        var arrowHelper = new THREE.Line( geometry, material);
    }

    return arrowHelper;

}

var scale = function(){

	    this.cor = 0xff0000;

	    var from = new THREE.Vector3( pInicio[0], pInicio[1], pInicio[2] );
	    var to = new THREE.Vector3( pFim[0], pFim[1], pFim[2] );

	    var direction = to.clone().sub(from);
	    var length = direction.length();
	    var headLength = length/6;
	    var headWidth = length/3;
		
	    var material = new THREE.LineDashedMaterial({
            color: 0xffaa00, 
            dashSize: 3,
            gapSize: 1,
            linewidth: 2        
        });

        var geometry = new THREE.Geometry();
        geometry.vertices.push(
            new THREE.Vector3( pInicio[0], pInicio[1], pInicio[2] ),
            new THREE.Vector3( pFim[0], pFim[1], pFim[2] )
        );

        var arrowHelper = new THREE.Line( geometry, material);
        return arrowHelper;
}


// Info(pInicial, Pfim, vetorCalculado)
var Info = function(pInicial, Pfim, vetorCalculado, tipo) { 
    this.deslocamentoz = 1;
    this.deslocamentoy = 1;
    this.cor = 0xFFD700;
    if(tipo == "F") {
        this.deslocamentoz = 2;
        this.cor = 0x00BFFF;
    }
    if(tipo == "V") {
        this.deslocamentoz = 1;
        this.deslocamentoy = 2.1;
        this.cor = 0x00FF00;
    }
    if(tipo == "W") {
        this.deslocamentoz = 2;
        this.deslocamentoy = 2.1;
        this.cor = 0xffff4d;
    }

    var cubeGeometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    var cubeMaterial = new THREE.MeshLambertMaterial({color: this.cor});
    var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
    cube.tipo = tipo;
    cube.valor = vetorCalculado;
    cube.position.x = pInicial[0];
    cube.position.y = pInicial[1]-this.deslocamentoy;
    cube.position.z = pInicial[2]-this.deslocamentoz;
    return cube;
}

var create_helper_xOy = function(){
    //* size, divisions, color1, color2 */
    var helper_xOy = new THREE.GridHelper(600,700,0x0080ff,0x0080ff);
    helper_xOy.position.z = 0;
    // helper_xOy.material.opacity = 0.25;
    helper_xOy.material.transparent = true;
    helper_xOy.name = "plane_xOy";
    return helper_xOy;

}
var create_helper_yOz = function(){
    //* size, divisions, color1, color2 */
    var helper_yOz = new THREE.GridHelper(600,700,0xe6e600,0xe6e600);
    helper_yOz.position.x = 0;
    helper_yOz.rotation.z = Math.PI/2;
    helper_yOz.material.transparent = true;
    helper_yOz.name = "plane_yOz"
    return helper_yOz;
}
var create_helper_xOz = function(){
    //* size, divisions, color1, color2 */
    var helper_xOz = new THREE.GridHelper(600,700,0x4dff4d,0x4dff4d);
    helper_xOz.position.y = 0;
    helper_xOz.rotation.x = Math.PI/2;
    helper_xOz.material.transparent = true;
    helper_xOz.name = "plane_xOz"
    return helper_xOz;
}


// Vector3
// .distanceTo ( v )
// Computes the distance from this vector to v.
// .distanceToManhattan ( v )
// Computes the Manhattan distance from this vector to v.
// .distanceToSquared ( v )
// Computes the squared distance from this 
// vector to v. If you are just comparing the distance with 
// another distance, you should compare the distance squared instead
 // as it is slightly more efficient to calculate.