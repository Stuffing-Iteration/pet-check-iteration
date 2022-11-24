import React from 'react';
import DocumentUpload from './DocumentUpload'


const DocumentView = (props) => {
  
  return (
    <>
      <div className='vaccine-info'>
        <div className='vaccine-info-header'>Documents</div>
        <div className='vaccine-info-box'>
          <DocumentUpload petId={props.petId}/>
        </div>
      </div>
    </>
  );
};

export default DocumentView;
