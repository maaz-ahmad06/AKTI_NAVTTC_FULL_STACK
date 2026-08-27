import './Header.css'
import image from '../assets/image.png'

const Header = () => {
  return (
    <div>
      <nav className='navbar'>
        <div className='logo'>
          <img src={image} alt="" />
          <h1>Shop<span>Ease</span></h1>
        </div>
        <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Categories</li>
            <li>About</li>
            <li>Contact</li>
        </ul>
        <div className='search'>
          <i className="fa-solid fa-magnifying-glass"></i>
          <i className="fa-regular fa-user"></i>
          <i className="fa-solid fa-cart-shopping"></i>
        </div>
      </nav>
    </div>
  )
}

export default Header
