function initStats() {

    var stats = new Stats();

    stats.setMode(0); // 0: fps, 1: ms

    // Align top-left
    stats.domElement.style.position = 'fixed';
    stats.domElement.style.top = '0px';
    stats.domElement.style.right = '2px';
    stats.domElement.style.opacity = '0.8';
    document.getElementById("Stats-output").appendChild(stats.domElement);

    return stats;
}