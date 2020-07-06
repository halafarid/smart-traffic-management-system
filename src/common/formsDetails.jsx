import React from 'react';
import { Link } from 'react-router-dom';

const FormDetails = ({divRes, labelRes, spanRes, spanClass, spanResLink, iRes, functions, toLink, specific, label, data, spanData, dataLink}) => {
    return ( 
        <div className={divRes}>
            <label className={labelRes}>{label}</label>
            
            <span className={spanRes}>{data}</span>
            <span className={spanClass} onClick={functions}>{spanData}</span>
            <span className={spanResLink}><Link to={`${toLink + specific}`}>{dataLink}</Link></span>
            
            <i className={iRes} onClick={functions} aria-hidden="true"></i>
        </div>
     );
}
 
export default FormDetails;