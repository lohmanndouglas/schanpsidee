
function calcMod(v){
   	var a;
   	a = Math.pow(v[0], 2) + Math.pow(v[1], 2) + Math.pow(v[2], 2);
  	v = Math.sqrt(a);
   	return v.toExponential(10);
};

function calcCampoAnel(p_click, p_obj, raio, carga){

  	var nIteracoes = 1000;

    // pegar carga
    var Q = carga * Math.pow(10,-6);
    
    // console.log(Q.toExponential(4));
	var dQ = Q/nIteracoes;

	var teta = 0;
	var dTeta = 2*Math.PI/nIteracoes;
	var E = [0, 0, 0];       
	var dE = [0, 0, 0]; 
	var epsilon = 8.854 * Math.pow(10,-12); // constante de permissividade C^2/N*m^2
	var k = 1 / (4*Math.PI*epsilon);
	// p is a vector of point of dQ
	var p = [0, 0, 0]; 
	// r is vector from ring dq to click point
	var r = [0, 0, 0]; 
	var rUnitario = [0, 0, 0]; 
	var rModulo = [0, 0, 0]; 

	for (var i = 0; i < nIteracoes; i++) {

		p[0] = 0 + p_obj[0];
	 	p[1] = raio*Math.cos(teta) + p_obj[1];
	 	p[2] = raio*Math.sin(teta) + p_obj[2];

	 	r[0] = p_click[0] - p[0];
	 	r[1] = p_click[1] - p[1];
	 	r[2] = p_click[2] - p[2];

	 	rModulo = calcMod(r); // função sqrsp
	 	rUnitario[0] = r[0]/rModulo;
	 	rUnitario[1] = r[1]/rModulo;
	 	rUnitario[2] = r[2]/rModulo;
	 	
	 	dE[0] = k*(dQ/Math.pow(rModulo,2))*rUnitario[0];
	 	dE[1] = k*(dQ/Math.pow(rModulo,2))*rUnitario[1];
	 	dE[2] = k*(dQ/Math.pow(rModulo,2))*rUnitario[2];
	 	
	 	E[0] = E[0] + dE[0];
	 	E[1] = E[1] + dE[1];
	 	E[2] = E[2] + dE[2];
	 	teta = teta + dTeta;
   	};
	// console.log("Modulo E: ", calcMod(E)); 
	E[0] = E[0].toFixed(10);
	E[1] = E[1].toFixed(10);
	E[2] = E[2].toFixed(10);
   	return E;
};


function calcCampoDisco(p_click, p_obj, raio, carga){

	var nIteracoes = 900;

	// campo eletrico total no disco
	var ED = [0, 0, 0];
	
	// espessura de cada anel
	var dR = raio/nIteracoes;

	// raio do anel que será integrado
	var R = dR/2;

	// carga de cada anel
	var dQ = 0;

	// densidade de carga do disco
	var sig = carga/ (Math.PI* Math.pow(raio,2));

	for (var i = 0; i < nIteracoes; i++){
		dQ = 2*Math.PI*sig*R*dR;
		Ed = calcCampoAnel(p_click,p_obj,R,dQ);
		// console.log(p_click+" , "+p_obj+" , "+R+" , "+dQ);
		// alert(calcCampoAnel(p_click,p_obj,R,dQ));

		ED[0] = ED[0] + parseFloat(Ed[0]);
		ED[1] = ED[1] + parseFloat(Ed[1]);
		ED[2] = ED[2] + parseFloat(Ed[2]);
    	R = R + dR;

	}
   	return ED;
};


function calcCampoLinha(p_click, p_obj, comprimento, carga){
 	
  	var nIteracoes = 1000;

    // Carga
    var Q = carga * Math.pow(10,-6);
   	var dQ = Q/nIteracoes;

	var E = [0, 0, 0];       
	var dE = [0, 0, 0]; 
	var epsilon = 8.854 * Math.pow(10,-12); // constante de permissividade C^2/N*m^2
	var k = 1 / (4*Math.PI*epsilon);

	// p is a vector of point of dQ
	var p = [0, 0, 0]; 
	// r is vector from ring dq to click point

	var r = [0, 0, 0]; 
	var rUnitario = [0, 0, 0]; 
	var rModulo = [0, 0, 0]; 

	var cont = comprimento/nIteracoes;
	var dp = cont/2;

	for (var i = 0; i < nIteracoes; i++) {

		p[0] = 0 + (p_obj[0] - (comprimento/2)) + dp;
	 	p[1] = p_obj[1];
	 	p[2] = p_obj[2];

	 	r[0] = p_click[0] - p[0];
	 	r[1] = p_click[1] - p[1];
	 	r[2] = p_click[2] - p[2];

	 	rModulo = calcMod(r); // função sqrsp
	 	rUnitario[0] = r[0]/rModulo;
	 	rUnitario[1] = r[1]/rModulo;
	 	rUnitario[2] = r[2]/rModulo;
	 	
	 	dE[0] = k*(dQ/Math.pow(rModulo,2))*rUnitario[0];
	 	dE[1] = k*(dQ/Math.pow(rModulo,2))*rUnitario[1];
	 	dE[2] = k*(dQ/Math.pow(rModulo,2))*rUnitario[2];
	 	
	 	E[0] = E[0] + dE[0];
	 	E[1] = E[1] + dE[1];
	 	E[2] = E[2] + dE[2];
	 	dp = dp + cont;
   	};

	E[0] = E[0].toFixed(10);
	E[1] = E[1].toFixed(10);
	E[2] = E[2].toFixed(10);
   	return E;	
};


