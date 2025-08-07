                {bautistaloadingproducts ? (
                  <div>Loading Ambher Products...</div> 
                ): bautistainventoryproducts.length === 0 ? (
                  <div>No Products Found...</div> 
                ):(
                  [...filteredproducts]
                  .sort((a, b) => {
                    const aquant = a.bautistainventoryproductquantity || 0;
                    const bquant = b.bautistainventoryproductquantity || 0;
                    return aquant <= 10 ? (bquant <= 10 ? 0 : -1) : 1;
                  }).map((product) => (
              <div key={product.bautistainventoryproductid} onClick={() => {setshowaddbautistainventoryproductdialog(true);
                                                                           setselectedbautistaproduct(product);
                                                                           setcurrentimageindex(0);
                                                                           setbautistainventorycategorynamebox(product?.bautistainventoryproductcategory || '');
                                                                           setaddbautistainventoryproductname(product?.bautistainventoryproductname || '');
                                                                           setaddbautistainventoryproductbrand(product?.bautistainventoryproductbrand || '');
                                                                           setaddbautistainventoryproductmodelnumber(product?.bautistainventoryproductmodelnumber || '');
                                                                           setaddbautistainventoryproductdescription(product?.bautistainventoryproductdescription || '');
                                                                           setaddbautistainventoryproductprice(product?.bautistainventoryproductprice || 0);
                                                                           setaddbautistainventoryproductquantity(product?.bautistainventoryproductquantity || 0);
                                                                           setaddbautistainventoryproductimagepreviewimages(product?.bautistainventoryproductimagepreviewimages || []);
              }} className="motion-preset-slide-up mr-3 mb-3 flex flex-col items-start justify-start w-[220px] h-auto shadow-md bg-white rounded-2xl ">
                <img src={product.bautistainventoryproductimagepreviewimages[0] || defaultimageplaceholder}  alt={product.bautistainventoryproductname} className={`rounded-tr-2xl  rounded-tl-2xl w-full h-45 ${product.bautistainventoryproductquantity === 0 ? 'opacity-50': ''}`}/>
                
                
                {product.bautistainventoryproductquantity === 0 ? (<div className="top-2 right-2 absolute px-2 py-1 rounded-md text-xs font-semibold bg-red-500"><h1 className="text-white">Out of Stock</h1></div>): 
                 product.bautistainventoryproductquantity <= 10 ? (<div className="top-2 right-2 absolute px-2 py-1 rounded-md text-xs font-semibold bg-yellow-500"><h1 className="text-white">Low Stock</h1></div>): null}


                <div className="mx-1  w-fit rounded-md py-1 px-2  rounded-1xl h-fit  bg-[#F0F6FF] mt-2 break-words min-w-0 "><h1 className={`font-medium   text-[13px] min-w-0 break-words text-[#0d0d0d] ${product.bautistainventoryproductquantity === 0 ? 'text-gray-400': ''}`} >{product.bautistainventoryproductcategory}</h1></div>
                <div className="w-full h-auto ml-2 mt-2 "><h1 className={`font-semibold  text-[15px] min-w-0 break-words text-[#0d0d0d] ${product.bautistainventoryproductquantity === 0 ? 'text-gray-400': ''}`}>{product.bautistainventoryproductname}</h1></div>
                <div className="w-fit h-auto ml-2 mt-1 "><h1 className={`font-albertsans font-bold text-[18px] min-w-0 break-words ${product.bautistainventoryproductquantity === 0 ? 'text-gray-400': ''}`}>₱{Number(product.bautistainventoryproductprice).toLocaleString('en-PH', {minimumFractionDigits: 2,  maximumFractionDigits: 2})}</h1></div>
                <div className="w-full h-auto ml-2 mt-5 mb-1 "><h1 className={`font-albertsans font-medium  text-[15px] min-w-0 break-words ${product.bautistainventoryproductquantity === 0 ? 'text-red-600' : product.bautistainventoryproductquantity <= 10 ? 'text-yellow-700' : 'text-[#4e4f4f]'}`}>{product.bautistainventoryproductquantity === 0 ? ('Out Of Stock'):(`In Stock: ${product.bautistainventoryproductquantity}${product.bautistainventoryproductquantity <= 10 ? ' (Low)': ''}`)}</h1></div>   
                <div className="w-full h-auto ml-2 mb-3  flex items-center"> <p className="font-albertsans font-medium  text-[15px] text-[#4e4f4f]">Wishlisted: {wishlistCounts[product.bautistainventoryproductid] ?? 0}  </p></div>
                
              </div>
                  ))
                )}