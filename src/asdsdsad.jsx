export const getbautistaproductsoldcountbyid = async (req, res) => {
  const productId = parseInt(req.params.productid);
  try {
    const soldOrders = await PatientOrderAmbher.aggregate([
      {
        $match: {
          patientorderbautistaproductid: productId,
          patientorderbautistastatus: "Completed"
        }
      },
      {
        $group: {
          _id: "$patientorderbautistaproductid",
          totalSold: { $sum: "$patientorderbautistaproductquantity" }
        }
      }
    ]);

    const totalSold = soldOrders[0]?.totalSold || 0;

    res.json({ productid: productId, sold: totalSold });
  } catch (error) {
    console.error("Error fetching sold count: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
