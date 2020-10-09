import React from 'react'
import StripeCheckout from 'react-stripe-checkout';
import { useDispatch } from 'react-redux';
import { handleToken } from '../actions';

const Payments = () => {
  const dispatch = useDispatch();

  return (
      <StripeCheckout
          name='Emailey'
          description='$5 for 5 Email credits'
          token={(token) => {
            dispatch(handleToken(token));
          }}
          // 5 dollars in US currency
          amount={500}
          stripeKey={process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY}
      >
          <button className="btn">
              Add Credits
          </button>
      </StripeCheckout>
  )
}

export default Payments
