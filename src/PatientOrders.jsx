import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import navlogo from  "../src/assets/images/navlogo.png";

import { useAuth } from "./hooks/patientuseAuth";

import profileuser from "../src/assets/images/profile-user.png";
import logout from "../src/assets/images/logout.png";



import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';






















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




//FETCHING PATIENT ORDERS 
useEffect(() => {
    if (patientemail) {
      fetchpatientorders();
    }
  }, [patientemail, activeorderstable]);


 const fetchpatientorders = async () => {

  try {
    setLoading(true);

    if (activeorderstable === 'ambherorderstable') {
      const response = await fetch(`/api/patientorderambher/email/${patientemail}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
        }
      });


      if (response.ok) {
        const data = await response.json();
        setAmbherOrders(data);
        setfilteredambherOrders(data); 
      }

    } else {
      const response = await fetch(`/api/patientorderbautista/email/${patientemail}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('patienttoken')}`
        }
      });
      const data = await response.json();
      setBautistaOrders(data);
      setfilteredbautistaOrders(data); 
    }



  } catch (error) {
    console.error('Error fetching orders:', error);

  } finally {
    setLoading(false);
  }
};




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
    <section className="bg-cover bg-center min-h-[100vh] h-auto w-[100vw] flex justify-center align-center" >
    <div className="bg-cover bg-center h-auto w-full flex items-center justify-center " >

      <div className="w-full h-auto flex flex-col justify-start items-start pt-3 p-3">






              <div id="patientordersmanagement  " className="pl-5 pr-5 pb-4 pt-4  transition-all duration-300  ease-in-out  w-[100%] h-full bg-white " >   

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
                        <div>Loading orders...</div>
                      ) : filteredambherOrders.length === 0 ? (
                        <div>No orders found</div>
                      ) : (
                        filteredambherOrders.map(order => (

                  <div key={order.patientorderambherid} className="pb-7  shadow-md rounded-2xl py-3.25 px-3.25 mb-3 border-1 flex items-center motion-preset-slide-up w-full h-auto ">
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
                        <div>Loading orders...</div>
                      ) : filteredbautistaOrders.length === 0 ? (
                        <div>No orders found</div>
                      ) : (
                        filteredbautistaOrders.map(order => (

                  <div key={order.patientorderbautistaid} className="pb-7  shadow-md rounded-2xl py-3.25 px-3.25 flex items-center motion-preset-slide-up w-full h-auto ">
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







              </div> 

       </div>
      

      </div>

















      
        </section>



    </>
   )
  }
        
export default PatientOrders