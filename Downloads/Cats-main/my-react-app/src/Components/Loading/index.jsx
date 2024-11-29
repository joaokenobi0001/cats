import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Spinner animation="border" variant="dark" >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}

export default Loading;