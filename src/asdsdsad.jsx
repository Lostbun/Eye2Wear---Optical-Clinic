const submitpatientorderbautista = async (e) => {
  e.preventDefault();
  

  try {
    // Fetch patient demographic data
    const demographicResponse = await fetch(
      `http://localhost:3000/api/patientdemographics/patientemail/${patientemail}`,
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
        }
      }
    );

    if (!demographicResponse.ok) {
      const errorText = await demographicResponse.text();
      throw new Error(errorText || 'Failed to fetch patient data');
    }

    const demographicData = await demographicResponse.json();
    
    if (!demographicData.patientcontactnumber) {
      throw new Error('Patient contact number not found');
    }

    // Prepare order data
    const orderData = {
      patientprofilepicture: patientprofilepicture,
      patientlastname: patientlastname,
      patientfirstname: patientfirstname,
      patientmiddlename: patientmiddlename,
      patientemail: patientemail,
      patientcontactnumber: demographicData.patientcontactnumber,
      patientorderbautistaproductid: selectedbautistaproduct?.bautistainventoryproductid,
      patientorderbautistaproductname: addbautistainventoryproductname,
      patientorderbautistaproductbrand: addbautistainventoryproductbrand,
      patientorderbautistaproductmodelnumber: addbautistainventoryproductmodelnumber,
      patientorderbautistaproductprice: addbautistainventoryproductprice,
      patientorderbautistaproductquantity: bautistacount,
      patientorderbautistaproductsubtotal: addbautistainventoryproductprice * bautistacount,
      patientorderbautistaproducttotal: addbautistainventoryproductprice * bautistacount,
      patientorderbautistaproductpaymentmethod: 'Cash on Pickup',
      patientorderbautistaproductchosenpickupdate: patientorderbautistaproductchosenpickupdate,
      patientorderbautistaproductchosenpickuptime: 'Default',
      patientorderbautistastatus: 'Pending',
      patientorderbautistahistory: [{
        status: 'Pending',
        changedAt: new Date(),
        changedBy: `${patientfirstname} ${patientlastname}`
      }]
    };

    console.log('Submitting order:', orderData);

    // Submit order
    const response = await fetch('http://localhost:3000/api/patientorderbautista', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
      },
      body: JSON.stringify(orderData)
    });

    // Handle response
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Server response:', errorText);
      throw new Error(errorText || `Server error: ${response.status}`);
    }

    const result = await response.json();
        setpatientorderbautistaproductisClicked(true);
        setpatientorderbautistaproductToastMessage("Order Submitted Successfully!");
        
        setpatientorderbautistaproductToast(true);
        setpatientorderbautistaproductToastClosing(false);
    console.log('Order successful:', result);

    
    setpatientorderbautistaproductchosenpickupdate("");
    setshowpatientorderbautistascheduleandreview(false);
    setbautistaCount(1);
    

  } catch (error) {
    console.error('Submission error:', error);
      setpatientorderbautistaproductToastMessage(error.message);
      setpatientorderbautistaproductToast(true);
      setpatientorderbautistaproductToastClosing(false);
  }
};  
