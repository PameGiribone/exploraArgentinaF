import React from 'react'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const wpp = () => {
  return (
    <>
        <a className='link-wpp' href="https://api.whatsapp.com/send/?phone=97099356&text&type=phone_number&app_absent=0"><FontAwesomeIcon className='wpp-icon' icon={faWhatsapp} style={{color: "#ffff",}} />  </a>
    </>
  )
}

export default wpp