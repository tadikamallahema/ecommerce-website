import Razorpay from 'razorpay';

const razorpayInstance=new Razorpay({
    key_id:process.env.RAZORPAY_TEST_KEY_ID,
    key_secret:process.env.RAZORPAY_TEST_SECRET_KEY,
});

export default razorpayInstance;