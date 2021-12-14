import React from 'react';
import { usePagination} from '../usePagination';
import DOTS from "../DOTS";
import "./styles.css";


const Paginate = ({onPageChange,totalCount,siblingCount = 1,currentPage, pageSize}) => {
  
         const paginationRange = usePagination({
            currentPage,
            totalCount,
            siblingCount,
            pageSize
          });

          let key = 1;
        
          // If there are less than 2 times in pagination range we shall not render the component
          if (currentPage === 0 || paginationRange.length < 2) {
            return null;
          }
        
          const onNext = () => {
            if (currentPage > 0 && currentPage < paginationRange.length - 1) {
                window.scrollTo(0, 0);
            onPageChange(currentPage + 1);
            }
          };
        
          const onPrevious = () => {
            if (currentPage > 1) {
            window.scrollTo(0, 0);
            onPageChange(currentPage - 1);
            }
          };
        
          let lastPage = paginationRange[paginationRange.length - 1];
          return (
            <ul
              className="pagination-container"
            >
               {/* Left navigation arrow */}
              <li
                className='pagination-item'
                onClick={onPrevious}
              >
                <div className="arrow left" />
              </li>
              {paginationRange.map(pageNumber => {
                 key ++;
                // If the pageItem is a DOT, render the DOTS unicode character
                if (pageNumber === DOTS) {
                  return <li key={key} className="pagination-item dots">&#8230;</li>;
                }
                
                // Render our Page Pills
                return (
                  <li key ={key}
                    className={`pagination-item ${pageNumber === currentPage && "current-page"}`}
                    onClick={() =>{ window.scrollTo(0,0); onPageChange(pageNumber)}}
                  >
                    {pageNumber}
                  </li>
                );
              })}
              {/*  Right Navigation arrow */}
              <li
                className='pagination-item'
                onClick={onNext}
              >
                <div className="arrow right" />
              </li>
            </ul>
          );
        };

export default Paginate;
