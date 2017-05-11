function init() {
	tela1 = new Tela();
	controlador = new Controller();
}
window.onload = init; 

var Controller = function(){
	// console.log("instancia Controller");
	this.objeto = new Objetos();

    this.calculaCampo = function(){
        this.pI = [0,0,0];
        this.a = tela1.cena3D.listPontosView();
        this.o = tela1.cena3D.listObjView();
        this.oModel = controlador.objeto.listObj();
        if(this.a.length >= 1 && this.o.length >= 1 ){
            // percorer vetor de pontos 
            for (this.i = 0; this.i < this.a.length; this.i++) {
                this.p_click = [this.a[this.i].position.x, this.a[this.i].position.y, this.a[this.i].position.z]
                this.vetor = [0,0,0];
                this.aux = [0,0,0];
                // percorer o vetor de objetos
                for(this.j = 0; this.j < this.o.length; this.j++){
                    this.p_obj = [this.o[this.j].position.x, this.o[this.j].position.y, this.o[this.j].position.z];
                    // verificar se objeto tem mudar 
                    this.raio = this.o[this.j].raio;
                    // soma todos os vetores de campo eletrico gerados pelos objetos
                    this.carga = this.oModel[this.j].carga;
                    if(this.o[this.j].geometry.type == "TorusGeometry"){
                        this.aux = calcCampoAnel(this.p_click, this.p_obj, this.raio, this.carga);
                    }
                    if(this.o[this.j].geometry.type == "CircleGeometry"){
                        this.aux = calcCampoDisco(this.p_click, this.p_obj, this.raio, this.carga);
                    }
                    if(this.o[this.j].geometry.type == "CylinderGeometry"){
                        this.aux = calcCampoLinha(this.p_click, this.p_obj, this.raio, this.carga);
                    }
                    this.aux[0] = parseFloat(this.aux[0]);
                    this.aux[1] = parseFloat(this.aux[1]);
                    this.aux[2] = parseFloat(this.aux[2]);               
                    this.vetor[0] = this.vetor[0] + this.aux[0];
                    this.vetor[1] = this.vetor[1] + this.aux[1];
                    this.vetor[2] = this.vetor[2] + this.aux[2];
                }
                this.pI[0] = this.p_click[0] + (this.vetor[0]/250);
                this.pI[1] = this.p_click[1] + (this.vetor[1]/250);
                this.pI[2] = this.p_click[2] + (this.vetor[2]/250);
                tela1.cena3D.addVetor(this.p_click, this.pI, "E");
                tela1.cena3D.addVetorInfo(this.p_click, this.pI, this.vetor, "E");
                // console.log("Vetor : "+this.pI);
                // console.log("Campo eletrico: "+this.vetor);
            }
        }
        if(this.a.length < 1){
            alert("Inserir Ponto");
        }
        if(this.o.length < 1){
            alert("Inserir Objetos geometricos");
        }

    }

    this.calculaForca = function(){
        this.pI = [0,0,0];

        // console.log("calculando campo eletrico");
        // (geometry.type)
        this.a = tela1.cena3D.listPontosView();
        this.aModel = controlador.objeto.listPontos();
        this.o = tela1.cena3D.listObjView();
        this.oModel = controlador.objeto.listObj();
        if(this.a.length >= 1 && this.o.length >= 1 ){
            // percorer vetor de pontos 
            for (this.i = 0; this.i < this.a.length; this.i++) {
                this.p_click = [this.a[this.i].position.x, this.a[this.i].position.y, this.a[this.i].position.z]
                this.vetor = [0,0,0];
                this.aux = [0,0,0];
                // percorer o vetor de objetos
                for(this.j = 0; this.j < this.o.length; this.j++){
                    this.p_obj = [this.o[this.j].position.x, this.o[this.j].position.y, this.o[this.j].position.z];
                    // verificar se objeto tem mudar 
                    this.raio = this.o[this.j].raio;
                    // soma todos os vetores de campo eletrico gerados pelos objetos
                    this.carga = this.oModel[this.j].carga;
                    if(this.o[this.j].geometry.type == "TorusGeometry"){
                        this.aux = calcCampoAnel(this.p_click, this.p_obj, this.raio, this.carga);
                        this.aux[0] = this.aux[0] * (this.aModel[this.i].carga*Math.pow(10,-6));
                        this.aux[1] = this.aux[1] * (this.aModel[this.i].carga*Math.pow(10,-6));
                        this.aux[2] = this.aux[2] * (this.aModel[this.i].carga*Math.pow(10,-6));
                    }
                    if(this.o[this.j].geometry.type == "CircleGeometry"){
                        this.aux = calcCampoDisco(this.p_click, this.p_obj, this.raio, this.carga);
                        this.aux[0] = this.aux[0] * this.aModel[this.i].carga*Math.pow(10,-6);
                        this.aux[1] = this.aux[1] * this.aModel[this.i].carga*Math.pow(10,-6);
                        this.aux[2] = this.aux[2] * this.aModel[this.i].carga*Math.pow(10,-6);
                    }
                    if(this.o[this.j].geometry.type == "CylinderGeometry"){
                        this.aux = calcCampoLinha(this.p_click, this.p_obj, this.raio, this.carga);
                        this.aux[0] = this.aux[0] * this.aModel[this.i].carga*Math.pow(10,-6);
                        this.aux[1] = this.aux[1] * this.aModel[this.i].carga*Math.pow(10,-6);
                        this.aux[2] = this.aux[2] * this.aModel[this.i].carga*Math.pow(10,-6);
                    }
                    this.aux[0] = parseFloat(this.aux[0]);
                    this.aux[1] = parseFloat(this.aux[1]);
                    this.aux[2] = parseFloat(this.aux[2]);               
                    this.vetor[0] = this.vetor[0] + this.aux[0];
                    this.vetor[1] = this.vetor[1] + this.aux[1];
                    this.vetor[2] = this.vetor[2] + this.aux[2];    
                } 
                this.pI[0] = this.p_click[0] + this.vetor[0]*500;
                this.pI[1] = this.p_click[1] + this.vetor[1]*500;
                this.pI[2] = this.p_click[2] + this.vetor[2]*500;
                tela1.cena3D.addVetor(this.p_click, this.pI, "F");
                tela1.cena3D.addVetorInfo(this.p_click, this.pI, this.vetor, "F"); 
                console.log("Vetor Campo eletrico: "+this.vetor);
            }
        }
        if(this.a.length < 1){
            alert("Inserir Ponto");
        }
        if(this.o.length < 1){
            alert("Inserir Objetos geometricos");
        }    
    }

    this.calculaTrabalho = function(i_inicial, i_final){
        this.trab = 0;
        this.a = tela1.cena3D.listPontosView();
        this.aModel = controlador.objeto.listPontos();
        this.o = tela1.cena3D.listObjView();
        this.oModel = controlador.objeto.listObj();       
        this.p_inicial = [this.a[i_inicial].position.x, this.a[i_inicial].position.y, this.a[i_inicial].position.z];
        this.p_final = [this.a[i_final].position.x, this.a[i_final].position.y, this.a[i_final].position.z];

       if(this.p_inicial[0] == this.p_final[0] && this.p_inicial[1] == this.p_final[1] && this.p_inicial[2] == this.p_final[2]){
            this.trab = 0;
        } else {
            this.carga = this.aModel[i_inicial].carga;

            this.trab = calcTrabalho(this.p_inicial, this.p_final, this.o, this.oModel, this.carga);
            tela1.cena3D.addVetor(this.p_inicial, this.p_final, "W");
        }
        console.log("Trabalho: "+this.trab);
        tela1.cena3D.addVetorInfo(this.p_final, this.p_inicial, this.trab, "W");
    }

    this.calculaPotencial = function(){
        this.pI = [0,0,0];
        this.a = tela1.cena3D.listPontosView();
        this.o = tela1.cena3D.listObjView();
        this.oModel = controlador.objeto.listObj();
        if(this.a.length >= 1 && this.o.length >= 1 ){
            // percorer vetor de pontos 
            for (this.i = 0; this.i < this.a.length; this.i++) {
                this.p_click = [this.a[this.i].position.x, this.a[this.i].position.y, this.a[this.i].position.z]
                this.vetor = 0;
                this.aux = 0;
                // percorer o vetor de objetos
                for(this.j = 0; this.j < this.o.length; this.j++){
                    this.p_obj = [this.o[this.j].position.x, this.o[this.j].position.y, this.o[this.j].position.z];
                    // verificar se objeto tem mudar 
                    this.raio = this.o[this.j].raio;
                    this.carga = this.oModel[this.j].carga;
                    if(this.o[this.j].geometry.type == "TorusGeometry"){
                        this.aux = calcPotencialAnel(this.p_click, this.p_obj, this.raio, this.carga);
                    }
                    if(this.o[this.j].geometry.type == "CircleGeometry"){
                        this.aux = calcPotencialDisco(this.p_click, this.p_obj, this.raio, this.carga);
                    }
                    if(this.o[this.j].geometry.type == "CylinderGeometry"){
                        this.aux = calcPotencialLinha(this.p_click, this.p_obj, this.raio, this.carga);
                    }
                    this.vetor = this.vetor + parseFloat(this.aux)
                }
                console.log("Potencial eletrico Ponto"+this.j+" : "+this.vetor);
                tela1.cena3D.addVetorInfo(this.p_click, 0, this.vetor, "V");
            }
        }
        if(this.a.length < 1){
            alert("Inserir Ponto");
        }
        if(this.o.length < 1){
            alert("Inserir Objetos geometricos");
        }

    }


    // controlador.mudarCarga(this.i, parseFloat(this.carga) ,"ponto");      
    this.mudarCarga = function(index, carga, tipo){
        controlador.objeto.mudarCarga(index, carga, tipo);
    }

    this.getCarga = function(index, tipo){
        return controlador.objeto.getCarga(index, tipo);           
    }

}
