import './Header.css'
import searchIcon from '../assets/search-icon.jpg'

const Header = () => {
  return (
    <div>
      <nav className='navbar'>
        <div className='logo'>
          <img src="https://media.istockphoto.com/id/2211908155/photo/isolated-graduation-cap-with-tassel-educational-achievement.webp?a=1&b=1&s=612x612&w=0&k=20&c=WrbmsifS9DiLRDdeSfsnHPiSSHauJqkKzjgpi1eRriQ=" alt="" />
          <h1>Edu<span>Zone</span></h1>
        </div>
        <ul>
            <li>Home</li>
            <li>Courses</li>
            <li>About</li>
            <li>Services</li>
            <li>Contact</li>
        </ul>
        <div className='search'>
          <img src={searchIcon} alt="" />
          <button>Get Started</button>
        </div>
      </nav>
    </div>
  )
}

export default Header
