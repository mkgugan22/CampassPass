import React from 'react'
import {Button,Col,Row,Image} from 'react-bootstrap'
import '../Components/Home.css'
import clg from '../assets/kcelogo.png'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <>
    <div className='background-container'>
        <Row>
         
          <Col className='col-12 text-center'><Image src={clg} alt="Description" fluid className='img'/></Col>   
        </Row>
        <Row className='m-3 mt-5'>
     
          <Col className='col-12 text-center '> <Link to='/StudentL'><Button variant="outline-primary" className='buton'>STUDENT</Button></Link></Col>   
        </Row>
        <Row className='m-3' >
       
          <Col className='col-12 text-center'> <Link to='/TutorL'><Button variant="outline-primary" className='buton'>CLASS TUTOR</Button></Link></Col>   
        </Row>
        <Row className='m-3'>
      
          <Col className='col-12 text-center'> <Link to='/HodL'><Button variant="outline-primary" className='buton'>HEAD OF THE DEPARTMENT</Button></Link></Col>   
        </Row>
        <Row className='m-3'>
   
          <Col className='col-12 text-center'> <Link to='/WadernL'><Button variant="outline-primary" className='buton'>HOSTEL WADERN</Button></Link></Col>   
        </Row>
      

    </div>
    </>
  )
}
