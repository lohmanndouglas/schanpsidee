// ** Define a classe principal Tela ** //
var Tela = function() {
  this.cena3D = new Cena3D(document.getElementsByTagName("main")[0]);
};

var menuNumbers = null;


 /*!
 * 
 * This method is called when click in object in main scene 
 * is push
 *
 */

function addObjectPopUp() {
  callPopUp(addPopUpContent);

  setTimeout(function() {
    var buttons = document.querySelectorAll(".grid_iten.col_objetos");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("mousedown", imgSelect);
      buttons[i].setAttribute("selected", false);
    }
    buttons = document.querySelectorAll(".btn_close")[0];
    buttons.addEventListener("mousedown", closePopUp);

    buttons = document.querySelectorAll(".btn_add")[0];
    buttons.addEventListener("mousedown", addObjetct);
    buttons.setAttribute("state", "disable");

    // menuNumbers = document.getElementById("scene_nums");


    // setNumbersInMenu(document.getElementById("scene_nums"), 0);
    // setNumbersInMenu(document.getElementById("scene_nums"), 10);
  }, 400);
}

 /*!
 * 
 * This method is called when an object add button 
 * is push
 *
 */
function addObjetct() {
  console.log("add object" + menuSelected);
  //closePopUp();
  var type = menuSelected.getAttribute("object_type");
  if (!type) return;
  var nums = getNumbersFromMenu(document.getElementById("scene_nums"));

  insertObject(nums, type);
}


 /*!
 * This method change the configuration of dynamic 
 * popup add objects
 *
 */
var menuSelected = null;
function imgSelect() {
  var buttons = document.querySelectorAll(".grid_iten.col_objetos");
  for (var i = 0; i < buttons.length; i++)
    buttons[i].classList.remove("active");
  this.classList.add("active");
  menuSelected = this;
  var selecteds = this.getAttribute("name");
  var texts = document
    .querySelectorAll(".list_description_popup")[0]
    .getElementsByTagName("p");
  for (i = 0; i < texts.length; i++) {
    if (texts[i].getAttribute("name") == selecteds) {
      texts[i].setAttribute("state", "show");
        var isPopupWork = document.getElementById('menu_demo_var');
        if (isPopupWork) isPopupWork.innerHTML = "";
      switch (selecteds) {
        case "dcharge":
          document.getElementById("menu_demo").innerHTML = varPopObjectMenu;
          setNumbersInMenu(document.getElementById("scene_nums"), 0);
          menuNumbers = document.getElementById("scene_nums");
        break;
        case "dot":
          document.getElementById("menu_demo").innerHTML = varPopObjectMenu;
          setNumbersInMenu(document.getElementById("scene_nums"), 1);
          menuNumbers = document.getElementById("scene_nums");
        break;
        case "ring":
          document.getElementById("menu_demo").innerHTML = varPopObjectMenuCirc;
          setNumbersInMenu(document.getElementById("scene_nums"), 2);
          menuNumbers = document.getElementById("scene_nums");
        break;
        case "line":
          document.getElementById("menu_demo").innerHTML = varPopObjectMenuLine;
          setNumbersInMenu(document.getElementById("scene_nums"), 3);
          menuNumbers = document.getElementById("scene_nums");
        break;
        case "disc":
          document.getElementById("menu_demo").innerHTML = varPopObjectMenuCirc;
          setNumbersInMenu(document.getElementById("scene_nums"), 4);
          menuNumbers = document.getElementById("scene_nums");
        break;
        case "work":
          document.getElementById("menu_demo_var").innerHTML = varPopWorkMenu;
          setNumbersInJobMenu();
        break;
      }
    } else {
      texts[i].setAttribute("state", "hide");
      // document.getElementById('popupCena').setAttribute("state","hide");
    }
  }
  document.querySelectorAll(".btn_add")[0].setAttribute("state", "enable");
}


 /*!
 * This method set the dynamic 
 * popup of dots on work window
 *
 */
function setNumbersInJobMenu() {
  var pts = tela.cena3D.listPontosView();
  // alert("pts: "+pts);
  for (var i = 0; i < pts.length; i++) { // for each dot 
    initialSelect = document.getElementById('sleI');
    finalSelect = document.getElementById('sleF');
    initialSelect.options[initialSelect.options.length] = new Option("P"+i, i);
    finalSelect.options[finalSelect.options.length] = new Option("P"+i, i);    
  }
}


