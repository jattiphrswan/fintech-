import travelsCardsImg from '../assets/images/travels-cards.png';
import paymentSuccessImg from '../assets/images/payment-success-full.png';
import paymentsImg from '../assets/images/payments.png';
import neonDashboardImg from '../assets/images/neon-payline-payment-dashboard.png';

export const keyBenefits = [
  { 
    id: 'rewards', 
    title: 'Earn points & rewards', 
    text: 'Collect cashback, miles, or card points on your rent.', 
    image: travelsCardsImg, 
    alt: 'Flight and dining rewards cards' 
  },
  { 
    id: 'credit', 
    title: 'Pay with credit card', 
    text: 'Even if your agent/landlord only accepts bank transfer.' 
  },
  { 
    id: 'payout', 
    title: 'Instant payout', 
    text: 'Your landlord gets paid instantly, no waiting.', 
    image: paymentSuccessImg, 
    alt: 'Successful payment confirmation on a phone' 
  },
  { 
    id: 'international', 
    title: 'International Payment', 
    text: 'Pay in your local currency, settle instantly in the UK.', 
    image: paymentsImg, 
    alt: 'Payments overview with Mastercard and Visa accounts' 
  },
  { 
    id: 'flexible', 
    title: 'Flexible Payments', 
    text: 'Manage your cash flow and split payments across multiple cards.', 
    image: neonDashboardImg, 
    alt: 'Payline dashboard showing cards and payment history' 
  },
];
