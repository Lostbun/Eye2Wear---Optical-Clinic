                { activebillingsandorderstable === 'ambherbillingsandorderstable' && ( <div id="ambherbillingsandorderstable" className="p-2  animate-fadeInUp  border-[#909090] w-[100%] h-[83%] rounded-2xl mt-5" >
               <div className="ml-2 w-full flex  items-center"><h2 className="font-albertsans font-bold text-[18px] text-[#383838] mr-3 ">Search: </h2><div className="relative w-full flex items-center justify-center gap-3"><i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i><input value={searchambherTerm} onChange={(e) => setambherSearchTerm(e.target.value)} type="text" placeholder="Enter product name..."   className="transition-all duration-300 ease-in-out py-2 pl-10 w-full rounded-2xl  bg-[#e4e4e4] focus:bg-slate-100 focus:outline-sky-500"></input></div></div>
               <div className="mt-5 ml-2 w-full flex justify-between items-center font-semibold text-[#383838] font-albertsans ">
                <div className="flex items-center">
                <i className="bx bx-filter mr-2 text-[20px]"/>
               <h1 className="text-[15px] mr-8">Filter by status </h1>
               <div className="gap-2 flex">
               {['All', 'Pending', 'Ready for Pickup', 'Completed', 'Cancelled'].map((status) => (
               <div key={status} onClick={() => setambherFilter(status)}  className={`border-1 cursor-pointer transition-all duration-300 ease-in-out py-2 px-5 rounded-md text-[14px] ${ambherfilter === status ? 'bg-[#2781af] text-white' : 'hover:bg-[#2781af] hover:text-white'}`}>{status}</div>
               ))}
               </div>
               </div>
               <div className="flex justify-end items-center w-auto h-[9%] rounded-2xl mb-2 mt-3"> <div onClick={() => setshowpatientorderambher(true)}  className="w-50 p-2 hover:cursor-pointer hover:scale-103 bg-[#4ca22b] rounded-3xl flex justify-center  items-center pl-3 pr-3 transition-all duration-300 ease-in-out"><i className="bx  bx-plus text-white font-bold text-[30px]"/><p className="font-bold font-albertsans text-white text-[18px] ml-2">Set Order</p></div> </div>

               </div>