function calcPopUp() {
  callPopUp(varPopUpContent);
  setTimeout(function() {
    var buttons = document.querySelectorAll(".grid_iten.col_objetos");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("mousedown", imgSelect);
      buttons[i].setAttribute("selected", false);
    }

    buttons = document.querySelectorAll(".btn_close")[0];
    buttons.addEventListener("mousedown", closePopUp);

    buttons = document.querySelectorAll(".btn_add")[0];
    buttons.addEventListener("mousedown", calcObjetct);
    buttons.setAttribute("state", "disable");
  }, 400);
}

function calcObjetct() {
  console.log("calcObjetct" + menuSelected);
  var type = menuSelected.getAttribute("object_type");
    switch (type) {
      case "field":
        calcField();
      break;
      case "force":
        calcForce();
      break;
      case "potential":
        calcPot();
      break;
      case "work":
        var pi = document.getElementById('sleI').value;
        var pf = document.getElementById('sleF').value;
        calcJob(pi, pf);
      break;
    }
}

var popUpDialog = null;
function callPopUp(value) {

  var isPopupCena = document.getElementById('popupCena');
  if (isPopupCena) isPopupCena.setAttribute("state","hide");
  

  if (!popUpDialog) {
    popUpDialog = document.getElementsByClassName("page_block")[0];
  }
  popUpDialog.innerHTML = value;
  popUpDialog.setAttribute("state", "show");

  var menus = document.getElementsByClassName("menu_button");
  for (var i = 0; i < menus.length; i++)
    menus[i].setAttribute("state", "hide");
}

function closePopUp() {
  if (!popUpDialog) {
    popUpDialog = document.getElementsByClassName("page_block")[0];
  }
  menuSelected = null;
  menuNumbers = null;
  popUpDialog.setAttribute("state", "hide");
  setTimeout(function() {
    popUpDialog.innerHTML = "";
  }, 400);
  var menus = document.getElementsByClassName("menu_button");
  for (var i = 0; i < menus.length; i++)
    menus[i].setAttribute("state", "show");
}

function getNumbersFromMenu(div) {
  //menuNumbers
  //scene_nums
  var iten = div.getElementsByClassName("sliders");
  var object = {};
  for (var i = 0; i < iten.length; i++) {
    object[iten[i].getAttribute("data")] = iten[i].getElementsByTagName(
      "input"
    )[0].value;
  }
  return object;
}

function setNumbersInMenu(div, value) {
  var iten = div.getElementsByClassName("sliders");
  for (var i = 0; i < iten.length; i++)
    iten[i].getElementsByTagName("input")[0].value = value;
}


 /*!
 * This method insert an object in scene 
 *  called by addObjetct()
 *
 * \param nums, a vector of object params
 * \param type, the type of an object defined in hmtl
 */
function insertObject(nums, type) {
  console.log(nums + "   " + type);
  switch (type) {
    case "dcharge":
      obj = new ChargeView(0.05, nums.cg, nums.px, nums.py, nums.pz);
      tela.cena3D.addDot(obj);
    break;
    case "dot":
      obj = new DotView(0.1, nums.cg, nums.px, nums.py, nums.pz);
      tela.cena3D.addObject(obj);
    break;
    case "ring":
      obj = new RingView(4, nums.cg, nums.px, nums.py, nums.pz, nums.rx, nums.ry, nums.rz); // change raio atribut
      tela.cena3D.addObject(obj); 
    break;
    case "line":
      obj = new LineView(4, nums.cg, nums.px, nums.py, nums.pz, nums.rx, nums.ry, nums.rz);
      tela.cena3D.addObject(obj); 
    break;
    case "disc":
      obj = new DiscView(4, nums.cg, nums.px, nums.py, nums.pz, nums.rx, nums.ry, nums.rz);
      tela.cena3D.addObject(obj); 
    break;
  }
  tela.cena3D.removeVetorView();
  //tela1.cena3D.atualizaLabels();
  tela.cena3D.setRenderState(true);
  return;
}

/** Functions related settings configuration*/
function show_set_configuration() {
  document.getElementById("popupConfiguration").style.display = "block";
  document.getElementById("divTrans").style.display = "block";
  // var div = document.getElementById('popupCena');
  document.getElementById("popupConfiguration").style.position = "absolute";
  document.getElementById("popupConfiguration").style.left = "50%";
  document.getElementById("popupConfiguration").style.top = "20%";
}

function _close_set_configuration() {
  document.getElementById("popupConfiguration").style.display = "none";
  document.getElementById("divTrans").style.display = "none";
}

function _save_new_configuration() {
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
  _close_set_configuration();
  tela.cena3D.atualizaLabels();
  tela.cena3D.drawPlanes_xOy();
  tela.cena3D.drawPlanes_yOz();
  tela.cena3D.drawPlanes_xOz();
  tela.cena3D.drawAxes();
}
//end settings configurations