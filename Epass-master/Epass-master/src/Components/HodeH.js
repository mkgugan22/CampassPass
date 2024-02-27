import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Badge ,Row,Col} from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import clg from '../assets/kcelogo.webp';
import { Image,Table,Button} from 'react-bootstrap';
import { ImCancelCircle } from "react-icons/im";
import { TiTick } from "react-icons/ti";
import { toast } from 'react-toastify';
function HodH() {
  const [data, setStudentData] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3030/Students");
        // Filter the data where isTutor is true
        const tutorStudents = response.data.filter(student => student.isTutor === true);
        setStudentData(tutorStudents);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    }

    fetchData();
  }, []);
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


  const approveRequest = async (id) => {
    try {
      const res= await axios.put(`http://localhost:3030/HodUpdate/${id}`, { isHod: true });
      setStudentData(prevData => prevData.filter(student => student._id !== id));
      toast.success(`Approved for ${res.data.name} ${res.data.rollNo}`,{position:"top-center"});
    } catch (error) {
      console.error('Error marking student as handled:', error);
    }
  };

  const rejectRequest = async (id) => {
    try {
      const res = await axios.delete(`http://localhost:3030/Students/${id}`);
      let tempId = res.data._id;
      console.log(tempId);
      const tempData = data.filter((e)=>e._id !== tempId);

      setStudentData(tempData);
      toast.error(`Rejected for ${res.data.name} ${res.data.rollNo}`,{position:"top-center"});
    } catch (error) {
      console.error('Error removing student:', error);
    }
  };

  return (
    <div>
          <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="#home">
                        <Image src={clg} alt="Description" fluid className="img" style={{ height: '80px' }} />
                    </Navbar.Brand>
                    <Badge  bg="secondary"> {formatDate(currentDateTime)}, {currentDateTime.toLocaleTimeString()}</Badge> {/* Here you might need to replace Date & Time with your dynamic date and time */}
                </Container>
            </Navbar>
            <Container>
     <Row className='mt-3 mb-2'>
        <Col className='col-11 text-center'><h5>STUDENT LIST</h5></Col>
     </Row>
     <Row>
        <Col className='col-3'></Col>
      <Table responsive="sm">
      <thead>
          <tr className='bg-warning'>
              <th style={{backgroundColor:'#ff8830'}}>NAME</th>
              <th style={{backgroundColor:'#ff8830'}}>ROLL NO</th>
              <th style={{backgroundColor:'#ff8830'}}>DEPARTMENT</th>
              <th style={{backgroundColor:'#ff8830'}}>YEAR</th>
              <th style={{backgroundColor:'#ff8830'}}>EMAIL</th>
              <th style={{backgroundColor:'#ff8830'}}>NO OF DAYS</th>
              <th style={{backgroundColor:'#ff8830'}}>OUT DATE</th>
              <th style={{backgroundColor:'#ff8830'}}>IN DATE</th>
              <th style={{backgroundColor:'#ff8830'}}>REASON</th>
              <th style={{backgroundColor:'#ff8830'}}>PLACE</th>
              <th style={{backgroundColor:'#ff8830'}} colSpan={2}>STATUS</th>
            </tr>
          </thead>
        <tbody> 
        {data.map((student,index) => (
            <tr key={index}>
             
              <td>{student.name}</td>
              <td>{student.rollNo}</td>
              <td>{student.department}</td>
              <td>{student.year}</td>
              <td>{student.email}</td>
              <td>{student.numberOfDays}</td>
              <td>{student.outDate}</td>
              <td>{student.inDate}</td>
          
              <td>{student.reason}</td>
              <td>{student.place}</td>
              <td>
                                    <Button className='bg-success' onClick={() => approveRequest(student._id)}>
                                        <TiTick /> Approve
                                    </Button>
                                </td>
                                <td>
                                    <Button className='bg-danger' onClick={() => rejectRequest(student._id)}>
                                        <ImCancelCircle /> Reject
                                    </Button>
                                </td>

            </tr>
          ))}
          
        </tbody>
       </Table>
       </Row>
       </Container>
    </div>
  );
}

export default HodH;