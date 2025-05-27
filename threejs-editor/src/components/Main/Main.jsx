
import { useEffect, useRef } from "react"
import { useThreeStore, MeshTypes, } from "@/store"
import * as THREE from 'three';
import { init } from './init'

import { FloatButton } from "antd";
import { ArrowsAltOutlined, DragOutlined, RetweetOutlined } from "@ant-design/icons";


function Main() {
  const {
    data,
    setSelectedObj,
    selectedObj,
    removeMesh,
    updateMeshInfo
  } = useThreeStore();

  const sceneRef = useRef();

  const transformControlsModeRef = useRef();


  function onSelected(obj) {
    setSelectedObj(obj)
  }

  useEffect(() => {
    const dom = document.getElementById('threejs-container');
    const { scene, setTransformControlsMode }
      = init(dom, data, onSelected, updateMeshInfo);
    sceneRef.current = scene
    transformControlsModeRef.current = setTransformControlsMode;
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
  }, [data]);

  useEffect(() => {
    function handleKeydown(e) {
      if (e.key === 'Backspace') {
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
