const bautistafilteredproducts = () => {
  let filtered = bautistainventoryproducts.filter(product =>
  (activebautistainventorycategorytable === 'all' ||
    product.bautistainventoryproductcategory === activebautistainventorycategorytable) &&
  (product.bautistainventoryproductname.toLowerCase().includes(searchProducts.toLowerCase()) ||
   product.bautistainventoryproductbrand.toLowerCase().includes(searchProducts.toLowerCase())||
   product.bautistainventoryproductdescription.toLowerCase().includes(searchProducts.toLowerCase()))
  );
  
  return sortproductsbyPrice(filtered, pricesortingProducts, 'bautista');
};