import Menu from './components/Menu';
import Main from './components/Main';
import Properties from './components/Properties';
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
