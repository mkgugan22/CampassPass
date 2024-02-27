import React, { useState,useEffect } from 'react';
import { Image, Col, Row } from 'react-bootstrap';
import clg from '../assets/kcelogo.webp';
import { FaUserCircle } from 'react-icons/fa';
import { Badge,Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import {  useNavigate } from 'react-router-dom';
import './StudentL.css';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
// import { Link } from 'react-router-dom';
function StudentL() {
  const nav = useNavigate();
    const [rollno, setRollNo] = useState('');
    const [password, setPassword] = useState('');
    const [currentDateTime, setCurrentDateTime] = useState(new Date());

     
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


    const handleChangeRollNo = (e) => {
        setRollNo(e.target.value);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    };
    
     const check = (e)=>{
        e.preventDefault();
        nav("/checkStatus" , {state:{rollno,password}});
     }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
          console.log(rollno+" "+password);
            const response = await axios.post('http://localhost:3030/StudentsLogin', {
                rollno: rollno,
                password: password
            });
         nav("/StudentH");
            console.log(response.data); // Assuming the response contains some data you want to log

            // Clear the input fields after successful submission
            setRollNo('');
            setPassword('');
        } catch (err) {
            console.log('Error in posting Student details', err);
            // Handle error, show error message to the user, etc.
        }
    };

    return (
        <div style={{ backgroundColor: 'light-grey', height: '100vh' }}>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image src={clg} alt="Description" fluid className="img" style={{ height: '80px' }} />
                    </Navbar.Brand>
                    <Badge  bg="secondary"> {formatDate(currentDateTime)}, {currentDateTime.toLocaleTimeString()}</Badge> {/* Here you might need to replace Date & Time with your dynamic date and time */}
                </Container>
            </Navbar>
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '75vh' }}>
            <div  style={{ maxWidth: '400px', width: '100%',border:'1px solid lightgrey',borderTop:'35px solid #ff8830'}}>
                    <Row className='mt-3'>
                        <Col className="col-12 text-center">
                            <FaUserCircle size={50} />
                        </Col>
                    </Row>

                    <form onSubmit={handleSubmit} className="">
                        <Row className="mt-3">
                            <Col className="col-5 text-end">
                                <label>RollNo:</label>
                            </Col>
                            <Col className="col-6 text-start">
                                <input type="text" value={rollno} onChange={handleChangeRollNo} required />
                            </Col>
                        </Row>
                        <Row className="mt-3">
                            <Col className="col-5 text-end">
                                <label>Password:</label>
                            </Col>
                            <Col className="col-6 text-start">
                                <input type="password" value={password} onChange={handleChangePassword} required />
                            </Col>
                        </Row>
                        <Row className="mt-4 mb-5">
                            <Col className="col-12 text-center ">
                                
                                <Button type="submit" variant='primary' className='me-5'  onClick={check}>Check Status</Button>
                                <Button variant='success'type='submit' >Apply Leave</Button>
                            </Col>
                        </Row>
                       
                       
      

                    </form>
                </div>
            </Container>
        </div>
    );
}

export default StudentL;