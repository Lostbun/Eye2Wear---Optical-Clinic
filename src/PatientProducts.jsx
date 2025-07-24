import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import navlogo from  "../src/assets/images/navlogo.png";
import landingbg2 from "../src/assets/images/landingbg2.png";
import { useAuth } from "./hooks/patientuseAuth";
import starimage from "../src/assets/images/star.png"
import defaultimageplaceholder from "../src/assets/images/defaultimageplaceholder.png";
import heartblack from "../src/assets/images/heartblack.png";
import heartwhite from "../src/assets/images/heartwhite.png";
import heartfilled from "../src/assets/images/heartfilled.png";
import packageimage from "../src/assets/images/shopping-bag.png";
import storeimage from "../src/assets/images/store.png";

import nextimage from "../src/assets/images/next.png";
import paymentimage from "../src/assets/images/card-payment.png";
import { AmbherinventorycategoryBox } from "./components/AmbherinventorycategoryBox";
import { BautistainventorycategoryBox } from "./components/BautistainventorycategoryBox";
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
function PatientProducts(){













  
  //const [patientfirstname, setpatientfirstname] = useState('');
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
       // setpatientfirstname(data.patientfirstname || '');
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
          const [bautistainventorycategorynamebox, setbautistainventorycategorynamebox] = useState("");
          const [addbautistainventoryproductname, setaddbautistainventoryproductname] = useState("");
          const [addbautistainventoryproductbrand, setaddbautistainventoryproductbrand] = useState("");
          const [addbautistainventoryproductdescription, setaddbautistainventoryproductdescription] = useState("");
          const [addbautistainventoryproductprice, setaddbautistainventoryproductprice] = useState();
          const [addbautistainventoryproductquantity, setaddbautistainventoryproductquantity] = useState();
          const [addbautistainventoryproductimagepreviewimages, setaddbautistainventoryproductimagepreviewimages] = useState([]);
          const [bautistacurrentimageindex, setbautistacurrentimageindex] = useState(0);
          const [selectedbautistaproduct, setselectedbautistaproduct] = useState(null);
  
  const [bautistainventoryproducts, setbautistainventoryproducts] = useState([]);
  const [bautistaloadingproducts, setbautistaloadingproducts] = useState(true);

          
 const bautistafilteredproducts = bautistainventoryproducts.filter(product => 
               activebautistainventorycategorytable === 'all' || 
               product.bautistainventoryproductcategory === activebautistainventorycategorytable

            );
          
          


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










    

  //PRODUCT ORDERING
    const [ambhercount, setambherCount] = useState(1)
    const [ambherheartisHovered, setambherheartisHovered] =useState(false);
    const [ambherheartisClicked, setambherheartisClicked] =useState(false);     
    const [ambhershowheartToast, setambhershowheartToast] = useState(false);
    const [ambhershowtoastMessage, setambhershowtoastMessage] = useState("");
    const [ambhershowtoastmessageClosing, setambhershowtoastmessageClosing] = useState(false);

  const ambherhearthandleClick = () => {
    const ambherheartnewState = !ambherheartisClicked;
    setambherheartisClicked(ambherheartnewState);
    setambhershowtoastMessage(ambherheartnewState ? "Added to Wishlist!" : "Removed from Wishlist"); 
    setambhershowheartToast(true);
    setambhershowtoastmessageClosing(false);
  };

  const getambherHeartImage = () => {
    if (ambherheartisClicked) return heartfilled;
    return ambherheartisHovered ? heartwhite : heartblack;
  };

useEffect(() => {
  if(ambhershowheartToast){
    const ambherhearttoasttimer = setTimeout(() => {
      setambhershowtoastmessageClosing(true); //
      setTimeout(() => setambhershowheartToast(false), 300);}, 4000);
  
    return () => clearTimeout(ambherhearttoasttimer);
  }
}, [ambhershowheartToast]);


















































  return (
    <>
     {/* NavBar */}
    <div className=" bg-white">
      <header id="header" className="flex justify-between items-center text-black py-4 px-8 md:px-32 bg-white rounded-4xl drop-shadow-md">
        <a id:logocontain href="#">
          <img src={navlogo} alt="" className="w-52 hover:scale-105 transition-all"></img>
        </a>

        <ul id:listcontain  className="hidden xl:flex items-center gap-12 font-semibold text-base">
        <Link to="/patientlandingpage" className="text-[#000000] hover:text-white no-underline"><li className="p-3 hover:bg-sky-400 text-black hover:text-white rounded-md transition-all cursor-pointer">Home</li></Link>
          <li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">Products</li>
        <Link to="/patientdashboard"><li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">Dashboard</li></Link>
          


          {localStorage.getItem("patienttoken") && (
             <Link to="/patientinformation"><li className="p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all cursor-pointer">ProfileInfo</li></Link>
          )}

        </ul>

      {/* Search 
      
              <div className="relative hidden md:flex items-center justify-center gap-3">
          <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
          <input type="text" placeholder="Search..." className="py-2 pl-10 rounded-xl border-2 border-blue-300 focus:bg-slate-100 focus:outline-sky-500"></input>
        </div>
        
      */}



 
    {localStorage.getItem ("patienttoken")? (

      
    <div id="profilecard" className="relative">
    <div id="profile" onClick={showlogout}  className="ml-3  flex justify-center items-center bg-[#fbfbfb00] border-2 border-gray-200  shadow-lg  rounded-full hover:cursor-pointer hover:scale-105 transition-all">
     <img src={patientprofilepicture || 'default-profile.png'} alt="Profile" className="h-13 w-13 rounded-full"></img>
    </div>

    {showlogoutbtn && (
         <div id="logoutdiv" className=" absolute left-1/2 transform -translate-x-1/2 ml-3 mt-3 w-full flex justify-center items-center p-3 bg-[#ad4e43] rounded-2xl hover:cursor-pointer hover:scale-105 transition-all" onClick={handlelogout}>
         <i className="bx bx-exit mt-1 pr-2 font-semibold text-white text-[17px]"/>
         <p className="font-semibold text-white text-[17px]">Logout</p>
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
    <section className="bg-cover bg-center h-auto w-[99vw] flex justify-center align-center" style={{ backgroundImage: `url(${landingbg2})` }}>
    <div className="bg-cover bg-center h-auto w-[99.1vw] flex items-center justify-center " >

      <div className="w-full h-auto flex flex-col justify-start items-start pt-3 p-3">






              <div id="inventorymanagement" className="pl-5 pr-5 pb-4 pt-4 transition-all duration-300  ease-in-out border-1  border-gray-200 shadow-lg w-[100%] h-full bg-white rounded-2xl" >   

              <div className="flex items-center"><i className="bx bxs-package text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Explore our Products</h1></div>

  <div className="flex justify-start items-center mt-3 h-[60px]">
 {/*<div onClick={() => showinventorytable('allinventorytable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeinventorytable ==='allinventorytable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeinventorytable ==='allinventorytable' ? 'text-white' : ''}`}>All</h1></div>*/}
  <div onClick={() => showinventorytable('ambherinventorytable')}  className={`mr-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeinventorytable ==='ambherinventorytable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeinventorytable ==='ambherinventorytable' ? 'text-white' : ''}`}>Ambher Optical</h1></div>
  <div onClick={() => showinventorytable('bautistainventorytable')}  className={`ml-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeinventorytable ==='bautistainventorytable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeinventorytable ==='bautistainventorytable' ? 'text-white' : ''}`}>Bautista Eye Center</h1></div>
  
  </div>


                






          { activeinventorytable === 'ambherinventorytable' && ( <div id="ambherinventorytable" className="p-2  animate-fadeInUp flex  items-start  w-[100%] h-[83%] rounded-2xl mt-5" >

          <div className="p-3  rounded-2xl w-[20%] h-auto  mr-2 overflow-y-auto overflow-x-hidden">
        
                <div className=" pb-3 flex items center w-full mt-7"><i className="bx bx-filter font-albertsans font-semibold text-[#363636] text-[25px]" /><h1 className="ml-2 text-[16px] font-albertsans font-semibold text-[#363636]">Filter by category</h1></div>

                <div onClick={() => showambherinventorycategory('all')}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 py-2 text-center flex justify-center items-center ${activeambherinventorycategorytable ==='all' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeambherinventorycategorytable ==='all' ? 'text-white' : ''}`}>All</h1><span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm">{ambherinventoryproducts.length}</span></div>


                {ambherinventorycategorylist.map(category => {
                  const productcount = ambherinventoryproducts.filter(product =>
                    product.ambherinventoryproductcategory === category.ambherinventorycategoryname).length;
                  return(
                  <div key={category._id} onClick={() => setactiveambherinventorycategorytable(category.ambherinventorycategoryname)}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 py-2 text-center flex justify-center items-center ${activeambherinventorycategorytable ===category.ambherinventorycategoryname ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeambherinventorycategorytable ===category.ambherinventorycategoryname ? 'text-white' : 'text-[#5d5d5d]'}`}>{category.ambherinventorycategoryname}</h1><span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm">{productcount}</span></div>
                  )
                })}



            
            {/*<div className=""> <AmbherinventorycategoryBox value={ambherinventorycategorynamebox} loading={loadingambherinventorycategorylist} onChange={(e) => setambherinventorycategorynamebox(e.target.value)} categories={ambherinventorycategorylist}/></div>*/}

          </div>
          <div className=" flex flex-col justify-start  ml-2 rounded-2xl w-[90%]  min-h-[540px] max-h-auto h-auto shadow-b-lg ">

              <div className=" w-[100%] rounded-2xl h-auto  flex flex-wrap content-start gap-3 pl-2 pt-2 ">
                

              <div className="flex flex-wrap p-4">
                {ambherloadingproducts ? (
                  <div>Loading Ambher Products...</div> 
                ): ambherinventoryproducts.length === 0 ? (
                  <div>No Products Found...</div> 
                ):(
                  ambherfilteredproducts.map((product) => (
              <div key={product.ambherinventoryproductid} onClick={() => {setshowpatientambherviewproduct(true);
                                                                           setselectedambherproduct(product);
                                                                           setambhercurrentimageindex(0);
                                                                           setambherinventorycategorynamebox(product?.ambherinventoryproductcategory || '');
                                                                           setaddambherinventoryproductname(product?.ambherinventoryproductname || '');
                                                                           setaddambherinventoryproductbrand(product?.ambherinventoryproductbrand || '');
                                                                           setaddambherinventoryproductdescription(product?.ambherinventoryproductdescription || '');
                                                                           setaddambherinventoryproductprice(product?.ambherinventoryproductprice || 0);
                                                                           setaddambherinventoryproductquantity(product?.ambherinventoryproductquantity || 0);
                                                                           setaddambherinventoryproductimagepreviewimages(product?.ambherinventoryproductimagepreviewimages || []);
              }} className="motion-preset-slide-up mr-3 mb-3 flex flex-col items-start justify-start w-[220px] h-auto shadow-md bg-white rounded-2xl">
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




          {showpatientambherviewproduct && (

                         <div className="overflow-y-auto h-auto  bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                           <div className="motion-opacity-in-0 mt-10 pl-5 pr-5 bg-[#fefefe] rounded-2xl w-[1300px] h-auto mb-10 animate-fadeInUp ">
                                <div className=" mt-5  flex justify-end items-center left-0 w-[100%] h-[70px]">
                   
                                  <div onClick={() => {setambherCount(1); setshowpatientambherviewproduct(false)}} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                                </div>


                          <form className="flex flex-col  ml-15 mr-15 mt-5    pb-10" >
                                <div className=" flex justify-center items-start rounded-2xl w-full h-auto">
                                  <div className=" pb-10 w-full h-full mr-15 rounded-2xl flex justify-center mb-20">



                                      <div className=" h-fit w-fit flex-none">
  
                                <div className=" relative">
                                  
                                 <img  src={getambherHeartImage()} onClick={ambherhearthandleClick} onMouseEnter={() => !ambherheartisClicked && setambherheartisHovered(true)} onMouseLeave={() => !ambherheartisClicked && setambherheartisHovered(false)}  className={` ease-in-out duration-300 transition-all right-0 absolute border-1  w-10 h-10 p-2 rounded-2xl cursor-pointer ${ambherheartisClicked ? "bg-red-400" : "hover:bg-red-400"}`}/>
  

                                <img  className="w-120 object-cover rounded-2xl h-120" src={(selectedambherproduct?.ambherinventoryproductimagepreviewimages?.[ambhercurrentimageindex]) || (addambherinventoryproductimagepreviewimages?.[ambhercurrentimageindex]) || defaultimageplaceholder}/>

                                     {((selectedambherproduct?.ambherinventoryproductimagepreviewimages?.length || 0) > 1 || 
                                       addambherinventoryproductimagepreviewimages?.length > 1) && (
                                         <>
                                           <div type="button" onClick={ambherhandlepreviousimage}  className="bg-opacity-50 hover:bg-opacity-75 rounded-2xl text-white p-2 absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-500"><i className="bx bx-chevron-left text-2xl" /></div>

                                           <div type="button" onClick={ambherhandlenextimage}  className="rounded-2xl absolute bg-opacity-50 text-white p-2 transform -translate-y-1/2 bg-gray-500 hover:bg-opacity-75 right-2 top-1/2">  <i className="bx bx-chevron-right text-2xl" /></div>

                                         </>
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
                                          <p className="font-albertsans ml-2  text-[13px] font-semibold">4.8</p><span className="text-[13px] pr-3 ml-2">(89 reviews)</span>
                                          
                                          <p className="font-albertsans border-l-2  border-[#8c8c8c] pl-3  text-[13px]">50 sold</p>
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

                                           <div  className="mt-5 hover:cursor-pointer hover:scale-102  font-albertsans bg-[#117db0]  hover:rounded-2xl transition-all duration-300 ease-in-out rounded-2xl px-25 py-2.5 text-center flex justify-center items-center "><span className="font-albertsans font-bold text-white text-[17px]">Buy Now</span></div>

                                           <div className="flex items-center justify-between mt-5 h-22 w-full bg-[#fbfbfb] rounded-2xl">
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

                                <div className="mt-10  w-auto h-full  ">
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

          <div className="p-3   rounded-2xl w-[20%] h-full  mr-2 overflow-y-auto overflow-x-hidden">
        
                <div className=" pb-3 flex items center w-full mt-7"><i className="bx bx-filter font-albertsans font-semibold text-[#363636] text-[25px]" /><h1 className="ml-2 text-[16px] font-albertsans font-semibold text-[#363636]">Filter by category</h1></div>

                <div onClick={() => showbautistainventorycategory('all')}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 py-2 text-center flex justify-center items-center ${activebautistainventorycategorytable ==='all' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activebautistainventorycategorytable ==='all' ? 'text-white' : ''}`}>All</h1><span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm">{bautistainventoryproducts.length}</span></div>


                {bautistainventorycategorylist.map(category => {
                  const productcount = bautistainventoryproducts.filter(product =>
                    product.bautistainventoryproductcategory === category.bautistainventorycategoryname).length;
                  return(
                  <div key={category._id} onClick={() => setactivebautistainventorycategorytable(category.bautistainventorycategoryname)}  className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 py-2 text-center flex justify-center items-center ${activebautistainventorycategorytable ===category.bautistainventorycategoryname ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activebautistainventorycategorytable ===category.bautistainventorycategoryname ? 'text-white' : 'text-[#5d5d5d]'}`}>{category.bautistainventorycategoryname}</h1><span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm">{productcount}</span></div>
                  )
                })}



            
            {/*<div className=""> <AmbherinventorycategoryBox value={bautistainventorycategorynamebox} loading={loadingbautistainventorycategorylist} onChange={(e) => setbautistainventorycategorynamebox(e.target.value)} categories={bautistainventorycategorylist}/></div>*/}

          </div>
          <div className=" flex flex-col justify-start  ml-2 rounded-2xl w-[90%]  min-h-[540px] max-h-auto h-auto shadow-b-lg ">

              <div className="h-auto w-[100%] rounded-2xl  flex flex-wrap content-start gap-3 pl-2 pt-2 ">
                

              <div className="flex flex-wrap p-4">
                {bautistaloadingproducts ? (
                  <div>Loading Ambher Products...</div> 
                ): bautistainventoryproducts.length === 0 ? (
                  <div>No Products Found...</div> 
                ):(
                  bautistafilteredproducts.map((product) => (
              <div key={product.bautistainventoryproductid} onClick={() => {setshowpatientbautistaviewproduct(true);
                                                                           setselectedbautistaproduct(product);
                                                                           setbautistacurrentimageindex(0);
                                                                           setbautistainventorycategorynamebox(product?.bautistainventoryproductcategory || '');
                                                                           setaddbautistainventoryproductname(product?.bautistainventoryproductname || '');
                                                                           setaddbautistainventoryproductbrand(product?.bautistainventoryproductbrand || '');
                                                                           setaddbautistainventoryproductdescription(product?.bautistainventoryproductdescription || '');
                                                                           setaddbautistainventoryproductprice(product?.bautistainventoryproductprice || 0);
                                                                           setaddbautistainventoryproductquantity(product?.bautistainventoryproductquantity || 0);
                                                                           setaddbautistainventoryproductimagepreviewimages(product?.bautistainventoryproductimagepreviewimages || []);
              }} className="mr-3 mb-3 flex flex-col items-start justify-start w-[220px] h-auto shadow-md bg-white rounded-2xl">
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



          {showpatientbautistaviewproduct && (

                         <div className="overflow-y-auto h-auto  bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                           <div className="mt-10 pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-auto mb-10 animate-fadeInUp ">
                                <div className=" mt-5  flex justify-end items-center left-0 w-[100%] h-[70px]">
                   
                                  <div onClick={() => setshowpatientbautistaviewproduct(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                                </div>

                          <form className="flex flex-col  ml-15 mr-15 mt-5   w-fullx" >
                                <div className="flex justify-center items-start rounded-2xl w-full h-auto">
                                  <div className="pb-10 w-full h-full mr-15 rounded-2xl flex justify-center mt-5">



                                      <div className="h-fit w-fit flex-none">
  
                                <div className="relative">
                                <img  className="w-120 object-cover rounded-2xl h-120" src={(selectedbautistaproduct?.bautistainventoryproductimagepreviewimages?.[bautistacurrentimageindex]) || (addbautistainventoryproductimagepreviewimages?.[bautistacurrentimageindex]) || defaultimageplaceholder}/>


                                     {((selectedbautistaproduct?.bautistainventoryproductimagepreviewimages?.length || 0) > 1 || 
                                       addbautistainventoryproductimagepreviewimages?.length > 1) && (
                                         <>
                                           <button type="button" onClick={bautistahandlepreviousimage}  className="bg-opacity-50 hover:bg-opacity-75 rounded-full text-white p-2 absolute left-2 top-1/2 transform -translate-y-1/2 bg-black"><i className="bx bx-chevron-left text-2xl" /></button>

                                           <button type="button" onClick={bautistahandlenextimage}  className="rounded-full absolute bg-opacity-50 text-white p-2 transform -translate-y-1/2 bg-black hover:bg-opacity-75 right-2 top-1/2">  <i className="bx bx-chevron-right text-2xl" /></button>

                                         </>
                                       )}
                                     </div>
                                      
                                      

                                      </div>



                                  </div>

                                  <div className="w-full h-auto flex items-start mb-10 rounded-2xl min-w-0">
                                        <div className=" w-[100%] h-auto  rounded-4xl">
                                  
                                  
              
                                        <div className=" w-[100%] registration-container">
                                     
                                        <h1 className=" font-semibold text-[#0d0d0d] px-4 py-1 w-max rounded-2xl bg-[#F0F6FF] text-[23px] ">{bautistainventorycategorynamebox}</h1>
                                        <p className="font-albertsans font-semibold text-[#616161] text-[14px]">{addbautistainventoryproductbrand}</p>
                                        <h1 className="min-w-0 break-words h-fit w-full font-albertsans font-bold text-[#212121] text-[29px]">{addbautistainventoryproductname}</h1>
                                
                                  
                                        <p className="mt-3 font-albertsans font-semibold text-[#478d12] text-[40px]">₱{addbautistainventoryproductprice}</p>
                                  
                                        <p className="mt-10 font-albertsans font-bold text-[#343434] text-[20px]">Description</p>
                                        <p className="font-semibold text-[#4b4b4b]">- {addbautistainventoryproductdescription}</p>
                                          <p className="font-albertsans font-semibold text-[#616161] text-[14px]">Available in Stock: {addbautistainventoryproductquantity}</p>
                                        </div>
                                 
                             
                                  
                                        </div>

                                  </div>
                                </div>
                                </form>
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