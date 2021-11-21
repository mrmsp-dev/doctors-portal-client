import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';


const stripePromise = loadStripe('pk_test_51JwmkHK0zRpRkYqiEreyEFMc9EoLDBExVpaDUxBaKnKJoI1xjZSUXK3pNjIPDsUvRMK5FuudjD2UShE9T1jilvRM00LvgIeFXT')

const Payment = () => {
    const { appointmentId } = useParams();
    const [appointment, setAppointment] = useState({});
    useEffect(() => {
        fetch(`https://immense-tundra-76382.herokuapp.com/appointments/${appointmentId}`)
            .then(res => res.json())
            .then(data => setAppointment(data));
    }, [appointmentId]);
    return (
        <div>
            <h2>Please Pay for: {appointment.patientName} for {appointment.serviceName}</h2>
            <h4>Pay: ${appointment.price}</h4>
            {appointment?.price && <Elements stripe={stripePromise}>
                <CheckoutForm
                    appointment={appointment}
                />
            </Elements>}
        </div>
    );
};

export default Payment;

/*
1. install stripe and stripe-react
2. set publishable key
3. Elements
4. Checkout Form
-----
5. Create payment method
6. server: create payment Intent api
7. Load client secret
8. ConfirmCard payment
9. handle user error
*/