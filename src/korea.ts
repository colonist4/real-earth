import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls'
// const displacementFile = require('../resources/displacement.png')
const mapFile = require('../resources/texture.jpg')

const SEA_HEIGHT = 1

async function init(){
    const textureLoader = new THREE.TextureLoader()
    
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 100, 10000) // near를 너무 낮추면 z-fighting 생김.
    camera.position.set( 0, -4000, 2000 );
    camera.lookAt( 0, 0, 0 );

    const control = new TrackballControls(camera, document.body)
    // const control = new FlyControls(camera, document.body)

    const light = new THREE.SpotLight(0xFFFFFF, 1)
    light.position.set(0, 2000, 2000)
    light.target.position.set(0, 0, 0)
    scene.add(light)
    scene.add(light.target)
    scene.add(new THREE.AmbientLight(0xFFFFFF, 0.2))

    // scene.add(camera)
    
    const { width, height, data } = await fetch('/result/elv.json')
    .then((res) => res.json())

    const earthGeometry = new THREE.PlaneGeometry(
        width,
        height,
        width - 1,
        height - 1
    )

    const position = earthGeometry.getAttribute('position')
    for(let i = 0; i < position.count; i++){
        earthGeometry.getAttribute('position').setZ(i, data[i] / 10)
    }

    const material = new THREE.MeshPhongMaterial({
        map: textureLoader.load(mapFile.default),
        wireframe: false
    })
    const mesh = new THREE.Mesh(earthGeometry, material)
    scene.add(mesh)

    const oceanGeometry = new THREE.PlaneGeometry(
        width,
        height
    )

    const oposition = oceanGeometry.getAttribute('position')
    for(let i = 0; i < oposition.count; i++){
        oceanGeometry.getAttribute('position').setZ(i, SEA_HEIGHT / 30 + 0.01) // z-fighting 일부 해결 위해 0.01 더함.
    }

    const oceanMaterial = new THREE.MeshPhongMaterial({
        color: 'rgb(20, 37, 65)'
    })
    const omesh = new THREE.Mesh(oceanGeometry, oceanMaterial)
    scene.add(omesh)

    control.rotateSpeed = 10
    render()
    function render(){
        control.update()
        // control.update(1)

        renderer.render(scene, camera)
        requestAnimationFrame(render)
    }
}

init()