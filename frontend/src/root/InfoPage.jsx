import React from 'react';
import './infoPage.css';
import { Link } from 'react-router-dom';

export const InfoPage = (props) => {
  console.log(props)
  return (
    <section className='info-page'>
        <h2>Velkommen til reisen gjennom et av verdens største land.</h2>
        <p>For å komme dere gjennom må dere løse oppgavene som møter dere på veien.</p>
        <Link 
          to='/page-one' 
        >
          Start
        </Link>
    </section>
  );
};