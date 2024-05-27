import { Link, Route, Routes } from "react-router-dom";
import Home from "../../pages/home";
import About from "../../pages/about";
import Contact from "../../pages/contacts";
import "./style.css";

const Header = ()=>{

    return(
        <div className="">
           <header>
                <nav>
                    <ul>
                      <div className="pai-header">
                        <div><li><Link to="/">Home</Link></li></div>
                        <div><li><Link to="/about">Sobre</Link></li></div>
                        <div><li><Link to="/contact">Contato</Link></li></div>
                      </div>
                    </ul>
                </nav>
           </header>
           <Routes>
                <Route index element={<Home />} />
                <Route path="about" element={<About />}  />
                <Route  path="contact" element={<Contact />} /> 
            </Routes>
        </div>
    )
}

export default Header;