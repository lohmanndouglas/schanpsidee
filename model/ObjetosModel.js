var Objetos = function(){

    var objetos = [];
    var pontos = [];
    // console.log("instanciou classe Objetos");

    this.addObjetoModel = function(obj, carga){
        // insere objetos geometricos no vetor de objetos 
        if(obj == "anel") {
            obje = new AnelModel(carga);
            objetos.push(obje);
        }
        // insere todos os pontos em um vetor de pontos
        if(obj == "ponto") {
            obje = new PontoModel(carga);
            pontos.push(obje);
        }
        // insere todos os pontos em um vetor de pontos
        if(obj == "disco") {
            obje = new DiscoModel(carga);
            objetos.push(obje);
        }
        // insere todos os pontos em um vetor de pontos
        if(obj == "linha") {
            obje = new LinhaModel(carga);
            objetos.push(obje);
        }
    }

    this.removeObjetoModel = function(indice){
        objetos.splice(indice,1);
    }

    this.removePontoModel = function(indice){
        pontos.splice(indice,1);
    }

    // metodo para listar todos os objetos do Model
    this.listObj = function(){
        return objetos;
    }

    // metodo para listar todos os pontos inseridos no Model
    this.listPontos = function(){
        return pontos;
    }

    this.mudarCarga = function(index, carga, tipo){
        if(tipo == "objeto"){
            objetos[index].carga = parseFloat(carga);
        } 
        if(tipo == "ponto"){
            pontos[index].carga = parseFloat(carga); 
        }          
    }

    this.getCarga = function(index, tipo){
        if(tipo == "objeto"){
            return objetos[index].carga;
        } 
        if(tipo == "ponto"){
            return pontos[index].carga;            
        }
    }

    this.deleteObjetoModel = function(obj){
        alert("TODO: deleteObjetoModel");
    }

    this.showObjetosModel = function(){
        alert(objetos);
    }

}

// define a classe Anel
var AnelModel = function(carga) {
    // console.log("Cria AnelModel");
    this.carga = carga;
}

// define a classe Anel
var DiscoModel = function(carga) {
    // console.log("Cria DiscoModel");
    this.carga = carga;
}

// define a classe Anel
var LinhaModel = function(carga) {
    // console.log("Cria LinhaModel");
    this.carga = carga;
}

// define a classe Ponto
var PontoModel = function(carga) { 
    // console.log("Cria PontoModel"); 
    this.carga = carga;
}
