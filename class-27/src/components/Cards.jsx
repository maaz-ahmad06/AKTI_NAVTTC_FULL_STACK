import './Cards.css'
import image from '../assets/image.png'

const Cards = () => {
  return (
    <div>
      <div className="card">
        <img src={image} alt="" />
        <h1>Card Title</h1>
        <p>This is a simple card component.You can use this card to display any content.</p>
        <button>Read More</button>
      </div>
    </div>
  )
}

export default Cards
