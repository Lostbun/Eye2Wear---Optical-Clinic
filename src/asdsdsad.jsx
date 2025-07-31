               [...bautistaWishlist]
               .sort((a, b) => {
                 if (a.patientwishlistinventoryproductquantity === 0 && b.patientwishlistinventoryproductquantity !== 0) return 1;
                 if (a.patientwishlistinventoryproductquantity !== 0 && b.patientwishlistinventoryproductquantity === 0) return -1;
                 return 0;}) .map((item) => (