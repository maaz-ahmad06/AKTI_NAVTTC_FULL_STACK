import { useEffect } from "react";
import { useNavigate } from "react-router-dom"


const Button = () => {

    const navigate = useNavigate();
    function contact(){
        navigate("/contact")
    }

    useEffect(() => {
      console.log("Effect Running");
    })

  return (
    <div>
      <button onClick={contact}>Contact Us</button>
    </div>
  )
}

export default Button
