import React from 'react'
// import StudentL from './StudentL'
// import axios from 'axios'
import { useLocation } from 'react-router-dom';
import { Row,Col,Container,Badge,Image ,Button} from 'react-bootstrap';
import clg from '../assets/kcelogo.webp';
import { useState,useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';
const CheckStatus = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
    const location = useLocation();
    console.log(location);
    const { rollno, password } = location.state;
    const [data, setStudentData] = useState([]);
    function handlePrint(){
      window.print();
      return false;
    }
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
   
    useEffect(() => {

        async function fetchData() {
            
          try {
            const response = await axios.get("http://localhost:3030/Students");
            const loginRes = await axios.post("http://localhost:3030/StudentsLogin",{password,rollno});
            console.log(loginRes);

            if(loginRes.data.length === 0)
            {
                console.log("hello");
                alert("Demo");
            }
             else if(loginRes.data.message === "user found"){
            // Filter the data where isTutor is true
            console.log(response.data);
            
            const tutorStudents = response.data.filter(student => student.rollNo === rollno );
console.log(tutorStudents);
            setStudentData(tutorStudents);
          }
        //   else{
        //     console.log("demo");
        //     alert('Msg error');
        //   }
         } catch (error) {
            
            console.error('Error fetching student data:', error);
          }
        }
    
        fetchData();
      }, []);
      
console.log(data);
    // Now you can use rollno and password as needed
    if(data[0] === undefined){
    return (
      
      <div>
         <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image src={clg} alt="Description" fluid className="img" style={{ height: '80px' }} />
                    </Navbar.Brand>
                    <Badge  bg="secondary"> {formatDate(currentDateTime)}, {currentDateTime.toLocaleTimeString()}</Badge>{/* Here you might need to replace Date & Time with your dynamic date and time */}
                </Container>
            </Navbar>
        <Row className='mt-5 mb-4'>
          <Col className='col-12 text-center'><h3>CHECK STATUS</h3></Col>
        </Row>
        <Row>
          <Col className='col-4'></Col>
          <Col> <div style={{border: '1px solid black', padding: '50px',margin:'0',width:'fit-content',backgroundColor:'#FF474C',marginLeft:'100px',boxShadow:'1px 1px 1px 2.5px'}}>
  <h5>Roll Number: {rollno}</h5>
  <h5>Your Request is Denied</h5>
</div></Col>
          <Col className='col-3'></Col>
        </Row>
       

       
  
      </div>
    );
    }
    else if(data[0].isTutor === true && data[0].isHod === true && data[0].isWarden === true) {

        return(
            <div>
               <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image src={clg} alt="Description" fluid className="img" style={{ height: '80px' }} />
                    </Navbar.Brand>
                    <Badge  bg="secondary"> {formatDate(currentDateTime)}, {currentDateTime.toLocaleTimeString()}</Badge>{/* Here you might need to replace Date & Time with your dynamic date and time */}
                </Container>
            </Navbar>
               <Row className='mt-5 mb-4'>
          <Col className='col-12 text-center'><h3>OUT PASS</h3></Col>
        </Row>
     <Row>
     <Col className='col-4'></Col>
  <Col className=''>
  <div style={{border: '1px solid black', padding: '50px',margin:'0',width:'fit-content',backgroundColor:'#90EE90',marginLeft:'95px',boxShadow:'1px 1px 1px 2.5px'}}>
      <table>
        
          {data.map((Student, index) => (
            <tr key={index}>
               <tr>
            <th>NAME:</th>
            <td>{Student.name}</td>
          </tr>
          <tr>
            <th>ROLL NO:</th>
            <td>{Student.rollNo}</td>
          </tr>
          <tr>
            <th>DEPARTMENT:</th>
            <td>   {Student.department}  </td>
          </tr>
          <tr>
            <th>YEAR</th>
            <td>{Student.year}</td>
          </tr>
          <tr>
            <th>ROOM NO:</th>
            <td>{Student.roomNo}</td>
          </tr>
          <tr>
            <th>NO OF DAYS:</th>
            <td>{Student.numberOfDays}</td>
          </tr>
          <tr>
            <th>OUT DATE:</th>
            <td>{Student.outDate}</td>
          </tr>
          <tr>
            <th>IN DATE:</th>
            <td>{Student.inDate}</td>
          </tr>
          <tr>
            <th>REASON:</th>
            <td>{Student.reason}</td>
          </tr>
          <tr>
            <th>PLACE:</th>
            <td>{Student.place}</td>
          </tr>
          <tr>
            <th>STATUS:</th>
            <td>Approved</td>
          </tr>
          
            </tr>
          ))}
        
      </table>
     
    </div>
    <Button style={{marginLeft:'195px',marginTop:'30px',width:'100px'}}onClick={handlePrint}>Print</Button>
  </Col>
</Row>


  
            </div>
        )
    } 
    else if(data[0].isTutor === false){
        return (
          <>
          <div>
          <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image src={clg} alt="Description" fluid className="img" style={{ height: '80px' }} />
                    </Navbar.Brand>
                    <Badge  bg="secondary"> {formatDate(currentDateTime)}, {currentDateTime.toLocaleTimeString()}</Badge> {/* Here you might need to replace Date & Time with your dynamic date and time */}
                </Container>
            </Navbar>
            <Row className='mt-5 mb-5'></Row>
            <Row className='mt-5 mb-5'></Row>
            <Row className='mt-5 mb-5'></Row>
            <Row>
          <Col className='col-4'></Col>
          <Col> <div style={{border: '1px solid black', padding: '50px',margin:'0',width:'fit-content',backgroundColor:'#FFD580',marginLeft:'100px',boxShadow:'1px 1px 1px 2.5px'}}>
  <h5>Roll Number: {rollno}</h5>
  <h5>The Data is Pending With Tutor</h5>
</div></Col>
          <Col className='col-3'></Col>
        </Row>
         

          </div>
          </>
      
        )
    } 
    else if(data[0].isHod === false){
        return (
          <>
          <div>
          <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image src={clg} alt="Description" fluid className="img" style={{ height: '80px' }} />
                    </Navbar.Brand>
                    <Badge  bg="secondary"> {formatDate(currentDateTime)}, {currentDateTime.toLocaleTimeString()}</Badge> {/* Here you might need to replace Date & Time with your dynamic date and time */}
                </Container>
            </Navbar>
            <Row className='mt-5 mb-5'></Row>
            <Row className='mt-5 mb-5'></Row>
            <Row className='mt-5 mb-5'></Row>
            <Row>
          <Col className='col-4'></Col>
          <Col> <div style={{border: '1px solid black', padding: '50px',margin:'0',width:'fit-content',backgroundColor:'#FFD580',marginLeft:'100px',boxShadow:'1px 1px 1px 2.5px'}}>
  <h5>Roll Number: {rollno}</h5>
  <h5>The Data is Pending With HOD</h5>
</div></Col>
          <Col className='col-3'></Col>
        </Row>
         

          </div>
          </>
        )
    } 
    else if(data[0].isWarden === false){
        return (
          <>
          <div>
          <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image src={clg} alt="Description" fluid className="img" style={{ height: '80px' }} />
                    </Navbar.Brand>
                    <Badge  bg="secondary"> {formatDate(currentDateTime)}, {currentDateTime.toLocaleTimeString()}</Badge> {/* Here you might need to replace Date & Time with your dynamic date and time */}
                </Container>
            </Navbar>
            <Row className='mt-5 mb-5'></Row>
            <Row className='mt-5 mb-5'></Row>
            <Row className='mt-5 mb-5'></Row>
            <Row className='mt-5'>
          <Col className='col-4'></Col>
          <Col> <div style={{border: '1px solid black', padding: '50px',margin:'0',width:'fit-content',backgroundColor:'#FFD580',marginLeft:'100px',boxShadow:'1px 1px 1px 2.5px'}}>
  <h5>Roll Number: {rollno}</h5>
  <h5>The Data is Pending With Warden</h5>
</div></Col>
          <Col className='col-3'></Col>
        </Row>
         

          </div>
          </>
        )
    } 
};

export default CheckStatus