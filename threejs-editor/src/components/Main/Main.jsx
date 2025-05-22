
import { useEffect, useRef } from "react"
import { useThreeStore, MeshTypes } from "@/store"
import * as THREE from 'three';
import { init } from './init'

function Main() {
  const { data } = useThreeStore();

  const sceneRef = useRef();

  useEffect(() => {
    const dom = document.getElementById('threejs-container');
    const { scene } = init(dom, data);
    sceneRef.current = scene
    return () => {
      dom.innerHTML = '';
    }
  }, []);

  useEffect(() => {
    const scene = sceneRef.current;

    data.meshArr.forEach(item => {
      if (item.type === MeshTypes.Box) {
        const { width, height, depth, material: { color }, position } = item.props;
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


  return (
    <div className='main' id="threejs-container">
    </div>
  )
}
export default Main
