"use client"

import { PaymentForm,CreditCard } from 'react-square-web-payments-sdk';

export default function Home() {
  
  return (
    <div >
      <PaymentForm
        applicationId="sandbox-sq0idb-IPObhs_xsRrbERl8rj5MSw"
        cardTokenizeResponseReceived={async(token) => {
          console.log('token:', token);
         
const response = await fetch('http://localhost:4000/api/pay', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sourceId: token.token }),
  });

  const result = await response.json();

  if (result?.payment?.status === 'COMPLETED') {
    alert('Payment successful!');
  } else {


    alert('Payment failed.');
  }
          
  }
        }
 
      
        locationId='LMT5Q6FBB8G8B'
      >
        <CreditCard/>
      </PaymentForm>
    </div>
  )
}

