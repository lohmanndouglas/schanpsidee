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

    var camera = new THREE.PerspectiveCamera(45, $("#"+div).width()
     / $("#"+div).height(), 0.1, 1000); /* create a camera */
    var teta = 0;
    var zoom = 60;
    camera.position.x = 30;
    camera.position.y = 10;
    camera.position.z = 0;
    camera.rotation.x = 90;
    camera.lookAt(scene.position); /* camera configuration */

    var renderer = createRender(div); /* create a render */ 

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
        scene.add(axes); /* show axes in the screen */
    }

    renderScene(); /* render scene */

    /** This is a render scene function. */
    function renderScene() {
        renderer.render(scene, camera);
        requestAnimationFrame(renderScene);/*request animation frame*/
    }

    /** This function create a render  for scene */
    function createRender(div){
        var renderer = new THREE.WebGLRenderer({ alpha: true
         , antialias: true }); /* create a three render */
        renderer.setSize($("#"+div).width(), $("#"+div).height()); 
        renderer.setClearColor(new THREE.Color(0xe6ffff));
        // renderer.domElement.style.border ="solid blue 2px"; 
        document.getElementById(div).appendChild(renderer.domElement);
        return renderer;
    }
    
    /* resize  webgl component */
    window.addEventListener("resize", function(){ 
        renderer.setSize($("#"+div).width(), $("#"+div).height());
    }); 

    // /** This function add an object to 3D scene */
    // this.addObject = function(obj){
    //     scene.add(obj);
    // }


    // var vector = new THREE.Vector3(4,0,0);
    // a = tela.cena3D.listObjView();
    // vector = a[0].geometry.vertices[0];
    // var vectorT = new THREE.Vector3();




    this.addObject = function(obj){
        scene.add(obj);
        //renderScene();
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
        $('.info').empty()
        document.getElementById('info').style.display = 'none';
        document.getElementById('divTrans').style.display = 'none';
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
    //* This function add text obj at scene and list*/
    this.addTexto = function(obj){
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
                    if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
                        INTERSECTED = intersects[ 0 ].object;
                        INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
                        plane.position.copy( INTERSECTED.position );
                        plane.lookAt( camera.position );
                    }
                } else {
                    if ( INTERSECTED ) INTERSECTED.material.color.setHex( INTERSECTED.currentHex );
                    INTERSECTED = null;
                }
    }


    function onDocumentMouseDown(event) {

        console.log("function onDocumentMouseDown");
        // console.log(mouse.x, mouse.y);

        var intersectsInfo = raycaster.intersectObjects(vetorInfo);
        if (intersectsInfo.length > 0) {
            // alert(intersectsInfo[0].object.valor);
            document.getElementById('info').style.display = 'block';
            document.getElementById('divTrans').style.display = 'block';
            var div = document.getElementById('info');
            div.style.position = 'absolute';
            div.style.left = event.clientX + 'px';
            div.style.top = event.clientY + 'px';
            var divPai = $('.info');
            if(intersectsInfo[0].object.tipo == "E"){
                x = parseFloat(intersectsInfo[0].object.valor[0].toFixed(5))
                y = parseFloat(intersectsInfo[0].object.valor[1].toFixed(5))
                z = parseFloat(intersectsInfo[0].object.valor[2].toFixed(5))
                divPai.append("<div class='textoBox' style='display:table-cell;width:99%'> Vetor Campo El&eacute;trico:<br>("+x.toPrecision(PRECISION)+", "+y.toPrecision(PRECISION)+", "+z.toPrecision(PRECISION)+") N/C </div> <br>");
                divPai.append("<input type='button' class='b' onclick='tela.cena3D.fecharPopInfo()' value='OK'>");
            } else if(intersectsInfo[0].object.tipo == "F"){
                x = parseFloat(intersectsInfo[0].object.valor[0].toFixed(5))
                y = parseFloat(intersectsInfo[0].object.valor[1].toFixed(5))
                z = parseFloat(intersectsInfo[0].object.valor[2].toFixed(5))
                divPai.append("<div class='textoBox' style='display:table-cell;width:99%'> Vetor For&ccedil;a El&eacute;trico :<br>("+x.toPrecision(PRECISION)+", "+y.toPrecision(PRECISION)+", "+z.toPrecision(PRECISION)+") N </div> <br>");
                divPai.append("<input type='button' class='b' onclick='tela.cena3D.fecharPopInfo()' value='OK'>");           
            } else if(intersectsInfo[0].object.tipo == "W"){
                v = parseFloat(intersectsInfo[0].object.valor.toFixed(4));
                divPai.append("<div class='textoBox' style='display:table-cell;width:99%'> Trabalho :<br>"+v.toPrecision(PRECISION)+" x10&#8315;&#8310; J </div> <br>");
                divPai.append("<input type='button' class='b' onclick='tela.cena3D.fecharPopInfo()' value='OK'>");           
            }else if(intersectsInfo[0].object.tipo == "V"){
                v = parseFloat(intersectsInfo[0].object.valor.toFixed(4));
                divPai.append("<div class='textoBox' style='display:table-cell;width:99%'> Potencial El&eacute;trico :<br>"+v.toPrecision(PRECISION)+" V </div> <br>");
                divPai.append("<input type='button' class='b' onclick='tela.cena3D.fecharPopInfo()' value='OK'>");           
            }
        } else {
            var ob = objetos.concat(pontos);
            var intersects = raycaster.intersectObjects( ob );

            if (intersects.length > 0) {
                // console.log(intersects[0]);
                // intersects[0].object.material.transparent = true;
                // intersects[0].object.material.opacity = 0.1;
                SELECTED = intersects[0].object;
                // removeObjeto(SELECTED);
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
        if ( INTERSECTED ) {
            plane.position.copy( INTERSECTED.position );
            removeVetor();
            SELECTED = null;
            tela.cena3D.atualizaLabels();        
        }
    }

    function onDocumentDoubleClick( event ){

        // raycaster.setFromCamera( mouse, camera );

        var intersectsObjetos = raycaster.intersectObjects( objetos );
        var intersectsPontos = raycaster.intersectObjects( pontos );

        if (intersectsObjetos.length > 0) {
            OBJ = intersectsObjetos[0].object;
            document.getElementById('popupCena').style.display = 'block';
            document.getElementById('divTrans').style.display = 'block';
            var div = document.getElementById('popupCena');
            div.style.position = 'absolute';
            document.getElementById('popupCena').style.left = event.clientX + 'px';
            document.getElementById('popupCena').style.top = event.clientY + 'px';
            // removeObjeto(OBJ);
            this.i = 0;
            for(this.i = 0; this.i < objetos.length; this.i++){
                if(OBJ === objetos[this.i]){
                    break;
                }
            }
            this.carga = OBJ.carga;
            document.getElementById('ptx').value = OBJ.position.x;
            document.getElementById('pty').value = OBJ.position.y;
            document.getElementById('ptz').value = OBJ.position.z;  
            document.getElementById('cargaCena').value = this.carga;      
        }
        if (intersectsPontos.length > 0) {
            OBJ = intersectsPontos[0].object;
            document.getElementById('popupCena').style.display = 'block';
            document.getElementById('divTrans').style.display = 'block';
            var div = document.getElementById('popupCena');
            div.style.position = 'absolute';
            document.getElementById('popupCena').style.left = event.clientX + 'px';
            document.getElementById('popupCena').style.top = event.clientY + 'px';
            this.i = 0;
            for(this.i = 0; this.i < pontos.length; this.i++){
                if(OBJ === pontos[this.i]){
                    break;
                }
            }
            // alert("position:"+this.i+", Ponto");
            this.carga = OBJ.carga;
            document.getElementById('ptx').value = OBJ.position.x;
            document.getElementById('pty').value = OBJ.position.y;
            document.getElementById('ptz').value = OBJ.position.z;
            document.getElementById('cargaCena').value = this.carga;
        }
    }

        // keyboards events
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37) {
            teta += 0.1;
            camera.position.z = Math.abs(zoom) * Math.sin(teta);
            camera.position.x = Math.abs(zoom) * Math.cos(teta);
            camera.lookAt(scene.position);
        }else if(event.keyCode == 39) {
            teta -= 0.1;
            camera.position.z = Math.abs(zoom) * Math.sin(teta);
            camera.position.x = Math.abs(zoom) * Math.cos(teta);
            camera.lookAt(scene.position);
        }
        if(event.keyCode == 38) {
            zoom = camera.position.x;
            zoom -= 2;
            camera.position.x = zoom;
            camera.lookAt(scene.position);
        }
        if(event.keyCode == 40) {
            zoom = camera.position.x;
            zoom += 2;
            camera.position.x = zoom;
            camera.lookAt(scene.position);
        }       
     });
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
    document.getElementById('popupCena').style.display = 'none';
    document.getElementById('divTrans').style.display = 'none';
    tela.cena3D.atualizaLabels();        
}
