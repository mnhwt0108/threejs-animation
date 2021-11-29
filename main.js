import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

const donutText = new THREE.TextureLoader().load('donut.jpg');
const donutNorm = new THREE.TextureLoader().load('donutText.jpg');
const donut = new THREE.Mesh(
  new THREE.TorusGeometry(15, 3.8, 16, 100),
  new THREE.MeshStandardMaterial({
    map: donutText,
    normalMap: donutNorm
  })
)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(donut)

scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper,gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(200).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('bg2.jpg')
scene.background = spaceTexture;

const sphereTexture = new THREE.TextureLoader().load('bg.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg');

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(8,82,82),
  new THREE.MeshStandardMaterial({
    map:sphereTexture,
    normalMap: normalTexture
  })
)

scene.add(sphere)

sphere.position.z = 0;
sphere.position.setX(0);
sphere.rotation.y = -65;

function animate() {
  requestAnimationFrame(animate);

  donut.rotation.x += 0.015;
  donut.rotation.y += 0.005;
  donut.rotation.z += 0.015;

  sphere.rotation.y += 0.015;

  controls.update();
  
  renderer.render(scene, camera);
}

function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  sphere.rotation.x += 0.05;
  sphere.rotation.y += 0.075;
  sphere.rotation.z += 0.05;

  camera.position.z = t * -0.0085;
  camera.position.y = t * -0.005;
  camera.position.x = t * -0.005;

}

document.body.onscroll = moveCamera

animate()
