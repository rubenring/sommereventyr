import React from 'react';
import './infoPage.css';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
 

export const InfoPage = (props) => {
 
  const { username } = queryString.parse(props.location.search);

  return (
    username ? <section className='info-page'>
        <h2>Velkommen til reisen gjennom et nytt land.</h2>
        <p>For å komme dere gjennom må dere løse oppgavene som møter dere på veien.</p>
        <Link 
          to={`/page-one?username=${username}`} 
        >
          Klikk her for å gå videre
        </Link>
    </section> : <div>
      Det ser ut som brukernavnet deres har blitt borte på veien. Uten dette kommer dere ingen vei i dette landet...
    </div>
  );
};