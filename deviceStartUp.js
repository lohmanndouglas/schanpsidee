var _deviceStartUp, _logo, application;
//var tela = null;
var version = "0.0.005";
  function bodyLoaded(){
      if(_deviceStartUp)return;
     
      _deviceStartUp = new deviceStartUp( onAppReady, onSplashReady ,version );
  }

  var addPopUpContent =null;

  function onSplashReady(){
    if(webglAvailable){
        _deviceStartUp.loadDependencies();
    }else{
        //usuário não tem webGl!!.
        //mostrar tela informativa
    }
  }

  function onAppReady(){

    console.log('onAppReady <<< needs destroy' );
     if( typeof lil === "undefined" || lil === null){
            setTimeout(onAppReady, 1000 );
            return;
    }
    
    lil.http.get("add_popup.html?" + version,{
        headers: { "Content-Type": "text" }
    }, function(err, res) {
        if (err) throw new Error("Cannot perform the request: " + err.status);
        if (res.status === 200 || res.status === 0) {
            addPopUpContent = res.data;
            getCalcContent(); 
            createObjectMenu_no();
            createObjectMenu_circ();
            createObjectMenu_line(); 
            createShowObjectMenu_no();
            createShowObjectMenu_circ();
            createShowObjectMenu_line();
            createWorkMenu();      
        }
    });

    tela = new Tela();
    
  };

  var varPopUpContent = null;
  function getCalcContent(){
    lil.http.get("var_popup.html?" + version,{
        headers: { "Content-Type": "text" }
    }, function(err, res) {
        if (err) throw new Error("Cannot perform the request: " + err.status);
        if (res.status === 200 || res.status === 0) {
            varPopUpContent = res.data;
            createMenu();

        }
    });

  }

