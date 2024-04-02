'use client'

import { ReactNode } from 'react'
import { CartProvider } from 'use-shopping-cart'

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <CartProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
      // successUrl="https://commerce-next-yt.vercel.app/stripe/success"
      // cancelUrl="https://commerce-next-yt.vercel.app/stripe/error"
      successUrl="http://localhost:3000/stripe/success"
      cancelUrl="http://localhost:3000/stripe/error"
      currency="HKD"
      billingAddressCollection={true}
      shouldPersist={true}
      language="en-US"
    >
      {children}
    </CartProvider>
  )
}