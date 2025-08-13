const [activeambhermessageslist, setactiveambhermessageslist] = useState('allambhermessageslist');
const showambhermessageslist = (ambhermessageslistid) => {
      setactiveambhermessageslist(ambhermessageslistid);
};


                <div onClick={() => showambhermessageslist('allambhermessageslist')}  className={`mr-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeambhermessageslist ==='allambhermessageslist' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeambhermessageslist ==='allambhermessageslist' ? 'text-white' : ''}`}>Ambher Optical</h1></div>
                <div onClick={() => showambhermessageslist('unreadambhermessageslist')}  className={`ml-3 hover:rounded-2xl transition-all duration-300 ease-in-out  border-2 b-[#909090] rounded-3xl pl-25 pr-25 pb-3 pt-3 text-center flex justify-center items-center ${activeambhermessageslist ==='unreadambhermessageslist' ? 'bg-[#2781af] rounded-2xl' : ''}`}><h1 className= {`font-albertsans font-semibold text-[#5d5d5d] ${activeambhermessageslist ==='unreadambhermessageslist' ? 'text-white' : ''}`}>Bautista Eye Center</h1></div>
              