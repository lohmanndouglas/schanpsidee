// ** Define a classe principal Tela ** //
var Tela = function() {
	// console.log("Criei tela");
	// cria uma cena
    this.cena3D = new Cena3D("WebGL");
 
    // cria Barra lateral de Figuras geometricas
    this.barraLateral = new BarraLateral(this.cena3D, "BarraLateral");

    // cria Barra de Variaveis;
    this.barraInferior = new BarraInferior("BarraInferior");

    window.addEventListener("resize", function(){
    	tela1.cena3D.resize("WebGL"); 
	});
}



