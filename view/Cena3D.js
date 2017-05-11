// Classe Cena 
var Cena3D = function(div) {

    // create a scene, that will hold all our elements such as objects, cameras and lights.
    var cena = new THREE.Scene();

    // create a camera, which defines where we're looking at.
    var camera = new THREE.PerspectiveCamera(45, $("#WebGL").width() / $("#WebGL").height(), 0.1, 1000);
    // position and point the camera to the center of the scene
    var teta = 0;
    var zoom = 60;
    camera.position.x = zoom;
    camera.position.y = 10;
    camera.position.z = 0;
    camera.rotation.x = 90;
    camera.lookAt(cena.position);

        
    // create a render and set the size
    var renderer = createRender(div);  

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(40, 60, 0);
    spotLight.castShadow = true;
    cena.add(spotLight);

    // add spotlight for the shadows
    var spotLight2 = new THREE.SpotLight(0xffffff);
    spotLight2.position.set(0, 80, 0);
    spotLight2.castShadow = true;
    cena.add(spotLight2);

    cena.fog = new THREE.Fog( 0x111111, 150, 200 );

    // add spotlight for the shadows
    var spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(-40, 60, 0);
    spotLight.castShadow = true;
    cena.add(spotLight);



    // show axes in the screen
    var axes = new THREE.AxisHelper(400);
    cena.add(axes);

    var objetos = [], plane;
    var pontos = [];
    var vetores = [];
    var vetorInfo = [];
    var textos = [];
    var controls;

    plane = new THREE.Mesh(
        new THREE.PlaneBufferGeometry( 2000, 2000, 8, 8 ),
        new THREE.MeshBasicMaterial( { visible: false } )
    );
    cena.add(plane);

    // var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2(),
    offset = new THREE.Vector3(),
    INTERSECTED, SELECTED, OBJ;

    var vector;

    // ???
    var projector = new THREE.Projector();

    renderScene();
    var TRABALHO = 0;

    renderer.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
    renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDown, false );
    renderer.domElement.addEventListener( 'mouseup', onDocumentMouseUp, false );
    renderer.domElement.addEventListener( 'dblclick', onDocumentDoubleClick, false);
    // renderer.domElement.addEventListener( 'mousedown', onDocumentMouseDownTrab, false );

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

        // console.log("function onDocumentMouseDown");
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
                divPai.append("<div class='textoBox' style='display:table-cell;width:99%'> Vetor Campo El&eacute;trico:<br>("+intersectsInfo[0].object.valor[0].toFixed(4)+", "+intersectsInfo[0].object.valor[1].toFixed(4)+", "+intersectsInfo[0].object.valor[2].toFixed(4)+") N/C </div> <br>");
                divPai.append("<input type='button' class='b' onclick='tela1.cena3D.fecharPopInfo()' value='OK'>");
            } else if(intersectsInfo[0].object.tipo == "F"){
                divPai.append("<div class='textoBox' style='display:table-cell;width:99%'> Vetor For&ccedil;a El&eacute;trico :<br>("+intersectsInfo[0].object.valor[0].toFixed(4)+", "+intersectsInfo[0].object.valor[1].toFixed(4)+", "+intersectsInfo[0].object.valor[2].toFixed(4)+") N </div> <br>");
                divPai.append("<input type='button' class='b' onclick='tela1.cena3D.fecharPopInfo()' value='OK'>");           
            } else if(intersectsInfo[0].object.tipo == "W"){
                divPai.append("<div class='textoBox' style='display:table-cell;width:99%'> Trabalho :<br>"+intersectsInfo[0].object.valor.toFixed(4)+" x10&#8315;&#8310; J </div> <br>");
                divPai.append("<input type='button' class='b' onclick='tela1.cena3D.fecharPopInfo()' value='OK'>");           
            }else if(intersectsInfo[0].object.tipo == "V"){
                divPai.append("<div class='textoBox' style='display:table-cell;width:99%'> Potencial El&eacute;trico :<br>"+intersectsInfo[0].object.valor.toFixed(4)+" V </div> <br>");
                divPai.append("<input type='button' class='b' onclick='tela1.cena3D.fecharPopInfo()' value='OK'>");           
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

    function onDocumentMouseUp( event ) {
        event.preventDefault();
        if ( INTERSECTED ) {
            plane.position.copy( INTERSECTED.position );
            removeVetor();
            SELECTED = null;
            tela1.cena3D.atualizaLabels();        
        }
    }

    this.excluir = function(){
        removeObjeto(OBJ);
        tela1.cena3D.fecharPop();
    }

    function removeObjeto(obj){
        if(obj.geometry.type != "SphereGeometry" ){
            this.i = 0;
            for(this.i = 0; this.i < objetos.length; this.i++){
                if(obj === objetos[this.i]){
                    break;
                }
            }
            cena.remove(obj);
            objetos.splice(this.i,1);
            controlador.objeto.removeObjetoModel(this.i);
        } else{
            this.i = 0;
            for(this.i = 0; this.i < pontos.length; this.i++){
                if(obj === pontos[this.i]){
                    break;
                }
            }
            cena.remove(obj);
            pontos.splice(this.i,1);
            controlador.objeto.removePontoModel(this.i);
            tela1.cena3D.atualizaLabels();        
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
            this.carga = controlador.getCarga(this.i, "objeto");
            // alert("Carga: "+this.carga);
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
            this.carga = controlador.getCarga(this.i, "ponto");
            document.getElementById('ptx').value = OBJ.position.x;
            document.getElementById('pty').value = OBJ.position.y;
            document.getElementById('ptz').value = OBJ.position.z;
            document.getElementById('cargaCena').value = this.carga;
        }

    }

    this.fecharPop = function(){
        document.getElementById('popupCena').style.display = 'none';
        document.getElementById('divTrans').style.display = 'none';

        tela1.cena3D.atualizaLabels();        
    }

    this.fecharPopInfo = function(){
        $('.info').empty()
        document.getElementById('info').style.display = 'none';
        document.getElementById('divTrans').style.display = 'none';
    }

    function renderScene() {
        // stats.update();
        // render using requestAnimationFrame
        renderer.render(cena, camera);
        requestAnimationFrame(renderScene);
    }

    // classe render
    function createRender(div){
        // console.log("renderizar : "+div);
        var renderer = new THREE.WebGLRenderer({ alpha: true , antialias: true });
        renderer.setSize($("#"+div).width(), $("#"+div).height()); 
        renderer.setClearColor(new THREE.Color(0x000000));
        renderer.domElement.style.border ="solid blue 2px"; 
        // adiciona a saida do render para um elemento html
        document.getElementById(div).appendChild(renderer.domElement);
        return renderer;
    }

        // keyboards events
    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 37) {
            teta += 0.1;
            camera.position.z = Math.abs(zoom) * Math.sin(teta);
            camera.position.x = Math.abs(zoom) * Math.cos(teta);
            camera.lookAt(cena.position);
        }else if(event.keyCode == 39) {
            teta -= 0.1;
            camera.position.z = Math.abs(zoom) * Math.sin(teta);
            camera.position.x = Math.abs(zoom) * Math.cos(teta);
            camera.lookAt(cena.position);
        }
        if(event.keyCode == 38) {
            zoom = camera.position.x;
            zoom -= 2;
            camera.position.x = zoom;
            camera.lookAt(cena.position);
        }
        if(event.keyCode == 40) {
            zoom = camera.position.x;
            zoom += 2;
            camera.position.x = zoom;
            camera.lookAt(cena.position);
        }       
     });

    this.atualizaLabels = function(){
        removeTexto();
        this.i = 0;
        for(this.i = 0; this.i < pontos.length; this.i++){
            this.texto = new Texto(("P"+this.i), pontos[this.i].position.x, pontos[this.i].position.y, pontos[this.i].position.z-1);
            // this.texto = new Texto("P1",parseFloat(this.px),parseFloat(this.py),parseFloat(this.pz-1));
            tela1.cena3D.addTexto(this.texto);
        }    
    }

    this.getObjeto = function(){
        alert("TODO: getObjeto");
    }

    this.resize = function(div){
        // alert("renderizar");
        renderer.setSize($("#"+div).width(), $("#"+div).height());
        renderer.domElement.style.border ="solid black 2px";  
    }

    this.addObjeto = function(obj){
        cena.add(obj);
        objetos.push(obj);
    }

    this.addPonto = function(obj){
        cena.add(obj);
        pontos.push(obj);
    }

    this.addTexto = function(obj){
        cena.add(obj);
        textos.push(obj);
    }

    this.addLabelCampo = function(){
        // this.texto = new Texto(("P"+this.i), pontos[this.i].position.x, pontos[this.i].position.y, pontos[this.i].position.z-1);
        tela1.cena3D.addTexto(this.texto);
    }

    this.addLabelForca = function(){
        // this.texto = new Texto("P1",parseFloat(this.px),parseFloat(this.py),parseFloat(this.pz-1));
        // tela1.cena3D.addTexto(this.texto);
    }

    this.addLabelTrabalho = function(){
        // this.texto = new Texto("P1",parseFloat(this.px),parseFloat(this.py),parseFloat(this.pz-1));
        // tela1.cena3D.addTexto(this.texto);
    }

    this.addLabelPotencial = function(){
        // this.texto = new Texto(("P"+this.i), pontos[this.i].position.x, pontos[this.i].position.y, pontos[this.i].position.z-1);
        // this.texto = new Texto("P1",parseFloat(this.px),parseFloat(this.py),parseFloat(this.pz-1));
        // tela1.cena3D.addTexto(this.texto);
    }

    function removeTexto(){
        this.i = 0;
        for(this.i = 0; this.i < textos.length; this.i++){
            cena.remove(textos[this.i]);
        }      
        textos = [];
    }

    this.addVetor = function(pInicial, Pfim, tipo){
        obj = new VetorView(pInicial, Pfim, tipo);
        cena.add(obj);
        vetores.push(obj);
    }

    this.addVetorInfo = function(pInicial, Pfim, vetorCalculado, tipo){
        obj = new Info(pInicial, Pfim, vetorCalculado, tipo);
        cena.add(obj);
        vetorInfo.push(obj);
    }

    this.removeVetorView = function(){
        removeVetor();
    }

    function removeVetor(){
        this.i = 0;
        for(this.i = 0; this.i < vetores.length; this.i++){
            cena.remove(vetores[this.i]);
        }      
        vetores = [];
        // remove todos os obj de informação do vetor 
        for(this.i = 0; this.i < vetorInfo.length; this.i++){
            cena.remove(vetorInfo[this.i]);
        }      
        vetorInfo = [];
    }

    // metodo para listar todos os objetos do Model
    this.listObjView = function(){
        return objetos;
    }

    // metodo para listar todos os pontos inseridos no Model
    this.listPontosView = function(){
        return pontos;
    }

    this.showObjetos = function(){
        alert(objetos);
    }

    this.showPontos = function(){
        alert(Pontos);
    }

    this.moverObjeto = function(obj, x, y, z){
        obj.position.x = x;
        obj.position.y = y;
        obj.position.z = z;
    }

    this.rotacionarObjeto = function(obj, x, y, z){
        obj.rotation.x = x;
        obj.rotation.y = y;
        obj.rotation.z = z;
    }

    this.rotacionarCamera = function(x, y, z){
        camera.rotation.x = x;
        camera.rotation.y = y;
        camera.rotation.z = z;
    }

    this.myFunction2 = function(){
        
        this.posicaox = document.getElementById('ptx').value;
        this.posicaoy = document.getElementById('pty').value;
        this.posicaoz = document.getElementById('ptz').value;
        this.carga = document.getElementById('cargaCena').value;

        OBJ.position.x = parseFloat(this.posicaox); 
        OBJ.position.y = parseFloat(this.posicaoy);
        OBJ.position.z = parseFloat(this.posicaoz);

        // alterar carga model
        if(OBJ.geometry.type != "SphereGeometry" ){
            this.i = 0;
            for(this.i = 0; this.i < objetos.length; this.i++){
                if(OBJ === objetos[this.i]){
                    break;
                }
            }
            controlador.mudarCarga(this.i, parseFloat(this.carga) ,"objeto");      
        } else{
            this.i = 0;
            for(this.i = 0; this.i < pontos.length; this.i++){
                if(OBJ === pontos[this.i]){
                    break;
                }
            }
            controlador.mudarCarga(this.i, parseFloat(this.carga) ,"ponto");      
        }

        tela1.cena3D.fecharPop();

    }

}

function fecharpopup2(){
    tela1.cena3D.fecharPop();     
}






