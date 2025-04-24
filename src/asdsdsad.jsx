//ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE
//ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE
//ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE
//ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE
//ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE
//ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE
//ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE //ADMIN ACCOUNT TABLE

const [showaddadmindialog, setshowaddadmindialog] = useState(false);
const [showviewadmindialog, setshowviewadmindialog] = useState(false);
const [showdeleteadmindialog, setshowdeleteadmindialog] = useState(false);
const [admins, setadmins] = useState([]);
const [selectedadminaccount, setselectedadminaccount] = useState(null);
const [selectededitadminaccount, setselectededitadminaccount] = useState(null);
const [loadingadmins, setloadingadmins] = useState(true);
const [failedloadingadmins, setfailedloadingadmins] = useState(null);
const [adminselectedprofile, setadminselectedprofile] = useState(null);
const [adminpreviewimage, setadminpreviewimage] = useState (null);
const adminimageinputref = useRef(null);
const [searchadmins, setsearchadmins] = useState('');
const [filteredadmins, setfilteredadmins] = useState([]);
const [adminemailexist, setadminemailexist] = useState(false);
const [admincheckemail, setadmincheckemail] = useState(false);
const [adminemailerror, setadminemailerror] = useState(false);
const adminemailcharacters = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const [adminissubmitting, setadminissubmitting] = useState(false);
const [adminmessage, setadminmessage] = useState({ text:'', type:''});


//Blank variables that stores all data to be sent to database
const [adminformdata, setadminformdata] = useState({
    role:'Admin',
    adminemail:'',
    adminpassword:'',
    adminlastname:'',
    adminfirstname:'',
    adminmiddlename:'',
    adminprofilepicture:'' // Holds the profile picture 
});

//Debounce check for search input
const searchadmindebounce = (functions, delay) => {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => functions.apply(this, args), delay);
  }
};

//admin search filter
const filteradminaccount = useCallback(searchadmindebounce((term) => {
  if(!term) {
    setfilteredadmins(admins);
    return;
  }

  const filtered = admins.filter(admin =>
    admin.adminlastname.toLowerCase().includes(term.toLowerCase()) ||
    admin.adminfirstname.toLowerCase().includes(term.toLowerCase()) ||
    admin.adminmiddlename.toLowerCase().includes(term.toLowerCase()) ||
    admin.adminemail.toLowerCase().includes(term.toLowerCase()) ||
    admin.adminId.toString().includes(term)
  );

  setfilteredadmins(filtered);
}, 300), [admins]);

//Fetching admin list and data from database
useEffect(() => {
  if(activeaccounttable === 'adminaccounttable'){

    const fetchadmins = async () => {
      try{

        const fetchresponse = await fetch('/api/adminaccounts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('admintoken')}`
          }
        });
        
        if(!fetchresponse.ok){
          throw new Error("Failed to fetch admin accounts");
        }

        const admindata = await fetchresponse.json();
        setadmins(admindata);
      
      }catch(error){
        setfailedloadingadmins(error.message);
      }finally{
        setloadingadmins(false);
      }
    };
    fetchadmins();

  }
}, [activeaccounttable]);

//admin Filter
useEffect(() => {
  filteradminaccount(searchadmins);
}, [searchadmins, filteradminaccount]);

