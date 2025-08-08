  import React, {useState, useEffect} from "react";
  import {Link} from "react-router-dom";
  import navlogo from  "../src/assets/images/navlogo.png";
  import heart from "../src/assets/images/heart.png";
  import { useAuth } from "./hooks/patientuseAuth";
  import starimage from "../src/assets/images/star.png"
  import defaultimageplaceholder from "../src/assets/images/defaultimageplaceholder.png";
  import heartblack from "../src/assets/images/heartblack.png";
  import heartwhite from "../src/assets/images/heartwhite.png";
  import heartfilled from "../src/assets/images/heartfilled.png";
  import packageimage from "../src/assets/images/shopping-bag.png";
  import storeimage from "../src/assets/images/store.png";
  import profileuser from "../src/assets/images/profile-user.png";
  import logout from "../src/assets/images/logout.png";
  import heartempty from "../src/assets/images/heartempty.png"
  import nextimage from "../src/assets/images/next.png";
  import paymentimage from "../src/assets/images/card-payment.png";
  import { AmbherinventorycategoryBox } from "./components/AmbherinventorycategoryBox";
  import { BautistainventorycategoryBox } from "./components/BautistainventorycategoryBox";
  import Rating from '@mui/material/Rating';
  import Stack from '@mui/material/Stack';
