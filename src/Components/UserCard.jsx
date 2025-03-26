import React, { useState,memo} from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'

const UserCard = ({ user }) => {
    

    return (
        <>
            <div className="col-4">
                <div className="card mt-3" style={{ width: "26rem" }}>
                    <div className="card-body p-2" >

                        <img src={user.image} className="float-start" />
                        <h3 className="card-title text-start"> {user.firstName} {user.lastName}</h3>
                            
                            
                        <p>{user.email}</p>
                        <p>{user.address.country}  | {user.address.city}</p>
                    </div>
                </div>
                
        </div>
        </>
    );
}
function areEqual(prevProps, nextProps) {
    return prevProps.user.id === nextProps.user.id;
}

export default React.memo(UserCard, areEqual);
