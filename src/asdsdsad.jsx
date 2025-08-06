  const orderambherSubtotal = Number(orderambherinventoryproductprice) * Number(ambhercount);
  const orderambhertotalwithFee = orderambherSubtotal + Number(orderambhercustomFee);
  const orderambherremainingBalance = orderambhertotalwithFee - Number(orderambheramountPaid);
  const [orderambhercheckEmail, setorderambhercheckEmail] = useState(false);
  const [orderambheremailError, setorderambheremailError] = useState(false); 