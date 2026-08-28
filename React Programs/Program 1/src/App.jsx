import './App.css'
import Header from './components/Header'
import Cards from './components/Cards'
import Footer from './components/Footer'

const App = () => {
  return (
    <div>
        <Header/>
        <div className='cards'>
          <Cards imageUrl="https://images.unsplash.com/photo-1641048930621-ab5d225ae5b0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8d2lyZWxlc3MlMjBoZWFkcGhvbmVzfGVufDB8fDB8fHww" title="Wireless Headphones" description="High quality sound with deep bass and noise cancellation." rating={128} price="$59.99"/>

          <Cards imageUrl="https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHNtYXJ0JTIwd2F0Y2h8ZW58MHx8MHx8fDA%3D" title="Smart Watch" description="Track your fitness, heart rate and stay connected on the go." rating={96} price="$89.99"/>

          <Cards imageUrl="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHJ1bm5pbmclMjBzaG9lc3xlbnwwfHwwfHx8MA%3D%3D" title="Running Shoes" description="Lightweight and comfortable shoes for running and daily workouts." rating={75} price="$49.99"/>

          <Cards imageUrl="https://images.unsplash.com/photo-1622560480654-d96214fdc887?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dHJhdmVsJTIwYmFja3BhY2t8ZW58MHx8MHx8fDA%3D" title="Travel Backpack" description="Spacious and durable backpack for travel and daily use." rating={60} price="$39.99"/>
        </div>
        <Footer/>
    </div>
  )
}

export default App
