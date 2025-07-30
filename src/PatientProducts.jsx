import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import navlogo from  "../src/assets/images/navlogo.png";

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

import nextimage from "../src/assets/images/next.png";
import paymentimage from "../src/assets/images/card-payment.png";
import { AmbherinventorycategoryBox } from "./components/AmbherinventorycategoryBox";
import { BautistainventorycategoryBox } from "./components/BautistainventorycategoryBox";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
function PatientProducts(){













  
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
                
              //Fetch product wishlist counts
                const productIds = data.map(p => p.ambherinventoryproductid).join(',');
                const count = await fetchWishlistCounts(productIds, 'ambher');
                setWishlistCounts(prev => ({...prev, [selectedambherproduct?.ambherinventoryproductid]:count}));

              }catch(error){
                console.error("Failed fetching products: ", error);
                setambherloadingproducts(false);
              }
            };
          
          
            useEffect(() => {
              fetchambherproducts();
            }, []);
          
          
          
        





          const[showpatientambherviewproduct, setshowpatientambherviewproduct] = useState(false);
          const[showpatientorderambherscheduleandreview, setshowpatientorderambherscheduleandreview] = useState(false);
          const [ambherinventorycategorynamebox, setambherinventorycategorynamebox] = useState("");
          const [addambherinventoryproductname, setaddambherinventoryproductname] = useState("");
          const [addambherinventoryproductmodelnumber, setaddambherinventoryproductmodelnumber] = useState("");
          const [addambherinventoryproductbrand, setaddambherinventoryproductbrand] = useState("");
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

const [activebautistainventorycategorytable, setactivebautistainventorycategorytable] = useState('all');
const showbautistainventorycategory = (bautistainventorycategorytableid) => {
      setactivebautistainventorycategorytable(bautistainventorycategorytableid);
};

const [bautistainventorycategorylist, setbautistainventorycategorylist] = useState([]);

          const[showpatientbautistaviewproduct, setshowpatientbautistaviewproduct] = useState(false);
          const[showpatientorderbautistascheduleandreview, setshowpatientorderbautistascheduleandreview] = useState(false);
          const [bautistainventorycategorynamebox, setbautistainventorycategorynamebox] = useState("");
          const [addbautistainventoryproductname, setaddbautistainventoryproductname] = useState("");
          const [addbautistainventoryproductmodelnumber, setaddbautistainventoryproductmodelnumber] = useState("");
          const [addbautistainventoryproductbrand, setaddbautistainventoryproductbrand] = useState("");
          const [addbautistainventoryproductdescription, setaddbautistainventoryproductdescription] = useState("");
          const [addbautistainventoryproductprice, setaddbautistainventoryproductprice] = useState();
          const [addbautistainventoryproductquantity, setaddbautistainventoryproductquantity] = useState();
          const [addbautistainventoryproductimagepreviewimages, setaddbautistainventoryproductimagepreviewimages] = useState([]);
          const [bautistacurrentimageindex, setbautistacurrentimageindex] = useState(0);
          const [selectedbautistaproduct, setselectedbautistaproduct] = useState(null);
  
  const [bautistainventoryproducts, setbautistainventoryproducts] = useState([]);
  const [bautistaloadingproducts, setbautistaloadingproducts] = useState(true);


          


//Fetching Bautista Inventory Categories
useEffect(() => {
  const fetchbautistacategories = async () => {
    try{
      const response = await fetch('http://localhost:3000/api/bautistainventorycategory');
      if(!response.ok) throw new Error("Failed to fetch Bautista Inevntory Categories");



      const data = await response.json();
      setbautistainventorycategorylist(data);
    
      console.log("Bautista categories", data);

    }catch(error){
      console.error("Error fetching bautista categories: ", error);
    }
  };
  fetchbautistacategories();
}, []);



const fetchbautistainventorycategories = async () => {
  try{
    const response = await fetch('http://localhost:3000/api/bautistainventorycategory');
    if(!response.ok) throw new Error("Failed to retrieve bautista inventory categories");

    const data = await response.json();
    setbautistainventorycategorylist(data);
  }catch(error){
    console.error("Fetching bautistainventorycategory failed", error);
  }
};

useEffect(() => {
  fetchbautistainventorycategories();
}, []);




       
          
          //FETCHING PRODUCTS
          
            const fetchbautistaproducts = async () => {
              try{
                const response = await fetch('http://localhost:3000/api/bautistainventoryproduct', {
                  headers:{
                    'Authorization' : `Bearer ${localStorage.getItem("patienttoken")}`
                  }
                });
                
                if(!response.ok) throw new Error("Failed to fetch products");
          
                const data = await response.json();
                setbautistainventoryproducts(data);
                 setbautistaloadingproducts(false);

                 //Fetch product wishlist counts
                const productIds = data.map(p => p.bautistainventoryproductid).join(',');
                const count = await fetchWishlistCounts(productIds, 'bautista');
                setWishlistCounts(prev => ({...prev, [selectedbautistaproduct?.bautistainventoryproductid]:count}));


              }catch(error){
                console.error("Failed fetching products: ", error);
                setbautistaloadingproducts(false);
              }
            };
          
          
            useEffect(() => {
              fetchbautistaproducts();
            }, []);
          
          
          
        








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










    

  //PRODUCT ORDERING  //PRODUCT ORDERING  //PRODUCT ORDERING  //PRODUCT ORDERING  //PRODUCT ORDERING


  //AMBHER OPTICAL
    const [ambhercount, setambherCount] = useState(1)
    const [ambherheartisHovered, setambherheartisHovered] =useState(false);
    const [ambherheartisClicked, setambherheartisClicked] =useState(false);     
    const [ambhershowheartToast, setambhershowheartToast] = useState(false);
    const [ambhershowtoastMessage, setambhershowtoastMessage] = useState("");
    const [ambhershowtoastmessageClosing, setambhershowtoastmessageClosing] = useState(false);


const ambherhearthandleClick = (e) => {
  e.preventDefault();
  toggleWishlist(e);
};

