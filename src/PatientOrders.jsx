import React, {useState, useEffect, useCallback} from "react";
import {Link} from "react-router-dom";
import navlogo from  "../src/assets/images/navlogo.png";

import { useAuth } from "./hooks/patientuseAuth";
import useApiService from "./hooks/useApiService";
import useSmartCache from "./hooks/useSmartCache";
import darklogo from "../src/assets/images/darklogo.png";
import profileuser from "../src/assets/images/profile-user.png";
import logout from "../src/assets/images/logout.png";



import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

// Skeleton component for order items
const OrderSkeleton = () => (
  <div className="pb-7 shadow-md rounded-2xl py-3.25 px-3.25 mb-3 border-1 flex items-center w-full h-auto animate-pulse">
    {/* Product image skeleton - matches w-35 h-35 */}
    <div className="mr-5 w-35 h-35 bg-gray-300 rounded-2xl"></div>
    
    <div className="mt-2 h-auto w-full flex flex-col items-start">
      {/* Product name and status skeleton - matches flex justify-between */}
      <div className="flex justify-between w-full">
        <div className="h-6 bg-gray-300 rounded w-80"></div>
        <div className="h-8 bg-gray-200 rounded-full w-28 px-4 py-2"></div>
      </div>
      
      {/* Order details section skeleton - matches mt-5 justify-between w-full flex items-center */}
      <div className="mt-5 justify-between w-full flex items-center">
        {/* Date Ordered - matches actual structure */}
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
          <div>
            <div className="h-3 bg-gray-300 rounded w-24 mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-28"></div>
          </div>
        </div>
        
        {/* Pickup info - matches actual structure */}
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
          <div>
            <div className="h-3 bg-gray-300 rounded w-36 mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
        </div>
        
        {/* Quantity - matches actual structure */}
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
          <div>
            <div className="h-3 bg-gray-300 rounded w-16 mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-6"></div>
          </div>
        </div>
        
        {/* Amount - matches actual structure */}
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
          <div>
            <div className="h-3 bg-gray-300 rounded w-28 mb-1"></div>
            <div className="h-4 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      </div>
      
      {/* Total price section skeleton - matches border-t-2 w-full h-10 mt-5 */}
      <div className="flex items-center justify-between border-t-2 w-full h-10 mt-5">
        <div></div>
        <div className="flex items-center gap-3 mt-5 h-auto">
          <div className="h-5 bg-gray-300 rounded w-24"></div>
          <div className="h-7 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    </div>
  </div>
);

const OrderListSkeleton = () => (
  <div className="space-y-3">
    {[...Array(5)].map((_, index) => (
      <OrderSkeleton key={index} />
    ))}
  </div>
);






















