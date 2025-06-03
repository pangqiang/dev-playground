import * as THREE from 'three';
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import {
    EffectComposer,
    GammaCorrectionShader,
    OutlinePass,
    RenderPass,
    ShaderPass,
    TransformControls
} from 'three/examples/jsm/Addons.js';

export function init(dom, data, onSelected, updateMeshInfo) {
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


    // OrbitControls 用于控制相机的旋转、缩放和平移：
    const orbitControls = new OrbitControls(camera, renderer.domElement);


    // TransformControls 对物体做移动、旋转、缩放：
    const transformControls = new TransformControls(camera, renderer.domElement);
    const transformHelper = transformControls.getHelper();
    scene.add(transformHelper);

    transformControls.addEventListener('change', () => {
        // 变换控件发生变化时触发
        const obj = transformControls.object;
        if (obj) {
            // 更新选中物体的属性
            // updateMeshPosition(obj.name, obj.position)
            if (transformControls.mode === 'translate') {
                updateMeshInfo(obj.name, obj.position, 'position');
            } else if (transformControls.mode === 'scale') {
                updateMeshInfo(obj.name, obj.scale, 'scale');
            } else if (transformControls.mode === 'rotate') {
                updateMeshInfo(obj.name, obj.rotation, 'rotation');
            }
        }
    });

    transformControls.addEventListener('dragging-changed', (e) => {
        // 当拖拽控件被激活时，禁用 OrbitControls
        orbitControls.enabled = !e.value;

    });

    // 点击选中物体
    renderer.domElement.addEventListener('click', (e) => {
        const y = -((e.offsetY / height) * 2 - 1);
        const x = (e.offsetX / width) * 2 - 1;

        const rayCaster = new THREE.Raycaster();
        rayCaster.setFromCamera(new THREE.Vector2(x, y), camera);

        // 找到场景中的有效物体
        const objs = scene.children.filter(item => {
            return item.name.startsWith('Box') || item.name.startsWith('Cylinder')
        })
        const intersections = rayCaster.intersectObjects(objs);

        // const intersections = rayCaster.intersectObjects(scene.children);

        if (intersections.length) {
            const obj = intersections[0].object;
            outlinePass.selectedObjects = [obj];

            // 记录选中的物体
            onSelected(obj);

            // attach 方法将控件绑定到特定对象——在本例中，即 obj 引用的对象。
            transformControls.attach(obj);

        } else {
            outlinePass.selectedObjects = [];
            onSelected(null);

            // 如果没有选中物体，则解除绑定
            transformControls.detach();
        }
    });


    function setTransformControlsMode(mode) {
        // 设置变换控件的模式
        transformControls.setMode(mode);
    }

    function transformControlsAttachObj(obj) {
        transformControls.attach(obj);
    }


    function render(time) {
        composer.render();
        // renderer.render(scene, camera);
        transformControls.update(time);
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


    return {
        scene,
        setTransformControlsMode,
        transformControlsAttachObj
    }
}
