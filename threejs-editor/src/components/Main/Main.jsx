
import { useEffect, useRef } from "react"
import { useThreeStore, MeshTypes, } from "@/store"
import * as THREE from 'three';
import { init } from './init'

import { FloatButton } from "antd";
import { ArrowsAltOutlined, DragOutlined, RetweetOutlined } from "@ant-design/icons";


function Main() {
  const {
    data,
    setScene,
    setSelectedObj,
    selectedObjName,
    selectedObj,
    removeMesh,
    updateMeshInfo
  } = useThreeStore();

  const sceneRef = useRef();

  const transformControlsModeRef = useRef();
  const transformControlsAttachObjRef = useRef();


  function onSelected(obj) {
    setSelectedObj(obj)
  }

  useEffect(() => {
    const dom = document.getElementById('threejs-container');
    const {
      scene,
      setTransformControlsMode,
      transformControlsAttachObj

    }
      = init(dom, data, onSelected, updateMeshInfo);
    sceneRef.current = scene
    transformControlsModeRef.current = setTransformControlsMode;
    transformControlsAttachObjRef.current = transformControlsAttachObj;

    setScene(scene);
    // 清理函数，组件卸载时调用
    return () => {
      dom.innerHTML = '';
    }
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;

    data.meshArr.forEach(item => {
      if (item.type === MeshTypes.Box) {
        const { width,
          height, depth,
          material: { color },
          position,
          scale,
          rotation
        } = item.props;
        let mesh = scene.getObjectByName(item.name);

        if (!mesh) {
          const geometry = new THREE.BoxGeometry(width, height, depth);
          const material = new THREE.MeshPhongMaterial({
            color
          });
          mesh = new THREE.Mesh(geometry, material);
        }

        mesh.name = item.name;
        mesh.position.copy(position)
        mesh.scale.copy(scale)
        mesh.rotation.x = rotation.x;
        mesh.rotation.y = rotation.y;
        mesh.rotation.z = rotation.z;

        scene.add(mesh);
      } else if (item.type === MeshTypes.Cylinder) {
        const { radiusTop, radiusBottom, height, material: { color }, position } = item.props;
        let mesh = scene.getObjectByName(item.name);

        if (!mesh) {
          const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, height);
          const material = new THREE.MeshPhongMaterial({
            color
          });
          mesh = new THREE.Mesh(geometry, material);
        }
        mesh.name = item.name;
        mesh.position.copy(position)
        scene.add(mesh);
      }
    })

    // react 会浅层对比 scene 有没有变化，这里 clone 一下来触发更新
    setScene(scene.clone()); // 更新场景引用
  }, [data]);

  useEffect(() => {
    if (selectedObjName) {
      const obj = sceneRef.current.getObjectByName(selectedObjName);
      setSelectedObj(obj);
      transformControlsAttachObjRef.current(obj);
    }
  }, [selectedObjName])

  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === 'Backspace') {
        transformControlsAttachObjRef.current(null); // 解除绑定
        sceneRef.current.remove(selectedObj);
        removeMesh(selectedObj.name);
      }
    }
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    }
  }, [selectedObj]);

  function setMode(mode) {
    transformControlsModeRef.current(mode);
  };


  return (
    <div className="main">
      <div id="threejs-container">
      </div>
      <FloatButton.Group className="btn-group">
        <FloatButton icon={<DragOutlined />} onClick={() => setMode('translate')} />
        <FloatButton icon={<RetweetOutlined />} onClick={() => setMode('rotate')} />
        <FloatButton icon={<ArrowsAltOutlined />} onClick={() => setMode('scale')} />
      </FloatButton.Group>
    </div>



  )
}
export default Main