const renderadminaccounts = () => {

const adminstorender = searchadmins ? filteredadmins : admins;

if (loadingadmins) {
  return (
    <div className="flex justify-center items-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

if (failedloadingadmins) {
  return (
    <div className="p-4 bg-red-50 text-red-600 rounded-lg">
      Error: {failedloadingadmins}
    </div>
  );
}



if(searchadmins && filteredadmins.length == 0){
  return(
    <div className="rounded-2xl py-6 px-4 bg-yellow-50 text-yellow-600">
      No admins found.
    </div>
  )
}




return (
  <div className="overflow-x-auto w-full h-full">
    <table className="w-full rounded-tl-2xl  rounded-tr-2xl shadow-lg">
      <thead className="rounded-tl-2xl  rounded-tr-2xl">
        <tr className="text-[#ffffff] font-albertsans font-bold bg-[#2781af] rounded-tl-2xl rounded-tr-2xl ">
          <th className="pb-3 pt-3 pl-2 pr-2 text-center rounded-tl-2xl">Id</th>
          <th className="pb-3 pt-3 pl-12 pr-12 text-center"></th>
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">Lastname</th>
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">Firstname</th>
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">Middlename</th>
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">Email</th>
          {/*<th className="pb-3 pt-3 pl-2 pr-2 text-center">Password</th>*/}
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">isVerified</th>
          <th className="pb-3 pt-3 pl-2 pr-2 text-center">Date Created</th>
          <th className="pb-3 pt-3 text-center pr-3"></th>
          <th className="pb-3 pt-3 text-center pr-3  rounded-tr-2xl"></th>

        </tr>
      </thead>
      
      <tbody className="divide-y divide-gray-200 bg-white">
      {adminstorender.map((admin) => (
          <tr key={admin._id}  className="hover:bg-gray-100  transition-all duration-300 ease-in-out hover:cursor-pointer ">
            <td  className="py-3 px-6 text-[#3a3a3a] font-albertsans font-medium ">#{admin.adminId}</td>
            <td  className="px-6 py-3 text-center">
              <div className="flex justify-center">
              <img 
                src={admin.adminprofilepicture} 
                alt="Profile" 
                className="w-12 h-12 rounded-full object-cover"
                onError={(e) => {
                  e.target.src = 'default-profile-url'; // Fallback image
                }}
              />
              </div>
            </td>
            <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium ">{admin.adminlastname}</td>
            <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium max-w-[150px]">{admin.adminfirstname}</td>
            <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">{admin.adminmiddlename}</td>
            <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">
              <a href={`mailto:${admin.adminemail}`} className="text-blue-400 hover:underline">
                {admin.adminemail}
              </a>

            </td>
            <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium "><span title="Password Hidden for Security">{admin.adminpassword.substring(0,6)}...</span></td>
            <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">
              <span className={`rounded-2xl text-xs px-5 py-4 ${admin.isVerified ? 'text-green-800 bg-green-100' : 'text-yellow-800 bg-yellow-100'}`}>
                {admin.isVerified ? 'Active' : 'Pending'}
              </span>
            </td>
           {/* <td  className="py-3 px-6 text-[#454444] text-center font-albertsans font-medium">
              {new Date(admin.createdAt).toLocaleDateString('en-US',{
                year:'numeric',
                month: 'short',
                day:'numeric'
              })}
            </td>*/}
            <td><div onClick={() =>  {
              setselectededitadminaccount({
                 id: admin._id,
                 email: admin.adminemail,
                 password: admin.adminpassword,
                 lastname: admin.adminlastname,
                 firstname: admin.adminfirstname,
                 middlename: admin.adminmiddlename,
                 profilepicture: admin.adminprofilepicture
                 });

              setadminformdata({
                role: 'Admin',
                adminemail: admin.adminemail,
                adminpassword: admin.adminpassword,
                adminlastname: admin.adminlastname,
                adminfirstname: admin.adminfirstname,
                adminmiddlename: admin.adminmiddlename,
                adminprofilepicture: admin.adminprofilepicture
              });

              setadminpreviewimage(admin.adminprofilepicture);
              setshowviewadmindialog(true);}}

             className="bg-[#383838]  hover:bg-[#595959]  mr-2 transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-pencil text-white mr-1"/><h1 className="text-white">Edit</h1></div></td>

            <td><div onClick={() =>  {
              setselectedadminaccount({
                 id: admin.adminId,
                 name: `${admin.adminfirstname} ${admin.adminlastname}`});
                          
              setshowdeleteadmindialog(true);}}

             className="bg-[#8c3226] hover:bg-[#ab4f43]  transition-all duration-300 ease-in-out flex justify-center items-center py-2 px-5 rounded-2xl hover:cursor-pointer"><i className="bx bxs-trash text-white mr-1"/><h1 className="text-white">Delete</h1></div></td>


            </tr>
))}
      </tbody>
    </table>
    

  </div>
);
};

//PROFILE IMAGE TYPE HANDLING
const adminhandleprofilechange = async (e) => {
  const file = e.target.files[0];

  if (!file) return;


  const imagefiletype = ['image/png', 'image/jpeg', 'image/webp'];
  if(!imagefiletype.includes(file.type)) {
    alert("Please select an image file (JPG or PNG)");
    return;
  }


  const maximagefile = 1;
  if(file.size > maximagefile * 1024 * 1024){
    alert("Image is too large. Please select image under 1MB");
    return;
  }

  setadminselectedprofile(null);
  setadminpreviewimage(null);

  if(adminimageinputref.current){
    adminimageinputref.current.value = "";
  }






  try{

    const imageconfiguration = {
      maximagemb: 1,
      maxworh: 800,
      useWebWorker: true,
      initialQuality: 0.8
    };


    const compressedimageprofile = await imageCompression(file, imageconfiguration);
    const reader = new FileReader();
    reader.onloadend = () => {

      if(reader.error){
        console.error("Error processing image file : ", reader.error);
        alert("Error processing image file. Try again");
        return;
      }
      setadminpreviewimage(reader.result);
    };


    reader.onerror = () => {
      console.error("File Reader Error : ", reader.error);
      alert("Error reading file. Try again");
      return;
    };

    reader.readAsDataURL(compressedimageprofile);
    setadminselectedprofile(compressedimageprofile);
  

  } catch (error) {

    console.error("Image file compression failed : ", error.message);
    alert("Image file compression failed. Try again");
    return;

  }
    

};

//Handles the click event of upload button
const adminhandleuploadclick = () => {
  adminimageinputref.current.click();
};

const adminhandleremoveprofile = () => {
  setadminselectedprofile(null);
  setadminpreviewimage(null);
  if(adminimageinputref.current){
    adminimageinputref.current.value = "";
  }
}


//Chceks if email is already existing
useEffect(() => {
      const debounceemailcheck = async () => {
        
        //Don't check if email input is empty
        if(!adminformdata.adminemail) {
          setadminemailerror(false);
          setadminemailexist(false);
          return;
        }



        if(!adminemailcharacters.test(adminformdata.adminemail)) {
          setadminemailerror(true);
          return;
        }

        setadmincheckemail (true);

        try{
          //Request to server if the email exists in patientaccounts collection
          const patientresponse = await fetch(
            `http://localhost:3000/api/patientaccounts/check-email/${encodeURIComponent(adminformdata.adminemail)}`
     
          );

          //Request to server if the email exists in adminaccounts collection
          const staffresponse = await fetch(
            `http://localhost:3000/api/staffaccounts/check-email/${encodeURIComponent(adminformdata.adminemail)}`
     
          );
          

          //Request to server if the email exists in adminaccounts collection
          const ownerresponse = await fetch(
             `http://localhost:3000/api/owneraccounts/check-email/${encodeURIComponent(adminformdata.adminemail)}`
                 
          );


          //Request to server if the email exists in adminaccounts collection
          const adminresponse = await fetch(
             `http://localhost:3000/api/adminaccounts/check-email/${encodeURIComponent(adminformdata.adminemail)}`
                 
          );
          
        const patientdata = await patientresponse.json();
        const staffdata = await staffresponse.json();
        const ownerdata = await ownerresponse.json();
        const admindata = await adminresponse.json();

        //Save wether email existss in db
        setadminemailexist(patientdata.exists  ||  staffdata.exists || ownerdata.exists  ||  admindata.exists); 
        setadminemailerror(patientdata.exists  ||  staffdata.exists || ownerdata.exists  ||  admindata.exists);




      }catch(error){
        console.error("Failed email validation:", error);
      }finally{
        //Check email done
        setadmincheckemail(false);
      }

      }

      const timer = setTimeout(debounceemailcheck, 500);
      return () => clearTimeout(timer); //Cleanup
}, [adminformdata.adminemail]);




  //Handlechange function to be used in input forms
const adminhandlechange = (e) => {
    const {name, value} = e.target
    setadminformdata(prev => ({
      ...prev,
      [name]: value
    }))
}

  
//INSERT admin ACCOUNT  //INSERT admin ACCOUNT  //INSERT admin ACCOUNT   //INSERT admin ACCOUNT  //INSERT admin ACCOUNT  //INSERT admin ACCOUNT 
  const adminhandlesubmit = async (e) => {
    e.preventDefault()
    setadminissubmitting(true)
    setadminmessage({
      text:'', type:''
    })

  try{

    
    const adminaccsubmission = {
      ...adminformdata,
      adminprofilepicture: adminpreviewimage || adminformdata.adminprofilepicture
    };



//Sends all admin data to the server
    const response = await fetch("http://localhost:3000/api/adminaccounts",{
          method: "POST",
          headers: {
            "Content-Type":"application/json",
            'Authorization': `Bearer ${localStorage.getItem('admintoken')}`
          },
          body: JSON.stringify(adminaccsubmission)
    });


    //If response is not ok
    if(!response.ok) {
      const errorresult = await response.json();
      console.error("Account Creation Failed : ", errorresult);
      throw new Error(errorresult.message || "Account Creation Failed");
    }
    //If response is success, it will send data to the api and to the database   
    await response.json();
    setadminmessage({text:"Registration Sucessful!",type:"success"});
    
      
       
      //Resets the input forms except the profile picture
      setadminformdata({
        role: 'Admin',
        adminemail:'',
        adminpassword:'',
        adminlastname:'',
        adminfirstname:'',
        adminmiddlename:'',
        adminprofilepicture: ''
      });



      setadminselectedprofile(null);
      setadminpreviewimage(null);



 
  //Error encounter  
    } catch(error) {
      console.error("Error:", error)
      setadminmessage({text:"Registration Failed. Try again",type:"error"});
           
    } finally {
      setadminissubmitting(false)
    }
}

//DELETE admin ACCOUNT    //DELETE admin ACCOUNT    //DELETE admin ACCOUNT    //DELETE admin ACCOUNT    //DELETE admin ACCOUNT    //DELETE admin ACCOUNT  
  const deleteadminaccount = async () => {
    try{
      if(!selectedadminaccount) return;

      const response = await fetch(`/api/adminaccounts/${selectedadminaccount.id}`,{
        method: 'DELETE',
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('admintoken')}`
        }
      });

      if(!response.ok){
        throw new Error("Failed to delete admin account");
      }

      const fetchresponse = await fetch('/api/adminaccounts', {
          headers:{
            'Authorization':`Bearer ${localStorage.getItem('admintoken')}`
          }
      });
      
      if(!fetchresponse.ok) {
        throw new Error("Failed to retrieve updated adminaccounts table");
      }

      const adminaccounts = await fetchresponse.json();
      setadmins(adminaccounts);

      setshowdeleteadmindialog(false);
      setselectedadminaccount(null);

      
    }catch (error){
      console.error("Failed deleting admin: ", error);
    }
  };

//UPDATE admin ACCOUNT  //UPDATE admin ACCOUNT  //UPDATE admin ACCOUNT  //UPDATE admin ACCOUNT  //UPDATE admin ACCOUNT  //UPDATE admin ACCOUNT
  const updateadminaccount = async (e) => {
    
    e.preventDefault();
    setadminissubmitting(true);
    setadminmessage({text:'', type:''});

    try{
      if(!selectededitadminaccount) return;

      const updateadminaccountdetails = {
        ...adminformdata,
        adminprofilepicture: adminpreviewimage || adminformdata.adminprofilepicture
      };

      const response = await fetch(`/api/adminaccounts/${selectededitadminaccount.id}`,{
        method:'PUT',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : `Bearer ${localStorage.getItem('admintoken')}`
        },
        body: JSON.stringify(updateadminaccountdetails)
      });


      if(!response.ok) {
        const errorresponse = await response.json();
        throw new Error(errorresponse.message || "Failed to update admin account");
      }

      const fetchresponse = await fetch('/api/adminaccounts',{
        headers: {
          'Authorization' : `Bearer ${localStorage.getItem('admintoken')}` 
        }
      });

      if(!fetchresponse.ok) {
        const errorresponse = await response.json();
        throw new Error(errorresponse.message || "Failed to update admin account table");
      }

      //Success account update
      const admindata = await fetchresponse.json();
      setadmins(admindata);
      setadminmessage({text:"Admin Account Updated Successfully!", type:"success"});

      setTimeout(() => {
        setadminissubmitting(false);
        setselectededitadminaccount(null);
        setshowviewadmindialog(false);
        setadminmessage({text:"", type:""});
      }, 1500);

    } catch (error){
      console.error("Error updating admin account : ", error);
      setadminissubmitting(false);
      setadminmessage({text: "Failed to update account. Please try again", type:"error"});
    }
};




  