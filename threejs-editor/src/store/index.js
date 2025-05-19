import { create } from "zustand";

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

const useThreeStore = create((set, get) => {
  return {
    data: {
      meshArr: [
        {
          id: 1,
          type: 'Box',
          name: 'Box1',
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
      ]
    },
    addMesh(type) {
      if (type === 'Box') {
        set(state => {
          return {
            data: {
              ...state.data,
              meshArr: [
                ...state.data.meshArr,
                createBox()
              ]
            }
          }
        })
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
