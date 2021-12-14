import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import  logo from "../../image/betalogo.png";
import "./styles.css";


const Navigation = (props) => {
    const [isLarge, setIsLarge] = useState(true);
    const [isToggler, setIsToggler] = useState("toggler");
    const [isBar1, setBar1] = useState("bar");
    const [isBar2, setBar2] = useState("bar");
    const [isBar3, setBar3] = useState("bar");
    const [isFlexDrop, setFlexDrop] = useState("notFlexDrop");
    const [isNavDrop, setNavDrop] = useState("notNavDrop");
    const myResize = () => {
        setIsLarge(window.matchMedia("(min-width : 600px)").matches);
    }

    const closeNav = () => {
        setBar1("bar");
        setBar2("bar");
        setBar3("bar");
        setFlexDrop("notFlexDrop");
        setNavDrop("notNavDrop");
       
    }

    useEffect(() => {
        window.addEventListener("resize", myResize);
        window.addEventListener("load", myResize);
        return () => {    
            window.removeEventListener("resize", myResize);
            window.removeEventListener("load", myResize);
        }
    }, [])
    
   // trigger the useState on load or resize;
    // window.addEventListener("resize", myResize);
    // window.addEventListener("load", myResize);

    function showNavMenu() {
       isToggler === "toggler" ? setIsToggler("toggler-click") : setIsToggler("toggler");
       isBar1 === "bar" ? setBar1("bar1") : setBar1("bar");
       isBar2 === "bar" ? setBar2("bar2") : setBar2("bar");
       isBar3 === "bar" ? setBar3("bar3") : setBar3("bar");
       isFlexDrop === "notFlexDrop" ? setFlexDrop("flexDrop") : setFlexDrop("notFlexDrop");
       isNavDrop === "notNavDrop" ? setNavDrop("navDrop") : setNavDrop("notNavDrop");
     }
    

     

    return (
        <div className="navigation">
            {
              isLarge ? 
              <nav>
               <div className="nav-container">
                   <Link className="logo" to="/">
                      <img src={logo} alt="Blue Force" /> 
                   </Link>

                   <div>
                       <ul className="flexBox">
                           <li className={`nav-item ${
                                 props.location?.pathname === "/" ? "nav-active" : "" 
                           }` }>
                               <Link className="nav-link" to="/">
                                   Home
                               </Link>
                           </li>
                           <li className={`nav-item ${
                               props.location?.pathname  === "/about" ? "nav-active" : ""
                           }`}>
                               <Link className="nav-link" to="/admin/login">
                                   Admin Login
                               </Link>

                           </li>
                       </ul>
                   </div>
               </div>
            </nav>  : 
                <div>
                    <div  className={isToggler} onClick={showNavMenu}>
                        <div className={isBar1}></div>
                        <div className={isBar2}></div>
                        <div className={isBar3}></div>
                    </div>
                    <div>
                    <div className={isNavDrop}>
                        <div className="nav-drop-wrap">
                            <Link className="logo" to="/" onClick={closeNav }>
                                <img src={logo} alt="Blue Force" /> 
                            </Link>

                            <div>
                                <ul className={isFlexDrop}>
                                    <li className={`nav-item ${
                                      props.location?.pathname === "/" ? "nav-active" : ""  }`} onClick={closeNav }>
                                        <Link className="nav-link" to="/">
                                            Home
                                        </Link>
                                    </li>
                                    <li className={`nav-item ${
                                      props.location?.pathname === "/about" ? "nav-active" : ""  }`} onClick={closeNav }>
                                        <Link className="nav-link" to="/admin/login">
                                            Admin Login
                                        </Link>

                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
      
            }
        </div>
    )
}


export default Navigation;