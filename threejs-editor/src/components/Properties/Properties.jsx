import { useEffect, useState } from "react";
import { useThreeStore } from "../../store";
import Info from "./info";
import { Tree, Segmented } from "antd";

function Properties() {
  const { data, selectedObj, scene, setSelectedObjName } = useThreeStore();
  const [treeData, setTreeData] = useState();
  useEffect(() => {
    if (scene?.children) {
      const tree = scene.children.map(item => {
        if (item.isTransformControlsRoot) {
          return null;
        }
        return {
          title: item.isMesh ? item.geometry.type : item.type,
          key: item.type + item.name + item.id,
          name: item.name,
        }
      }).filter(item => item !== null);;

      setTreeData([
        {
          title: 'Scene',
          key: 'root',
          children: tree
        }
      ]);
    }
  }, [scene])



  function handleSelect(selectKeys, info) {
    const name = info.node.name;

    setSelectedObjName(name);
  }

  const [key, setKey] = useState('属性');

  return <div className="Properties">
    <Segmented
      value={key}
      options={['属性', 'json']}
      block
      onChange={setKey}>

    </Segmented>
    {
      key === '属性' ? <div>
        <Tree treeData={treeData} expandedKeys={['root']} onSelect={handleSelect} />
        <Info />
      </div> : null
    }
    {key === 'json' ?
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre> : null
    }
  </div>
}

export default Properties;