// calcTrabalho(p_inicial, p_final, o[j], oModel[j]);
function calcTrabalho(p_inicial, p_final, objetosView, objetosModel, carga){
	this.pontoInical = p_inicial;
	this.pontoFinal = p_final;
    w = carga * (calcPotecialPonto(this.pontoInical, objetosView, objetosModel) - calcPotecialPonto(this.pontoFinal, objetosView, objetosModel));
    return w;
};

function calcPotecialPonto(ponto, listaObjView, listaObjModel){

        this.o = listaObjView;
        this.oModel = listaObjModel;
        this.vetor = 0;
        this.aux = 0;
        // percorer o vetor de objetos
        for(this.j = 0; this.j < this.o.length; this.j++){
            this.p_obj = [this.o[this.j].position.x, this.o[this.j].position.y, this.o[this.j].position.z];
            // verificar se objeto tem mudar 
            this.raio = this.o[this.j].raio;
            this.carga = this.oModel[this.j].carga;
            if(this.o[this.j].geometry.type == "TorusGeometry"){
        	    this.aux = calcPotencialAnel(ponto, this.p_obj, this.raio, this.carga);
            }
            if(this.o[this.j].geometry.type == "CircleGeometry"){
                this.aux = calcPotencialDisco(ponto, this.p_obj, this.raio, this.carga);
            }
            if(this.o[this.j].geometry.type == "CylinderGeometry"){
                this.aux = calcPotencialLinha(ponto, this.p_obj, this.raio, this.carga);
            }
            this.vetor = this.vetor + parseFloat(this.aux)
        }
        // alert("Potencial eletrico Ponto"+ponto+" : "+this.vetor);
        return this.vetor;
}

function calcPotencialAnel(p_click, p_obj, raio, carga){

  	var nIteracoes = 1000;

    // pegar carga
    var Q = carga * Math.pow(10,-6);
    
    // console.log(Q.toExponential(4));
	var dQ = Q/nIteracoes;

	var teta = 0;
	var dTeta = 2*Math.PI/nIteracoes;
	var V = 0;       
	var dV = 0; 
	var epsilon = 8.854 * Math.pow(10,-12); // constante de permissividade C^2/N*m^2
	var k = 1 / (4*Math.PI*epsilon);
	// p is a vector of point of dQ
	var p = [0, 0, 0]; 
	// r is vector from ring dq to click point
	var r = [0, 0, 0]; 
	var rModulo = [0, 0, 0]; 

	for (var i = 0; i < nIteracoes; i++) {

		p[0] = 0 + p_obj[0];
	 	p[1] = raio*Math.cos(teta) + p_obj[1];
	 	p[2] = raio*Math.sin(teta) + p_obj[2];

	 	r[0] = p_click[0] - p[0];
	 	r[1] = p_click[1] - p[1];
	 	r[2] = p_click[2] - p[2];

	 	rModulo = calcMod(r); // função sqrsp
	 	
	 	dV = k*(dQ/rModulo);

	 	V = V + dV;
	
	 	teta = teta + dTeta;
   	};
	V = V.toFixed(10);
   	return V;
};


function calcPotencialDisco(p_click, p_obj, raio, carga){

	var nIteracoes = 1000;

	// campo eletrico total no disco
	var VD = 0;
	
	// espessura de cada anel
	var dR = raio/nIteracoes;

	// raio do anel que será integrado
	var R = dR/2;

	// carga de cada anel
	var dQ = 0;

	// densidade de carga do disco
	var sig = carga/ (Math.PI* Math.pow(raio,2));

	for (var i = 0; i < nIteracoes; i++){
		dQ = 2*Math.PI*sig*R*dR;
		dV = calcPotencialAnel(p_click,p_obj,R,dQ);
		// console.log(p_click+" , "+p_obj+" , "+R+" , "+dQ);
		// alert(calcCampoAnel(p_click,p_obj,R,dQ));

		VD = VD + parseFloat(dV);
    	R = R + dR;

	}
   	return VD;
};

