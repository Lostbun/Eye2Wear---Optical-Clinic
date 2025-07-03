    const [bautistacount, setbautistaCount] = useState(1)
    const [bautistaheartisHovered, setbautistaheartisHovered] =useState(false);
    const [bautistaheartisClicked, setbautistaheartisClicked] =useState(false);     
    const [bautistashowheartToast, setbautistashowheartToast] = useState(false);
    const [bautistashowtoastMessage, setbautistashowtoastMessage] = useState("");
    const [bautistashowtoastmessageClosing, setbautistashowtoastmessageClosing] = useState(false);

  const bautistahearthandleClick = () => {
    const bautistaheartnewState = !bautistaheartisClicked;
    setbautistaheartisClicked(bautistaheartnewState);
    setbautistashowtoastMessage(bautistaheartnewState ? "Added to Wishlist!" : "Removed from Wishlist"); 
    setbautistashowheartToast(true);
    setbautistashowtoastmessageClosing(false);
  };

  const getbautistaHeartImage = () => {
    if (bautistaheartisClicked) return heartfilled;
    return bautistaheartisHovered ? heartwhite : heartblack;
  };

useEffect(() => {
  if(bautistashowheartToast){
    const bautistahearttoasttimer = setTimeout(() => {
      setbautistashowtoastmessageClosing(true); //
      setTimeout(() => setbautistashowheartToast(false), 300);}, 4000);
  
    return () => clearTimeout(bautistahearttoasttimer);
  }
}, [bautistashowheartToast]);