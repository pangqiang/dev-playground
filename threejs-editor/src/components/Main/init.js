import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import { EffectComposer, GammaCorrectionShader, OutlinePass, RenderPass, ShaderPass, TransformControls } from 'three/examples/jsm/Addons.js';

export function init(dom, data, onSelected) {
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

    // 增加后期描边效果表示选中
    const composer = new EffectComposer(renderer);

    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);

    const v = new THREE.Vector2(window.innerWidth, window.innerWidth);
    const outlinePass = new OutlinePass(v, scene, camera);
    outlinePass.pulsePeriod = 1;
    composer.addPass(outlinePass);

    // 点击选中物体
    renderer.domElement.addEventListener('click', (e) => {
        const y = -((e.offsetY / height) * 2 - 1);
        const x = (e.offsetX / width) * 2 - 1;

        const rayCaster = new THREE.Raycaster();
        rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

        const intersections = rayCaster.intersectObjects(scene.children);

        if (intersections.length) {
            const obj = intersections[0].object;
            outlinePass.selectedObjects = [obj];

            // 记录选中的物体
            onSelected(obj);
        } else {
            outlinePass.selectedObjects = [];
            onSelected(null);
        }
    });



    function render() {
        composer.render();
        // renderer.render(scene, camera);
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
