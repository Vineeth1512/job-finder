import React from 'react'
import { Container,Row ,Button} from "react-bootstrap"
import {Link} from "react-router-dom"
import "./Sidebar.css"
const Sidebar = () => {
  return (
   
    <Container className="sidebar">
      <Row>
       <Link to={'postJob'}><Button>Post Job</Button></Link>
      <Link to={'allPosts'}>  <Button>All Posts</Button></Link>
        
      </Row>
    </Container>
  )
}

export default Sidebar