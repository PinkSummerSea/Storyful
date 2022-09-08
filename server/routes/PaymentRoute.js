import express from 'express'
import Stripe from 'stripe';
const router = express.Router()
const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY)

router.post("/create-checkout-session", async (req, res) => {
  const {type} = req.body
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: type==='premium' ? [{
          price_data: {
            currency: "cad",
            product_data: {
              name: 'Storyful Premium Membership',
            },
            unit_amount: 2500,
          },
          quantity: 1,
        }] : [{
          price_data: {
            currency: "cad",
            product_data: {
              name: 'Storyful Elite Membership',
            },
            unit_amount: 5000,
          },
          quantity: 1,
        }]
      ,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/membership`,
    })
    res.json({ url: session.url })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

export default router