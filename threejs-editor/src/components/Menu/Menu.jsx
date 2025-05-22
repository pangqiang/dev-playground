import './Menu.scss'
import { Menu as AntdMenu } from 'antd'
import { useThreeStore } from '@/store'
function Menu() {

  const { addMesh } = useThreeStore();

  const items = [
    {
      label: 'Add',
      key: 'add',
      children: [
        {
          type: 'group',
          label: 'Mesh',
          children: [
            { label: '立方体', key: 'Box' },
            { label: '圆柱', key: 'Cylinder' },
          ],
        },
        {
          type: 'group',
          label: 'Light',
          children: [
            { label: '点光源', key: 'PointLight' },
            { label: '平行光', key: 'DirectionalLight' },
          ],
        },
      ],
    }
  ];

  function handleClick(e) {
    addMesh(e.key)
  }
  return (
    <div className='menu'>
      <AntdMenu
        items={items}
        mode="horizontal"
        onClick={handleClick}
      />
    </div>
  )
}
export default Menu
