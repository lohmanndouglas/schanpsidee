// ** Define a classe principal Tela ** //
var Tela = function() {
	// console.log("Criei tela");
	// cria uma cena
    this.cena3D = new Cena3D("webGl");

 //    ponto = new PontoView(0.1,6,0,0);
 //    this.cena3D.addDot(ponto);

 //    ponto = new PontoView(0.1,-6,0,0);
 //    this.cena3D.addDot(ponto);


 //    obj = new AnelView(4,0,0,0);
 //    this.cena3D.addObject(obj);

 //    var ap = this.cena3D.listObjView();
 //    var ao = this.cena3D.listPontosView();
 //    // console.log(a);

	// modelCalcCamp(ap[0],ao[0]); 
	// // modelCalcCamp(ap[0],ao[1]);
}


/* Global functions */

function _addCharge(){
    var div = document.getElementById('popupCharge');
    div.style.position = 'absolute';
    div.style.top = $('#bCharge').position().top;
    div.style.left = $('#bCharge').position().left;
    div.style.display = 'block';
    //tela.cena3D.atualizaLabels();
    // alert("_addCharge");
}

function _addDot(){
    var div = document.getElementById('popupDot');
    div.style.position = 'absolute';
    div.style.top = $('#bDot').position().top;
    div.style.left = $('#bDot').position().left;
    div.style.display = 'block';
}

function _addRing(){
    var div = document.getElementById('popupRing');
    div.style.position = 'absolute';
    div.style.top = $('#bRing').position().top;
    div.style.left = $('#bRing').position().left;
    div.style.display = 'block';
}

function _addLine(){
    var div = document.getElementById('popupLine');
    div.style.position = 'absolute';
    div.style.top = $('#bLine').position().top;
    div.style.left = $('#bLine').position().left;
    div.style.display = 'block';
}

function _addDisc(){
    var div = document.getElementById('popupDisc');
    div.style.position = 'absolute';
    div.style.top = $('#bDisc').position().top;
    div.style.left = $('#bDisc').position().left;
    div.style.display = 'block';
}

function _close(objDiv){ 
    document.getElementById(objDiv).style.display = 'none';
}

function _setup(objDiv){
    document.getElementById(objDiv).style.display = 'none';
    _insert(objDiv);
}

function _insert(objDiv){
    if(objDiv == "popupCharge"){
        this.px = document.getElementById('px').value;
        this.py = document.getElementById('py').value;
        this.pz = document.getElementById('pz').value;
        this.carga = document.getElementById('carga').value;   
        obj = new ChargeView(0.1,parseFloat(this.carga),parseFloat(this.px),parseFloat(this.py),parseFloat(this.pz));
        tela.cena3D.addDot(obj);
    }
    if(objDiv == "popupDot"){
        this.px = document.getElementById('pxd').value;
        this.py = document.getElementById('pyd').value;
        this.pz = document.getElementById('pzd').value;
        this.carga = document.getElementById('cargad').value;   
        obj = new DotView(0.1,parseFloat(this.carga),parseFloat(this.px),parseFloat(this.py),parseFloat(this.pz));
        tela.cena3D.addObject(obj);
    }
    if(objDiv == "popupRing"){
        this.raio = document.getElementById('raior').value
        this.px = document.getElementById('pxr').value;
        this.py = document.getElementById('pyr').value;
        this.pz = document.getElementById('pzr').value;
        this.carga = document.getElementById('cargar').value;   
        obj = new RingView(parseFloat(this.raio),parseFloat(this.carga),parseFloat(this.px),parseFloat(this.py),parseFloat(this.pz));
        tela.cena3D.addObject(obj);
    }
    if(objDiv == "popupLine"){
        this.length = document.getElementById('lengthl').value
        this.px = document.getElementById('pxl').value;
        this.py = document.getElementById('pyl').value;
        this.pz = document.getElementById('pzl').value;
        this.carga = document.getElementById('cargal').value;   
        obj = new LineView(parseFloat(this.length),parseFloat(this.carga),parseFloat(this.px),parseFloat(this.py),parseFloat(this.pz));
        tela.cena3D.addObject(obj);
    }
    if(objDiv == "popupDisc"){
        this.raio = document.getElementById('raiodi').value
        this.px = document.getElementById('pxdi').value;
        this.py = document.getElementById('pydi').value;
        this.pz = document.getElementById('pzdi').value;
        this.carga = document.getElementById('cargadi').value;   
        obj = new DiscView(parseFloat(this.raio),parseFloat(this.carga),parseFloat(this.px),parseFloat(this.py),parseFloat(this.pz));
        tela.cena3D.addObject(obj);
    }
    //controlador.objeto.addObjetoModel("ponto", parseFloat(this.carga));
    tela.cena3D.removeVetorView();
    //tela1.cena3D.atualizaLabels();
}


/* 
    para cada ponto  do vetor pontos[]
    	calcular campo de cada objeto do vetor objetos[]
    	plotar vetor
*/
function _calcField(){
	console.log("_calcField");
	calcField();
}

function _calcPot(){
	console.log("_calcPot");
	calcPot();
}

function _calcForce(){
	console.log("_calcForce");
	calcForce();
}

function _calcJob(){
	console.log("_calcJob");
	limparCombo();
	carregarCombo(); 
}


