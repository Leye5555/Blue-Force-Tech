import React, {useMemo, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {getAll} from "../../actions/user";
import { deleteOne } from '../../actions/user';
import Paginate from './Paginate/Paginate';
import "./styles.css";

const Paginates = () => {
   let dummy = localStorage.getItem("currentPage") === null ? 1 : localStorage.getItem("currentPage");
    dummy -= 1;
    const [currentPage, setCurrentPage] = useState(dummy); 
    const appointments = useSelector(state => state.create_appointment);
    const dispatch = useDispatch();
    let PageSize = 4;
    let serialNo = 1 + ((currentPage - 1) * PageSize);
    useEffect(() => {
      dispatch(getAll());
     setTimeout(() => { 
       setCurrentPage(dummy + 1) 
    },1000)
    }, [dispatch]);
    


    const currentTableData = useMemo(() => {
      const firstPageIndex = (currentPage - 1) * PageSize;
      const lastPageIndex = firstPageIndex + PageSize;
      localStorage.setItem("currentPage", currentPage);
      return appointments?.slice(firstPageIndex, lastPageIndex); 
    }, [currentPage, appointments]);


    return (
    <> 
    { currentTableData && currentTableData.length > 0 ?
    <>
      <table className="paginate">
        <thead>
          <tr>
            <th>S/N</th>
            <th>ID</th>
            <th>FULL NAME</th>
            <th>DATE (yyyy/mm/dd)</th>
            <th>REASON FOR APPOINTMENT</th>
            <th>Delete Appointment</th>
          </tr>
        </thead>
        <tbody>
          {currentTableData?.map(item => {
            return (
                item._id &&
              <tr key={item._id}>
                <td>{serialNo++}</td>
                <td>{item._id}</td>
                <td>{item.fullName}</td>
                <td>{item._id && `${new Date(item.date).getFullYear()}/${new Date(item.date).getMonth()}/${new Date(item.date).getDate()}`}</td>
                <td>{item.reason}</td>
                <td title="Delete" onClick={() => {
                    if( window.confirm ("Are you sure you want to delete this appointment?")) { dispatch(deleteOne(item._id));
                      setTimeout(()=> {
                        window.location.reload();
                        if ( (serialNo -1) % 4 === 1 && (serialNo - 2 === (currentPage - 1) * PageSize)) {
                          setCurrentPage(currentPage - 1)
                        }
                      }, 2000) 
                     } 
                } }>{item._id  &&  "📤" }</td>
              </tr> 
            );
          })}
        </tbody>
      </table>
      <Paginate
        className="pagination-bar"
        currentPage={currentPage}
        totalCount={appointments?.length}
        pageSize={PageSize}
        onPageChange={page => setCurrentPage(page)}
      />
      </>
       : <h1 style = {{fontSize : "3.em", color : 'blue', textAlign : "center", marginTop : "max(10vw, 50px)"}}>Loading ....</h1> }
    </>
  );
}


export default Paginates;
