
import { useEffect } from "react"
import { init } from "./init"
import { useThreeStore } from "@/store"
function Main() {
  const { data, addMesh } = useThreeStore();

  useEffect(() => {
    const dom = document.getElementById('threejs-container')
    const { scene } = init(dom, data);
    return () => {
      dom.innerHTML = '';
    }
  }, [])
  return (
    <div className='main' id="threejs-container">
    </div>
  )
}
export default Main
