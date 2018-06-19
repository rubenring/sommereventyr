import React from 'react';
export const User= ({username}) => {

    return(
      <div className="user">
        <h3 className="user-title">{username ? `Brukernavn: ${username}` : 'Gruppen må legge til et gruppenavn'}</h3>
        <div style={{display: 'none'}}>{username ? 'nothing to see here' : 'hint: ?username='}</div>
      </div>
    )
}