function calcPotencialLinha(p_click, p_obj, comprimento, carga){
 	
  	var nIteracoes = 1000;

    // Carga
    var Q = carga * Math.pow(10,-6);
   	var dQ = Q/nIteracoes;

	var V = 0;       
	var dV = 0; 
	var epsilon = 8.854 * Math.pow(10,-12); // constante de permissividade C^2/N*m^2
	var k = 1 / (4*Math.PI*epsilon);

	// p is a vector of point of dQ
	var p = [0, 0, 0]; 
	// r is vector from ring dq to click point

	var r = [0, 0, 0]; 
	var rUnitario = [0, 0, 0]; 
	var rModulo = [0, 0, 0]; 

	var cont = comprimento/nIteracoes;
	var dp = cont/2;

	for (var i = 0; i < nIteracoes; i++) {

		p[0] = 0 + (p_obj[0] - (comprimento/2)) + dp;
	 	p[1] = p_obj[1];
	 	p[2] = p_obj[2];

	 	r[0] = p_click[0] - p[0];
	 	r[1] = p_click[1] - p[1];
	 	r[2] = p_click[2] - p[2];

	 	rModulo = calcMod(r); // função sqrsp
	 	
	 	dV = k*(dQ/rModulo);

	 	V = V + dV;

	 	dp = dp + cont;
   	};

	V = V.toFixed(10);
   	return V;	
};


function calc_eletric_fild(vert, dot){

	alert(vert[0].x);
	alert(dot.x);
 
    // pegar carga
    var carga = 10;
    var Q = carga * Math.pow(10,-6);
    
 //    // console.log(Q.toExponential(4));
    var dQ = Q/vert.length;

	// var teta = 0;
	// var dTeta = 2*Math.PI/nIteracoes;
	var E = [0, 0, 0];       
	var dE = [0, 0, 0]; 
	var epsilon = 8.854 * Math.pow(10,-12); // constante de permissividade C^2/N*m^2
	var k = 1 / (4*Math.PI*epsilon);
	// // p is a vector of point of dQ
    var p = [0, 0, 0]; 
	// // r is vector from ring dq to click point
	// var r = [0, 0, 0]; 
	// var rUnitario = [0, 0, 0]; 
	// var rModulo = [0, 0, 0]; 
    var i = 0;
	// for (i = 0; i < vert.length; i++){
	var d = new THREE.Vector3();
	for (i = 0; i < 1; i++){
		// var d = vert[i].distanceTo(dot);
		d = dot.sub(vert[i])
		alert(d);
		
  		dE[0] = k*(dQ/Math.pow(rModulo,2))*rUnitario[0];
	    dE[1] = k*(dQ/Math.pow(rModulo,2))*rUnitario[1];
	    dE[2] = k*(dQ/Math.pow(rModulo,2))*rUnitario[2];
	 	
	  	// E[0] = E[0] + dE[0];
	  	// E[1] = E[1] + dE[1];
	  	// E[2] = E[2] + dE[2];
	}



	// for (var i = 0; i < nIteracoes; i++) {

	// 	p[0] = 0 + p_obj[0];
	//  	p[1] = raio*Math.cos(teta) + p_obj[1];
	//  	p[2] = raio*Math.sin(teta) + p_obj[2];

	//  	r[0] = p_click[0] - p[0];
	//  	r[1] = p_click[1] - p[1];
	//  	r[2] = p_click[2] - p[2];

	//  	rModulo = calcMod(r); // função sqrsp
	//  	rUnitario[0] = r[0]/rModulo;
	//  	rUnitario[1] = r[1]/rModulo;
	//  	rUnitario[2] = r[2]/rModulo;
	 	
	//  	dE[0] = k*(dQ/Math.pow(rModulo,2))*rUnitario[0];
	//  	dE[1] = k*(dQ/Math.pow(rModulo,2))*rUnitario[1];
	//  	dE[2] = k*(dQ/Math.pow(rModulo,2))*rUnitario[2];
	 	
	//  	E[0] = E[0] + dE[0];
	//  	E[1] = E[1] + dE[1];
	//  	E[2] = E[2] + dE[2];
	//  	teta = teta + dTeta;
 //   	};
	// // console.log("Modulo E: ", calcMod(E)); 
	// E[0] = E[0].toFixed(10);
	// E[1] = E[1].toFixed(10);
	// E[2] = E[2].toFixed(10);
 //   	return E;
};