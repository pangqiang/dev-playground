import { create } from "zustand";

// 立方体
function createBox() {
  const newId = Math.random().toString().slice(2, 8);
  return {
    id: newId,
    type: 'Box',
    name: 'Box' + newId,
    props: {
      width: 200,
      height: 200,
      depth: 200,
      material: {
        color: 'orange',
      },
      position: {
        x: 0,
        y: 0,
        z: 0
      }
    }
  }
}

// 圆柱体
function createCylinder() {
  const newId = Math.random().toString().slice(2, 8);
  return {
    id: newId,
    type: 'Cylinder',
    name: 'Cylinder' + newId,
    props: {
      radiusTop: 200,
      radiusBottom: 200,
      height: 300,
      material: {
        color: 'orange',
      },
      position: {
        x: 0,
        y: 0,
        z: 0
      }
    }
  }
}


const useThreeStore = create((set, get) => {
  return {
    data: {
      meshArr: []
    },
    addMesh(type) {
      function addItem(creator) {
        set(state => {
          return {
            data: {
              ...state.data,
              meshArr: [
                ...state.data.meshArr,
                creator()
              ]
            }
          }
        })
      }
      if (type === 'Box') {
        addItem(createBox);
      } else if (type === 'Cylinder') {
        addItem(createCylinder);
      }
    }
  }
});

// 组件类型
const MeshTypes = {
  Box: 'Box', // 立方体
  Cylinder: 'Cylinder' // 圆柱
}

export {
  useThreeStore,
  MeshTypes
}
