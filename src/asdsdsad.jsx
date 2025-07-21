                  [...filteredproducts]
                  .sort((a, b) => {
                    const aquant = a.bautistainventoryproductquantity || 0;
                    const bquant = b.bautistainventoryproductquantity || 0;
                    return aquant <= 10 ? (bquant <= 10 ? 0 : -1) : 1;
                  }).map((product) => (