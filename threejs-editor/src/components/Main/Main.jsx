
import { useEffect } from "react"
import { init } from "./init"
function Main() { 
  useEffect(() => {
    const dom = document.getElementById('threejs-container')
    const { scene } = init(dom);
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
