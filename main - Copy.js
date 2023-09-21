import * as THREE from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';


const params = {
  color: 0xffffff,
  transmission: 0,
  opacity: 1,
  metalness: 0,
  roughness: 0,
  ior: 1.5,
  thickness: 0.01,
  specularIntensity: 1,
  specularColor: 0xffffff,
  envMapIntensity: 1,
  lightIntensity: 1,
  exposure: 1
};

let camera, scene, renderer;

			let orb1, orb2, orb3, orb4, orb5;

      const hdrEquirect = new RGBELoader()
      .setPath( './assets/skybox/' )
      .load( 'royal_esplanade_1k.hdr', function () {

        hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;

        init();
        render();

      } );

      function cubecam(){

      }


      function init() {

				renderer = new THREE.WebGLRenderer( { antialias: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				renderer.shadowMap.enabled = true;
				document.body.appendChild( renderer.domElement );

				renderer.toneMapping = THREE.ACESFilmicToneMapping;
				renderer.toneMappingExposure = params.exposure;


				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.set( 0, 0, 12 );

				//

				scene.background = hdrEquirect;

				//Orb 1

				const geometry = new THREE.SphereGeometry( 1, 64, 32 );

				const texture = new THREE.CanvasTexture( generateTexture() );
				texture.magFilter = THREE.NearestFilter;
		
				texture.repeat.set( 1, 0 );

				const material = new THREE.MeshPhysicalMaterial( {
					color: 'red',
					metalness: 1,
					roughness: params.roughness,
					ior: params.ior,
					alphaMap: texture,
					envMap: hdrEquirect,
					envMapIntensity: params.envMapIntensity,
					transmission: params.transmission, // use material.transmission for glass materials
					specularIntensity: params.specularIntensity,
					specularColor: params.specularColor,
					opacity: params.opacity,
					side: THREE.DoubleSide,
					transparent: true
				} );

				orb1 = new THREE.Mesh( geometry, material );
				scene.add( orb1 );

        //Orb 2

      const cubeRenderTarget2 = new THREE.WebGLCubeRenderTarget( 128, { generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );

      // Create cube camera
      const cubeCamera2 = new THREE.CubeCamera( 1, 10000, cubeRenderTarget2 );
      scene.add( cubeCamera2 );

				const geometry2 = new THREE.SphereGeometry( 1, 64, 32 );

				const texture2 = new THREE.CanvasTexture( generateTexture() );
				texture2.magFilter = THREE.NearestFilter;
		
				texture2.repeat.set( 1, 0 );

        //actual orb
				const material2 = new THREE.MeshPhysicalMaterial( {
					color: 'yellow',
					metalness: 1,
					roughness: params.roughness,
					ior: params.ior,
					alphaMap: texture,
					envMap: cubeRenderTarget2.texture,
					envMapIntensity: params.envMapIntensity,
					transmission: params.transmission, // use material.transmission for glass materials
					specularIntensity: params.specularIntensity,
					specularColor: params.specularColor,
					opacity: params.opacity,
					side: THREE.DoubleSide,
					transparent: true
				} );

				orb2 = new THREE.Mesh( geometry2, material2 );
        orb2.position.set(2,2,2);
				scene.add( orb2 );

      // Update the render target cube

cubeCamera2.position.copy( orb2.position );
// Render the scene
orb2.visible = true;



//Orb 3

const cubeRenderTarget3 = new THREE.WebGLCubeRenderTarget( 128, { generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );

// Create cube camera
const cubeCamera3 = new THREE.CubeCamera( 1, 10000, cubeRenderTarget3 );
scene.add( cubeCamera3 );

  const geometry3 = new THREE.SphereGeometry( 1, 64, 32 );

  const texture3 = new THREE.CanvasTexture( generateTexture() );
  texture3.magFilter = THREE.NearestFilter;

  texture3.repeat.set( 1, 0 );

  //actual orb
  const material3 = new THREE.MeshPhysicalMaterial( {
    color: 'transparent',
    metalness: 1,
    roughness: params.roughness,
    ior: params.ior,
    alphaMap: texture,
    envMap: cubeRenderTarget3.texture,
    envMapIntensity: params.envMapIntensity,
    transmission: params.transmission, // use material.transmission for glass materials
    specularIntensity: params.specularIntensity,
    specularColor: params.specularColor,
    opacity: params.opacity,
    side: THREE.DoubleSide,
    transparent: true
  } );

  orb3 = new THREE.Mesh( geometry3, material3 );
  orb3.position.set(-2,-2,2);
  scene.add( orb3 );

// Update the render target cube

cubeCamera3.position.copy( orb3.position );


// Render the scene
orb3.visible = true;


//Orb 4

const cubeRenderTarget4 = new THREE.WebGLCubeRenderTarget( 128, { generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter } );

// Create cube camera
const cubeCamera4 = new THREE.CubeCamera( 1, 10000, cubeRenderTarget4 );
scene.add( cubeCamera4 );

  const geometry4 = new THREE.SphereGeometry( 1, 64, 42 );

  const texture4 = new THREE.CanvasTexture( generateTexture() );
  texture4.magFilter = THREE.NearestFilter;

  texture4.repeat.set( 1, 0 );

  //actual orb
  const material4 = new THREE.MeshPhysicalMaterial( {
    color: 'blue',
    metalness: 1,
    roughness: params.roughness,
    ior: params.ior,
    alphaMap: texture,
    envMap: cubeRenderTarget4.texture,
    envMapIntensity: params.envMapIntensity,
    transmission: params.transmission, // use material.transmission for glass materials
    specularIntensity: params.specularIntensity,
    specularColor: params.specularColor,
    opacity: params.opacity,
    side: THREE.DoubleSide,
    transparent: true
  } );

  orb4 = new THREE.Mesh( geometry4, material4 );
  orb4.position.set(1, 4 ,2);
  scene.add( orb4 );

// Update the render target cube

cubeCamera4.position.copy( orb4.position );




//CUBE CAMERA UPDATES

cubeCamera2.update( renderer, scene );



cubeCamera3.update( renderer, scene );



cubeCamera4.update( renderer, scene );




				//

				const controls = new OrbitControls( camera, renderer.domElement );
				controls.addEventListener( 'change', render ); // use if there is no animation loop
				controls.minDistance = 10;
				controls.maxDistance = 150;

				window.addEventListener( 'resize', onWindowResize );

				//

			}


      function onWindowResize() {

				const width = window.innerWidth;
				const height = window.innerHeight;

				camera.aspect = width / height;
				camera.updateProjectionMatrix();

				renderer.setSize( width, height );

				render();

			}

			//

			function generateTexture() {

				const canvas = document.createElement( 'canvas' );
				canvas.width = 2;
				canvas.height = 2;

				const context = canvas.getContext( '2d' );
				context.fillStyle = 'white';
				context.fillRect( 0, 0, 1.5, 1.5 );

				return canvas;

			}

			function render() {

				renderer.render( scene, camera );

			}

