import { RotateLeftOutlined } from "@ant-design/icons";
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
      },
      scale: {
        x: 1,
        y: 1,
        z: 1
      },
      rotation: {
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
      },
      scale: {
        x: 1,
        y: 1,
        z: 1
      },
      rotation: {
        x: 0,
        y: 0,
        z: 0
      }
    }
  }
}


const useThreeStore = create((set) => {
  return {
    data: {
      meshArr: []
    },
    selectedObj: null, // 记录选中的物体
    setSelectedObj(obj) {
      set({ selectedObj: obj })
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
    },
    updateMeshInfo(name, info, type) {
      set(state => {
        return {
          data: {
            ...state.data,
            meshArr: state.data.meshArr.map(mesh => {
              if (mesh.name === name) {
                if (type === 'position') {
                  mesh.props.position = info;
                } else if (type === 'scale') {
                  mesh.props.scale = info;
                } else if (type === 'rotation') {
                  mesh.props.rotation = {
                    x: info.x,
                    y: info.y,
                    z: info.z
                  }
                }
              }
              return mesh;
            })
          }
        }
      })
    },
    removeMesh(name) {
      set(state => {
        return {
          data: {
            ...state.data,
            meshArr: state.data.meshArr.filter(item => item.name !== name)
          }
        }
      })
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
  MeshTypes,
}
