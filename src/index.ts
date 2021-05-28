import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
// const displacementFile = require('../resources/displacement.png')
const displacementFile = require('../resources/16_bit_dem_large.tif')
const mapFile = require('../resources/map.jpg')

function init(){
    const textureLoader = new THREE.TextureLoader()
    
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 400)
    camera.position.set( -100, 200, -150 );
    camera.lookAt( 0, 0, 0 );

    // const control = new TrackballControls(camera, document.body)
    const control = new FlyControls(camera, document.body)

    const light = new THREE.DirectionalLight(0xFFFFFF, 1)
    light.position.set(-100, 200, -150)
    light.target.position.set(0, 0, 0)
    scene.add(light)
    scene.add(light.target)
    scene.add(new THREE.AmbientLight(0xFFFFFF, 0.2))

    // scene.add(camera)

    const earthGeometry = new THREE.SphereGeometry(100, 2**11, 2**11)
    const material = new THREE.MeshPhongMaterial({
        map: textureLoader.load(mapFile.default),
    })
    material.displacementMap = textureLoader.load(displacementFile.default)
    material.displacementScale = 10

    const mesh = new THREE.Mesh(earthGeometry, material)
    scene.add(mesh)

    render()
    function render(){
        // control.update()
        control.update(1)

        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
}

init()