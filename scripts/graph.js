
// setup

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, 300 / 300, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();

var geometry = new THREE.BoxGeometry(2,2,2);
var material = new THREE.MeshLambertMaterial({color: 0x9AE4CA});
var cube = new THREE.Mesh(geometry, material);
var ambientLight = new THREE.AmbientLight(0xFFFFFF, 1.0)

function init(){
  renderer.setSize(300, 300);
  camera.position.z = 5;
  document.querySelector('.fixed-container').appendChild(renderer.domElement);
  scene.add(cube);
  scene.background = new THREE.Color(0x1A1F29);
  scene.add(ambientLight);
}

function render() {
  requestAnimationFrame(render);
  cube.rotation.x += .005;
  cube.rotation.y += .01;
  renderer.render(scene, camera);
}

init();
render();
