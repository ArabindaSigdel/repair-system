const axios = require("axios");
const { Bill } = require("../../models/index.js");

const KhaltiPayment = async (req, res) => {
  try {
    const { bill_id } = req.body;

    // Ensure bill_id is provided
    if (!bill_id) {
      return res.status(400).json({
        success: false,
        message: "Bill ID is required",
        data: {},
      });
    }

    // Find the bill by id
    const bill = await Bill.findOne({ _id: bill_id }).populate(
      "customer_id",
      "f_name l_name email phone"
    );
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
        data: {},
      });
    }

    // Check if the payment is already completed
    if (bill.payment_status === "Completed") {
      return res.status(400).json({
        success: false,
        message: "Payment for this bill is already completed",
        data: {},
      });
    }

    // Initialize payment with Khalti
    const khaltiResponse = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/initiate/",
      {
        return_url: `http://localhost:5000/api/payment/khaltiCallback?bill_id=${bill._id}`,
        website_url: "http://localhost:5000",
        amount: bill.grand_total * 100, // Convert to paisa
        purchase_order_id: bill._id.toString(),
        purchase_order_name: "Repair Bill Payment",
        customer_info: {
          name: `${bill.customer_id.f_name} ${bill.customer_id.l_name}`,
          email: bill.customer_id.email,
          phone: bill.customer_id.phone,
        },
      },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_LIVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Send success response with Khalti payment details
    return res.status(200).json({
      success: true,
      message: "Payment initialized successfully",
      data: {
        payment_url: khaltiResponse.data.payment_url,
        pidx: khaltiResponse.data.pidx,
      },
    });
  } catch (err) {
    console.log(err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later",
      data: {},
    });
  }
};

module.exports = KhaltiPayment;
