        if(selectedbautistaproduct){
          const isInWishlist = data.some(item => item.patientwishlistinventoryproductid === selectedbautistaproduct.bautistainventoryproductid);
          setbautistaheartisClicked(isInWishlist);
        }