import inquire from "../src/assets/images/inquire.png";
import find from "../src/assets/images/find.png";






  function PatientWishlist(){



    const [patientfirstname, setpatientfirstname] = useState('');
    const [patientlastname, setpatientlastname] = useState('');
    const [patientmiddlename, setpatientmiddlename] = useState('');
    const [patientemail, setpatientemail] = useState('');
    const [patientprofilepicture, setpatientprofilepicture] = useState('');
    const [showlogoutbtn, setshowlogoutbtn] = useState(false);
    const showlogout = () => {
      setshowlogoutbtn(!showlogoutbtn);
    }



  const {handlelogout, fetchpatientdetails} = useAuth();

    //Retrieveing Data from useAuth Hook
    useEffect(() => {
      const loadpatient = async () => {

        try{

        const data = await fetchpatientdetails();
        if(data){
          setpatientfirstname(data.patientfirstname || '');
          setpatientmiddlename(data.patientmiddlename || '');
          setpatientlastname(data.patientlastname || '');
          setpatientemail(data.patientemail || '');
          setpatientprofilepicture(data.patientprofilepicture || '');
          localStorage.setItem("patientemail", data.patientemail);
        }
      }catch(error){

          console.error("Error fetching patient details", error);

      }
    }; loadpatient();
    }, [fetchpatientdetails]);






















  //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT
  //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT
  //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT
  //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT
  //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT
  //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT //CATEGORIES MANAGEMENT

  const [activeinventorytable, setactiveinventorytable] = useState('ambherinventorytable');
  const showinventorytable = (inventorytableid) => {
        setactiveinventorytable(inventorytableid);
  };


  //AMBHER OPTICAL //AMBHER OPTICAL //AMBHER OPTICAL //AMBHER OPTICAL //AMBHER OPTICAL
  //AMBHER OPTICAL //AMBHER OPTICAL //AMBHER OPTICAL //AMBHER OPTICAL //AMBHER OPTICAL
  //AMBHER OPTICAL //AMBHER OPTICAL //AMBHER OPTICAL //AMBHER OPTICAL //AMBHER OPTICAL
  //AMBHER OPTICAL //AMBHER OPTICAL //AMBHER OPTICAL //AMBHER OPTICAL //AMBHER OPTICAL
  //AMBHER OPTICAL //AMBHER OPTICAL //AMBHER OPTICAL //AMBHER OPTICAL //AMBHER OPTICAL


  const [activeambherinventorycategorytable, setactiveambherinventorycategorytable] = useState('all');
  const showambherinventorycategory = (ambherinventorycategorytableid) => {
        setactiveambherinventorycategorytable(ambherinventorycategorytableid);
  };

  const [ambherinventorycategorylist, setambherinventorycategorylist] = useState([]);

    const [ambherinventoryproducts, setambherinventoryproducts] = useState([]);
    const [ambherloadingproducts, setambherloadingproducts] = useState(true);

            
  const ambherfilteredproducts = ambherinventoryproducts.filter(product => 
                activeambherinventorycategorytable === 'all' || 
                product.ambherinventoryproductcategory === activeambherinventorycategorytable

              );
            
            


  //Fetching Bautista Inventory Categories
  useEffect(() => {
    const fetchambhercategories = async () => {
      try{
        const response = await fetch('http://localhost:3000/api/ambherinventorycategory');
        if(!response.ok) throw new Error("Failed to fetch Bautista Inevntory Categories");



        const data = await response.json();
        setambherinventorycategorylist(data);
      
        console.log("Bautista categories", data);

      }catch(error){
        console.error("Error fetching ambher categories: ", error);
      }
    };
    fetchambhercategories();
  }, []);



  const fetchambherinventorycategories = async () => {
    try{
      const response = await fetch('http://localhost:3000/api/ambherinventorycategory');
      if(!response.ok) throw new Error("Failed to retrieve ambher inventory categories");

      const data = await response.json();
      setambherinventorycategorylist(data);
    }catch(error){
      console.error("Fetching ambherinventorycategory failed", error);
    }
  };

  useEffect(() => {
    fetchambherinventorycategories();
  }, []);




        
            
            //FETCHING PRODUCTS
            
              const fetchambherproducts = async () => {
                try{
                  const response = await fetch('http://localhost:3000/api/ambherinventoryproduct', {
                    headers:{
                      'Authorization' : `Bearer ${localStorage.getItem("patienttoken")}`
                    }
                  });
                  
                  if(!response.ok) throw new Error("Failed to fetch products");
            
                  const data = await response.json();
                  setambherinventoryproducts(data);
                  setambherloadingproducts(false);
                }catch(error){
                  console.error("Failed fetching products: ", error);
                  setambherloadingproducts(false);
                }
              };
            
            
              useEffect(() => {
                fetchambherproducts();
              }, []);
            
            
            
          





            const[showpatientambherviewproduct, setshowpatientambherviewproduct] = useState(false);
            const [ambherinventorycategorynamebox, setambherinventorycategorynamebox] = useState("");
            const [addambherinventoryproductname, setaddambherinventoryproductname] = useState("");
            const [addambherinventoryproductbrand, setaddambherinventoryproductbrand] = useState("");
            const [addambherinventoryproductmodelnumber, setaddambherinventoryproductmodelnumber] = useState("");
            const [addambherinventoryproductdescription, setaddambherinventoryproductdescription] = useState("");
            const [addambherinventoryproductprice, setaddambherinventoryproductprice] = useState();
            const [addambherinventoryproductquantity, setaddambherinventoryproductquantity] = useState();
            const [addambherinventoryproductimagepreviewimages, setaddambherinventoryproductimagepreviewimages] = useState([]);
            const [ambhercurrentimageindex, setambhercurrentimageindex] = useState(0);
            const [selectedambherproduct, setselectedambherproduct] = useState(null);
    




    //PREVIOUS  IMAGE
            const ambherhandlepreviousimage = (e) => {
              e.preventDefault(); 
              if (selectedambherproduct) {
                if (!selectedambherproduct.ambherinventoryproductimagepreviewimages?.length) return;
                setambhercurrentimageindex(prev => prev === 0 ? selectedambherproduct.ambherinventoryproductimagepreviewimages.length - 1 : prev - 1 );
            
              } else {
                if (!addambherinventoryproductimagepreviewimages?.length) return;
                setambhercurrentimageindex(prev => prev === 0 ? addambherinventoryproductimagepreviewimages.length - 1 : prev - 1 );
              }
            };
            
            //NEXT IMAGE
            const ambherhandlenextimage = (e) => {
              e.preventDefault();
              if (selectedambherproduct) {
                if (!selectedambherproduct.ambherinventoryproductimagepreviewimages?.length) return;
                setambhercurrentimageindex(prev => prev === selectedambherproduct.ambherinventoryproductimagepreviewimages.length - 1 ? 0 : prev + 1 );
            
              } else {
                if (!addambherinventoryproductimagepreviewimages?.length) return;
                setambhercurrentimageindex(prev => prev === addambherinventoryproductimagepreviewimages.length - 1 ? 0 : prev + 1);
            
              }
            };

















    


  //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER
  //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER
  //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER
  //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER
  //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER //BAUTISTA EYE CENTER


            const[showpatientbautistaviewproduct, setshowpatientbautistaviewproduct] = useState(false);
            const [bautistainventorycategorynamebox, setbautistainventorycategorynamebox] = useState("");
            const [addbautistainventoryproductname, setaddbautistainventoryproductname] = useState("");
            const [addbautistainventoryproductbrand, setaddbautistainventoryproductbrand] = useState("");
            const [addbautistainventoryproductmodelnumber, setaddbautistainventoryproductmodelnumber] = useState("");
            const [addbautistainventoryproductdescription, setaddbautistainventoryproductdescription] = useState("");
            const [addbautistainventoryproductprice, setaddbautistainventoryproductprice] = useState();
            const [addbautistainventoryproductquantity, setaddbautistainventoryproductquantity] = useState();
            const [addbautistainventoryproductimagepreviewimages, setaddbautistainventoryproductimagepreviewimages] = useState([]);
            const [bautistacurrentimageindex, setbautistacurrentimageindex] = useState(0);
            const [selectedbautistaproduct, setselectedbautistaproduct] = useState(null);
    


            

            
            


          








    //PREVIOUS  IMAGE
            const bautistahandlepreviousimage = (e) => {
              e.preventDefault(); 
              if (selectedbautistaproduct) {
                if (!selectedbautistaproduct.bautistainventoryproductimagepreviewimages?.length) return;
                setbautistacurrentimageindex(prev => prev === 0 ? selectedbautistaproduct.bautistainventoryproductimagepreviewimages.length - 1 : prev - 1 );
            
              } else {
                if (!addbautistainventoryproductimagepreviewimages?.length) return;
                setbautistacurrentimageindex(prev => prev === 0 ? addbautistainventoryproductimagepreviewimages.length - 1 : prev - 1 );
              }
            };
            
            //NEXT IMAGE
            const bautistahandlenextimage = (e) => {
              e.preventDefault();
              if (selectedbautistaproduct) {
                if (!selectedbautistaproduct.bautistainventoryproductimagepreviewimages?.length) return;
                setbautistacurrentimageindex(prev => prev === selectedbautistaproduct.bautistainventoryproductimagepreviewimages.length - 1 ? 0 : prev + 1 );
            
              } else {
                if (!addbautistainventoryproductimagepreviewimages?.length) return;
                setbautistacurrentimageindex(prev => prev === addbautistainventoryproductimagepreviewimages.length - 1 ? 0 : prev + 1);
            
              }
            };










      

  //WISHLIST

    //AMBHER OPTICAL

      const [ambhercount, setambherCount] = useState(1)
      const [ambherheartisHovered, setambherheartisHovered] =useState(false);
      const [ambherheartisClicked, setambherheartisClicked] =useState(false);     
      const [ambhershowheartToast, setambhershowheartToast] = useState(false);
      const [ambhershowtoastMessage, setambhershowtoastMessage] = useState("");
      const [ambhershowtoastmessageClosing, setambhershowtoastmessageClosing] = useState(false);


  useEffect(() => {
    if(ambhershowheartToast){
      const ambherhearttoasttimer = setTimeout(() => {
        setambhershowtoastmessageClosing(true); //
        setTimeout(() => setambhershowheartToast(false), 300);}, 4000);
    
      return () => clearTimeout(ambherhearttoasttimer);
    }
  }, [ambhershowheartToast]);







    //BAUTISTA EYE CENTER 



      const [bautistacount, setbautistaCount] = useState(1)
      const [bautistaheartisHovered, setbautistaheartisHovered] =useState(false);
      const [bautistaheartisClicked, setbautistaheartisClicked] =useState(false);     
      const [bautistashowheartToast, setbautistashowheartToast] = useState(false);
      const [bautistashowtoastMessage, setbautistashowtoastMessage] = useState("");
      const [bautistashowtoastmessageClosing, setbautistashowtoastmessageClosing] = useState(false);

    const bautistahearthandleClick = () => {
      const bautistaheartnewState = !bautistaheartisClicked;
      setbautistaheartisClicked(bautistaheartnewState);
      setbautistashowtoastMessage(bautistaheartnewState ? "Added to Wishlist!" : "Removed from Wishlist"); 
      setbautistashowheartToast(true);
      setbautistashowtoastmessageClosing(false);
    };

    const getbautistaHeartImage = () => {
      if (bautistaheartisClicked) return heartfilled;
      return bautistaheartisHovered ? heartwhite : heartblack;
    };

  useEffect(() => {
    if(bautistashowheartToast){
      const bautistahearttoasttimer = setTimeout(() => {
        setbautistashowtoastmessageClosing(true); //
        setTimeout(() => setbautistashowheartToast(false), 300);}, 4000);
    
      return () => clearTimeout(bautistahearttoasttimer);
    }
  }, [bautistashowheartToast]);











    const [wishlistCounts, setWishlistCounts] = useState({});
  const [ambherWishlist, setAmbherWishlist] = useState([]);
  const [bautistaWishlist, setBautistaWishlist] = useState([]);
  const [loadingWishlist, setLoadingWishlist] = useState(true);




  const fetchWishlistCounts = async (productIds, clinicType) => {
    try {
      // Convert to string if it's an array
      const idsParam = Array.isArray(productIds) ? productIds.join(',') : productIds;
      
      const response = await fetch(
        `http://localhost:3000/api/patientwishlistinventoryproduct/wishlist-count/${idsParam}/${clinicType}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
          }
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch wishlist counts");
      }

      const data = await response.json();
      return data.count || 0;
    } catch(error) {
      console.error("Error fetching wishlist counts:", error);
      return 0;
    }
  };



  //Automatically counts the wishlisted count per product in Ambher Optical
  useEffect(() => {
    if(selectedambherproduct) {
      const fetchCount = async () => {
        const count = await fetchWishlistCounts(selectedambherproduct.ambherinventoryproductid, 'ambher');
        setWishlistCounts(prev => ({...prev, [selectedambherproduct.ambherinventoryproductid]: count}));
      };
      fetchCount();
    }
  }, [selectedambherproduct]);

  //Automatically counts the wishlisted count per product in Bautista Eye Center
  useEffect(() => {
    if(selectedbautistaproduct) {
      const fetchCount = async () => {
        const count = await fetchWishlistCounts(selectedbautistaproduct.bautistainventoryproductid, 'bautista');
        setWishlistCounts(prev => ({...prev, [selectedbautistaproduct.bautistainventoryproductid]: count}));
      };
      fetchCount();
    }
  }, [selectedbautistaproduct]);



  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/patientwishlistinventoryproduct/email', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
          }
        });

        if(response.ok) {
          const data = await response.json();
          setAmbherWishlist(data.filter(item => item.clinicType === "ambher"));
          setBautistaWishlist(data.filter(item => item.clinicType === "bautista"));
        }
      } catch (error) {
        console.error("Error fetching wishlist items: ", error);
      } finally {
        setLoadingWishlist(false);
      }
    };
    fetchWishlist();
  }, []);



  const handleRemoveFromWishlist = async (wishlistItemId, clinicType) => {
    try {
      const response = await fetch(`http://localhost:3000/api/patientwishlistinventoryproduct/${wishlistItemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
        }
      });

      const data = await response.json(); // Always parse the response
      
      if (!response.ok) {
        throw new Error(data.message || "Failed to remove from wishlist");
      }

      // Update the correct wishlist based on clinicType
      if (clinicType === 'ambher') {
        setAmbherWishlist(prev => prev.filter(item => item._id !== wishlistItemId));
      } else {
        setBautistaWishlist(prev => prev.filter(item => item._id !== wishlistItemId));
      }
      
      // Show success toast
      setambhershowtoastMessage("Removed from Wishlist");
      setambhershowheartToast(true);
      
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      // Show error toast
      setambhershowtoastMessage(error.message || "Failed to remove item");
      setambhershowheartToast(true);
    }
  };














  //ORDERING
  const [patientorderambherproductchosenpickupdate, setpatientorderambherproductchosenpickupdate] = useState("");
  const [patientorderbautistaproductchosenpickupdate, setpatientorderbautistaproductchosenpickupdate] = useState("");
  const [patientorderambherproductisClicked, setpatientorderambherproductisClicked] = useState(false);
  const [patientorderambherproductToast, setpatientorderambherproductToast] = useState(false);
  const [patientorderambherproductToastMessage, setpatientorderambherproductToastMessage] = useState("");
  const [patientorderambherproductToastClosing, setpatientorderambherproductToastClosing] = useState(false);
  const [patientorderbautistaproductisClicked, setpatientorderbautistaproductisClicked] = useState(false);
  const [patientorderbautistaproductToast, setpatientorderbautistaproductToast] = useState(false);
  const [patientorderbautistaproductToastMessage, setpatientorderbautistaproductToastMessage] = useState("");
  const [patientorderbautistaproductToastClosing, setpatientorderbautistaproductToastClosing] = useState(false);
  const [progressWidth, setProgressWidth] = useState('0%');   



  // UseEffect for Product Orddering Toast
  useEffect(() => {
    if (patientorderambherproductToast) {
      setProgressWidth('0%');
      setpatientorderambherproductToastClosing(false);

      const progresstimer = setTimeout(() => {
        setProgressWidth('100%');
      }, 50);

      // Close toast after 4 seconds
      const toasttimer = setTimeout(() => {
        setpatientorderambherproductToastClosing(true);
        setTimeout(() => {
          setpatientorderambherproductToast(false);
          setProgressWidth('0%');
        }, 300);
      }, 4000);

      return () => {
        clearTimeout(progresstimer);
        clearTimeout(toasttimer);
      }
    }else if(patientorderbautistaproductToast){
      setProgressWidth('0%');
      setpatientorderbautistaproductToastClosing(false);

      const progresstimer = setTimeout(() => {
        setProgressWidth('100%');
      }, 50);

      // Close toast after 4 seconds
      const toasttimer = setTimeout(() => {
        setpatientorderbautistaproductToastClosing(true);
        setTimeout(() => {
          setpatientorderbautistaproductToast(false);
          setProgressWidth('0%');
        }, 300);
      }, 4000);

      return () => {
        clearTimeout(progresstimer);
        clearTimeout(toasttimer);
      }
    }
  }, [patientorderambherproductToast, patientorderbautistaproductToast]);





  const getphilippineDate = () => {
    const now = new Date();
    return new Date(now.getTime() + (8 * 60 * 60 * 1000));
  };
  const dateinphNow = getphilippineDate();
  const dateinphtomorrow = new Date(dateinphNow);
  dateinphtomorrow.setDate(dateinphNow.getDate() + 1);
  dateinphtomorrow.setHours(0,0,0,0);

  // Calculate dates
  const dateinphmaxdate = new Date(dateinphNow);
  dateinphmaxdate.setDate(dateinphNow.getDate() + 30);
  dateinphmaxdate.setHours(23,59,59,999);





  //Deletes the product from the wishlist after order and automatic refresh
  const patientwishlistproductremovefromWishlist = async (wishlistItemId, clinicType) => {

    try {



      const response = await fetch(`http://localhost:3000/api/patientwishlistinventoryproduct/${wishlistItemId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
        }});
    

      if (!response.ok) {
        throw new Error("Failed to remove from wishlist");
      }

      if (clinicType === 'ambher') {
        setAmbherWishlist(prev => prev.filter(item => item._id !== wishlistItemId));
      } else {
        setBautistaWishlist(prev => prev.filter(item => item._id !== wishlistItemId));
      }
      


    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };







  //Submitting ambher patient order
  const submitpatientorderambher = async (e) => {
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
        patientorderambherproductid: selectedambherproduct?.clinicproduct,
        patientorderambherproductname: addambherinventoryproductname,
        patientorderambherproductbrand: addambherinventoryproductbrand,
        patientorderambherproductmodelnumber: addambherinventoryproductmodelnumber,
        patientorderambherproductimage:addambherinventoryproductimagepreviewimages,
        patientorderambherproductprice: addambherinventoryproductprice,
        patientorderambherproductquantity: ambhercount,
        patientorderambherproductsubtotal: addambherinventoryproductprice * ambhercount,
        patientorderambherproducttotal: addambherinventoryproductprice * ambhercount,
        patientorderambherproductpaymentmethod: 'Cash on Pickup',
        patientorderambherproductchosenpickupdate: patientorderambherproductchosenpickupdate,
        patientorderambherproductchosenpickuptime: 'Default',
        patientorderambherstatus: 'Pending',
        patientorderambherhistory: [{
          status: 'Pending',
          changedAt: new Date(),
          changedBy: `${patientfirstname} ${patientlastname}`
        }]
      };

      console.log('Submitting order:', orderData);

      // Submit order
      const response = await fetch('http://localhost:3000/api/patientorderambher', {
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

      if (selectedambherproduct?._id) {
        patientwishlistproductremovefromWishlist(selectedambherproduct._id, 'ambher');
      }

          setpatientorderambherproductisClicked(true);
          setpatientorderambherproductToastMessage("Order Submitted Successfully!");
          setpatientorderambherproductToast(true);
          setpatientorderambherproductToastClosing(false);
      console.log('Order successful:', result);

      
      setpatientorderambherproductchosenpickupdate("");
      setambherCount(1);
      setshowpatientambherviewproduct(false);
      

    } catch (error) {
      console.error('Submission error:', error);
        setpatientorderambherproductToastMessage(error.message);
        setpatientorderambherproductToast(true);
        setpatientorderambherproductToastClosing(false);
    }
  };  


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
        patientorderbautistaproductid: selectedbautistaproduct?.clinicproduct,
        patientorderbautistaproductname: addbautistainventoryproductname,
        patientorderbautistaproductbrand: addbautistainventoryproductbrand,
        patientorderbautistaproductmodelnumber: addbautistainventoryproductmodelnumber,
        patientorderbautistaproductimage:addbautistainventoryproductimagepreviewimages,
        patientorderbautistaproductprice: addbautistainventoryproductprice,
        patientorderbautistaproductquantity: bautistacount,
        patientorderbautistaproductsubtotal: addbautistainventoryproductprice * bautistacount,
        patientorderbautistaproducttotal: addbautistainventoryproductprice * bautistacount,
        patientorderbautistaproductpaymentmethod: 'Cash on Pickup',
        patientorderbautistaproductchosenpickupdate: patientorderbautistaproductchosenpickupdate,
        patientorderbautistaproductchosenpickuptime: 'Default',
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

      if (selectedbautistaproduct?._id) {
        patientwishlistproductremovefromWishlist(selectedbautistaproduct._id, 'bautista');
      }

          setpatientorderbautistaproductisClicked(true);
          setpatientorderbautistaproductToastMessage("Order Submitted Successfully!");
          setpatientorderbautistaproductToast(true);
          setpatientorderbautistaproductToastClosing(false);
      console.log('Order successful:', result);

      
      setpatientorderbautistaproductchosenpickupdate("");
      setbautistaCount(1);
      setshowpatientbautistaviewproduct(false);
      

    } catch (error) {
      console.error('Submission error:', error);
        setpatientorderbautistaproductToastMessage(error.message);
        setpatientorderbautistaproductToast(true);
        setpatientorderbautistaproductToastClosing(false);
    }
  };  








































    return (
      <>

      {/* NavBar */}
      <div className=" bg-white w-[100vw]">
        <header id="header" className="top-0 absolute flex justify-between items-center text-black  md:px-32 bg-white w-full drop-shadow-md">
          <a id:logocontain href="#">
            <img src={navlogo} alt="" className="w-33  hover:scale-105 transition-all"></img>
          </a>

          <ul id:listcontain  className="hidden xl:flex items-center gap-12 font-semibold text-base">
          <Link to="/patientlandingpage" className="text-[#000000] hover:text-white no-underline"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white text-black  rounded-md transition-all cursor-pointer">Home</li></Link>
          <Link to="/patientdashboard"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Appointments</li></Link>
          <Link to="/patientproducts"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Store</li></Link>
          <Link to="/patientproducts"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Wishlist</li></Link>
          <Link to="/patientorders"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Orders</li></Link>





          </ul>

        {/* Search 
        
                <div className="relative hidden md:flex items-center justify-center gap-3">
            <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
            <input type="text" placeholder="Search..." className="py-2 pl-10 rounded-xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500"></input>
          </div>
          
        */}



  
      {localStorage.getItem ("patienttoken")? (

        
      <div id="profilecard" className="relative items-center justify-center flex">
      <div id="profile" onClick={showlogout}  className="ml-3  flex justify-center items-center bg-[#fbfbfb00] border-2 border-gray-200  shadow-lg  rounded-full hover:cursor-pointer hover:scale-105 transition-all">
      <img src={patientprofilepicture || 'default-profile.png'} alt="Profile" className="h-13 w-13 rounded-full"></img>
      </div>

  {showlogoutbtn && (
      <div className="w-75 flex-col  p-5  motion-preset-fade absolute top-full mt-2  flex justify-center items-start bg-[#ffffff] rounded-2xl hover:cursor-pointer  transition-all" >


        <div className="hover:bg-[#f7f7f7] transition-all duration-300 ease-in-out py-2 px-1 rounded-2xl  gap-3 flex items-center h-auto w-full ">
          <img src={patientprofilepicture}  className="w-12 rounded-full"/>
          <h1 className="font-albertsans font-semibold text-[19px]">{patientfirstname}</h1>
        </div>
        <div className="border-b-2 rounded-full border-[#747474] h-1 w-full my-1">

        </div>

      {localStorage.getItem("patienttoken") && (
        <Link to="/patientinformation" className="w-full"><div className="gap-2 flex items-center py-2 px-1 hover:bg-[#f7f7f7]  duration-300 ease-in-out  hover:text-[#000000] rounded-2xl transition-all cursor-pointer"> <img src={profileuser} className="w-9 h-9"/><h1 className="text-[16px] text-[#202020]">Demographic Profile</h1></div></Link>
      )}


      <div 
        id="logoutdiv" 
        className="mt-2 px-1 py-2 hover:bg-[#f7f7f7]   flex items-center gap-2 w-full  rounded-2xl hover:cursor-pointer transition-all" 
        onClick={handlelogout}
      >
      <img src={logout} className="w-9 h-9"/>
      <p className="font-semibold text-[#E04F5F] text-[16px]">Logout</p>
    </div> 
    </div>   
  )}
      </div>

      
        
      ):(
        <Link to="/userlogin">
          <div className="ml-3  flex justify-center items-center p-3 bg-[#027bbf] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" onClick={handlelogout}>
          <i className="bx bx-user-circle mt-1 pr-2 font-semibold text-white text-[17px]"/>
          <p className="font-semibold text-white text-[17px]">Login</p>
        </div>
        </Link>
      )
    
    }
      

      {/* Dropdown menu 
              <div className="bx bx-menu block  sm:opacity-100 text-5xl cursor-pointer" onClick={() => setismenuopen(!ismenuopen)}></div>
          <div className={`absolute xl:hidden top-24 left-0 w-full text-white bg-sky-700 rounded-3xl mt-5 mr-5 ml-5 flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform
            ${ismenuopen ? "opacity-100" : "opacity-0"}`} style={{transition: "transform 0.3s ease, opacity 0.3s ease"}}>


            <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-p">Home</li>
            <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">Product</li>
            <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">Explore</li>
            <li className="list-none w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer">Contact</li>
            </div>
  */}


        </header>
      </div>











      {/* First Section */} {/* First Section */} {/* First Section */} {/* First Section */}
      <section className="bg-cover bg-center h-auto w-[100vw] flex justify-center align-center" >
      <div className="bg-cover bg-center h-auto w-full flex items-center justify-center " >

        <div className="w-full h-auto flex flex-col justify-start items-start pt-3 p-3">






                <div id="inventorymanagement" className="pl-5 pr-5 pb-4 pt-4  transition-all duration-300  ease-in-out  w-[100%] h-full bg-white " >   

                <div className=" flex items-center mt-8"><img src={heart} className="w-7 mr-2"/><h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">My Wishlist</h1></div>

    <div className="flex justify-start items-center mt-3 h-[60px]">
  {/*<div onClick={() => showinventorytable('allinventorytable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeinventorytable ==='allinventorytable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeinventorytable ==='allinventorytable' ? 'text-white' : ''}`}>All</h1></div>*/}
    <div onClick={() => showinventorytable('ambherinventorytable')}  className={`mr-3 hover:rounded-2xl hover:cursor-pointer transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeinventorytable ==='ambherinventorytable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeinventorytable ==='ambherinventorytable' ? 'text-white' : ''}`}>Ambher Optical   <span className="rounded-full text-sm px-2 bg-gray-200 text-gray-500 font-semibold   ml-2 ">{ambherWishlist.length}</span></h1></div>
    <div onClick={() => showinventorytable('bautistainventorytable')}  className={`ml-3 hover:rounded-2xl hover:cursor-pointer transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeinventorytable ==='bautistainventorytable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans  font-semibold text-[#5d5d5d] ${activeinventorytable ==='bautistainventorytable' ? 'text-white' : ''}`}>Bautista Eye Center <span className="rounded-full text-sm px-2 bg-gray-200 text-gray-500 font-semibold   ml-2 ">{bautistaWishlist.length}</span></h1></div>
    
    </div>


                  






            { activeinventorytable === 'ambherinventorytable' && ( <div id="ambherinventorytable" className="p-2  animate-fadeInUp flex  items-start  w-[100%] h-[83%] rounded-2xl mt-5" >

            <div className=" flex flex-col justify-start  ml-2 rounded-2xl w-[90%]  min-h-[540px] max-h-auto h-auto shadow-b-lg ">

                <div className=" w-[100%] rounded-2xl h-auto  flex flex-wrap content-start gap-3 pl-2 pt-2 ">
                  

                <div className="flex flex-wrap p-4">
          {loadingWishlist ? (
            <div>Loading Ambher Optical Wishlists...</div>
          ) : ambherWishlist.length === 0 ? (
            <div className="w-[90vw] h-[50vh] flex justify-center flex-col items-center "><img src={heartempty} className="w-17 h-17 mb-3"/><h1 className="font-semibold text-[25px]">Your wishlist is empty</h1><p className="text-[#4e4e4e] mb-5">Start adding items you love to keep track of them</p><Link to="/patientproducts"><div className="text-[15px] p-3 bg-[#2781af] text-white  hover:scale-105 rounded-md transition-all cursor-pointer">Continue Shopping</div></Link></div>
          ) : (
                [...ambherWishlist]
                .sort((a, b) => {
                  if (a.patientwishlistinventoryproductquantity === 0 && b.patientwishlistinventoryproductquantity !== 0) return 1;
                  if (a.patientwishlistinventoryproductquantity !== 0 && b.patientwishlistinventoryproductquantity === 0) return -1;
                  return 0;}) .map((item) => (
                <div key={item._id}  onClick={() => {                        setshowpatientambherviewproduct(true);
                                                                            setselectedambherproduct(item);
                                                                            setambhercurrentimageindex(0);
                                                                            setambherinventorycategorynamebox(item.patientwishlistinventoryproductcategory || '');
                                                                            setaddambherinventoryproductname(item.patientwishlistinventoryproductname || '');
                                                                            setaddambherinventoryproductbrand(item.patientwishlistinventoryproductbrand || '');
                                                                            setaddambherinventoryproductmodelnumber(item.patientwishlistinventoryproductmodelnumber || '');
                                                                            setaddambherinventoryproductdescription(item.patientwishlistinventoryproductdescription || '');
                                                                            setaddambherinventoryproductprice(item.patientwishlistinventoryproductprice || 0);
                                                                            setaddambherinventoryproductquantity(item.patientwishlistinventoryproductquantity || 0);
                                                                            setaddambherinventoryproductimagepreviewimages(item.patientwishlistinventoryproductimagepreviewimages || []);
                }} className="motion-preset-slide-up mr-3 mb-3 flex flex-col items-start justify-start w-[220px] h-auto shadow-md bg-white rounded-2xl">
                  <img src={item.patientwishlistinventoryproductimagepreviewimages[0] || defaultimageplaceholder}  alt={item.patientwishlistinventoryproductname} className={`w-full h-45 ${item.patientwishlistinventoryproductquantity === 0 ? 'opacity-50': ''}`}/>
                  <img  src={heartfilled} onClick={(e) =>  { e.stopPropagation(); handleRemoveFromWishlist(item._id, 'ambher');  }} onMouseEnter={() => !ambherheartisClicked && setambherheartisHovered(true)} onMouseLeave={() => !ambherheartisClicked && setambherheartisHovered(false)}  className={`absolute right-0 ease-in-out duration-300 transition-all  border-1  w-10 h-10 p-2 rounded-2xl cursor-pointer  bg-red-400 hover:bg-red-500`}/>
                  <div className=" mx-1  w-fit rounded-md py-1 px-2  rounded-1xl h-fit  mt-2 break-words min-w-0 bg-[#F0F6FF]"><h1 className= {`font-medium   text-[#0d0d0d] text-[13px] min-w-0 break-words ${item.patientwishlistinventoryproductquantity === 0 ? 'text-gray-400': ''}`}>{item.patientwishlistinventoryproductcategory}</h1></div>
                      <div className="w-full h-auto ml-2 mt-2 "><h1 className={` font-semibold  text-[15px] min-w-0 break-words ${item.patientwishlistinventoryproductquantity === 0 ? 'text-gray-400': ''}`}>{item.patientwishlistinventoryproductname}</h1></div>
                      <div className="w-fit h-auto ml-2 mt-1 "><h1 className={`font-albertsans font-bold text-[18px] min-w-0 break-words ${item.patientwishlistinventoryproductquantity === 0 ? 'text-gray-400': ''}`}>₱ {item.patientwishlistinventoryproductprice?.toLocaleString()}</h1></div>
                  {/*<div className="w-full h-auto ml-2 mt-5 mb-5 "><h1 className={`font-albertsans font-medium text-[#4e4f4f] text-[15px] min-w-0 break-words ${item.patientwishlistinventoryproductquantity === 0 ? 'text-gray-400': ''}`}>0 Sold</h1></div>*/}

                  {item.patientwishlistinventoryproductquantity === 0 ? (
                    <div className="w-full py-1 flex justify-center items-center bg-[#b94c4c] rounded-b-2xl"><h1 className="font-semibold text-white">Out of Stock</h1></div>
                  ): null}


                </div>
                    ))
                  )}
                </div>

                
                

                </div>
            </div>

            </div>)}


        {/*Toast Message when wishlist button is clicked*/}
            {ambhershowheartToast && (
              <div className="top-4  -translate-x-1/2  z-100   left-1/2 transform fixed " >
                    <div key={ambherheartisClicked ? 'added' : 'removed'}  className={` ${ambhershowtoastmessageClosing ? 'motion-opacity-out-0' : 'motion-preset-bounce'}  flex items-center bg-white   rounded-md shadow-lg text-gray-900 font-semibold px-6 py-3`} >
                      {ambherheartisClicked ? (          
                        <span className="text-green-800 font-semibold text-[20px]"><i className="mr-2 bx bx-check-circle "></i></span>
                      ) : (
                        <span className="text-red-800 font-semibold text-[20px]"><i className="mr-2 bx bx-x-circle "></i></span>
                      )}
                      {ambhershowtoastMessage}
                    </div>
            
              </div>
            )}



  {showpatientambherviewproduct && (

                          <div className="overflow-y-auto h-auto  bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                            <div className="motion-opacity-in-0 mt-10 pl-5 pr-5 bg-[#fefefe] rounded-2xl w-[1300px] h-auto mb-10 animate-fadeInUp ">
                                  <div className=" mt-5  flex justify-end items-center left-0 w-[100%] h-[70px]">
                    
                                    <div onClick={() => {setambherCount(1); setselectedambherproduct(null); setshowpatientambherviewproduct(false)}} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                                  </div>


                            <form className="flex flex-col  ml-15 mr-15 mt-5    pb-10" >
                                  <div className=" flex justify-center items-start rounded-2xl w-full h-auto">
                                    <div className=" pb-10 w-full h-full mr-15 rounded-2xl flex justify-center mb-20">



                                        <div className=" h-fit w-fit flex-none">
    
                                  <div className=" relative">
                                  
                                  <div className="flex items-center justify-end">
                        
                                  

                                  
                                  </div>
                                  <img  className="mt-2 w-120 object-cover rounded-2xl h-120" src={(selectedambherproduct?.ambherinventoryproductimagepreviewimages?.[ambhercurrentimageindex]) || (addambherinventoryproductimagepreviewimages?.[ambhercurrentimageindex]) || defaultimageplaceholder}/>

                                      {((selectedambherproduct?.ambherinventoryproductimagepreviewimages?.length || 0) > 1 || 
                                        addambherinventoryproductimagepreviewimages?.length > 1) && (
                                          <>
                                            <div type="button" onClick={ambherhandlepreviousimage}  className="bg-opacity-50 hover:bg-opacity-75 rounded-2xl text-white p-2 absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-500"><i className="bx bx-chevron-left text-2xl" /></div>

                                            <div type="button" onClick={ambherhandlenextimage}  className="rounded-2xl absolute bg-opacity-50 text-white p-2 transform -translate-y-1/2 bg-gray-500 hover:bg-opacity-75 right-2 top-1/2">  <i className="bx bx-chevron-right text-2xl" /></div>

                                          </>
                                        )}

                                        {addambherinventoryproductimagepreviewimages.length > 0 && (
                                            <div className="overflow-x-auto flex gap-2 mt-2 p-4 border-y-1 rounded-2xl bg-[#fbfbfb]  items-center ">
                                              {addambherinventoryproductimagepreviewimages.map((preview, index) => (
                                                  <div key={index} className="relative">
                                                  <img onClick={() => setambhercurrentimageindex(index)} src={preview} className={`rounded-lg cursor-pointer object-cover w-20 h-20 ${ambhercurrentimageindex === index ? 'border-2 border-[#78b0d4]' : ''}`} />
                                                </div>
                                              ))}
                                            </div>
                                          )}

                                      </div>
                                        
                                        

                                        </div>



                                    </div>

                                    <div className="  w-full h-auto flex items-start mb-10 rounded-2xl min-w-0">
                                          <div className=" w-[100%] h-auto  rounded-4xl">
                                    
                                    
                
               <div className=" w-[100%] registration-container">

                                    
                                        <div className="flex items-center mx-1  w-fit  h-fit  mt-2 break-words min-w-0 "><h1 className="font-albertsans rounded-md py-1 px-2  rounded-1xl bg-[#F0F6FF] font-medium   text-[#0d0d0d]  min-w-0 break-words ">{ambherinventorycategorynamebox}</h1>
                                        <p className="font-albertsans ml-1">by</p>
                                        <p className="font-albertsans ml-1 font-semibold  ">{addambherinventoryproductbrand}</p>
                                        </div>
                                        
                                     

                                        <h1 className="font-albertsans mt-3 min-w-0 break-words h-fit w-full font-albertsans font-bold text-[#212121] text-[29px]">{addambherinventoryproductname}</h1>
                         
                                        <div className="mt-1 flex items-center">
                                          <img src={starimage} className="w-5 h-5"/>
                                          <p className="font-albertsans ml-2 mt-1 text-[15px] font-semibold">4.8</p><span className="mt-1 text-[13px] pr-3 ml-2">(89 reviews)</span>
                                          
                                         {/*<p className="mt-1 font-albertsans border-l-2  border-[#8c8c8c] pl-3  text-[13px]">0 sold</p>*/}
                                        </div>
                        
                                  
                                        <p className="mt-5 font-albertsans font-semibold text-[#478d12] text-[40px]">₱{Number(addambherinventoryproductprice).toLocaleString('en-PH', {minimumFractionDigits: 2,  maximumFractionDigits: 2})}</p>
                                  
                                        <p className="font-albertsans mt-6  font-medium text-[#020202] text-[18px]">Description</p>
                                        <p className="font-albertsans font-semibold text-[#4b4b4b] mt-3">{addambherinventoryproductdescription}</p>
                                      
                                       

                                      {addambherinventoryproductquantity === 0 ? ( 
                                        <div className="bg-gray-400 py-2 px-3 rounded-md justify-center  gap-4 mt-15 flex items-center">
                                          <p className="font-albertsans font-semibold ">Out of Stock</p>
                                         </div>
                                       
                                      ):(
                                        <div className="gap-4 mt-15 flex items-center">
                                          <p className="font-albertsans font-semibold ">In Stock:</p>
                                          <p className="font-albertsans font-semibold text-[#616161] text-[14px]">{addambherinventoryproductquantity} pieces available </p>
                                         </div>
                                      )}    



                                           <div className="flex w-auto items-center justify-between mt-10 h-22 w-full bg-[#fbfbfb] rounded-2xl">
                                              <div className="gap-2 h-full w-40 flex items-center flex-col justify-center"><img src={find} className="w-8 h-8"/><p className="font-albertsans text-[13px] font-medium">Browse Products</p></div>
                                              <div className="gap-2 h-full w-30 flex items-center flex-col justify-center"><img src={nextimage} className="w-8 h-8"/></div>
                                              <div className="gap-2 h-full w-auto min-w-[160px] flex items-center flex-col justify-center"><img src={storeimage} className="w-8 h-8"/> <p className="font-albertsans text-[13px] font-medium whitespace-nowrap">Go to Ambher Optical</p></div>
                                              <div className="gap-2 h-full w-30 flex items-center flex-col justify-center"><img src={nextimage} className="w-8 h-8"/></div>
                                              <div className="gap-2 h-full w-40 flex items-center flex-col justify-center"><img src={inquire} className="w-8 h-8"/><p className=" font-albertsans text-[13px] font-medium">Inquire</p></div>
                                           </div>
                                   
                                        </div>
                                  

                                    
                                          </div>


                                    </div>

                                  </div>

                                  <div className="w-auto h-full  ">
                                    <h1 className="font-albertsans mt-8 text-[21px] font-semibold text-[#171717]">Product Ratings</h1>
                                    <div className="border-2 border-[#a0c1d1] flex items-center justify-between mt-2 w-full h-20 p-6 py-15 bg-[#f7fdff] rounded-2xl">
                                      <div>
                                      <h1 className="text-[20px] text-[#05415c]"><span className="text-[30px] font-semibold">4.9</span> out of 5</h1>
                                      <Stack spacing={1}>
                                        <Rating name="half-rating-read" defaultValue={4.5} precision={5} readOnly />
                                    </Stack>
                                      </div>

                                      <h1 className="text-[20px] text-[#05415c] ml-5 ">(89 Total Reviews)</h1>
                                    </div>
                                    
                                <div className="w-full h-auto bg-[#ffffff]">
                                <div className="border-b-2 py-5">
                                  <div className="px-2 mt-5 flex h-auto w-fit items-start">
                                    <div className="h-11 w-11 flex-shrink-0">
                                      <img 
                                        src={patientprofilepicture || 'default-profile.png'} 
                                        alt="Profile" 
                                        className="h-11 w-11 rounded-full object-cover"
                                      />
                                    </div>

                                    <div className="ml-3 flex flex-col pb-2">
                                      <h1 className="font-albertsans font-medium text-[#2b2b2b]">Francis Daniel M. Genese</h1>
                                      <Stack spacing={1}>
                                        <Rating name="half-rating-read" defaultValue={4.5} precision={5} readOnly size="small" />
                                      </Stack>
                                      <p className="ml-0 mt-1 text-[12px] font-semibold text-[#444444]">2025-06-24 22:04</p>
                                      <p className="text-[14px] font-albertsans mt-4">
                                        Vention has 100% legit cable wires and cable cords that you can use with your laptops, computers and gadgets. You will never regret purchasing equipment from his shop. Highly recommended for youtlr techie stuff. Thank you seller!
                                      </p>
                                    </div>

                                  </div>
                                </div>






                                
                                </div>
                                  </div>
                                  </form>
                            </div>
                          </div>
                

            )}

            {patientorderambherproductToast && (
              <div className=" bottom-4 right-8  z-101   transform fixed " >
                    <div key={patientorderambherproductisClicked ? 'added' : 'removed'}  className={` ${patientorderambherproductToastClosing ? 'motion-translate-x-out-100 motion-duration-[3s]  motion-ease-spring-smooth' : 'motion-preset-slide-left'}  flex items-center bg-white   rounded-md shadow-lg text-gray-900 font-semibold px-6 py-3`} >
                      {patientorderambherproductisClicked ? (          
                        <span className="text-green-800 font-semibold text-[20px]"><i className="mr-2 bx bx-check-circle "></i></span>
                      ) : (
                        <span className="text-red-800 font-semibold text-[20px]"><i className="mr-2 bx bx-x-circle "></i></span>
                      )}
                      {patientorderambherproductToastMessage}

                      <div  className={`rounded-b-2xl absolute bottom-0 left-0 h-1 bg-green-500 `}  style={{width: progressWidth,transition: 'width 4s linear' }}/>

                    </div>
            
              </div>  
            )}






          { activeinventorytable === 'bautistainventorytable' && ( <div id="bautistainventorytable" className="p-2  animate-fadeInUp flex  items-start  w-[100%] h-[83%] rounded-2xl mt-5" >

            <div className=" flex flex-col justify-start  ml-2 rounded-2xl w-[90%]  min-h-[540px] max-h-auto h-auto shadow-b-lg ">

                <div className=" w-[100%] rounded-2xl h-auto  flex flex-wrap content-start gap-3 pl-2 pt-2 ">
                  

                <div className="flex flex-wrap p-4">
          {loadingWishlist ? (
            <div>Loading Bautista Eye Center Wishlists...</div>
          ) : bautistaWishlist.length === 0 ? (
            <div className="w-[90vw] h-[50vh] flex justify-center flex-col items-center "><img src={heartempty} className="w-17 h-17 mb-3"/><h1 className="font-semibold text-[25px]">Your wishlist is empty</h1><p className="text-[#4e4e4e] mb-5">Start adding items you love to keep track of them</p><Link to="/patientproducts"><div className="text-[15px] p-3 bg-[#2781af] text-white  hover:scale-105 rounded-md transition-all cursor-pointer">Continue Shopping</div></Link></div>
          ) : (
                [...bautistaWishlist]
                .sort((a, b) => {
                  if (a.patientwishlistinventoryproductquantity === 0 && b.patientwishlistinventoryproductquantity !== 0) return 1;
                  if (a.patientwishlistinventoryproductquantity !== 0 && b.patientwishlistinventoryproductquantity === 0) return -1;
                  return 0;}) .map((item) => (
                <div key={item._id}  onClick={() => {                        setshowpatientbautistaviewproduct(true);
                                                                            setselectedbautistaproduct(item);
                                                                            setbautistacurrentimageindex(0);
                                                                            setbautistainventorycategorynamebox(item.patientwishlistinventoryproductcategory || '');
                                                                            setaddbautistainventoryproductname(item.patientwishlistinventoryproductname || '');
                                                                            setaddbautistainventoryproductbrand(item.patientwishlistinventoryproductbrand || '');
                                                                            setaddbautistainventoryproductmodelnumber(item.patientwishlistinventoryproductmodelnumber || '');
                                                                            setaddbautistainventoryproductdescription(item.patientwishlistinventoryproductdescription || '');
                                                                            setaddbautistainventoryproductprice(item.patientwishlistinventoryproductprice || 0);
                                                                            setaddbautistainventoryproductquantity(item.patientwishlistinventoryproductquantity || 0);
                                                                            setaddbautistainventoryproductimagepreviewimages(item.patientwishlistinventoryproductimagepreviewimages || []);
                }} className="motion-preset-slide-up mr-3 mb-3 flex flex-col items-start justify-start w-[220px] h-auto shadow-md bg-white rounded-2xl">
                  <img src={item.patientwishlistinventoryproductimagepreviewimages[0] || defaultimageplaceholder}  alt={item.patientwishlistinventoryproductname} className={`w-full h-45 ${item.patientwishlistinventoryproductquantity === 0 ? 'opacity-50': ''}`}/>
                  <img  src={heartfilled} onClick={(e) =>  { e.stopPropagation(); handleRemoveFromWishlist(item._id, 'bautista');  }} onMouseEnter={() => !bautistaheartisClicked && setbautistaheartisHovered(true)} onMouseLeave={() => !bautistaheartisClicked && setbautistaheartisHovered(false)}  className={`absolute right-0 ease-in-out duration-300 transition-all  border-1  w-10 h-10 p-2 rounded-2xl cursor-pointer  bg-red-400 hover:bg-red-500`}/>
                  <div className=" mx-1  w-fit rounded-md py-1 px-2  rounded-1xl h-fit  mt-2 break-words min-w-0 bg-[#F0F6FF]"><h1 className= {`font-medium   text-[#0d0d0d] text-[13px] min-w-0 break-words ${item.patientwishlistinventoryproductquantity === 0 ? 'text-gray-400': ''}`}>{item.patientwishlistinventoryproductcategory}</h1></div>
                      <div className="w-full h-auto ml-2 mt-2 "><h1 className={` font-semibold  text-[15px] min-w-0 break-words ${item.patientwishlistinventoryproductquantity === 0 ? 'text-gray-400': ''}`}>{item.patientwishlistinventoryproductname}</h1></div>
                      <div className="w-fit h-auto ml-2 mt-1 "><h1 className={`font-albertsans font-bold text-[18px] min-w-0 break-words ${item.patientwishlistinventoryproductquantity === 0 ? 'text-gray-400': ''}`}>₱ {item.patientwishlistinventoryproductprice?.toLocaleString()}</h1></div>
                  {/*<div className="w-full h-auto ml-2 mt-5 mb-5 "><h1 className={`font-albertsans font-medium text-[#4e4f4f] text-[15px] min-w-0 break-words ${item.patientwishlistinventoryproductquantity === 0 ? 'text-gray-400': ''}`}>0 Sold</h1></div>*/}

                  {item.patientwishlistinventoryproductquantity === 0 ? (
                    <div className="w-full py-1 flex justify-center items-center bg-[#b94c4c] rounded-b-2xl"><h1 className="font-semibold text-white">Out of Stock</h1></div>
                  ): null}


                </div>
                    ))
                  )}
                </div>

                
                

                </div>
            </div>

            </div>)}


        {/*Toast Message when wishlist button is clicked*/}
            {bautistashowheartToast && (
              <div className="top-4  -translate-x-1/2  z-100   left-1/2 transform fixed " >
                    <div key={bautistaheartisClicked ? 'added' : 'removed'}  className={` ${bautistashowtoastmessageClosing ? 'motion-opacity-out-0' : 'motion-preset-bounce'}  flex items-center bg-white   rounded-md shadow-lg text-gray-900 font-semibold px-6 py-3`} >
                      {bautistaheartisClicked ? (          
                        <span className="text-green-800 font-semibold text-[20px]"><i className="mr-2 bx bx-check-circle "></i></span>
                      ) : (
                        <span className="text-red-800 font-semibold text-[20px]"><i className="mr-2 bx bx-x-circle "></i></span>
                      )}
                      {bautistashowtoastMessage}
                    </div>
            
              </div>
            )}




            {showpatientbautistaviewproduct && (

                          <div className="overflow-y-auto h-auto  bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                            <div className="motion-opacity-in-0 mt-10 pl-5 pr-5 bg-[#fefefe] rounded-2xl w-[1300px] h-auto mb-10 animate-fadeInUp ">
                                  <div className=" mt-5  flex justify-end items-center left-0 w-[100%] h-[70px]">
                    
                                    <div onClick={() => {setbautistaCount(1); setshowpatientbautistaviewproduct(false)}} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                                  </div>


                            <form className="flex flex-col  ml-15 mr-15 mt-5    pb-10" >
                                  <div className=" flex justify-center items-start rounded-2xl w-full h-auto">
                                    <div className=" pb-10 w-full h-full mr-15 rounded-2xl flex justify-center mb-20">



                                        <div className=" h-fit w-fit flex-none">
    
                                  <div className=" relative">
                                  
                                  <div className="flex items-center justify-end">

                                  </div>
                                  <img  className="mt-2 w-120 object-cover rounded-2xl h-120" src={(selectedbautistaproduct?.bautistainventoryproductimagepreviewimages?.[bautistacurrentimageindex]) || (addbautistainventoryproductimagepreviewimages?.[bautistacurrentimageindex]) || defaultimageplaceholder}/>

                                      {((selectedbautistaproduct?.bautistainventoryproductimagepreviewimages?.length || 0) > 1 || 
                                        addbautistainventoryproductimagepreviewimages?.length > 1) && (
                                          <>
                                            <div type="button" onClick={bautistahandlepreviousimage}  className="bg-opacity-50 hover:bg-opacity-75 rounded-2xl text-white p-2 absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-500"><i className="bx bx-chevron-left text-2xl" /></div>

                                            <div type="button" onClick={bautistahandlenextimage}  className="rounded-2xl absolute bg-opacity-50 text-white p-2 transform -translate-y-1/2 bg-gray-500 hover:bg-opacity-75 right-2 top-1/2">  <i className="bx bx-chevron-right text-2xl" /></div>

                                          </>
                                        )}

                                        {addbautistainventoryproductimagepreviewimages.length > 0 && (
                                            <div className="overflow-x-auto flex gap-2 mt-2 p-4 border-y-1 rounded-2xl bg-[#fbfbfb]  items-center ">
                                              {addbautistainventoryproductimagepreviewimages.map((preview, index) => (
                                                  <div key={index} className="relative">
                                                  <img onClick={() => setbautistacurrentimageindex(index)} src={preview} className={`rounded-lg cursor-pointer object-cover w-20 h-20 ${bautistacurrentimageindex === index ? 'border-2 border-[#78b0d4]' : ''}`} />
                                                </div>
                                              ))}
                                            </div>
                                          )}

                                      </div>
                                        
                                        

                                        </div>



                                    </div>

                                    <div className="  w-full h-auto flex items-start mb-10 rounded-2xl min-w-0">
                                          <div className=" w-[100%] h-auto  rounded-4xl">
                                    
                                    
                
               <div className=" w-[100%] registration-container">

                                    
                                        <div className="flex items-center mx-1  w-fit  h-fit  mt-2 break-words min-w-0 "><h1 className="font-albertsans rounded-md py-1 px-2  rounded-1xl bg-[#F0F6FF] font-medium   text-[#0d0d0d]  min-w-0 break-words ">{bautistainventorycategorynamebox}</h1>
                                        <p className="font-albertsans ml-1">by</p>
                                        <p className="font-albertsans ml-1 font-semibold  ">{addbautistainventoryproductbrand}</p>
                                        </div>
                                        
                                     

                                        <h1 className="font-albertsans mt-3 min-w-0 break-words h-fit w-full font-albertsans font-bold text-[#212121] text-[29px]">{addbautistainventoryproductname}</h1>
                         
                                        <div className="mt-1 flex items-center">
                                          <img src={starimage} className="w-5 h-5"/>
                                          <p className="font-albertsans ml-2 mt-1 text-[15px] font-semibold">4.8</p><span className="mt-1 text-[13px] pr-3 ml-2">(89 reviews)</span>
                                          
                                          {/*<p className="mt-1 font-albertsans border-l-2  border-[#8c8c8c] pl-3  text-[13px]">0 sold</p>*/}
                                        </div>
                        
                                  
                                        <p className="mt-5 font-albertsans font-semibold text-[#478d12] text-[40px]">₱{Number(addbautistainventoryproductprice).toLocaleString('en-PH', {minimumFractionDigits: 2,  maximumFractionDigits: 2})}</p>
                                  
                                        <p className="font-albertsans mt-6  font-medium text-[#020202] text-[18px]">Description</p>
                                        <p className="font-albertsans font-semibold text-[#4b4b4b] mt-3">{addbautistainventoryproductdescription}</p>
                                      
                                       

                                      {addbautistainventoryproductquantity === 0 ? ( 
                                        <div className="bg-gray-400 py-2 px-3 rounded-md justify-center  gap-4 mt-15 flex items-center">
                                          <p className="font-albertsans font-semibold ">Out of Stock</p>
                                         </div>
                                       
                                      ):(
                                        <div className="gap-4 mt-15 flex items-center">
                                          <p className="font-albertsans font-semibold ">In Stock:</p>
                                          <p className="font-albertsans font-semibold text-[#616161] text-[14px]">{addbautistainventoryproductquantity} pieces available </p>
                                         </div>
                                      )}    



                                           <div className="flex w-auto items-center justify-between mt-10 h-22 w-full bg-[#fbfbfb] rounded-2xl">
                                              <div className="gap-2 h-full w-40 flex items-center flex-col justify-center"><img src={find} className="w-8 h-8"/><p className="font-albertsans text-[13px] font-medium">Browse Products</p></div>
                                              <div className="gap-2 h-full w-30 flex items-center flex-col justify-center"><img src={nextimage} className="w-8 h-8"/></div>
                                              <div className="gap-2 h-full w-auto min-w-[160px] flex items-center flex-col justify-center"><img src={storeimage} className="w-8 h-8"/> <p className="font-albertsans text-[13px] font-medium whitespace-nowrap">Go to Bautista Eye Center</p></div>
                                              <div className="gap-2 h-full w-30 flex items-center flex-col justify-center"><img src={nextimage} className="w-8 h-8"/></div>
                                              <div className="gap-2 h-full w-40 flex items-center flex-col justify-center"><img src={inquire} className="w-8 h-8"/><p className=" font-albertsans text-[13px] font-medium">Inquire</p></div>
                                           </div>
                                   
                                        </div>
                                  

                                    
                                          </div>


                                    </div>

                                  </div>

                                  <div className="w-auto h-full  ">
                                    <h1 className="font-albertsans mt-8 text-[21px] font-semibold text-[#171717]">Product Ratings</h1>
                                    <div className="border-2 border-[#a0c1d1] flex items-center justify-between mt-2 w-full h-20 p-6 py-15 bg-[#f7fdff] rounded-2xl">
                                      <div>
                                      <h1 className="text-[20px] text-[#05415c]"><span className="text-[30px] font-semibold">4.9</span> out of 5</h1>
                                      <Stack spacing={1}>
                                        <Rating name="half-rating-read" defaultValue={4.5} precision={5} readOnly />
                                    </Stack>
                                      </div>

                                      <h1 className="text-[20px] text-[#05415c] ml-5 ">(89 Total Reviews)</h1>
                                    </div>
                                    
                                <div className="w-full h-auto bg-[#ffffff]">
                                <div className="border-b-2 py-5">
                                  <div className="px-2 mt-5 flex h-auto w-fit items-start">
                                    <div className="h-11 w-11 flex-shrink-0">
                                      <img 
                                        src={patientprofilepicture || 'default-profile.png'} 
                                        alt="Profile" 
                                        className="h-11 w-11 rounded-full object-cover"
                                      />
                                    </div>

                                    <div className="ml-3 flex flex-col pb-2">
                                      <h1 className="font-albertsans font-medium text-[#2b2b2b]">Francis Daniel M. Genese</h1>
                                      <Stack spacing={1}>
                                        <Rating name="half-rating-read" defaultValue={4.5} precision={5} readOnly size="small" />
                                      </Stack>
                                      <p className="ml-0 mt-1 text-[12px] font-semibold text-[#444444]">2025-06-24 22:04</p>
                                      <p className="text-[14px] font-albertsans mt-4">
                                        Vention has 100% legit cable wires and cable cords that you can use with your laptops, computers and gadgets. You will never regret purchasing equipment from his shop. Highly recommended for youtlr techie stuff. Thank you seller!
                                      </p>
                                    </div>

                                  </div>
                                </div>






                                
                                </div>
                                  </div>
                                  </form>
                            </div>
                          </div>
                

            )}

            {patientorderbautistaproductToast && (
              <div className=" bottom-4 right-8  z-101   transform fixed " >
                    <div key={patientorderbautistaproductisClicked ? 'added' : 'removed'}  className={` ${patientorderbautistaproductToastClosing ? 'motion-translate-x-out-100 motion-duration-[3s]  motion-ease-spring-smooth' : 'motion-preset-slide-left'}  flex items-center bg-white   rounded-md shadow-lg text-gray-900 font-semibold px-6 py-3`} >
                      {patientorderbautistaproductisClicked ? (          
                        <span className="text-green-800 font-semibold text-[20px]"><i className="mr-2 bx bx-check-circle "></i></span>
                      ) : (
                        <span className="text-red-800 font-semibold text-[20px]"><i className="mr-2 bx bx-x-circle "></i></span>
                      )}
                      {patientorderbautistaproductToastMessage}

                      <div  className={`rounded-b-2xl absolute bottom-0 left-0 h-1 bg-green-500 `}  style={{width: progressWidth,transition: 'width 4s linear' }}/>

                    </div>
            
              </div>  
            )}







                </div> 

        </div>
        

        </div>

















        
          </section>



      </>
    )
    }
          
  export default PatientWishlist