import React, { useState ,useEffect} from 'react';
import {Image,Col,Row} from 'react-bootstrap';
import clg from '../assets/kcelogo.webp';
import { FaUserCircle } from 'react-icons/fa';
import { Badge,Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';
import './StudentL.css';
import axios from 'axios';
import Navbar from 'react-bootstrap/Navbar';


function HodL() {
  const nav = useNavigate();
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [emailId, setStaffEmailId] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const formatDate = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  const handleChangeStaffId =(e)=>{
    setStaffEmailId(e.target.value);
  }

  const handleChangePassword=(e)=>{
    setPassword(e.target.value);
  }

  const handleSubmit= async(e)=>{
      e.preventDefault();
  
      console.log("Email ID:", emailId);
      console.log("Password:", password);
  
      try {
          const response = await axios.post('http://localhost:3030/HodLogin', {
              emailId: emailId,
              password: password
          });
          console.log(response.data);
          nav("/HodH");
          // Clear the input fields after successful submission
          setStaffEmailId('');
          setPassword('');
      } catch (err) {
          console.log('Error in posting Tutor details', err);
          // Handle error, show error message to the user, etc.
      }
  }

  return (
    <>
      <div style={{backgroundColor:'light-grey' ,height:'100vh'}}>
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home"><Image src={clg} alt="Description" fluid className='img' style={{height:'80px'}}/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Badge  bg="secondary"> {formatDate(currentDateTime)}, {currentDateTime.toLocaleTimeString()}</Badge>
          </Container>
        </Navbar>
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '75vh' }}>
        <div  style={{ maxWidth: '400px', width: '100%',border:'1px solid lightgrey',borderTop:'35px solid #ff8830'}}>
            <Row className='mt-3'>
              <Col className='col-12 text-center'>   <FaUserCircle size={50} /> </Col>
            </Row>
            <form onSubmit={handleSubmit} className="">
              <Row className='mt-3'>
                <Col className='col-5 text-end'> <label>EmailId:</label></Col>
                <Col className='col-6 text-start'> <input
                    type="email"
                    value={emailId}
                    onChange={handleChangeStaffId}
                    required
                  /></Col>
              </Row>
              <Row className='mt-3'>
                <Col className='col-5 text-end'> <label>Password:</label></Col>
                <Col className='col-6 text-start'> <input
                    type="password"
                    value={password}
                    onChange={handleChangePassword}
                    required
                  /></Col>
              </Row>
              <Row className='mt-3 mb-3'>
                <Col className='col-12 text-center '> <Button type="submit" variant='success' style={{width:'80px'}}>Login</Button></Col>
              </Row>
            </form>
          </div> 
        </Container>
      </div>
    </>
  );
}

export default HodL;