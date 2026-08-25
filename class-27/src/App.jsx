import './App.css'
import Header from './components/Header'
import Cards from './components/Cards'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
      <Header/>
      <div className='cards'>
        <Cards/>
        <Cards/>
        <Cards/>
        <Cards/>
      </div>
      <Footer/>
    </div>
  )
}

export default App