const getambherHeartImage = () => {
  const productId = selectedambherproduct?.ambherinventoryproductid;
  const isInWishList = wishlistItems.some(item => item.patientwishlistinventoryproductid === productId);

  return isInWishList ? heartfilled : (ambherheartisHovered ? heartwhite : heartblack);
}


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

const bautistahearthandleClick = (e) => {
  e.preventDefault();
  toggleWishlist(e); // Use the unified toggle function
};

const getbautistaHeartImage = () => {
  const productId = selectedbautistaproduct?.bautistainventoryproductid;
  const isInWishList = wishlistItems.some(item => item.patientwishlistinventoryproductid === productId);

  return isInWishList ? heartfilled : (bautistaheartisHovered ? heartwhite : heartblack);
}


useEffect(() => {
  if(bautistashowheartToast){
    const bautistahearttoasttimer = setTimeout(() => {
      setbautistashowtoastmessageClosing(true); //
      setTimeout(() => setbautistashowheartToast(false), 300);}, 4000);
  
    return () => clearTimeout(bautistahearttoasttimer);
  }
}, [bautistashowheartToast]);












//WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS 
//WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS 
//WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS 
//WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS 
//WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS 
//WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS 
//WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS 
//WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS 
//WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS 
//WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS //WISHLIST VARIABLESSSS 


const [wishlistItems, setWishlistItems] = useState([]);
const [wishlistCounts, setWishlistCounts] = useState({});







//FETCHING WISHLISTED ITEMSSS //FETCHING WISHLISTED ITEMSSS //FETCHING WISHLISTED ITEMSSS //FETCHING WISHLISTED ITEMSSS //FETCHING WISHLISTED ITEMSSS //FETCHING WISHLISTED ITEMSSS
useEffect(() => {
  const fetchWishlistItems = async () => {
    try{
      const response = await fetch('http://localhost:3000/api/patientwishlistinventoryproduct', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
        }
      });

      if(response.ok) {
        const data = await response.json();
        setWishlistItems(data);


        if(selectedambherproduct){
          const isInWishlist = data.some(item => item.patientwishlistinventoryproductid === selectedambherproduct.ambherinventoryproductid);
          setambherheartisClicked(isInWishlist);
        }

        if(selectedbautistaproduct){
          const isInWishlist = data.some(item => item.patientwishlistinventoryproductid === selectedbautistaproduct.bautistainventoryproductid);
          setbautistaheartisClicked(isInWishlist);
        }

      }
    }catch(error){
      console.error("Error fetching wishlist products:", error);
    }
  }; fetchWishlistItems();
}, [showpatientambherviewproduct, showpatientbautistaviewproduct]);







