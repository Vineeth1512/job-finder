import React from 'react'
 import {Navbar , Container , Nav, Button} from "react-bootstrap"
 import "./Navbar.css"
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../../Config/firebaseConfig'
import {signOut} from "firebase/auth"
import { toast } from 'react-toastify'
const Navbarr = () => {
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInRecruiter")) ||JSON.parse(localStorage.getItem("loggedInJobseeker")) ;
  console.log(loggedInUser);

  const handleLogout = async(e)=>{
   
    
    e.preventDefault();
    try{
      await signOut(auth);
      localStorage.removeItem("loggedInRecruiter")
      localStorage.removeItem("loggedInJobseeker")
      toast.success("Logged Out Successfully")
      navigate("/login")

    }catch(err){
      console.log(err);
      toast.error(err.message)
    }

  }
  
  return (
    <>
     <Navbar sticky="top" expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>Job Finder</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
          {loggedInUser?<>
              <Nav.Link >{loggedInUser.user.displayName}</Nav.Link>
                    <Button variant="danger"  onClick={handleLogout}>Logout</Button>

          </>:<>
           <Nav.Link as={Link} to="/signup">SignUP</Nav.Link>
          <Nav.Link as={Link} to="/login">Login</Nav.Link>
          </>}
            
    
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

export default Navbarr