// MY LOADER

  var varPopWorkMenu = null;
  function createWorkMenu(){
    lil.http.get("work_menu.html?" + version,{
        headers: { "Content-Type": "text" }
    }, function(err, res) {
        if (err) throw new Error("Cannot perform the request: " + err.status);
        if (res.status === 200 || res.status === 0) {
            varPopWorkMenu = res.data;
        }
    });
  }

  var varPopObjectMenu = null;
  function createObjectMenu_no(){
    lil.http.get("menu_type.html?" + version,{
        headers: { "Content-Type": "text" }
    }, function(err, res) {
        if (err) throw new Error("Cannot perform the request: " + err.status);
        if (res.status === 200 || res.status === 0) {
            varPopObjectMenu = res.data;
        }
    });
  }

  var varPopObjectMenuCirc = null;
  function createObjectMenu_circ(){
    lil.http.get("menu_type_circ.html?" + version,{
        headers: { "Content-Type": "text" }
    }, function(err, res) {
        if (err) throw new Error("Cannot perform the request: " + err.status);
        if (res.status === 200 || res.status === 0) {
            varPopObjectMenuCirc = res.data;
        }
    });
  }

  var varPopObjectMenuLine = null;
  function createObjectMenu_line(){
    lil.http.get("menu_type_line.html?" + version,{
        headers: { "Content-Type": "text" }
    }, function(err, res) {
        if (err) throw new Error("Cannot perform the request: " + err.status);
        if (res.status === 200 || res.status === 0) {
            varPopObjectMenuLine = res.data;
        }
    });
  }
 // for show properties
  var varPopShowObjectMenu = null;
  function createShowObjectMenu_no(){
    lil.http.get("menu_show_type.html?" + version,{
        headers: { "Content-Type": "text" }
    }, function(err, res) {
        if (err) throw new Error("Cannot perform the request: " + err.status);
        if (res.status === 200 || res.status === 0) {
            varPopShowObjectMenu = res.data;
        }
    });
  }

  var varPopShowObjectMenuCirc = null;
  function createShowObjectMenu_circ(){
    lil.http.get("menu_show_type_circ.html?" + version,{
        headers: { "Content-Type": "text" }
    }, function(err, res) {
        if (err) throw new Error("Cannot perform the request: " + err.status);
        if (res.status === 200 || res.status === 0) {
            varPopShowObjectMenuCirc = res.data;
        }
    });
  }

  var varPopShowObjectMenuLine = null;
  function createShowObjectMenu_line(){
    lil.http.get("menu_show_type_line.html?" + version,{
        headers: { "Content-Type": "text" }
    }, function(err, res) {
        if (err) throw new Error("Cannot perform the request: " + err.status);
        if (res.status === 200 || res.status === 0) {
            varPopShowObjectMenuLine = res.data;
        }
    });
  }
  //_-------------------

  function createMenu(){
    lil.http.get("header_menu.html?" + version,{
        headers: { "Content-Type": "text" }
    }, function(err, res) {
        if (err) throw new Error("Cannot perform the request: " + err.status);
        if (res.status === 200 || res.status === 0) {
        document.getElementsByTagName("header")[0].setAttribute("state", "hide");
        setTimeout(showPageSite, 500 ,res.data);
        }
    });
  }


  function showPageSite( data ){
     document.getElementsByTagName("header")[0].innerHTML = "";
     document.getElementsByTagName("header")[0].innerHTML = data;
     document.getElementsByTagName("header")[0].setAttribute("state", "menu");
     
  }

  function webglAvailable() {
    try {
        var canvas = document.createElement("canvas");
        return !!window.WebGLRenderingContext && window.CanvasRenderingContext2D &&
            (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"));
    } catch(e) { 
        return false;
    } 
}


deviceStartUp = function ( _onAppReady, _onSplashReady , _version ) {

var onAppReady = _onAppReady;
var onSplashReady = _onSplashReady;
var version = _version;

var deviceDetector = (function ()
{
    var ua = navigator.userAgent.toLowerCase();
    var detect = (function(s){
            if(s===undefined)s=ua;
            else ua = s.toLowerCase();
                if(/(tv|smartv)/.test(ua))
                            return 'tv';
                else if(/(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(ua))
                        return 'tablet';
                else if(/(mobi|ipod|phone|blackberry|opera mini|fennec|minimo|symbian|psp|nintendo ds|archos|skyfire|puffin|blazer|bolt|gobrowser|iris|maemo|semc|teashark|uzard)/.test(ua))
                            return 'phone';
                else if(/(crawl|googlebot|screenshot)/.test(ua))
                            return 'robo';
                else return 'desktop';
            });
        return{ device:detect(), detect:detect, isMobile:((detect()!='desktop')?true:false), userAgent:ua  };
    }());
    
    var prepare = function(){ // here can change the page for mobile
       var requiresFirst = [ "./vendor/http.js" , 
                                deviceDetector.device == "phone" ?  "./assets/css/phone.css" : "./assets/css/desktop.css" ];

        requiresFirst.forEach(function(valu, inde, arr){
            arr[inde] = valu + "?" + version;
        });

        ljs.load( requiresFirst ,function(p){
            //onAppReady(getClientData());
            onSplashReady();
        });
    }

    var loadDependencies = function(){
        var requiresFirst = [ "./vendor/three.js" ];


        requiresFirst.forEach(function(valu, inde, arr){
            arr[inde] = valu + "?" + version;
        });

        ljs.load( requiresFirst ,function(p){
            loadDependencies2();      
        });
    }

    var loadDependencies2=function(){
         var requiresFirst = [ "./vendor/Projector.js",
                                "./vendor/OrbitControls.js",
                                "./view/resize.js",
                                "./view/Tela.js",
                                "./view/Cena3D.js",
                                "./view/Objetos.js",
                                "./view/texto.js",
                                "./view/defines.js",
                                "./controller/controller.js",
                                "./model/fisica.js"
                                 ];


        requiresFirst.forEach(function(valu, inde, arr){
            arr[inde] = valu + "?" + version;
        });

        ljs.load( requiresFirst ,function(p){
            onAppReady(getClientData());      
        });
    }


    var destroy = function(){
        userSelector.destroy();
        
    }
 
    prepare();

    var getClientData = function(){   return { device: deviceDetector.device, isMobile: deviceDetector.isMobile }}
                                                
    return{
        clientData: getClientData,
        loadDependencies: loadDependencies,
        destroy: destroy,
    }
}
deviceStartUp.prototype = {
	constructor: deviceStartUp,
}
//Other libs... see:
//https://github.com/malko/l.js
!function(t,e){var r=function(t,e){return t instanceof(e||Array)},i=document,n="getElementsByTagName",s="length",a="readyState",c="onreadystatechange",l=i[n]("script"),o=l[l[s]-1],u=o.innerHTML.replace(/^\s+|\s+$/g,"");if(!t.ljs){var f=o.src.match(/checkLoaded/)?1:0,h=i[n]("head")[0]||i.documentElement,d=function(t){var e={};return e.u=t.replace(/#(=)?([^#]*)?/g,function(t,r,i){return e[r?"f":"i"]=i,""}),e},p=function(t,e,r){var n,s=i.createElement(t);r&&(s[a]?s[c]=function(){("loaded"===s[a]||"complete"===s[a])&&(s[c]=null,r())}:s.onload=r);for(n in e)e[n]&&(s[n]=e[n]);h.appendChild(s)},v=function(t,e){if(this.aliases&&this.aliases[t]){var i=this.aliases[t].slice(0);return r(i)||(i=[i]),e&&i.push(e),this.load.apply(this,i)}if(r(t)){for(var n=t[s];n--;)this.load(t[n]);return e&&t.push(e),this.load.apply(this,t)}return t.match(/\.css\b/)?this.loadcss(t,e):this.loadjs(t,e)},y={},m={aliases:{},loadjs:function(t,r){var i=d(t);return t=i.u,y[t]===!0?(r&&r(),this):y[t]!==e?(r&&(y[t]=function(t,e){return function(){t&&t(),e&&e()}}(y[t],r)),this):(y[t]=function(e){return function(){y[t]=!0,e&&e()}}(r),r=function(){y[t]()},p("script",{type:"text/javascript",src:t,id:i.i,onerror:function(t){if(i.f){var e=t.currentTarget;e.parentNode.removeChild(e),p("script",{type:"text/javascript",src:i.f,id:i.i},r)}}},r),this)},loadcss:function(t,e){var r=d(t);return t=r.u,y[t]||p("link",{type:"text/css",rel:"stylesheet",href:t,id:r.i}),y[t]=!0,e&&e(),this},load:function(){var t=arguments,i=t[s];return 1===i&&r(t[0],Function)?(t[0](),this):(v.call(this,t[0],1>=i?e:function(){m.load.apply(m,[].slice.call(t,1))}),this)},addAliases:function(t){for(var e in t)this.aliases[e]=r(t[e])?t[e].slice(0):t[e];return this}};if(f){var g,j,x,A;for(g=0,j=l[s];j>g;g++)(A=l[g].getAttribute("src"))&&(y[A.replace(/#.*$/,"")]=!0);for(x=i[n]("link"),g=0,j=x[s];j>g;g++)("stylesheet"===x[g].rel||"text/css"===x[g].type)&&(y[x[g].getAttribute("href").replace(/#.*$/,"")]=!0)}t.ljs=m}o.src&&u&&p("script",{innerHTML:u})}(window);
