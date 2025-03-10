import Alert from 'react-bootstrap/Alert';
import { useState } from 'react';


function AlertDismissible({ variant, heading, message,show,setShow }) {
    return (
        <>
            {show && (
                <Alert variant={variant} onClose={() => setShow(false)} dismissible>
                    <Alert.Heading>{heading}</Alert.Heading>
                    <p>{message}</p>
                </Alert>
            )}
        </>
    );
}
export default AlertDismissible;