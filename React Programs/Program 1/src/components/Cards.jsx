import './Cards.css'

const Cards = (props) => {
  return (
    <div>
      <div className="card">
        <img src={props.imageUrl} alt="" />
        <h2>{props.title}</h2>
        <p>{props.description}</p>
        <div className='rating'>
          <span className='yellow'>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          <i className="fa-solid fa-star"></i>
          </span>
          <span className='white'>
          <i className="fa-solid fa-star"></i>
          </span>
          ({props.rating})
        </div>
        <p id='rate'>{props.price}</p>
        <button><i className="fa-solid fa-cart-shopping"></i> Add to Cart</button>
      </div>
    </div>
  )
}

export default Cards
