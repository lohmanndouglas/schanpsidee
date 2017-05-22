/**
 * file   Cena3D.js
 *
 * author Douglas Lohmann <dlohmann0@@gmail.com> 
 *
 * brief  This file implements the class responsible for 
 *         webgl component
 * 
 */

/**
 * Represents a 3D scene.
 * @constructor
 * @param {string} div - The div id to component.
 */
var Cena3D = function(div) {

    var scene = new THREE.Scene(); /* create a scene on THREE */

    var doRender = true;

    var updateCamera = true;
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight , 0.1, 1000); /* create a camera */
    var teta = 0;
    var zoom = 60;
    camera.position.x = 15;
    camera.position.y = 10;
    camera.position.z = 30;
    // camera.rotation.x = 90;
    // camera.lookAt(scene.position); /* camera configuration */

    var renderer = createRender(div); /* create a render */ 
    var controls = new THREE.OrbitControls( camera , renderer.domElement);
    //controls.addEventListener( 'change', render );


    renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
    renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
    renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
    renderer.domElement.addEventListener( 'dblclick', onDocumentDoubleClick, false);

    var objetos = [];
    var pontos = [];
    var vetores = [];
    var vetorInfo = [];
    var textos = [];

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2(),
    offset = new THREE.Vector3(),
    INTERSECTED, SELECTED, OBJ;
    var vector;

    var projector = new THREE.Projector();

    plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 2000, 2000, 8, 8 ),
        new THREE.MeshBasicMaterial( { visible: false } )
    );
    scene.add(plane);

    scene.add( new THREE.AmbientLight(0xf0f0f0));
    
    this.lista = function(){
        return helper_xOz;
    }

    var axes = new THREE.AxisHelper(600);
    axes.name="axes_help";
    if(HELP_AXIS==true){
        axes.position.y = 0.1;
        scene.add(axes); /* show axes in the screen */
    }

    var grid = new THREE.GridHelper(100, 10 , '0xffffff' , '0xffffff' );
    scene.add(grid);





    renderScene(); /* render scene */

    /** This is a render scene function. */
    function renderScene() {
        requestAnimationFrame(renderScene);/*request animation frame*/
        render();
    }

    function render(){
        if(!doRender)return;
        //console.log(updateCamera + "<<<" + mouse.x);
        controls.enableRotate = updateCamera;
        controls.update();
        renderer.render(scene, camera); 
    }

    /** This function create a render  for scene */
 function createRender(div){
        var renderer = new THREE.WebGLRenderer({ alpha: true
         , antialias: true }); /* create a three render */
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        //renderer.setClearColor(new THREE.Color(0xe6ffff));
        // renderer.domElement.style.border ="solid blue 2px"; 
        div.innerHTML = "";
        div.appendChild(renderer.domElement);
        div.setAttribute("enable","true");
        return renderer;
    }
    
    /* resize  webgl component */
    window.addEventListener("resize", function(){ 
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }); 

    // /** This function add an object to 3D scene */
    // this.addObject = function(obj){
    //     scene.add(obj);
    // }

    this.setRenderState = function(value){
        console.log(value );
        if(value === false){
            doRender = false;
            updateCamera = false;
            controls.enable = false;
            controls.enableRotate = updateCamera;
            controls.update();
            renderer.render(scene, camera);

            renderer.domElement.removeEventListener( 'mousemove', onDocumentMouseMove, false );
            renderer.domElement.removeEventListener( 'mousedown', onDocumentMouseDown, false );
            renderer.domElement.removeEventListener( 'mouseup', onDocumentMouseUp, false );
            renderer.domElement.removeEventListener( 'dblclick', onDocumentDoubleClick, false);

        }else{
            controls.enable = true;
            doRender = updateCamera = true;

            renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
            renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
            renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
            renderer.domElement.addEventListener( 'dblclick', onDocumentDoubleClick, false);

        }
    }

    this.addObject = function(obj){
        scene.add(obj);
        objetos.push(obj);
    }

    this.addDot = function(obj){
        scene.add(obj);
        pontos.push(obj);
        tela.cena3D.atualizaLabels(); 
    }

    this.changeConfg = function(){
        this.posicaox = document.getElementById('ptx').value;
        this.posicaoy = document.getElementById('pty').value;
        this.posicaoz = document.getElementById('ptz').value;
        this.carga = document.getElementById('cargaCena').value;

        OBJ.position.x = parseFloat(this.posicaox); 
        OBJ.position.y = parseFloat(this.posicaoy);
        OBJ.position.z = parseFloat(this.posicaoz);
        OBJ.carga = parseFloat(this.carga);
	}

	this.excludeObject = function(){
		removeObject(OBJ);
	}

    function removeTexto(){
    	// alert("remove texto");
        this.i = 0;
        for(this.i = 0; this.i < textos.length; this.i++){
            scene.remove(textos[this.i]);
        }      
        textos = [];
    }

    this.addVetor = function(pInicial, Pfim, tipo){
        obj = new VetorView(pInicial, Pfim, tipo);
        scene.add(obj);
        vetores.push(obj);
    }

    this.addVetorInfo = function(pInicial, Pfim, vetorCalculado, tipo){
        obj = new Info(pInicial, Pfim, vetorCalculado, tipo);
        scene.add(obj);
        vetorInfo.push(obj);
    }

    this.removeVetorView = function(){
        removeVetor();
    }

    function removeVetor(){
        this.i = 0;
        for(this.i = 0; this.i < vetores.length; this.i++){
            scene.remove(vetores[this.i]);
        }      
        vetores = [];
        // remove todos os obj de informação do vetor 
        for(this.i = 0; this.i < vetorInfo.length; this.i++){
            scene.remove(vetorInfo[this.i]);
        }      
        vetorInfo = [];
    }

    // metodo para listar todos os objetos do Model
    this.listObjView = function(){
        return objetos;
    }
    // metodo para listar todos os objetos do Model
    this.listObjView = function(){
        return objetos;
    }
    this.listTextView = function(){
    	return textos;
    }

    // metodo para listar todos os pontos inseridos no Model
    this.listPontosView = function(){
        return pontos;
    }

    this.fecharPopInfo = function(){
        //$('.info').empty()
        // document.getElementById('info').style.display = 'none';
        // document.getElementById('divTrans').style.display = 'none';
    }

    this.atualizaLabels = function(){
        removeTexto();
        this.i = 0;
        if(LABELS==true){
            for(this.i = 0; this.i < pontos.length; this.i++){
                this.texto = new Texto(("P"+this.i), pontos[this.i].position.x, pontos[this.i].position.y, pontos[this.i].position.z-1);
                // this.texto = new Texto("P1",parseFloat(this.px),parseFloat(this.py),parseFloat(this.pz-1));
                // tela.cena3D.addTexto(this.texto);
            }
        }    
    }


    //* This function show/remove the plane xOy */
    this.drawPlanes_xOy = function(){
        if(HELP_PLANE_xOy==true && scene.getObjectByName('plane_xOy') == null ){
            scene.add(create_helper_xOy());
        } else if(HELP_PLANE_xOy==false && scene.getObjectByName('plane_xOy')){
            scene.remove(scene.getObjectByName('plane_xOy'));
            renderScene();
        }
    }
    //* This function show/remove the plane yOz */
    this.drawPlanes_yOz = function(){
        if(HELP_PLANE_yOz==true && scene.getObjectByName('plane_yOz') == null){
            scene.add(create_helper_yOz());
        } else if(HELP_PLANE_yOz==false && scene.getObjectByName('plane_yOz')){
            scene.remove(scene.getObjectByName('plane_yOz'));
        }
    }
    //* This function show/remove the plane xOz */
    this.drawPlanes_xOz = function(){
        if(HELP_PLANE_xOz==true && scene.getObjectByName('plane_xOz') == null){
            scene.add(create_helper_xOz());
        } else if(HELP_PLANE_xOz==false && scene.getObjectByName('plane_xOz')){
            scene.remove(scene.getObjectByName('plane_xOz'));
        }
    }

    //* This function show/remove the axes helper */
    this.drawAxes = function(){
        if(HELP_AXIS==true && scene.getObjectByName('axes_help') == null){
            scene.add(axes); 
        } else if(HELP_AXIS==false && scene.getObjectByName('axes_help')){
            scene.remove(scene.getObjectByName('axes_help'));
        }
    }


    this.addTexto = function(obj){
    	console.log("addTexto");
        scene.add(obj);
        textos.push(obj);
    }

 

    function onDocumentMouseMove( event ) {
        event.preventDefault();
        mouse.x = ( (event.clientX - event.target.getBoundingClientRect().left) / event.currentTarget.width ) * 2 - 1;
        mouse.y = - ( (event.clientY - event.target.getBoundingClientRect().top) / event.currentTarget.height ) * 2 + 1;
        
        vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        vector = vector.unproject(camera);

        raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());

        if ( SELECTED ) {
            var intersects = raycaster.intersectObject( plane );
            if ( intersects.length > 0 ) {
            SELECTED.position.copy( intersects[ 0 ].point.sub( offset ) );
            }
        return;
        }
        var ob = objetos.concat(pontos);
        var intersects = raycaster.intersectObjects( ob );
            if ( intersects.length > 0 ) {
                if ( INTERSECTED != intersects[ 0 ].object ) {
                    updateCamera = false;
                    cursorOver();
                    if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
                        INTERSECTED = intersects[ 0 ].object;
                        INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                        plane.position.copy( INTERSECTED.position );
                        plane.lookAt( camera.position );
                    }
                } else {
                    updateCamera = true;
                    if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
                    INTERSECTED = null;
                    cursorNormal();
                }
            render();
    }

    function cursorOver(){ 
        document.body.setAttribute("style","cursor:pointer");
    }

    function cursorNormal(){ 
        document.body.setAttribute("style","cursor:normal");
    }

    function onDocumentMouseDown(event) {
        console.log("function onDocumentMouseDown");
        // console.log(mouse.x, mouse.y);

        document.getElementById("menu_show_demo").innerHTML = "";

        var intersectsInfo = raycaster.intersectObjects(vetorInfo);
        //var menubottom = document.getElementById('popupCena');

        if (intersectsInfo.length > 0) {

            updateCamera = false;

            // cenas_positions.setAttribute("state","hide");
          //  menubottom.setAttribute("state","show");
            // obj_info.setAttribute("state","show");


            if(intersectsInfo[0].object.tipo == "E"){
                x = parseFloat(intersectsInfo[0].object.valor[0].toFixed(5))
                y = parseFloat(intersectsInfo[0].object.valor[1].toFixed(5))
                z = parseFloat(intersectsInfo[0].object.valor[2].toFixed(5))

                //obj_info.innerHTML = "<span > Vetor Campo El&eacute;trico:("+x.toPrecision(PRECISION)+", "+y.toPrecision(PRECISION)+", "+z.toPrecision(PRECISION)+") N/C </span><br>";

            } else if(intersectsInfo[0].object.tipo == "F"){
                x = parseFloat(intersectsInfo[0].object.valor[0].toFixed(5))
                y = parseFloat(intersectsInfo[0].object.valor[1].toFixed(5))
                z = parseFloat(intersectsInfo[0].object.valor[2].toFixed(5))
               
                //obj_info.innerHTML = "<span > Vetor For&ccedil;a El&eacute;trico :("+x.toPrecision(PRECISION)+", "+y.toPrecision(PRECISION)+", "+z.toPrecision(PRECISION)+") N </span> <br>";

            } else if(intersectsInfo[0].object.tipo == "W"){

                v = parseFloat(intersectsInfo[0].object.valor.toFixed(4));
                //document.getElementById('popupCena').setAttribute("state","show");

                //obj_info.innerHTML = "<span> Trabalho :<br>"+v.toPrecision(PRECISION)+" x10&#8315;&#8310; J </span> <br>";

            }else if(intersectsInfo[0].object.tipo == "V"){
                v = parseFloat(intersectsInfo[0].object.valor.toFixed(4));
               // document.getElementById('popupCena').setAttribute("state","show");
               //obj_info.innerHTML ="<span > Potencial El&eacute;trico :"+v.toPrecision(PRECISION)+" V </span> <br>";
            }
        } else {
            updateCamera = true;
            var ob = objetos.concat(pontos);
            var intersects = raycaster.intersectObjects( ob );

            if (intersects.length > 0) {

                SELECTED = intersects[0].object;
                
                var intersects = raycaster.intersectObject( plane );
                if ( intersects.length > 0 ) {
                     offset.copy( intersects[ 0 ].point ).sub(plane.position);
                }
            }
        }
    }


    function removeObject(obj){
        if(obj.geometry.type != "SphereGeometry" ){
            this.i = 0;
            for(this.i = 0; this.i < objetos.length; this.i++){
                if(obj === objetos[this.i]){
                    break;
                }
            }
            scene.remove(obj);
            objetos.splice(this.i,1);
        } else{
            this.i = 0;
            for(this.i = 0; this.i < pontos.length; this.i++){
                if(obj === pontos[this.i]){
                    break;
                }
            }
            scene.remove(obj);
            pontos.splice(this.i,1);
            tela.cena3D.atualizaLabels();        
        }
    }

    function onDocumentMouseUp( event ) {
        event.preventDefault();
        updateCamera = true;

        if ( INTERSECTED ) {
            plane.position.copy( INTERSECTED.position );
            removeVetor();
            SELECTED = null;
            tela.cena3D.atualizaLabels();        
        }
    }


    /*!
     * This method show the properties of an object or dcharge 
     * called when a dobble click in an object or dcharge is 
     *
     */
    function onDocumentDoubleClick( event ){

        var scene_objects = objetos.concat(pontos);
        var intersectsObjetos = raycaster.intersectObjects( scene_objects );

        if (intersectsObjetos.length > 0) {
            OBJ = intersectsObjetos[0].object;
            switch (OBJ.name) {
                case "dcharge":
                    document.getElementById("menu_show_demo").innerHTML = varPopShowObjectMenu;
                    // get and set the properties
                break;
                case "dot":
                    document.getElementById("menu_show_demo").innerHTML = varPopShowObjectMenu;
                    // get and set the properties
                break;
                case "ring":
                    document.getElementById("menu_show_demo").innerHTML = varPopShowObjectMenuCirc;
                    // get and set the properties
                break;
                case "line":
                    document.getElementById("menu_show_demo").innerHTML = varPopShowObjectMenuLine;
                    // get and set the properties 
                break;
                case "disc":
                    document.getElementById("menu_show_demo").innerHTML = varPopShowObjectMenuCirc;
                    // get and set the properties
                break;
            }
            document.getElementById('popupCena').setAttribute("state","show");
        }
    }
 }

function change(){        
    tela.cena3D.changeConfg();
    fecharPop();
}

function remove(){
    tela.cena3D.excludeObject();
    fecharPop();
}

function fecharPop(){
    // document.getElementById('popupCena').style.display = 'none';
    // document.getElementById('divTrans').style.display = 'none';
    tela.cena3D.atualizaLabels();        
}
