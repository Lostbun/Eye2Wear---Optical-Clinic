                {['All', 'Pending', 'Ready for Pickup', 'Completed', 'Cancelled'].map(status => {
                    const patientorderedstatusCount = status === 'All'  ? bautistaOrders.length : bautistaOrders.filter(order => order.patientorderbautistastatus === status).length; 
  
                    return (
                       <div key={status} onClick={() => setfilterbautistaorderedproductsStatus(status)} className={`mt-3 hover:rounded-2xl transition-all duration-300 ease-in-out border-2 b-[#909090] rounded-3xl py-2 text-center flex justify-center items-center ${filterbautistaorderedproductsStatus === status ? 'bg-[#2781af] rounded-2xl text-white' : ''}`} >
                        <h1 className={`font-albertsans font-semibold ${filterbautistaorderedproductsStatus === status ? 'text-white' : 'text-[#1f1f1f]'}`}>{status} <span className="bg-gray-200 text-gray-500 font-semibold px-2 rounded-full ml-2 text-sm"> {patientorderedstatusCount} </span> </h1>  </div>
                        );})}