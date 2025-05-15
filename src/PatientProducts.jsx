
import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import navlogo from  "../src/assets/images/navlogo.png";
import landingbg2 from "../src/assets/images/landingbg2.png";
import { useAuth } from "./hooks/patientuseAuth";

import defaultimageplaceholder from "../src/assets/images/defaultimageplaceholder.png";
import darklogo from "../src/assets/images/darklogo.png";


import { AmbherinventorycategoryBox } from "./components/AmbherinventorycategoryBox";
import { BautistainventorycategoryBox } from "./components/BautistainventorycategoryBox";

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
    <section className="bg-cover bg-center h-[100vh] w-[99vw] flex justify-center align-center" style={{ backgroundImage: `url(${landingbg2})` }}>
    <div className="bg-cover bg-center h-[100%] w-[99.1vw] flex items-center justify-center " >

      <div className="w-full h-full flex flex-col justify-start items-start pt-3 p-3">






              <div id="inventorymanagement" className="pl-5 pr-5 pb-4 pt-4 transition-all duration-300  ease-in-out border-1 bg-white border-gray-200 shadow-lg w-[100%] h-[100%] rounded-2xl" >   

              <div className="flex items-center"><i className="bx bxs-package text-[#184d85] text-[25px] mr-2"/> <h1 className=" font-albertsans font-bold text-[#184d85] text-[25px]">Explore our Products</h1></div>

  <div className="flex justify-start items-center mt-3 h-[60px]">
 {/*<div onClick={() => showinventorytable('allinventorytable')}  className={`hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeinventorytable ==='allinventorytable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeinventorytable ==='allinventorytable' ? 'text-white' : ''}`}>All</h1></div>*/}
  <div onClick={() => showinventorytable('ambherinventorytable')}  className={`mr-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeinventorytable ==='ambherinventorytable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeinventorytable ==='ambherinventorytable' ? 'text-white' : ''}`}>Ambher Optical</h1></div>
  <div onClick={() => showinventorytable('bautistainventorytable')}  className={`ml-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeinventorytable ==='bautistainventorytable' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeinventorytable ==='bautistainventorytable' ? 'text-white' : ''}`}>Bautista Eye Center</h1></div>
  
  </div>


                






          { activeinventorytable === 'ambherinventorytable' && ( <div id="ambherinventorytable" className="p-2  animate-fadeInUp flex  items-start border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >

          <div className="p-3 shadow-b-lg border-b-2  rounded-2xl w-[20%] h-full  mr-2 overflow-y-auto overflow-x-hidden">
        
                <div className="border-b-2 pb-3 flex items center w-full mt-7"><i className="bx bx-filter font-albertsans font-semibold text-[#363636] text-[25px]" /><h1 className="ml-2 text-[16px] font-albertsans font-semibold text-[#363636]">Filter by category</h1></div>

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
          <div className=" flex flex-col justify-start  ml-2 rounded-2xl w-[90%]  h-[540px] shadow-b-lg ">

              <div className="overflow-y-auto w-[100%] rounded-2xl h-full flex flex-wrap content-start gap-3 pl-2 pt-2 bg-[#fafafa]">
                

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
              }} className="mr-3 mb-3 flex flex-col items-start justify-start w-[220px] h-auto shadow-md bg-white rounded-2xl">
                <img src={product.ambherinventoryproductimagepreviewimages[0] || defaultimageplaceholder}  alt={product.ambherinventoryproductname} className="w-full h-45"/>
                <div className="mx-1  w-fit rounded-md py-1 px-2  bg-[#0d708f] rounded-1xl h-fit  mt-2 break-words min-w-0"><h1 className="font-medium italic text-white text-[16px] min-w-0 break-words">{product.ambherinventoryproductcategory}</h1></div>
                <div className="w-full h-auto ml-2 mt-2 "><h1 className="font-albertsans font-medium text-[#4e4f4f] text-[14px] min-w-0 break-words">{product.ambherinventoryproductname}</h1></div>
                <div className="w-fit h-auto ml-2 mt-1 "><h1 className="font-albertsans font-bold text-[#4e4f4f] text-[18px] min-w-0 break-words">₱ {product.ambherinventoryproductprice?.toLocaleString()}</h1></div>
                <div className="w-full h-auto ml-2 mt-5 mb-5 "><h1 className="font-albertsans font-medium text-[#4e4f4f] text-[15px] min-w-0 break-words">Stock Quantity: {product.ambherinventoryproductquantity}</h1></div>
              </div>
                  ))
                )}
              </div>

              
              

              </div>
          </div>

          </div>)}



          {showpatientambherviewproduct && (

                         <div className="overflow-y-auto h-auto  bg-opacity-0 flex justify-center items-start z-50 fixed inset-0 bg-[#000000af] bg-opacity-50">
                           <div className="mt-10 pl-5 pr-5 bg-white rounded-2xl w-[1300px] h-auto mb-10 animate-fadeInUp ">
                                <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                                  <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">View Product</h1></div>
                                  <div onClick={() => setshowpatientambherviewproduct(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                                </div>

                          <form className="flex flex-col  ml-15 mr-15 mt-5   w-fullx" >
                                <div className="flex justify-center items-start bg-[#fcfcfc] rounded-2xl w-full h-auto">
                                  <div className="pb-10 w-full h-full mr-15 rounded-2xl flex justify-center mt-5">



                                      <div className="h-fit w-fit flex-none">
  
                                <div className="relative">
                                <img  className="w-120 object-cover rounded-2xl h-120" src={(selectedambherproduct?.ambherinventoryproductimagepreviewimages?.[ambhercurrentimageindex]) || (addambherinventoryproductimagepreviewimages?.[ambhercurrentimageindex]) || defaultimageplaceholder}/>


                                     {((selectedambherproduct?.ambherinventoryproductimagepreviewimages?.length || 0) > 1 || 
                                       addambherinventoryproductimagepreviewimages?.length > 1) && (
                                         <>
                                           <button type="button" onClick={ambherhandlepreviousimage}  className="bg-opacity-50 hover:bg-opacity-75 rounded-full text-white p-2 absolute left-2 top-1/2 transform -translate-y-1/2 bg-black"><i className="bx bx-chevron-left text-2xl" /></button>

                                           <button type="button" onClick={ambherhandlenextimage}  className="rounded-full absolute bg-opacity-50 text-white p-2 transform -translate-y-1/2 bg-black hover:bg-opacity-75 right-2 top-1/2">  <i className="bx bx-chevron-right text-2xl" /></button>

                                         </>
                                       )}
                                     </div>
                                      
                                      

                                      </div>



                                  </div>

                                  <div className="w-full h-auto flex items-start mb-10 rounded-2xl min-w-0">
                                        <div className=" w-[100%] h-auto  rounded-4xl">
                                  
                                  
              
                                        <div className=" w-[100%] registration-container">
                                     
                                        <h1 className=" font-matimo text-white px-4 py-1 w-max rounded-2xl bg-[#3da9d1] text-[23px] ">{ambherinventorycategorynamebox}</h1>
                                        <p className="font-albertsans font-semibold text-[#616161] text-[14px]">{addambherinventoryproductbrand}</p>
                                        <h1 className="min-w-0 break-words h-fit w-full font-albertsans font-bold text-[#212121] text-[29px]">{addambherinventoryproductname}</h1>
                                        <p className="font-albertsans font-semibold text-[#616161] text-[14px]">Available in Stock: {addambherinventoryproductquantity}</p>
                                  
                                        <p className="mt-3 font-albertsans font-semibold text-[#478d12] text-[40px]">₱{addambherinventoryproductprice}</p>
                                  
                                        <p className="mt-12 font-albertsans font-bold text-[#343434] text-[20px]">Description</p>
                                        <p className="font-semibold text-[#4b4b4b]">- {addambherinventoryproductdescription}</p>

                                        </div>
                                
                                  
                                  
                                        </div>

                                  </div>
                                </div>
                                </form>
                           </div>
                         </div>
              

          )}







          { activeinventorytable === 'bautistainventorytable' && ( <div id="bautistainventorytable" className="p-2  animate-fadeInUp flex  items-start border-t-2  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >

          <div className="p-3 shadow-b-lg border-b-2  rounded-2xl w-[20%] h-full  mr-2 overflow-y-auto overflow-x-hidden">
        
                <div className="border-b-2 pb-3 flex items center w-full mt-7"><i className="bx bx-filter font-albertsans font-semibold text-[#363636] text-[25px]" /><h1 className="ml-2 text-[16px] font-albertsans font-semibold text-[#363636]">Filter by category</h1></div>

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
          <div className=" flex flex-col justify-start  ml-2 rounded-2xl w-[90%]  h-[540px] shadow-b-lg ">

              <div className="overflow-y-auto w-[100%] rounded-2xl h-full flex flex-wrap content-start gap-3 pl-2 pt-2 bg-[#fafafa]">
                

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
                <div className="mx-1  w-fit rounded-md py-1 px-2  bg-[#0d708f] rounded-1xl h-fit  mt-2 break-words min-w-0"><h1 className="font-medium italic text-white text-[16px] min-w-0 break-words">{product.bautistainventoryproductcategory}</h1></div>
                <div className="w-full h-auto ml-2 mt-2 "><h1 className="font-albertsans font-medium text-[#4e4f4f] text-[14px] min-w-0 break-words">{product.bautistainventoryproductname}</h1></div>
                <div className="w-fit h-auto ml-2 mt-1 "><h1 className="font-albertsans font-bold text-[#4e4f4f] text-[18px] min-w-0 break-words">₱ {product.bautistainventoryproductprice?.toLocaleString()}</h1></div>
                <div className="w-full h-auto ml-2 mt-5 mb-5 "><h1 className="font-albertsans font-medium text-[#4e4f4f] text-[15px] min-w-0 break-words">Stock Quantity: {product.bautistainventoryproductquantity}</h1></div>
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
                                <div className=" mt-5 border-3 flex justify-between items-center border-[#2d2d4400] w-full h-[70px]">
                                  <div className="flex justify-center items-center"><img src={darklogo} alt="Eye2Wear: Optical Clinic" className="w-15 hover:scale-105 transition-all   p-1"></img><h1 className="text-[#184d85] font-albertsans font-bold ml-3 text-[30px]">View Product</h1></div>
                                  <div onClick={() => setshowpatientbautistaviewproduct(false)} className="bg-[#333232] px-10 rounded-2xl hover:cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"><i className="bx bx-x text-white text-[40px] "/></div>
                                </div>

                          <form className="flex flex-col  ml-15 mr-15 mt-5   w-fullx" >
                                <div className="flex justify-center items-start bg-[#fcfcfc] rounded-2xl w-full h-auto">
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
                                     
                                        <h1 className=" font-matimo text-white px-4 py-1 w-max rounded-2xl bg-[#3da9d1] text-[23px] ">{bautistainventorycategorynamebox}</h1>
                                        <p className="font-albertsans font-semibold text-[#616161] text-[14px]">{addbautistainventoryproductbrand}</p>
                                        <h1 className="min-w-0 break-words h-fit w-full font-albertsans font-bold text-[#212121] text-[29px]">{addbautistainventoryproductname}</h1>
                                        <p className="font-albertsans font-semibold text-[#616161] text-[14px]">Available in Stock: {addbautistainventoryproductquantity}</p>
                                  
                                        <p className="mt-3 font-albertsans font-semibold text-[#478d12] text-[40px]">₱{addbautistainventoryproductprice}</p>
                                  
                                        <p className="mt-12 font-albertsans font-bold text-[#343434] text-[20px]">Description</p>
                                        <p className="font-semibold text-[#4b4b4b]">- {addbautistainventoryproductdescription}</p>

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