function PatientOrders(){

  const apiUrl = import.meta.env.VITE_API_URL;


  
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
 const { 
   fetchAmbherOrders, 
   fetchBautistaOrders,
   invalidateOrderData 
 } = useApiService();
 
 // Smart caching with real-time updates
 const { smartFetch, realtimeUpdates, CACHE_DURATIONS } = useSmartCache();

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

const [activeorderstable, setactiveorderstable] = useState('ambherorderstable');
const [ambherOrders, setAmbherOrders] = useState([]);
const [bautistaOrders, setBautistaOrders] = useState([]);
const [loading, setLoading] = useState(true);
const [filterambherorderedproductsStatus, setfilterambherorderedproductsStatus] = useState('All');
const [filterbautistaorderedproductsStatus, setfilterbautistaorderedproductsStatus] = useState('All');
const [filteredambherOrders, setfilteredambherOrders] = useState([]);
const [filteredbautistaOrders, setfilteredbautistaOrders] = useState([]);
const [searchpatientorderedProducts, setsearchpatientorderedProducts] = useState('');

// View Order Modal states
const [selectedOrderForView, setSelectedOrderForView] = useState(null);
const [showViewOrderModal, setShowViewOrderModal] = useState(false);
const [viewOrderCurrentImageIndex, setViewOrderCurrentImageIndex] = useState(0);


const showorderstable = (orderstableid) => {
      setactiveorderstable(orderstableid);
      setsearchpatientorderedProducts('');
};

          


//SEARCH ORDERED PRODUCT 
useEffect(() => {
  const filterpatientOrders = (orders, statusFilter, isAmbher) => {


    let filtered = [...orders];
    

    if (statusFilter !== 'All') {
      const statusField = isAmbher ? 'patientorderambherstatus' : 'patientorderbautistastatus';
      filtered = filtered.filter(order => order[statusField] === statusFilter);
    }
    
    if (searchpatientorderedProducts) {
      const productNameField = isAmbher ? 'patientorderambherproductname' : 'patientorderbautistaproductname';
      filtered = filtered.filter(order => 
        order[productNameField].toLowerCase().includes(searchpatientorderedProducts.toLowerCase())
      );
    }

    return filtered;
    
  };

  if (activeorderstable === 'ambherorderstable') {
    const filtered = filterpatientOrders(ambherOrders, filterambherorderedproductsStatus, true);
    setfilteredambherOrders(filtered);
  } else {
    const filtered = filterpatientOrders(bautistaOrders, filterbautistaorderedproductsStatus, false);
    setfilteredbautistaOrders(filtered);
  }
}, [ambherOrders, bautistaOrders, filterambherorderedproductsStatus, filterbautistaorderedproductsStatus, activeorderstable, searchpatientorderedProducts]);
    





const handleSearch = (term) => {
  setsearchpatientorderedProducts(term);
};




//FETCHING PATIENT ORDERS WITH SMART CACHING
const fetchpatientorders = useCallback(async (forceRefresh = false) => {
  try {
    setLoading(true);

    if (activeorderstable === 'ambherorderstable') {
      // Smart cached Ambher orders fetching
      const data = await smartFetch(
        `ambherOrders_${patientemail}`,
        () => fetchAmbherOrders(patientemail),
        CACHE_DURATIONS.orders,
        forceRefresh
      );
      setAmbherOrders(data || []);
      setfilteredambherOrders(data || []); 

    } else {
      // Smart cached Bautista orders fetching
      const data = await smartFetch(
        `bautistaOrders_${patientemail}`,
        () => fetchBautistaOrders(patientemail),
        CACHE_DURATIONS.orders,
        forceRefresh
      );
      setBautistaOrders(data || []);
      setfilteredbautistaOrders(data || []); 
    }

  } catch (error) {
    console.error('Error fetching orders:', error);
  } finally {
    setLoading(false);
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [activeorderstable, patientemail, smartFetch, CACHE_DURATIONS]);

useEffect(() => {
    if (patientemail) {
      fetchpatientorders();
    }
  }, [patientemail, activeorderstable, fetchpatientorders]);

// Listen for real-time order updates
useEffect(() => {
  if (realtimeUpdates.has('orders')) {
    console.log('📦 Real-time orders update detected, refreshing data...');
    if (patientemail) {
      fetchpatientorders(true); // Force refresh on real-time update
    }
  }
}, [realtimeUpdates, patientemail, fetchpatientorders]);




  const formatorderDates = (formattednewdate) => {
    const datedata = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(formattednewdate).toLocaleDateString(undefined, datedata);
  };




  const formatorderstatusColor = (status) => {
    switch(status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-900';
      case 'Ready for Pickup':
        return 'bg-blue-100 text-blue-900';
      case 'Completed':
        return 'bg-green-100 text-green-900';
      case 'Cancelled':
        return 'bg-red-100 text-red-900';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  // View Order Modal handlers
  const handleViewOrder = (order) => {
    setSelectedOrderForView(order);
    setViewOrderCurrentImageIndex(0);
    setShowViewOrderModal(true);
  };

  const closeViewOrderModal = () => {
    setShowViewOrderModal(false);
    setSelectedOrderForView(null);
    setViewOrderCurrentImageIndex(0);
  };

  const nextViewOrderImage = () => {
    if (selectedOrderForView) {
      const isAmbher = selectedOrderForView.patientorderambherid;
      const images = isAmbher 
        ? selectedOrderForView.patientorderambherproductimage 
        : selectedOrderForView.patientorderbautistaproductimage;
      
      if (images && images.length > 0) {
        setViewOrderCurrentImageIndex((prevIndex) => 
          prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
      }
    }
  };

  const prevViewOrderImage = () => {
    if (selectedOrderForView) {
      const isAmbher = selectedOrderForView.patientorderambherid;
      const images = isAmbher 
        ? selectedOrderForView.patientorderambherproductimage 
        : selectedOrderForView.patientorderbautistaproductimage;
      
      if (images && images.length > 0) {
        setViewOrderCurrentImageIndex((prevIndex) => 
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      }
    }
  };















  



          
          
        




















































































  return (
    <>

     {/* NavBar */}
<div className="bg-white w-[99vw] relative z-10">
  <header id="header" className="top-0 absolute flex justify-between items-center text-black md:px-32 bg-white w-full drop-shadow-md z-50">
        <a id:logocontain href="#">
          <img src={navlogo} alt="" className="w-33  hover:scale-105 transition-all"></img>
        </a>

        <ul id:listcontain  className="hidden xl:flex items-center gap-12 font-semibold text-base">
        <Link to="/patientlandingpage" className="text-[#000000] hover:text-white no-underline"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white text-black  rounded-md transition-all cursor-pointer">Home</li></Link>
        <Link to="/patientdashboard"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Appointments</li></Link>
        <Link to="/patientproducts"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Store</li></Link>
         <Link to="/patientwishlist"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Wishlist</li></Link>
        <Link to="/patientOrders"><li className="text-[15px] p-3 hover:bg-[#2781af] hover:text-white rounded-md transition-all cursor-pointer">Orders</li></Link>





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
          {!patientprofilepicture ? (
            // Skeleton loading for navbar profile picture
            <div className="h-13 w-13 rounded-full bg-gray-300 animate-pulse"></div>
          ) : (
            <img src={patientprofilepicture || 'default-profile.png'} alt="Profile" className="h-13 w-13 rounded-full"/>
          )}
        </div>

        {showlogoutbtn && (
          <div className="w-75 flex-col p-5 motion-preset-fade absolute top-full mt-2 z-[9999] flex justify-center items-start bg-[#ffffff] rounded-2xl hover:cursor-pointer transition-all shadow-lg">
            <div className="hover:bg-[#f7f7f7] transition-all duration-300 ease-in-out py-2 px-1 rounded-2xl gap-3 flex items-center h-auto w-full">
              {!patientprofilepicture ? (
                // Skeleton loading for dropdown profile picture
                <div className="w-12 h-12 rounded-full bg-gray-300 animate-pulse"></div>
              ) : (
                <img src={patientprofilepicture} className="w-12 rounded-full"/>
              )}
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
    <section className="bg-cover bg-center min-h-[100vh] h-auto w-[100vw] flex justify-center align-center" >
    <div className="bg-cover bg-center h-auto w-full flex  justify-center " >

      <div className="w-full h-auto flex flex-col justify-start items-start pt-3 p-3">






              <div id="patientordersmanagement  " className="  pl-5 pr-5 pb-4 pt-8  transition-all duration-300  ease-in-out  w-[100%] h-full bg-white " >   

              <div className=" flex items-center mt-8"><i className="bx bxs-package text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">My Orders</h1></div>

  <div className="flex justify-start items-center mt-3 h-[60px]">
  <div onClick={() => showorderstable('ambherorderstable')}  className={`mr-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeorderstable ==='ambherorderstable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#1f1f1f] ${activeorderstable ==='ambherorderstable' ? 'text-white' : ''}`}>Ambher Optical <span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm"> {ambherOrders.length} </span></h1></div>
  <div onClick={() => showorderstable('bautistaorderstable')}  className={`ml-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeorderstable ==='bautistaorderstable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#1f1f1f] ${activeorderstable ==='bautistaorderstable' ? 'text-white' : ''}`}>Bautista Eye Center <span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm"> {bautistaOrders.length} </span></h1></div>
  
  </div>


                




          { activeorderstable === 'ambherorderstable' && ( <div id="ambherorderstable" className="p-2  animate-fadeInUp flex  items-start  w-[100%] min-h-[80] h-auto rounded-2xl mt-5" >
                <div className="p-3  rounded-2xl w-[20%] h-auto  mr-2 overflow-y-auto overflow-x-hidden">
                <div className=" pb-3 flex items center w-full mt-7"><i className="bx bx-filter font-albertsans font-semibold text-[#363636] text-[25px]" /><h1 className="ml-2 text-[16px] font-albertsans font-semibold text-[#363636]">Filter by status</h1></div>

                {['All', 'Pending', 'Ready for Pickup', 'Completed', 'Cancelled'].map(status => {
                    const patientorderedstatusCount = status === 'All'  ? ambherOrders.length : ambherOrders.filter(order => order.patientorderambherstatus === status).length; 
  
                    return (
                       <div key={status} onClick={() => {setfilterambherorderedproductsStatus(status); setsearchpatientorderedProducts('');}}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out border-2 b-[#909090] rounded-3xl py-2 text-center flex justify-center items-center ${filterambherorderedproductsStatus === status ? 'bg-[#2781af] rounded-2xl text-white' : ''}`} >
                        <h1 className={`font-albertsans font-semibold ${filterambherorderedproductsStatus === status ? 'text-white' : 'text-[#1f1f1f]'}`}>{status} <span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm"> {patientorderedstatusCount} </span> </h1>  </div>
                        );})}

                      
        

          </div>
          <div className=" flex flex-col justify-start items-start  ml-2 rounded-2xl w-[90%]  min-h-[540px] max-h-auto h-auto shadow-b-lg ">
              <div className="ml-2 flex justify-center items-center"><h2 className="font-albertsans font-bold text-[18px] text-[#383838] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input value={searchpatientorderedProducts}  onChange={(e) => handleSearch(e.target.value)} type="text" placeholder="Enter ordered product name here..."   className="transition-all duration-300 ease-in-out py-2 pl-10 w-250 rounded-2xl  bg-[#e4e4e4] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
              <div className="mt-5 w-[100%] rounded-2xl h-auto  flex flex-wrap content-start gap-3 pl-2 pt-2 pr-30">
                      
                      
                      {loading ? (
                        <OrderListSkeleton />
                      ) : filteredambherOrders.length === 0 ? (
                        <div>No orders found</div>
                      ) : (
                        filteredambherOrders.map(order => (

                  <div key={order.patientorderambherid} onClick={() => handleViewOrder(order)} className="pb-7 shadow-md rounded-2xl py-3.25 px-3.25 mb-3 border-1 flex items-center motion-preset-slide-up w-full h-auto cursor-pointer hover:shadow-lg transition-all duration-300">
                   <img src={order.patientorderambherproductimage?.[0] || 'default-image-url'} alt={order.patientorderambherproductname} className="mr-5 w-35 h-35 rounded-2xl"/>
                    <div className="mt-2 h-auto w-full flex flex-col items-start">
                        <div className="flex justify-between w-full"><h1 className="font-semibold font-albertsans text-[20px] text-[#1f1f1f]">{order.patientorderambherproductname}</h1> <span className={`${formatorderstatusColor(order.patientorderambherstatus)} ml-3 font-albertsans font-semibold rounded-full text-[15px] leading-5 px-4 py-2 inline-flex`}>{order.patientorderambherstatus}</span> </div>
                        <div className=" mt-5 justify-between w-full flex items-center text-[#323232]  font-semibold text-[13px]">
                          <div className="flex items-center gap-1"><i className="text-[#565656] bx bxs-calendar mt-0.5  font-semibold text-[22px]"/><div><p className="text-[#777777] font-medium text-[13px]">Date Ordered</p><p className="text-[#303030]  font-semibold text-[15px]">{formatorderDates(order.createdAt)}</p></div></div>
                          <div className="flex items-center gap-1"><i className="text-[#565656] bx bxs-calendar mt-0.5  font-semibold text-[22px]"/><div><p className="text-[#777777] font-medium text-[13px]">Pickup at Ambher Optical</p><p className="text-[#303030]  font-semibold text-[15px]">{order.patientorderambherproductpickupstatus === 'Now'  ? `Completed (${formatorderDates(order.createdAt)})` : order.patientorderambherproductpickupstatus === 'Later' ? "To be scheduled" :null}</p></div></div>
                          <div className="flex items-center gap-1"><i className="text-[#565656] bx bxs-package mt-0.5  font-semibold text-[22px]"/><div><p className="text-[#777777]  font-medium text-[13px]">Quantity</p><p className="text-[#303030]  font-semibold text-[15px]">x{order.patientorderambherproductquantity}</p></div></div>
                          <div className="flex items-center gap-1"><p className="font-semibold text-[22px] text-[#565656]">₱</p><div> <p className="text-[#777777]  font-medium text-[13px]">{Number(order.patientorderambheramountpaid) < Number(order.patientorderambherproducttotal) ? (<span className="px-1 py-.5 bg-yellow-100 text-yellow-900 font-alberstans rounded-md">Down Payment</span> ): "Amount Paid"}</p><p className="text-[#303030]  font-semibold text-[15px]">{Number(order.patientorderambheramountpaid).toLocaleString('en-PH', {minimumFractionDigits: 2,  maximumFractionDigits: 2})}</p></div></div>
                        </div>
                        <div className="flex items-center justify-between border-t-2 w-full h-10 mt-5">
                          <div></div>
                          <div className="flex items-center gap-3 mt-5 h-auto"><h1 className="font-semibold font-albertsans text-[#343434] text-[17px]">Total Price: </h1><p className="font-semibold font-albertsans text-[25px] text-[#549013]">₱{(order.patientorderambherproductprice * order.patientorderambherproductquantity).toLocaleString('en-PH', {minimumFractionDigits: 2,  maximumFractionDigits: 2})}</p></div>
                        </div>
                    </div>
                  </div>
                        ))
                      )}
                  
              

              </div>
          </div>

          </div>

          )}


          { activeorderstable === 'bautistaorderstable' && ( <div id="bautistaorderstable" className="p-2  animate-fadeInUp flex  items-start  w-[100%] h-[83%] rounded-2xl mt-5" >

                          <div className="p-3  rounded-2xl w-[20%] h-auto  mr-2 overflow-y-auto overflow-x-hidden">
                <div className=" pb-3 flex items center w-full mt-7"><i className="bx bx-filter font-albertsans font-semibold text-[#363636] text-[25px]" /><h1 className="ml-2 text-[16px] font-albertsans font-semibold text-[#363636]">Filter by status</h1></div>

                {['All', 'Pending', 'Ready for Pickup', 'Completed', 'Cancelled'].map(status => {
                    const patientorderedstatusCount = status === 'All'  ? bautistaOrders.length : bautistaOrders.filter(order => order.patientorderbautistastatus === status).length; 
  
                    return (
                       <div key={status} onClick={() => {setfilterbautistaorderedproductsStatus(status); setsearchpatientorderedProducts('');}} className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out border-2 b-[#909090] rounded-3xl py-2 text-center flex justify-center items-center ${filterbautistaorderedproductsStatus === status ? 'bg-[#2781af] rounded-2xl text-white' : ''}`} >
                        <h1 className={`font-albertsans font-semibold ${filterbautistaorderedproductsStatus === status ? 'text-white' : 'text-[#1f1f1f]'}`}>{status} <span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm"> {patientorderedstatusCount} </span> </h1>  </div>
                        );})}

          </div>
          <div className=" flex flex-col justify-start items-start  ml-2 rounded-2xl w-[90%]  min-h-[540px] max-h-auto h-auto shadow-b-lg ">
              <div className="ml-2 flex justify-center items-center"><h2 className="font-albertsans font-bold text-[18px] text-[#383838] mr-3 ">Search: </h2><div className="relative flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input value={searchpatientorderedProducts}  onChange={(e) => handleSearch(e.target.value)}  type="text" placeholder="Enter ordered product name here..."   className="transition-all duration-300 ease-in-out py-2 pl-10 w-250 rounded-2xl  bg-[#e4e4e4] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
              <div className="mt-5 w-[100%] rounded-2xl h-auto  flex flex-wrap content-start gap-3 pl-2 pt-2 pr-30">
                      
                      
                      {loading ? (
                        <OrderListSkeleton />
                      ) : filteredbautistaOrders.length === 0 ? (
                        <div>No orders found</div>
                      ) : (
                        filteredbautistaOrders.map(order => (

                  <div key={order.patientorderbautistaid} onClick={() => handleViewOrder(order)} className="pb-7 shadow-md rounded-2xl py-3.25 px-3.25 flex items-center motion-preset-slide-up w-full h-auto cursor-pointer hover:shadow-lg transition-all duration-300">
                    <img src={order.patientorderbautistaproductimage?.[0] || 'default-image-url'} alt={order.patientorderbautistaproductname} className="mr-5 w-35 h-35 rounded-2xl"/>
                    <div className="mt-2 h-auto w-full flex flex-col items-start">
                        <div className="flex justify-between w-full"><h1 className="font-semibold font-albertsans text-[20px] text-[#1f1f1f]">{order.patientorderbautistaproductname}</h1> <span className={`${formatorderstatusColor(order.patientorderbautistastatus)} ml-3 font-albertsans font-semibold rounded-full text-[15px] leading-5 px-4 py-2 inline-flex`}>{order.patientorderbautistastatus}</span> </div>
                        <div className=" mt-5 justify-between w-full flex items-center text-[#323232]  font-semibold text-[13px]">
                          <div className="flex items-center gap-1"><i className="text-[#565656] bx bxs-calendar mt-0.5  font-semibold text-[22px]"/><div><p className="text-[#777777] font-medium text-[13px]">Date Ordered</p><p className="text-[#303030]  font-semibold text-[15px]">{formatorderDates(order.createdAt)}</p></div></div>
                          <div className="flex items-center gap-1"><i className="text-[#565656] bx bxs-calendar mt-0.5  font-semibold text-[22px]"/><div><p className="text-[#777777] font-medium text-[13px]">Pickup at Bautista Eye Center</p><p className="text-[#303030]  font-semibold text-[15px]">{order.patientorderbautistaproductpickupstatus === 'Now'  ? `Completed (${formatorderDates(order.createdAt)})` : order.patientorderbautistaproductpickupstatus === 'Later' ? "To be scheduled" :null}</p></div></div>
                          <div className="flex items-center gap-1"><i className="text-[#565656] bx bxs-package mt-0.5  font-semibold text-[22px]"/><div><p className="text-[#777777] font-medium text-[13px]">Quantity</p><p className="text-[#303030]  font-semibold text-[15px]">x{order.patientorderbautistaproductquantity}</p></div></div>
                          <div className="flex items-center gap-1"><p className="font-semibold text-[22px] text-[#565656]">₱</p><div> <p className="text-[#777777]  font-medium text-[13px]">{Number(order.patientorderbautistaamountpaid) < Number(order.patientorderbautistaproducttotal) ? (<span className="px-1 py-.5 bg-yellow-100 text-yellow-900 font-alberstans rounded-md">Down Payment</span> ): "Amount Paid"}</p><p className="text-[#303030]  font-semibold text-[15px]">{Number(order.patientorderbautistaamountpaid).toLocaleString('en-PH', {minimumFractionDigits: 2,  maximumFractionDigits: 2})}</p></div></div>
                        </div>
                        <div className="flex items-center justify-between border-t-2 w-full h-10 mt-5">
                          <div></div>
                          <div className="flex items-center gap-3 mt-5 h-auto"><h1 className="font-semibold font-albertsans text-[#343434] text-[17px]">Total Price: </h1><p className="font-semibold font-albertsans text-[25px] text-[#549013]">₱{(order.patientorderbautistaproductprice * order.patientorderbautistaproductquantity).toLocaleString('en-PH', {minimumFractionDigits: 2,  maximumFractionDigits: 2})}</p></div>
                        </div>
                    </div>
                  </div>
                        ))
                      )}
                  
              

              </div>
          </div>

          </div>)}


        {/* View Order Modal */}
        {showViewOrderModal && selectedOrderForView && (
          <div className="fixed inset-0 bg-[#000000b1] flex items-center justify-center z-20 p-4">
            <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-y-auto shadow-2xl">
              <div className="sticky z-99 top-0 bg-white border-b px-8 py-6 flex justify-between items-center rounded-t-2xl">
                    <div className="flex justify-center items-center">
                      <img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all p-1" />
                      <h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">Billing Details</h1>
                    </div>
                <div 
                  onClick={closeViewOrderModal}
                  className="cursor-pointer text-gray-500 hover:text-gray-700 text-[50px]"
                >
                  ×
                </div>
              </div>
              
              <div className="p-8">
                {(() => {
                  const isAmbher = selectedOrderForView.patientorderambherid;
                  const productName = isAmbher 
                    ? selectedOrderForView.patientorderambherproductname 
                    : selectedOrderForView.patientorderbautistaproductname;
                  const productImages = isAmbher 
                    ? selectedOrderForView.patientorderambherproductimage 
                    : selectedOrderForView.patientorderbautistaproductimage;
                  const productPrice = isAmbher 
                    ? selectedOrderForView.patientorderambherproductprice 
                    : selectedOrderForView.patientorderbautistaproductprice;
                  const productQuantity = isAmbher 
                    ? selectedOrderForView.patientorderambherproductquantity 
                    : selectedOrderForView.patientorderbautistaproductquantity;
                  const orderStatus = isAmbher 
                    ? selectedOrderForView.patientorderambherstatus 
                    : selectedOrderForView.patientorderbautistastatus;
                  const amountPaid = isAmbher 
                    ? selectedOrderForView.patientorderambheramountpaid 
                    : selectedOrderForView.patientorderbautistaamountpaid;
                  const productTotal = isAmbher 
                    ? selectedOrderForView.patientorderambherproducttotal 
                    : selectedOrderForView.patientorderbautistaproducttotal;
                  const pickupStatus = isAmbher 
                    ? selectedOrderForView.patientorderambherproductpickupstatus 
                    : selectedOrderForView.patientorderbautistaproductpickupstatus;
                  const orderNotes = isAmbher 
                    ? selectedOrderForView.patientorderambherproductnotes 
                    : selectedOrderForView.patientorderbautistaproductnotes;
                  const clinic = isAmbher ? 'Ambher Optical' : 'Bautista Eye Center';

                  return (
                    <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
                      {/* Product Images - Takes 3 columns (Left side, wider) */}
                      <div className="xl:col-span-3 xl:order-1 space-y-6">
                        <div className="flex items-center">
                          <i className="bx bx-image text-3xl text-gray-600 mr-3"></i>
                          <h3 className="text-xl font-semibold font-albertsans text-gray-800">Product Images</h3>
                        </div>
                        {productImages && productImages.length > 0 ? (
                          <div className="relative">
                            <img 
                              src={productImages[viewOrderCurrentImageIndex]} 
                              alt={productName}
                              className="w-full h-96 object-cover rounded-xl border border-gray-200 shadow-lg"
                            />
                            
                            {productImages && productImages.length > 1 && (
                              <>
                                <div
                                  onClick={prevViewOrderImage}
                                  className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-400 cursor-pointer bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 shadow-lg transition-all"
                                >
                                  <i className="bx bx-chevron-left text-xl text-white"></i>
                                </div>
                                <div 
                                  onClick={nextViewOrderImage}
                                  className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-400 cursor-pointer bg-opacity-70 hover:bg-opacity-90 rounded-full p-3 shadow-lg transition-all"
                                >
                                  <i className="bx bx-chevron-right text-xl text-white"></i>
                                </div>
                                
                                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-gray-400 bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-medium">
                                  {viewOrderCurrentImageIndex + 1} / {productImages.length}
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <div className="w-full h-96 bg-gray-200 rounded-xl flex items-center justify-center border border-gray-300 shadow-lg">
                            <div className="text-center">
                              <i className="bx bx-image text-6xl text-gray-400 mb-3"></i>
                              <span className="text-gray-500 text-lg">No image available</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Image thumbnails */}
                        {productImages && productImages.length > 1 && (
                          <div className="flex space-x-3 overflow-x-auto py-2">
                            {productImages.map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`${productName} ${index + 1}`}
                                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-3 transition-all shadow-md hover:shadow-lg ${
                                  index === viewOrderCurrentImageIndex ? 'border-blue-500 ring-2 ring-blue-300' : 'border-gray-200 hover:border-gray-300'
                                }`}
                                onClick={() => setViewOrderCurrentImageIndex(index)}
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Billing Information - Takes 2 columns (Right side, smaller) */}
                      <div className="xl:col-span-2 xl:order-2 space-y-6">
                        <div className={`p-6 rounded-xl border ${isAmbher ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
                          <div className="flex items-center mb-6">
                            <i className={`bx bx-credit-card text-2xl mr-3 ${isAmbher ? 'text-green-600' : 'text-blue-600'}`}></i>
                            <h3 className="text-xl font-bold font-albertsans text-gray-800">Payment Summary</h3>
                          </div>
                          
                          <div className="space-y-4">
                            <div className={`flex justify-between items-center py-2 border-b ${isAmbher ? 'border-green-200' : 'border-blue-200'}`}>
                              <span className="text-gray-700 font-medium font-albertsans">Item:</span>
                              <span className="font-semibold font-albertsans text-gray-800 text-sm text-right">{productName}</span>
                            </div>
                            <div className={`flex justify-between items-center py-2 border-b ${isAmbher ? 'border-green-200' : 'border-blue-200'}`}>
                              <span className="text-gray-700 font-medium font-albertsans">Unit Price:</span>
                              <span className="font-semibold font-albertsans">₱{Number(productPrice).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                            <div className={`flex justify-between items-center py-2 border-b ${isAmbher ? 'border-green-200' : 'border-blue-200'}`}>
                              <span className="text-gray-700 font-medium font-albertsans">Quantity:</span>
                              <span className="font-semibold font-albertsans">x{productQuantity}</span>
                            </div>
                            <div className={`flex justify-between items-center py-2 border-b ${isAmbher ? 'border-green-200' : 'border-blue-200'}`}>
                              <span className="text-gray-700 font-medium font-albertsans">Subtotal:</span>
                              <span className="font-semibold font-albertsans">₱{(Number(productPrice) * Number(productQuantity)).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                            </div>
                            
                            <div className={`bg-white p-5 rounded-lg border shadow-sm ${isAmbher ? 'border-green-300' : 'border-blue-300'}`}>
                              <div className="flex justify-between items-center mb-3">
                                <span className="text-gray-700 font-medium font-albertsans text-sm">
                                  {Number(amountPaid) < Number(productTotal) ? 'Down Payment:' : 'Amount Paid:'}
                                </span>
                                <span className="font-bold font-albertsans text-[#5c5c5c] text-lg">₱{Number(amountPaid).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                              </div>
                              
                              {Number(amountPaid) < Number(productTotal) && (
                                <div className="flex justify-between items-center mb-3">
                                  <span className="text-gray-700 font-medium font-albertsans text-sm">Remaining Balance:</span>
                                  <span className="font-bold font-albertsans text-[#c53636] text-lg">₱{(Number(productTotal) - Number(amountPaid)).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                </div>
                              )}
                              
                              <div className="border-t-2 border-gray-300 pt-3 mt-3">
                                <div className="flex justify-between items-center">
                                  <span className="text-lg font-bold font-albertsans text-gray-800">Total Amount:</span>
                                  <span className={`text-2xl font-bold font-albertsans ${isAmbher ? 'text-[#23a54a]' : 'text-[#23a54a]'}`}>₱{(Number(productPrice) * Number(productQuantity)).toLocaleString('en-PH', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-center pt-3">
                              <span className={`${formatorderstatusColor(orderStatus)} px-4 py-2 rounded-full text-sm font-bold font-albertsans`}>
                                Payment Status: {orderStatus}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Order Information */}
                        <div className="bg-gray-50 p-6 rounded-xl">
                          <div className="flex items-center mb-6">
                            <i className="bx bx-info-circle text-2xl text-gray-600 mr-3"></i>
                            <h3 className="text-lg font-bold font-albertsans text-gray-800">Order Information</h3>
                          </div>
                          
                          {/* Order Overview Card */}
                          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-4">
                            <div className="grid grid-cols-1 gap-4">
                              {/* Order ID & Status */}
                              <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                <div>
                                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium font-albertsans mb-1">Order ID</p>
                                  <p className="font-semibold font-albertsans text-gray-800">#{isAmbher ? selectedOrderForView.patientorderambherid : selectedOrderForView.patientorderbautistaid}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium font-albertsans mb-1">Status</p>
                                  <span className={`${formatorderstatusColor(orderStatus)} px-3 py-1 rounded-full text-xs font-bold font-albertsans`}>
                                    {orderStatus}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Clinic & Date */}
                              <div className="grid grid-cols-1 gap-4">
                                <div className="flex items-center">
                                  <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg mr-3">
                                    <i className="bx bxs-clinic text-blue-600 text-lg"></i>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium font-albertsans">Clinic</p>
                                    <p className="font-semibold font-albertsans text-gray-800">{clinic}</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center">
                                  <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg mr-3">
                                    <i className="bx bxs-calendar text-green-600 text-lg"></i>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide font-medium font-albertsans">Order Date</p>
                                    <p className="font-semibold font-albertsans text-gray-800">{formatorderDates(selectedOrderForView.createdAt)}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Pickup Information Card */}
                          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-4">
                            <div className="flex items-center mb-3">
                              <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg mr-3">
                                <i className="bx bxs-truck text-orange-600 text-lg"></i>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500 uppercase tracking-wide font-medium font-albertsans">Pickup Status</p>
                                <p className="font-semibold font-albertsans text-gray-800">
                                  {pickupStatus === 'Now' 
                                    ? `Completed (${formatorderDates(selectedOrderForView.createdAt)})`
                                    : pickupStatus === 'Later' 
                                      ? "To be scheduled"
                                      : pickupStatus
                                  }
                                </p>
                              </div>
                            </div>
                            
                            {pickupStatus === 'Later' && (
                              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                                <div className="flex items-center">
                                  <i className="bx bx-time text-yellow-600 mr-2"></i>
                                  <p className="text-sm text-yellow-800 font-albertsans">
                                    <span className="font-medium">Pickup scheduling:</span> The {clinic} will set the pickup date and will be displayed here.
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Order Notes Card */}
                          {orderNotes && (
                            <div className={`p-5 rounded-xl border shadow-sm ${isAmbher ? 'bg-green-50 border-green-200' : 'bg-blue-50 border-blue-200'}`}>
                              <div className="flex items-center mb-3">
                                <div className={`flex items-center justify-center w-10 h-10 rounded-lg mr-3 ${isAmbher ? 'bg-green-100' : 'bg-blue-100'}`}>
                                  <i className={`bx bxs-note text-lg ${isAmbher ? 'text-green-600' : 'text-blue-600'}`}></i>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 uppercase tracking-wide font-medium font-albertsans">Special Instructions</p>
                                  <p className="font-semibold font-albertsans text-gray-800">Order Notes</p>
                                </div>
                              </div>
                              <div className="bg-white p-4 rounded-lg border border-gray-200">
                                <p className="text-gray-700 whitespace-pre-wrap text-sm leading-relaxed font-albertsans">{orderNotes}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
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
        
export default PatientOrders