//HANDLES ADD AND DELETE BUTTON FOR WISHLIST
const toggleWishlist = async (e) => {
  e.preventDefault();
  
  try {
    let productId;
    let isAmbher = false;
    let productData;

    if(selectedambherproduct) {
      productId = selectedambherproduct.ambherinventoryproductid;
      isAmbher = true;
      productData = {
        patientaccount: patientemail,
        patientwishlistprofilepicture: patientprofilepicture,
        patientwishlistlastname: patientlastname || "No Last Name",
        patientwishlistfirstname: patientfirstname || "No First Name",
        patientwishlistmiddlename: patientmiddlename || "No Middle Name",
        patientwishlistemail: patientemail || "No Email",
        clinicproduct: selectedambherproduct.ambherinventoryproductid,
        clinicproductmodel: selectedambherproduct.ambherinventoryproductmodelnumber,
        patientwishlistinventoryproductid: selectedambherproduct.ambherinventoryproductid,
        patientwishlistinventoryproductcategory: ambherinventorycategorynamebox || "No Category Name",
        patientwishlistinventoryproductname: addambherinventoryproductname || "No Product Name",
        patientwishlistinventoryproductbrand: addambherinventoryproductbrand || "No Brand",
        patientwishlistinventoryproductmodelnumber: addambherinventoryproductmodelnumber || "No Model",
        patientwishlistinventoryproductdescription: addambherinventoryproductdescription || "No Description",
        patientwishlistinventoryproductprice: addambherinventoryproductprice || 0,
        patientwishlistinventoryproductquantity: addambherinventoryproductquantity || 0,
        patientwishlistinventoryproductimagepreviewimages: addambherinventoryproductimagepreviewimages || [],
        clinicType: "ambher",
      };
    } else if (selectedbautistaproduct) {
      productId = selectedbautistaproduct.bautistainventoryproductid;
      isAmbher = false;
      productData = {
        patientaccount: patientemail,
        patientwishlistprofilepicture: patientprofilepicture,
        patientwishlistlastname: patientlastname || "No Last Name",
        patientwishlistfirstname: patientfirstname || "No First Name",
        patientwishlistmiddlename: patientmiddlename || "No Middle Name",
        patientwishlistemail: patientemail || "No Email",
        clinicproduct: selectedbautistaproduct.bautistainventoryproductid,
        clinicproductmodel: selectedbautistaproduct.bautistainventoryproductmodel || "No Model",
        patientwishlistinventoryproductid: selectedbautistaproduct.bautistainventoryproductid,
        patientwishlistinventoryproductcategory: bautistainventorycategorynamebox || "No Category Name",
        patientwishlistinventoryproductname: addbautistainventoryproductname || "No Product Name",
        patientwishlistinventoryproductbrand: addbautistainventoryproductbrand || "No Brand",
        patientwishlistinventoryproductmodelnumber: selectedbautistaproduct.bautistainventoryproductmodel || "No Model",
        patientwishlistinventoryproductdescription: addbautistainventoryproductdescription || "No Description",
        patientwishlistinventoryproductprice: addbautistainventoryproductprice || 0,
        patientwishlistinventoryproductquantity: addbautistainventoryproductquantity || 0,
        patientwishlistinventoryproductimagepreviewimages: addbautistainventoryproductimagepreviewimages || [],
        clinicType: "bautista",
      };
    } else {
      throw new Error("No product selected");
    }

    const isInWishlist = wishlistItems.some(item => 
      item.patientwishlistinventoryproductid === productId && 
      item.clinicType === (isAmbher ? 'ambher' : 'bautista')
    );

    if(isInWishlist) {
      // Find the wishlist item to get its _id
      const wishlistItem = wishlistItems.find(item => 
        item.patientwishlistinventoryproductid === productId && 
        item.clinicType === (isAmbher ? 'ambher' : 'bautista')
      );

      if (!wishlistItem) {
        throw new Error("Wishlist item not found");
      }

      const response = await fetch(`http://localhost:3000/api/patientwishlistinventoryproduct/${wishlistItem._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
        }
      });

      if(!response.ok) {
        const errordata = await response.json();
        throw new Error(errordata.message || "Failed to delete wishlist product");
      }

      // Updates the wishlist products 
      setWishlistItems(prev => prev.filter(item => item._id !== wishlistItem._id));
      
      // Update heart state and show toast
      if (isAmbher) {
        setambherheartisClicked(false);
        setambhershowtoastMessage("Removed from Wishlist");
        setambhershowheartToast(true);
        setambhershowtoastmessageClosing(false);
      } else {
        setbautistaheartisClicked(false);
        setbautistashowtoastMessage("Removed from Wishlist");
        setbautistashowheartToast(true);
        setbautistashowtoastmessageClosing(false);
      }

      // Update wishlist count
      const newCount = await fetchWishlistCounts(productId, isAmbher ? 'ambher' : 'bautista');
      setWishlistCounts(prev => ({...prev, [productId]: newCount}));

    } else {
      // Add to wishlist
      const response = await fetch('http://localhost:3000/api/patientwishlistinventoryproduct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
        },
        body: JSON.stringify(productData)
      });

      if(!response.ok) {
        const errordata = await response.json();
        throw new Error(errordata.message || "Failed to add to wishlist");
      }

      // Refresh wishlist items
      const updatedResponse = await fetch('http://localhost:3000/api/patientwishlistinventoryproduct', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
        }
      });
      
      if(updatedResponse.ok) {
        const updatedData = await updatedResponse.json();
        setWishlistItems(updatedData);
      }

      // Update heart state and show toast
      if (isAmbher) {
        setambherheartisClicked(true);
        setambhershowtoastMessage("Added to Wishlist");
        setambhershowheartToast(true);
        setambhershowtoastmessageClosing(false);
      } else {
        setbautistaheartisClicked(true);
        setbautistashowtoastMessage("Added to Wishlist");
        setbautistashowheartToast(true);
        setbautistashowtoastmessageClosing(false);
      }

      // Update wishlist count
      const newCount = await fetchWishlistCounts(productId, isAmbher ? 'ambher' : 'bautista');
      setWishlistCounts(prev => ({...prev, [productId]: newCount}));
    }

  } catch(error) {
    console.error("Error toggle wishlist: ", error);
    const errorMessage = error.message || "Wishlist toggle error";

    if (selectedambherproduct) {
      setambhershowtoastMessage(errorMessage);
      setambhershowheartToast(true);
      setambhershowtoastmessageClosing(false);
    } else if (selectedbautistaproduct) {
      setbautistashowtoastMessage(errorMessage);
      setbautistashowheartToast(true);
      setbautistashowtoastmessageClosing(false);
    }
  }
};
















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





















//PRODUCT FILTERING PROCESS //PRODUCT FILTERING PROCESS //PRODUCT FILTERING PROCESS //PRODUCT FILTERING PROCESS //PRODUCT FILTERING PROCESS //PRODUCT FILTERING PROCESS

const [pricesortingProducts, setpricesortingProducts] = useState('none');
const [searchProducts, setsearchProducts] = useState('');




// Add these functions to handle price sorting
const sortproductsbyPrice = (products, sortOrder, productType) => {
  if(sortOrder === 'none') return products;

  return [...products].sort((a,b) =>{
    const priceA = productType === 'ambher' ? a.ambherinventoryproductprice : a.bautistainventoryproductprice;
    const priceB = productType === 'ambher' ? b.ambherinventoryproductprice : b.bautistainventoryproductprice;
    
    return sortOrder === 'Highesttolowest' ? priceB - priceA : priceA - priceB;
  });
};


//Ambher filtering products
const ambherfilteredproducts = () => {
  let filtered = ambherinventoryproducts.filter(product =>
  (activeambherinventorycategorytable === 'all' ||
    product.ambherinventoryproductcategory === activeambherinventorycategorytable) &&
  (product.ambherinventoryproductname.toLowerCase().includes(searchProducts.toLowerCase()) ||
   product.ambherinventoryproductbrand.toLowerCase().includes(searchProducts.toLowerCase())||
   product.ambherinventoryproductdescription.toLowerCase().includes(searchProducts.toLowerCase()))
  );
  
  return sortproductsbyPrice(filtered, pricesortingProducts, 'ambher');
};





//Bautista filtering products
const bautistafilteredproducts = () => {
  let filtered = bautistainventoryproducts.filter(product =>
  (activebautistainventorycategorytable === 'all' ||
    product.bautistainventoryproductcategory === activebautistainventorycategorytable) &&
  (product.bautistainventoryproductname.toLowerCase().includes(searchProducts.toLowerCase()) ||
   product.bautistainventoryproductbrand.toLowerCase().includes(searchProducts.toLowerCase())||
   product.bautistainventoryproductdescription.toLowerCase().includes(searchProducts.toLowerCase()))
  );
  
  return sortproductsbyPrice(filtered, pricesortingProducts, 'bautista');
};








//SUBMITTING PATIENT AMBHER and BAUTISTA ORDER PRODUCT
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




//SUBMIT ORDER REQUEST FOR AMBHER OPTICAL //SUBMIT ORDER REQUEST FOR AMBHER OPTICAL //SUBMIT ORDER REQUEST FOR AMBHER OPTICAL
//SUBMIT ORDER REQUEST FOR AMBHER OPTICAL //SUBMIT ORDER REQUEST FOR AMBHER OPTICAL //SUBMIT ORDER REQUEST FOR AMBHER OPTICAL
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
      patientorderambherproductid: selectedambherproduct?.ambherinventoryproductid,
      patientorderambherproductname: addambherinventoryproductname,
      patientorderambherproductbrand: addambherinventoryproductbrand,
      patientorderambherproductmodelnumber: addambherinventoryproductmodelnumber,
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
        setpatientorderambherproductisClicked(true);
        setpatientorderambherproductToastMessage("Order Submitted Successfully!");
        
        setpatientorderambherproductToast(true);
        setpatientorderambherproductToastClosing(false);
    console.log('Order successful:', result);

    
    setpatientorderambherproductchosenpickupdate("");
    setshowpatientorderambherscheduleandreview(false);
    setambherCount(1);
    

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














































































  return (
    <>

     {/* NavBar */}
<div className="bg-white w-[100vw] relative z-10">
  <header id="header" className="top-0 absolute flex justify-between items-center text-black md:px-32 bg-white w-full drop-shadow-md z-50">
        <a id:logocontain href="#">
          <img src={navlogo} alt="" className="w-33  hover:scale-105 transition-all"></img>
        </a>

        <ul id:listcontain  className="hidden xl:flex items-center gap-12 font-semibold text-base">
        <Link to="/patientlandingpage" className="text-[#000000] hover:text-white no-underline"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white text-black  rounded-md transition-all cursor-pointer">Home</li></Link>
        <Link to="/patientdashboard"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Appointments</li></Link>
        <Link to="/patientproducts"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Store</li></Link>
         <Link to="/patientwishlist"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Wishlist</li></Link>
        <Link to="/patientorders"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Orders</li></Link>





        </ul>

      {/* Search 
      
              <div className="relative hidden md:flex items-center justify-center gap-3">
          <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
          <input type="text" placeholder="Search..." className="py-2 pl-10 rounded-xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500"></input>
        </div>
        
      */}



 
    {localStorage.getItem("patienttoken") ? (
      <div id="profilecard" className="relative items-center justify-center flex">
        <div id="profile" onClick={showlogout} className="ml-3 flex justify-center items-center bg-[#fbfbfb00] border-2 border-gray-200 shadow-lg rounded-full hover:cursor-pointer hover:scale-105 transition-all">
          <img src={patientprofilepicture || 'default-profile.png'} alt="Profile" className="h-13 w-13 rounded-full"/>
        </div>

        {showlogoutbtn && (
          <div className="w-75 flex-col p-5 motion-preset-fade absolute top-full mt-2 z-[9999] flex justify-center items-start bg-[#ffffff] rounded-2xl hover:cursor-pointer transition-all shadow-lg">
            <div className="hover:bg-[#f7f7f7] transition-all duration-300 ease-in-out py-2 px-1 rounded-2xl gap-3 flex items-center h-auto w-full">
              <img src={patientprofilepicture} className="w-12 rounded-full"/>
              <h1 className="font-albertsans font-semibold text-[19px]">{patientfirstname}</h1>
            </div>
            <div className="border-b-2 rounded-full border-[#747474] h-1 w-full my-1"></div>

            {localStorage.getItem("patienttoken") && (
              <Link to="/patientinformation" className="w-full">
                <div className="gap-2 flex items-center py-2 px-1 hover:bg-[#f7f7f7] duration-300 ease-in-out hover:text-[#000000] rounded-2xl transition-all cursor-pointer">
                  <img src={profileuser} className="w-9 h-9"/>
                  <h1 className="text-[16px] text-[#202020]">Demographic Profile</h1>
                </div>
              </Link>
            )}

            <div id="logoutdiv" className="mt-2 px-1 py-2 hover:bg-[#f7f7f7] flex items-center gap-2 w-full rounded-2xl hover:cursor-pointer transition-all" onClick={handlelogout}>
              <img src={logout} className="w-9 h-9"/>
              <p className="font-semibold text-[#E04F5F] text-[16px]">Logout</p>
            </div>
          </div>
        )}
      </div>
    ) : (

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
    <section className="bg-cover bg-center min-h-[100vh] w-[100vw] flex justify-center align-center" >
    <div className="bg-cover bg-center h-auto w-full flex items-center justify-center " >

      <div className="w-full h-auto flex flex-col justify-start items-start pt-3 p-3">






              <div id="inventorymanagement" className="pl-5 pr-5 pb-4 pt-4  transition-all duration-300  ease-in-out  w-[100%] h-full bg-white " >   

              <div className=" flex items-center mt-8"><i className="bx bxs-shopping-bag text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Browse our Products</h1></div>

  <div className="flex justify-start items-center mt-3 h-[60px]">
 {/*<div onClick={() => showinventorytable('allinventorytable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeinventorytable ==='allinventorytable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#1f1f1f] ${activeinventorytable ==='allinventorytable' ? 'text-white' : ''}`}>All</h1></div>*/}
  <div onClick={() => showinventorytable('ambherinventorytable')}  className={`mr-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeinventorytable ==='ambherinventorytable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#1f1f1f] ${activeinventorytable ==='ambherinventorytable' ? 'text-white' : ''}`}>Ambher Optical</h1></div>
  <div onClick={() => showinventorytable('bautistainventorytable')}  className={`ml-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeinventorytable ==='bautistainventorytable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#1f1f1f] ${activeinventorytable ==='bautistainventorytable' ? 'text-white' : ''}`}>Bautista Eye Center</h1></div>
  
  </div>


                






          { activeinventorytable === 'ambherinventorytable' && ( <div id="ambherinventorytable" className="p-2  animate-fadeInUp flex  items-start  w-[100%] h-[83%] rounded-2xl mt-5" >

          <div className="p-3  rounded-2xl w-[20%] h-auto  mr-2 overflow-y-auto overflow-x-hidden">
                <div className=" pb-3 flex items center w-full mt-7"><i className="bx bx-filter font-albertsans font-semibold text-[#363636] text-[25px]" /><h1 className="ml-2 text-[16px] font-albertsans font-semibold text-[#363636]">Filter by category</h1></div>

                <div onClick={() => showambherinventorycategory('all')}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 py-2 text-center flex justify-center items-center ${activeambherinventorycategorytable ==='all' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#1f1f1f] ${activeambherinventorycategorytable ==='all' ? 'text-white' : ''}`}>All</h1><span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm">{ambherinventoryproducts.length}</span></div>


                {ambherinventorycategorylist.map(category => {
                  const productcount = ambherinventoryproducts.filter(product =>
                    product.ambherinventoryproductcategory === category.ambherinventorycategoryname).length;
                  return(
                  <div key={category._id} onClick={() => setactiveambherinventorycategorytable(category.ambherinventorycategoryname)}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl  py-2 text-center flex justify-center items-center ${activeambherinventorycategorytable ===category.ambherinventorycategoryname ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#1f1f1f] ${activeambherinventorycategorytable ===category.ambherinventorycategoryname ? 'text-white' : 'text-[#1f1f1f]'}`}>{category.ambherinventorycategoryname}</h1><span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm">{productcount}</span></div>
                  )
                })}

                <div className=" pb-3 flex items center w-full mt-7"><i className="bx bx-filter font-albertsans font-semibold text-[#363636] text-[25px]" /><h1 className="ml-2 text-[16px] font-albertsans font-semibold text-[#363636]">Filter by price</h1></div>
                <div onClick={() => setpricesortingProducts('Highesttolowest')}    className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl   py-2 text-center flex justify-center items-center ${pricesortingProducts === 'Highesttolowest' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#1f1f1f] ${pricesortingProducts === 'Highesttolowest' ? 'text-white' : 'text-[#1f1f1f]'}`}>Highest to Lowest</h1></div>
                <div onClick={() => setpricesortingProducts('Lowesttohighest')}     className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl   py-2 text-center flex justify-center items-center ${pricesortingProducts === 'Lowesttohighest' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#1f1f1f] ${pricesortingProducts === 'Lowesttohighest' ? 'bg-[#2781af] rounded-2xl text-white ' : 'text-[#1f1f1f]'}`}>Lowest to Highest</h1></div>
 
            

          </div>
          <div className=" flex flex-col justify-start items-start  ml-2 rounded-2xl w-[90%]  min-h-[540px] max-h-auto h-auto shadow-b-lg ">
              <div className="ml-6 flex justify-center items-center"><h2 className="font-albertsans font-bold text-[18px] text-[#383838] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input value={searchProducts} onChange={(e) => setsearchProducts(e.target.value)} type="text" placeholder="Enter product name here..."   className="transition-all duration-300 ease-in-out py-2 pl-10 w-250 rounded-2xl  bg-[#e4e4e4] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
              <div className=" w-[100%] rounded-2xl h-auto  flex flex-wrap content-start gap-3 pl-2 pt-2 ">
              <div className="flex flex-wrap p-4">
                {ambherloadingproducts ? (
                  <div>Loading Ambher Products...</div> 
                ): ambherinventoryproducts.length === 0 ? (
                  <div>No Products Found...</div> 
                ):(
                  ambherfilteredproducts().map((product) => (
              <div key={product.ambherinventoryproductid} onClick={() => {setshowpatientambherviewproduct(true);
                                                                           setselectedambherproduct(product);
                                                                           setambhercurrentimageindex(0);
                                                                           setambherinventorycategorynamebox(product?.ambherinventoryproductcategory || '');
                                                                           setaddambherinventoryproductname(product?.ambherinventoryproductname || '');
                                                                           setaddambherinventoryproductmodelnumber(product?.ambherinventoryproductmodelnumber || '');
                                                                           setaddambherinventoryproductbrand(product?.ambherinventoryproductbrand || '');
                                                                           setaddambherinventoryproductdescription(product?.ambherinventoryproductdescription || '');
                                                                           setaddambherinventoryproductprice(product?.ambherinventoryproductprice || 0);
                                                                           setaddambherinventoryproductquantity(product?.ambherinventoryproductquantity || 0);
                
                                                                           setaddambherinventoryproductimagepreviewimages(product?.ambherinventoryproductimagepreviewimages || []);
       
              const isInWishList = wishlistItems.some(item => item.patientwishlistinventoryproductid === product.ambherinventoryproductid);
              setambherheartisClicked(isInWishList);    

                 }}  className="motion-preset-slide-up mr-3 mb-3 flex flex-col items-start justify-start w-[220px] h-auto shadow-md bg-white rounded-2xl">
                <img src={product.ambherinventoryproductimagepreviewimages[0] || defaultimageplaceholder}  alt={product.ambherinventoryproductname} className="w-full h-45"/>
                <div className=" mx-1  w-fit rounded-md py-1 px-2  rounded-1xl h-fit  mt-2 break-words min-w-0 bg-[#F0F6FF]"><h1 className="font-medium   text-[#0d0d0d] text-[13px] min-w-0 break-words ">{product.ambherinventoryproductcategory}</h1></div>
                    <div className="w-full h-auto ml-2 mt-2 "><h1 className="font-semibold  text-[15px] min-w-0 break-words ">{product.ambherinventoryproductname}</h1></div>
                    <div className="w-fit h-auto ml-2 mt-1 "><h1 className="font-albertsans font-bold text-[18px] min-w-0 break-words ">₱ {product.ambherinventoryproductprice?.toLocaleString()}</h1></div>
                <div className="w-full h-auto ml-2 mt-5 mb-5 "><h1 className="font-albertsans font-medium text-[#4e4f4f] text-[15px] min-w-0 break-words">0 Sold</h1></div>
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
                         
                                
                                 <img  src={getambherHeartImage()} onClick={ambherhearthandleClick} onMouseEnter={() => !ambherheartisClicked && setambherheartisHovered(true)} onMouseLeave={() => !ambherheartisClicked && setambherheartisHovered(false)}  className={` ease-in-out duration-300 transition-all  border-1  w-10 h-10 p-2 rounded-2xl cursor-pointer ${ambherheartisClicked ? "bg-red-400" : "hover:bg-red-400"}`}/>
                                 <h1 className="ml-2 text-[17px] font-semibold text-[#383838]">Wishlist ({wishlistCounts[selectedambherproduct?.ambherinventoryproductid] || 0})</h1>     

                                 
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
                                          
                                          <p className="mt-1 font-albertsans border-l-2  border-[#8c8c8c] pl-3  text-[13px]">50 sold</p>
                                        </div>
                        
                                  
                                        <p className="mt-5 font-albertsans font-semibold text-[#478d12] text-[40px]">₱{addambherinventoryproductprice}</p>
                                  
                                        <p className="font-albertsans mt-6  font-medium text-[#020202] text-[18px]">Description</p>
                                        <p className="font-albertsans font-semibold text-[#4b4b4b] mt-3">{addambherinventoryproductdescription}</p>
                                      
                                       
                                        <div className="gap-4 mt-15 flex items-center">
                                          <p className="font-albertsans font-semibold ">Quantity:</p>
                                        <div className="w-auto h-10  flex items-center justify-between border-1 rounded-2xl">
                                          <div   className={`font-bold h-full w-10 bg-gray-100 rounded-l-2xl flex items-center justify-center cursor-pointer select-none ${ambhercount <= 1 ? "opacity-50 cursor-not-allowed" : "active:bg-gray-200"}`} style={{ WebkitTapHighlightColor: 'transparent' }} type="button" onClick={() => setambherCount (c => Math.max(1, c - 1))}>-</div>
                                          <span className="px-6 font-semibold">{ambhercount}</span>
                                          <div  className={`font-bold h-full w-10 bg-gray-100 rounded-r-2xl flex items-center justify-center cursor-pointer select-none  ${ambhercount >= addambherinventoryproductquantity ? "opacity-50 cursor-not-allowed" : "active:bg-gray-200"}`} style={{ WebkitTapHighlightColor: 'transparent' }}  type="button" onClick={() => setambherCount ((c) => Math.min(c + 1, addambherinventoryproductquantity))}>+</div>
                                         </div>
                                               <p className="font-albertsans font-semibold text-[#616161] text-[14px]">{addambherinventoryproductquantity} pieces available </p>
                                       </div>


                                                <div className="flex items-center mt-5">
                                        
                                      <p className="font-albertsans font-semibold ">Select Pickup Date:</p>   
                                      <input   className="w-38 justify-center border-b-2 border-[#272727] ml-3 text-[16px] font-semibold [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-[70%]"
                                               value={patientorderambherproductchosenpickupdate}  
                                               onChange={(e) => {const selecteddate = new Date(e.target.value);
                                                                  if (selecteddate < dateinphtomorrow) {
                                                                    e.preventDefault();
                                                                    return;
                                                                  }
                                                                  setpatientorderambherproductchosenpickupdate(e.target.value);  }}  
                                                                  type="date"
                                                                  name="patientorderambherproductchosenpickupdate"
                                                                  id="patientorderambherproductchosenpickupdate"
                                                                  min={dateinphtomorrow.toISOString().split('T')[0]}
                                                                  max={dateinphmaxdate.toISOString().split('T')[0]}
                                                   placeholder=""/> </div>
                               

                                           {!patientorderambherproductchosenpickupdate && (                                
                                           <div onClick={() => setshowpatientorderambherscheduleandreview(true)} className="mt-10    font-albertsans bg-[#a7a7a7]  hover:rounded-2xl transition-all duration-300 ease-in-out rounded-2xl px-25 py-2.5 text-center flex justify-center items-center "><span className="font-albertsans font-bold text-[#3f3f3f] text-[17px]">Select Date for Order</span></div>
                                            )} 
                                          
                                           {patientorderambherproductchosenpickupdate && (
                                            <div onClick={(e) => submitpatientorderambher(e)}  className="mt-10 hover:cursor-pointer hover:scale-102  font-albertsans bg-[#117db0]  hover:rounded-2xl transition-all duration-300 ease-in-out rounded-2xl px-25 py-2.5 text-center flex justify-center items-center "><span className="font-albertsans font-bold text-white text-[17px]">Submit Order Request</span></div>

                                           )}


                                           <div className="flex items-center justify-between mt-10 h-22 w-full bg-[#fbfbfb] rounded-2xl">
                                              <div className="gap-2 h-full w-40 flex items-center flex-col justify-center"><img src={packageimage} className="w-8 h-8"/><p className="font-albertsans text-[13px] font-medium">Prepare Order</p></div>
                                              <div className="gap-2 h-full w-40 flex items-center flex-col justify-center"><img src={nextimage} className="w-8 h-8"/></div>
                                              <div className="gap-2 h-full w-40 flex items-center flex-col justify-center"><img src={storeimage} className="w-8 h-8"/><p className="font-albertsans text-[13px] font-medium">Store Pickup</p></div>
                                              <div className="gap-2 h-full w-40 flex items-center flex-col justify-center"><img src={nextimage} className="w-8 h-8"/></div>
                                              <div className="gap-2 h-full w-40 flex items-center flex-col justify-center"><img src={paymentimage} className="w-8 h-8"/><p className=" font-albertsans text-[13px] font-medium">Payment</p></div>
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










          { activeinventorytable === 'bautistainventorytable' && ( <div id="bautistainventorytable" className="p-2  animate-fadeInUp flex  items-start  w-[100%] h-[83%] rounded-2xl mt-5" >

          <div className="p-3  rounded-2xl w-[20%] h-auto  mr-2 overflow-y-auto overflow-x-hidden">
        
                <div className=" pb-3 flex items center w-full mt-7"><i className="bx bx-filter font-albertsans font-semibold text-[#363636] text-[25px]" /><h1 className="ml-2 text-[16px] font-albertsans font-semibold text-[#363636]">Filter by category</h1></div>

                <div onClick={() => showbautistainventorycategory('all')}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 py-2 text-center flex justify-center items-center ${activebautistainventorycategorytable ==='all' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#1f1f1f] ${activebautistainventorycategorytable ==='all' ? 'text-white' : ''}`}>All</h1><span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm">{bautistainventoryproducts.length}</span></div>


                {bautistainventorycategorylist.map(category => {
                  const productcount = bautistainventoryproducts.filter(product =>
                    product.bautistainventoryproductcategory === category.bautistainventorycategoryname).length;
                  return(
                  <div key={category._id} onClick={() => setactivebautistainventorycategorytable(category.bautistainventorycategoryname)}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl    py-2 text-center flex justify-center items-center ${activebautistainventorycategorytable ===category.bautistainventorycategoryname ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#1f1f1f] ${activebautistainventorycategorytable ===category.bautistainventorycategoryname ? 'text-white' : 'text-[#1f1f1f]'}`}>{category.bautistainventorycategoryname}</h1><span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm">{productcount}</span></div>
                  )
                })}


                <div className=" pb-3 flex items center w-full mt-7"><i className="bx bx-filter font-albertsans font-semibold text-[#363636] text-[25px]" /><h1 className="ml-2 text-[16px] font-albertsans font-semibold text-[#363636]">Filter by price</h1></div>
                <div onClick={() => setpricesortingProducts('Highesttolowest')}    className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl   py-2 text-center flex justify-center items-center ${pricesortingProducts === 'Highesttolowest' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#1f1f1f] ${pricesortingProducts === 'Highesttolowest' ? 'text-white' : 'text-[#1f1f1f]'}`}>Highest to Lowest</h1></div>
                <div onClick={() => setpricesortingProducts('Lowesttohighest')}   className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl   py-2 text-center flex justify-center items-center ${pricesortingProducts === 'Lowesttohighest' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#1f1f1f] ${pricesortingProducts === 'Lowesttohighest' ? 'bg-[#2781af] rounded-2xl text-white ' : 'text-[#1f1f1f]'}`}>Lowest to Highest</h1></div>




            
            {/*<div className=""> <bautistainventorycategoryBox value={bautistainventorycategorynamebox} loading={loadingbautistainventorycategorylist} onChange={(e) => setbautistainventorycategorynamebox(e.target.value)} categories={bautistainventorycategorylist}/></div>*/}

          </div>
          <div className=" flex flex-col justify-start items-start  ml-2 rounded-2xl w-[90%]  min-h-[540px] max-h-auto h-auto shadow-b-lg ">
              <div className="ml-6 flex justify-center items-center"><h2 className="font-albertsans font-bold text-[18px] text-[#383838] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input value={searchProducts} onChange={(e) => setsearchProducts(e.target.value)} type="text" placeholder="Enter product name here..."   className="transition-all duration-300 ease-in-out py-2 pl-10 w-250 rounded-2xl  bg-[#e4e4e4] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>

              <div className=" w-[100%] rounded-2xl h-auto  flex flex-wrap content-start gap-3 pl-2 pt-2 ">
                

              <div className="flex flex-wrap p-4">
                {bautistaloadingproducts ? (
                  <div>Loading bautista Products...</div> 
                ): bautistainventoryproducts.length === 0 ? (
                  <div>No Products Found...</div> 
                ):(
                  bautistafilteredproducts().map((product) => (
              <div key={product.bautistainventoryproductid} onClick={() => {setshowpatientbautistaviewproduct(true);
                                                                           setselectedbautistaproduct(product);
                                                                           setbautistacurrentimageindex(0);
                                                                           setbautistainventorycategorynamebox(product?.bautistainventoryproductcategory || '');
                                                                           setaddbautistainventoryproductname(product?.bautistainventoryproductname || '');
                                                                           setaddbautistainventoryproductbrand(product?.bautistainventoryproductbrand || '');
                                                                           setaddbautistainventoryproductmodelnumber(product?.bautistainventoryproductmodelnumber || ''); 
                                                                           setaddbautistainventoryproductdescription(product?.bautistainventoryproductdescription || '');
                                                                           setaddbautistainventoryproductprice(product?.bautistainventoryproductprice || 0);
                                                                           setaddbautistainventoryproductquantity(product?.bautistainventoryproductquantity || 0);
                                                                           setaddbautistainventoryproductimagepreviewimages(product?.bautistainventoryproductimagepreviewimages || []);
              }} className="motion-preset-slide-up mr-3 mb-3 flex flex-col items-start justify-start w-[220px] h-auto shadow-md bg-white rounded-2xl">
                <img src={product.bautistainventoryproductimagepreviewimages[0] || defaultimageplaceholder}  alt={product.bautistainventoryproductname} className="w-full h-45"/>
                <div className=" mx-1  w-fit rounded-md py-1 px-2  rounded-1xl h-fit  mt-2 break-words min-w-0 bg-[#F0F6FF]"><h1 className="font-medium   text-[#0d0d0d] text-[13px] min-w-0 break-words ">{product.bautistainventoryproductcategory}</h1></div>
                    <div className="w-full h-auto ml-2 mt-2 "><h1 className="font-semibold  text-[15px] min-w-0 break-words ">{product.bautistainventoryproductname}</h1></div>
                    <div className="w-fit h-auto ml-2 mt-1 "><h1 className="font-albertsans font-bold text-[18px] min-w-0 break-words ">₱ {product.bautistainventoryproductprice?.toLocaleString()}</h1></div>
                <div className="w-full h-auto ml-2 mt-5 mb-5 "><h1 className="font-albertsans font-medium text-[#4e4f4f] text-[15px] min-w-0 break-words">0 Sold</h1></div>
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
                   
                                  <div onClick={() => {setbautistaCount(1); setselectedbautistaproduct(null);setshowpatientbautistaviewproduct(false)}} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                                </div>


                          <form className="flex flex-col  ml-15 mr-15 mt-5    pb-10" >
                                <div className=" flex justify-center items-start rounded-2xl w-full h-auto">
                                  <div className=" pb-10 w-full h-full mr-15 rounded-2xl flex justify-center mb-20">



                                      <div className=" h-fit w-fit flex-none">
  
                                <div className=" relative">
                                
                                <div className="flex items-center justify-end">
                                
                                 <img  src={getbautistaHeartImage()} onClick={bautistahearthandleClick} onMouseEnter={() => !bautistaheartisClicked && setbautistaheartisHovered(true)} onMouseLeave={() => !bautistaheartisClicked && setbautistaheartisHovered(false)}  className={` ease-in-out duration-300 transition-all  border-1  w-10 h-10 p-2 rounded-2xl cursor-pointer ${bautistaheartisClicked ? "bg-red-400" : "hover:bg-red-400"}`}/>
                                   <h1 className="ml-2 text-[17px] font-semibold text-[#383838]">Wishlist ({wishlistCounts[selectedbautistaproduct?.bautistainventoryproductid] || 0})</h1>         
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
                                          
                                          <p className="mt-1 font-albertsans border-l-2  border-[#8c8c8c] pl-3  text-[13px]">50 sold</p>
                                        </div>
                        
                                  
                                        <p className="mt-5 font-albertsans font-semibold text-[#478d12] text-[40px]">₱{addbautistainventoryproductprice}</p>
                                  
                                        <p className="font-albertsans mt-6  font-medium text-[#020202] text-[18px]">Description</p>
                                        <p className="font-albertsans font-semibold text-[#4b4b4b] mt-3">{addbautistainventoryproductdescription}</p>
                                      
                                       
                                        <div className="gap-4 mt-15 flex items-center">
                                          <p className="font-albertsans font-semibold ">Quantity:</p>
                                        <div className="w-auto h-10  flex items-center justify-between border-1 rounded-2xl">
                                          <div   className={`font-bold h-full w-10 bg-gray-100 rounded-l-2xl flex items-center justify-center cursor-pointer select-none ${bautistacount <= 1 ? "opacity-50 cursor-not-allowed" : "active:bg-gray-200"}`} style={{ WebkitTapHighlightColor: 'transparent' }} type="button" onClick={() => setbautistaCount (c => Math.max(1, c - 1))}>-</div>
                                          <span className="px-6 font-semibold">{bautistacount}</span>
                                          <div  className={`font-bold h-full w-10 bg-gray-100 rounded-r-2xl flex items-center justify-center cursor-pointer select-none  ${bautistacount >= addbautistainventoryproductquantity ? "opacity-50 cursor-not-allowed" : "active:bg-gray-200"}`} style={{ WebkitTapHighlightColor: 'transparent' }}  type="button" onClick={() => setbautistaCount ((c) => Math.min(c + 1, addbautistainventoryproductquantity))}>+</div>
                                         </div>
                                               <p className="font-albertsans font-semibold text-[#616161] text-[14px]">{addbautistainventoryproductquantity} pieces available </p>
                                       </div>



                                                <div className="flex items-center mt-5">
                                        
                                      <p className="font-albertsans font-semibold ">Select Pickup Date:</p>   
                                      <input   className="w-38 justify-center border-b-2 border-[#272727] ml-3 text-[16px] font-semibold [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert-[70%]"
                                               value={patientorderbautistaproductchosenpickupdate}  
                                               onChange={(e) => {const selecteddate = new Date(e.target.value);
                                                                  if (selecteddate < dateinphtomorrow) {
                                                                    e.preventDefault();
                                                                    return;
                                                                  }
                                                                  setpatientorderbautistaproductchosenpickupdate(e.target.value);  }}  
                                                                  type="date"
                                                                  name="patientorderbautistaproductchosenpickupdate"
                                                                  id="patientorderbautistaproductchosenpickupdate"
                                                                  min={dateinphtomorrow.toISOString().split('T')[0]}
                                                                  max={dateinphmaxdate.toISOString().split('T')[0]}
                                                   placeholder=""/> </div>
                                

                                           {!patientorderbautistaproductchosenpickupdate && (                                
                                           <div onClick={() => setshowpatientorderbautistascheduleandreview(true)} className="mt-10    font-albertsans bg-[#a7a7a7]  hover:rounded-2xl transition-all duration-300 ease-in-out rounded-2xl px-25 py-2.5 text-center flex justify-center items-center "><span className="font-albertsans font-bold text-[#3f3f3f] text-[17px]">Select Date for Order</span></div>
                                            )} 
                                          
                                           {patientorderbautistaproductchosenpickupdate && (
                                            <div  onClick={(e) => submitpatientorderbautista(e)} className="mt-10 hover:cursor-pointer hover:scale-102  font-albertsans bg-[#117db0]  hover:rounded-2xl transition-all duration-300 ease-in-out rounded-2xl px-25 py-2.5 text-center flex justify-center items-center "><span className="font-albertsans font-bold text-white text-[17px]">Submit Order Request</span></div>

                                           )}


                                           <div className="flex items-center justify-between mt-10 h-22 w-full bg-[#fbfbfb] rounded-2xl">
                                              <div className="gap-2 h-full w-40 flex items-center flex-col justify-center"><img src={packageimage} className="w-8 h-8"/><p className="font-albertsans text-[13px] font-medium">Prepare Order</p></div>
                                              <div className="gap-2 h-full w-40 flex items-center flex-col justify-center"><img src={nextimage} className="w-8 h-8"/></div>
                                              <div className="gap-2 h-full w-40 flex items-center flex-col justify-center"><img src={storeimage} className="w-8 h-8"/><p className="font-albertsans text-[13px] font-medium">Store Pickup</p></div>
                                              <div className="gap-2 h-full w-40 flex items-center flex-col justify-center"><img src={nextimage} className="w-8 h-8"/></div>
                                              <div className="gap-2 h-full w-40 flex items-center flex-col justify-center"><img src={paymentimage} className="w-8 h-8"/><p className=" font-albertsans text-[13px] font-medium">Payment</p></div>
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
        
export default PatientProducts