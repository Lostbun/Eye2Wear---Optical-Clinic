  //SET ORDER AMBHER VIEWING PREVIOUS  IMAGE
          const orderbautistahandlepreviousimage = (e) => {
            e.preventDefault(); 
            if (selectedorderbautistaproduct) {
              if (!selectedorderbautistaproduct.bautistainventoryproductimagepreviewimages?.length) return;
              setorderbautistacurrentimageindex(prev => prev === 0 ? selectedorderbautistaproduct.bautistainventoryproductimagepreviewimages.length - 1 : prev - 1 );
          
            } else {
              if (!orderbautistainventoryproductimagepreviewimages?.length) return;
              setorderbautistacurrentimageindex(prev => prev === 0 ? orderbautistainventoryproductimagepreviewimages.length - 1 : prev - 1 );
            }
          };
          
          //NEXT IMAGE
          const orderbautistahandlenextimage = (e) => {
            e.preventDefault();
            if (selectedorderbautistaproduct) {
              if (!selectedorderbautistaproduct.bautistainventoryproductimagepreviewimages?.length) return;
              setorderbautistacurrentimageindex(prev => prev === selectedorderbautistaproduct.bautistainventoryproductimagepreviewimages.length - 1 ? 0 : prev + 1 );
          
            } else {
              if (!orderbautistainventoryproductimagepreviewimages?.length) return;
              setorderbautistacurrentimageindex(prev => prev === orderbautistainventoryproductimagepreviewimages.length - 1 ? 0 : prev + 1);
          
            }
          };
