// define a classe Anel
var AnelView = function(raio,px,py,pz) { 
    var torusGeometry = new THREE.TorusGeometry(raio, 0.4, 20, 60, Math.PI*5 ); 
    var torusMaterial = new THREE.MeshLambertMaterial({color: 0xff0000});
    var torus = new THREE.Mesh(torusGeometry, torusMaterial);
    torus.position.x = px;
    torus.position.y = py;
    torus.position.z = pz;
    torus.raio = raio;
    torus.rotation.y = Math.PI / 2;
    return torus;
}


// define a classe Ponto
var PontoView = function(raio,px,py,pz) { 

    var sphereGeometry = new THREE.SphereGeometry( 0.45, 8, 8 );
    var sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xFFFFFF} );
    var sphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
    sphere.position.x = px;
    sphere.position.y = py;
    sphere.position.z = pz;
    return sphere;
}

var DiscoView = function(raio,px,py,pz){
    
    var geometry = new THREE.CircleGeometry(raio, 32);
    var material = new THREE.MeshBasicMaterial( { color: 0x00FFFF} );
    material.side = THREE.DoubleSide;
    var circle = new THREE.Mesh( geometry, material );
    circle.position.x = px;
    circle.position.y = py;
    circle.position.z = pz;
    circle.raio = raio;
    circle.rotation.y = Math.PI / 2;
    return circle;
}

var LinhaView = function(raio,px,py,pz){

    var geometry = new THREE.CylinderGeometry( 0.7, 0.7, raio, 32 );
    var material = new THREE.MeshBasicMaterial( { color: 0xFF4500} );
    var disco = new THREE.Mesh( geometry, material );
    disco.position.x = px;
    disco.position.y = py;
    disco.position.z = pz;
    disco.raio = raio;
    disco.rotation.z = Math.PI / 2;
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
