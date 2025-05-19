import Menu from './components/Menu/Menu';
import Main from './components/Main/Main';
import Properties from './components/Properties/Properties';
import './App.scss'
function App() {
  return (
    <>
      <div className='wrap'>
        <Menu />
        <div className='editor'>
          <Main />
          <Properties />
        </div>
      </div>
    </>
  )
}
export default App
