import React from 'react';
export const User= ({sendUsernameToServer, updateName, username}) => {

    return(
      <div className="user">
        <h3 className="user-title">{username ? username : 'Velg et gruppenavn og trykk lagre'}</h3>
        <input className="user-title" value={username} onChange={updateName}/>
        <button
          onClick={sendUsernameToServer}
        >
          Lagre 
        </button>
      </div>
    )
}
