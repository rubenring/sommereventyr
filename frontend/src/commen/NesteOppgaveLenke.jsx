import { Link } from 'react-router-dom';
import React from 'react';

export const NesteOppgaveLenke = ({lenke, showLink, title}) => (
  showLink ? <Link
        to={lenke}
      >
        {title}
      </Link> : showLink === false ? <span>Desverre... prøv igjen</span> : null
);