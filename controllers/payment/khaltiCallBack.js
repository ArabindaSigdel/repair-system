const axios = require("axios");
const { Bill } = require("../../models/index.js");

const KhaltiCallback = async (req, res) => {
  try {
    const { pidx, bill_id } = req.query;

    // Ensure pidx and bill_id are provided
    if (!pidx || !bill_id) {
      return res.status(400).json({
        success: false,
        message: "Payment ID (pidx) and Bill ID are required",
        data: {},
      });
    }

    // Find the bill by id
    const bill = await Bill.findOne({ _id: bill_id });
    if (!bill) {
      return res.status(404).json({
        success: false,
        message: "Bill not found",
        data: {},
      });
    }

    // Verify payment using Khalti's Lookup API
    const khaltiResponse = await axios.post(
      "https://dev.khalti.com/api/v2/epayment/lookup/",
      { pidx },
      {
        headers: {
          Authorization: `Key ${process.env.KHALTI_LIVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Check the payment status
    if (khaltiResponse.data.status === "Completed") {
      // Update the bill's payment status to "Completed"
      bill.payment_status = "Completed";
      bill.payment_reference = pidx; // Store the payment reference
      await bill.save();

      return res.status(200).json({
        success: true,
        message: "Payment verified successfully",
        data: khaltiResponse.data,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Payment not completed",
        data: khaltiResponse.data,
      });
    }
  } catch (err) {
    console.log(err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong in callback. Please try again later",
      data: {},
    });
  }
};

module.exports = KhaltiCallback;
