      {(localStorage.getItem("role") === "staff" || localStorage.getItem("role") === "owner") && (localStorage.getItem("staffclinic") === "Bautista Eye Center" || localStorage.getItem("ownerclinic") === "Bautista Eye Center") && (
        <div className="fixed bottom-5 right-5 z-[99] flex flex-col items-start gap-2">
          {showpatientchatdashboard && (
            <div className="mb-6 motion-preset-slide-down w-250 h-150 shadow-2xl z-[9999] flex flex-col rounded-2xl bg-white">
              <div className="min-h-12 max-h-12 w-full h-14 rounded-t-2xl flex justify-center items-center bg-[#39715f]">
                <div className="flex px-2 w-full items-center">
                  <img src={ambherlogo} className="w-15 px-2 py-1"/>
                  <p className="font-albertsans font-semibold text-[17px] text-[#ffffff]">Bautista Eye Center</p>
                </div>
              </div>

              <div className="p-2 gap-2 w-full h-full rounded-b-2xl flex items-center justify-center">
                <div className="rounded-2xl h-full w-[30%] flex flex-col items-start">
                  <div className="rounded-2xl h-[10%] w-full flex justify-center items-center">
                    <div className="flex items-center justify-center w-full h-full">
                      <i className="bx bx-search absolute left-3 text-2xl text-gray-500"></i>
                      <input 
                        type="text" 
                        placeholder="Search..." 
                        className="transition-all duration-300 ease-in-out py-3 pl-10 w-250 rounded-2xl bg-[#e4e4e4] focus:bg-slate-100 focus:outline-sky-500"
                      />
                    </div>
                  </div>

                  <div className="gap-3 flex items-center rounded-2xl h-[9%] w-full">
                    <div 
                      onClick={() => showambhermessageslist('allambhermessageslist')} 
                      className={`cursor-pointer h-[90%] w-[90%] mr-3 hover:rounded-2xl transition-all duration-300 ease-in-out border-2 b-[#909090] rounded-3xl text-center flex justify-center items-center ${activeambhermessageslist ==='allambhermessageslist' ? 'bg-[#7E996D] rounded-2xl' : ''}`}
                    >
                      <h1 className={`font-albertsans font-semibold text-[#5d5d5d] ${activeambhermessageslist ==='allambhermessageslist' ? 'text-white' : ''}`}>All</h1>
                    </div>
                    <div 
                      onClick={() => showambhermessageslist('unreadambhermessageslist')} 
                      className={`cursor-pointer ml-3 hover:rounded-2xl transition-all duration-300 ease-in-out border-2 b-[#909090] rounded-3xl h-[90%] w-[90%] text-center flex justify-center items-center ${activeambhermessageslist ==='unreadambhermessageslist' ? 'bg-[#7E996D] rounded-2xl' : ''}`}
                    >
                      <h1 className={`font-albertsans font-semibold text-[#5d5d5d] ${activeambhermessageslist ==='unreadambhermessageslist' ? 'text-white' : ''}`}>Unread</h1>
                    </div>
                  </div>

                  <div className="pt-3  gap-1 px-2 flex flex-col rounded-2xl min-h-[72%] w-full max-h-[72%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
                    <div 
                      className="p-2 flex items-center justify-start w-full h-15 border-1 hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 rounded-2xl"
                      onClick={() => startConversation("Bautista Eye Center")}
                    >
                      <img src={bautistalogo} className="w-13 h-7"/>
                      <div className="w-[76%] flex flex-col justify-center items-start ml-3">
                        <p className="font-albertsans font-semibold text-[16px] text-[#3a3a3a] truncate overflow-hidden whitespace-nowrap w-full">Bautista Eye Center</p>
                        <p className="font-albertsans font-medium text-[13px] text-[#555555] truncate overflow-hidden whitespace-nowrap w-full">
                          {getLatestMessageDisplay({ patientfirstname: "Bautista" }, messages)}
                        </p>
                      </div>
                    </div>
                    {patients.map((patient) => (
                      <div 
                        key={patient._id}
                        className="p-2 flex items-center justify-start w-full h-19 hover:bg-gray-100 hover:shadow-md transition-all duration-300 ease-in-out cursor-pointer rounded-2xl"
                        onClick={() => handlePatientSelect(patient)}
                      >
                        <img 
                          src={patient.patientprofilepicture || profileuser} 
                          className="w-13 h-13 rounded-full"
                          onError={(e) => { e.target.src = profileuser }}
                        />
                        <div className="w-[76%] flex flex-col justify-center items-start ml-3">
                          <p className="font-albertsans font-semibold text-[16px] text-[#3a3a3a] truncate overflow-hidden whitespace-nowrap w-full">
                            {`${patient.patientfirstname} ${patient.patientlastname}`}
                          </p>
                          <p className="font-albertsans font-medium text-[13px] text-[#555555] truncate overflow-hidden whitespace-nowrap w-full">
                            {getLatestMessageDisplay(patient, patient.latestMessage ? [patient.latestMessage] : [])}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col rounded-2xl h-full w-[70%] border-1">
                  <div className="shadow-md pt-0.5 pb-0.5 pl-3 rounded-t-2xl border-1 h-[11%] w-full flex item-center justify-start">
                    <div className="flex items-center justify-center">
                      <img 
                        src={selectedPatient ? (selectedPatient.patientprofilepicture || profileuser) : profileuser} 
                        className="w-12 h-12 rounded-full"
                        onError={(e) => { e.target.src = profileuser }}
                      />
                    </div>
                    <div className="flex flex-col justify-center items-start ml-3">
                      <p className="font-albertsans font-semibold text-[16px] text-[#3a3a3a]">
                        {selectedPatient ? `${selectedPatient.patientfirstname} ${selectedPatient.patientlastname}` : "Select a patient"}
                      </p>
                    </div>
                  </div>
                  <div className="pb-2  h-full w-full overflow-y-auto" style={{ maxHeight: '400px' }}>
                    <div  className=" px-3  h-[100%] w-full overflow-y-auto" style={{ maxHeight: '400px' }}>
                    {loading ? (
                      <div className="w-full flex justify-center items-center h-full text-gray-500">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#39715f]"></div>
                      </div>
                    ) : messages.length > 0 ? (
  messages.map((msg, index) => {
  const isStaffOrOwner = msg.senderRole === 'staff' || msg.senderRole === 'owner';
  const isSameSenderAsPrevious = index > 0 && 
    messages[index - 1].senderId === msg.senderId;
  const isSameSenderAsNext = index < messages.length - 1 && 
    messages[index + 1].senderId === msg.senderId;
  
  // Add this to determine if we need extra spacing
  const isDifferentSenderFromPrevious = index > 0 && 
    messages[index - 1].senderId !== msg.senderId;

  let borderRadiusClasses = '';
  if (isStaffOrOwner) {
    borderRadiusClasses = !isSameSenderAsPrevious && !isSameSenderAsNext ? 'rounded-2xl' :
      !isSameSenderAsPrevious ? 'rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl' :
      !isSameSenderAsNext ? 'rounded-tl-2xl rounded-bl-2xl rounded-br-2xl' :
      'rounded-tl-2xl rounded-bl-2xl';
  } else {
    borderRadiusClasses = !isSameSenderAsPrevious && !isSameSenderAsNext ? 'rounded-2xl' :
      !isSameSenderAsPrevious ? 'rounded-tr-2xl rounded-br-2xl rounded-tl-2xl' :
      !isSameSenderAsNext ? 'rounded-tr-2xl rounded-br-2xl rounded-bl-2xl' :
      'rounded-tr-2xl rounded-br-2xl';
  }

  const isImageOnly = msg.imageUrl && !msg.text && !msg.documentUrl;
  const isLastInSequence = !isSameSenderAsNext;
  const profilePicture = selectedPatient && !isStaffOrOwner 
    ? (selectedPatient.patientprofilepicture || profileuser) 
    : (msg.senderClinic === "Bautista Eye Center" ? ambherlogo : bautistalogo);

  return (
    <div 
      key={msg._id || msg.temporaryId}
      className={`w-full flex ${isStaffOrOwner ? 'justify-end' : 'justify-start'} ${
        isDifferentSenderFromPrevious ? 'mt-4' : ''
      }`}
    >

      <div className={`flex-shrink-0 ${isStaffOrOwner ? 'order-1 ml-2' : 'order-0 mr-2'} ${isLastInSequence ? 'visible' : 'invisible'}`}>
        {!isStaffOrOwner && (
          <img 
            src={profilePicture} 
            alt="Profile picture"
            className="w-8 h-8 self-end rounded-full object-cover"
            onError={(e) => { e.target.src = profileuser }}
          />
        )}
      </div>

      {/* Message content */}
<div className={`max-w-[80%] ${isStaffOrOwner ? 'order-0' : 'order-1'}`}>
  {!isSameSenderAsPrevious && (
    <div className={`flex ${isStaffOrOwner ? 'justify-end' : 'justify-start'}`}>
      <p className="text-xs font-semibold text-gray-600 mb-1">
        {msg.senderName}
      </p>
    </div>
  )}
  {isImageOnly ? (
    renderMessageContent(msg, isStaffOrOwner)
  ) : (
    <div 
      className={`flex flex-col px-5 py-2 ${
        isStaffOrOwner ? 'bg-[#c0eed6]' : 'bg-[#e0e0e0]'
      } ${borderRadiusClasses} relative group`}
      style={{
        wordWrap: 'break-word',
        overflowWrap: 'break-word',
        whiteSpace: 'pre-wrap'
      }}
    >
      {renderMessageContent(msg, isStaffOrOwner)}
    </div>
  )}
                    {index === messages.length - 1 && (
              <div className="mt-1 w-full flex ">
                <p className="text-[12px] text-[#565656]">
                  {formatDate(msg.createdAt)} at {new Date(msg.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </p>
              </div>
            )}
      </div>
    </div>
  );
})
                    ) : (
                      <div className="w-full text-center text-gray-500 h-full flex items-center justify-center">
                        No messages yet. Start the conversation!
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
   </div>
                  <div className=" px-2 pb-2 flex flex-col w-full rounded-2xl">
                    <div className="bg-gray-200 rounded-2xl p-3 pb-3 flex items-center w-full h-16">
                      {!selectedFile && (
                        <label className="cursor-pointer p-2 mr-2">
                          <input 
                            type="file" 
                            ref={fileInputRef}
                            accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.txt"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                          <img src={documenticon} className="w-7 h-7"/>
                        </label>
                      )}

                      {selectedFile?.isImage && (
                        <div className="flex-shrink-0 relative mr-2">
                          <img 
                            src={selectedFile.preview} 
                            alt="Preview" 
                            className="w-11 h-11 object-cover rounded cursor-pointer"
                            onClick={() => {
                              setSelectedImageForModal(selectedFile.preview);
                              setModalOpen(true);
                            }}
                          />
                          <img 
                            onClick={cancelFile}
                            src={closeimage} 
                            alt="cancel" 
                            className="absolute -top-2 -right-2 h-5 w-5 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out bg-white rounded-full p-0.5 shadow-sm"
                          />
                        </div>
                      )}

                      {selectedFile && !selectedFile.isImage && (
                        <div className="flex items-center bg-gray-100 px-2 py-1 rounded mr-2 max-w-[100px]">
                          <img src={filesent} className="w-5 h-5 mr-2 flex-shrink-0" />
                          <span className="text-sm truncate">
                            {selectedFile.name}
                          </span>
                          <img 
                            onClick={cancelFile} 
                            src={closeimage} 
                            alt="cancel" 
                            className="ml-2 h-4 w-4 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out flex-shrink-0"
                          />
                        </div>
                      )}

                      <div className="flex-grow flex items-center">
                        <textarea 
                          className="w-full h-full p-2 outline-none resize-none bg-transparent" 
                          placeholder="Type your message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                      </div>

                      <img 
                        src={sendchatambher}
                        alt="send" 
                        className="hover:scale-105 transition-all duration-300 ease-in-out h-10 w-10 p-2 cursor-pointer flex-shrink-0" 
                        onClick={handleSendMessage}
                      />
                    </div>
                  </div>
             
                </div>
              </div>
            </div>
          )}

          <div className="w-full justify-end flex items-end">
            {showpatientchatdashboard ? (
              <div 
                onClick={() => {
                  setshowpatientbautistaConversation(false);
                  setshowpatientambherConversation(false);
                  setshowpatientchatdashboard(false);
                  setMessages([]);
                  setSelectedImage(null); 
                  setSelectedFile(null);
                  setSelectedPatient(null);
                }} 
                className="motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#39715f]"
              >
                <img src={close} alt="logo" className="select-none motion-preset-shake w-10 h-10 p-2" />
              </div>
            ) : (
              <div 
                onClick={() => setshowpatientchatdashboard(true)} 
                className="motion-preset-slide-down hover:scale-105 ease-in-out duration-300 transition-all cursor-pointer flex justify-center items-center w-[60px] h-[60px] rounded-full bg-[#39715f]"
              >
                <img src={chat} alt="logo" className="select-none motion-preset-seesaw w-10 h-10 p-2" />
              </div>
            )}
          </div>
        </div>
      )}