/** Functions related settings configuration*/
function show_set_configuration(){
    document.getElementById('popupConfiguration').style.display = 'block';
    document.getElementById('divTrans').style.display = 'block';
    // var div = document.getElementById('popupCena');
    document.getElementById('popupConfiguration').style.position = 'absolute';
    document.getElementById('popupConfiguration').style.left = '50%';
    document.getElementById('popupConfiguration').style.top = '20%';
}

function _close_set_configuration(){
    document.getElementById('popupConfiguration').style.display = 'none';
    document.getElementById('divTrans').style.display = 'none';
}

function _save_new_configuration(){
    //* Change the precision*/
    var _precision = document.getElementById("precisionSelected").value;
    PRECISION = parseInt(_precision);
    //* Change the precision*/
    var _labels = document.getElementById("labelsSelected").checked;
    LABELS = _labels;
    //* Change the precision*/  
    var _axes = document.getElementById("axesSelected").checked;
    HELP_AXIS = _axes;
    //* Change the precision*/    
    var _xOyPlane = document.getElementById("xOyPlaneSelected").checked;
    HELP_PLANE_xOy = _xOyPlane;
    var _yOzPlane = document.getElementById("yOzPlaneSelected").checked;
    HELP_PLANE_yOz = _yOzPlane;
    var _xOzPlane = document.getElementById("xOzPlaneSelected").checked;
    HELP_PLANE_xOz = _xOzPlane;
    //* Close and change the current settings /
    _close_set_configuration()
    tela.cena3D.atualizaLabels();
    tela.cena3D.drawPlanes_xOy();
    tela.cena3D.drawPlanes_yOz();
    tela.cena3D.drawPlanes_xOz();
    tela.cena3D.drawAxes();

}
//end settings configurations


/** Functions related with help menu*/
function _open_help(){
    document.getElementById('popupHelp').style.display = 'block';
    document.getElementById('divTrans').style.display = 'block';
    // var div = document.getElementById('popupCena');
    document.getElementById('popupHelp').style.position = 'absolute';
    document.getElementById('popupHelp').style.left = '50%';
    document.getElementById('popupHelp').style.top = '20%';
}

function _close_help(){
    document.getElementById('popupHelp').style.display = 'none';
    document.getElementById('divTrans').style.display = 'none';
}
//end help menu

/** This function clears the dots alredy load on job's opo-up*/
function limparCombo(){

	var comboInicial = document.getElementById("cboPincial");
	var comboFinal = document.getElementById("cboPfinal");
	
    while (comboInicial.length) {
        comboInicial.remove(0);
    }
    while (comboFinal.length) {
        comboFinal.remove(0);
    }
}

/** This function load dots to chose on job's pop-up */
function carregarCombo(){
    this.pts = tela.cena3D.listPontosView();

	var comboInicial = document.getElementById("cboPincial");
	var comboFinal = document.getElementById("cboPfinal");

   	for (this.i = 0; this.i < this.pts.length; this.i++) {
   	    var opt0 = document.createElement("option");
    	opt0.value = this.i;
    	opt0.text = "P"+this.i;
    	comboInicial.add(opt0, comboInicial.options[0]);
    	// comboFinal.add(opt0, comboFinal.options[0]);
   	};

   	for (this.i = 0; this.i < this.pts.length; this.i++) {
   		var opt0 = document.createElement("option");
    	opt0.value = this.i;
    	opt0.text = "P"+this.i;
    	// comboInicial.add(opt0, comboInicial.options[0]);
    	comboFinal.add(opt0, comboFinal.options[0]);
   	};

   	this.obj = tela.cena3D.listObjView();
   	if(this.pts.length > 0 && this.obj.length > 0){
   	   	abriPop();
   	}else if (this.pts.length < 1){
   		alert("Inserir Ponto");
   	} else if (this.obj.length < 1){
   		alert("Inserir Objeto");
   	}
}

function abriPop(){
    document.getElementById('comboBox').style.display = 'block';
    document.getElementById('divTrans').style.display = 'block';
    // var div = document.getElementById('popupCena');
    document.getElementById('comboBox').style.position = 'absolute';
    document.getElementById('comboBox').style.left = '950px';
    document.getElementById('comboBox').style.top = '150px';
}

function _fecharPop(){
	document.getElementById('comboBox').style.display = 'none';
    document.getElementById('divTrans').style.display = 'none';
}


/** This functions gets the initial and final dots and calls the math job function*/
function calculaTrabalhoBotao(){

		var comboInicial = document.getElementById("cboPincial");

		var comboFinal = document.getElementById("cboPfinal");

   		posiaoI = comboInicial.options[comboInicial.selectedIndex].value;
   		posiaoF = comboFinal.options[comboFinal.selectedIndex].value;

   		// this.pts = tela1.cena3D.listPontosView();

   		// pIncial = [this.pts[posiaoI].position.x, this.pts[posiaoI].position.y, this.pts[posiaoI].position.z];
   		// pFinal = [this.pts[posiaoF].position.x, this.pts[posiaoF].position.y, this.pts[posiaoF].position.z];
        /** Calls to calculates controler function*/
		calcJob(posiaoI, posiaoF);
		_fecharPop();

}