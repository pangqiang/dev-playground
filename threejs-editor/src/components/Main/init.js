import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import { MeshTypes } from '@/store'

export function init(dom, data) {
    const scene = new THREE.Scene();

    const axesHelper = new THREE.AxesHelper(500);
    scene.add(axesHelper);


    /**
     * A helper grid used for scene visualization.
     *
     * This grid is constructed using THREE.GridHelper and is initialized with:
     * - Size: 1000, indicating the overall scale of the grid.
     * - Divisions: 20, specifying the number of subdivisions within the grid.
     *
     * 在three.js场景中，此网格辅助对象用于提供直观的参考网格。
     *
     * @constant {THREE.GridHelper} gridHelper - Instance of the grid helper.
     */

    const gridHelper = new THREE.GridHelper(1000, 20);
    scene.add(gridHelper);

    // render 
    data.meshArr.forEach(item => {
        if (item.type === MeshTypes.Box) {
            const { width, height, depth, material: { color } } = item.props;
            const geometry = new THREE.BoxGeometry(width, height, depth);
            const material = new THREE.MeshPhongMaterial({
                color
            });
            const mesh = new THREE.Mesh(geometry, material);
            scene.add(mesh);
        }
    })



    const directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(500, 400, 300);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    const width = 1000;
    const height = window.innerHeight - 60;

    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 10000);
    camera.position.set(500, 500, 500);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(width, height);


    function render(time) {
        renderer.render(scene, camera);
        requestAnimationFrame(render);
    }

    render();

    dom.append(renderer.domElement);

    window.onresize = function () {
        const width = 1000;
        const height = window.innerHeight - 60;

        renderer.setSize(width, height);

        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };

    const controls = new OrbitControls(camera, renderer.domElement);

    return {
        scene
    }
}
