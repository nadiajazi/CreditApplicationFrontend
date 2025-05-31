import React from "react";
import {Navbar,Collapse,Typography, Button, IconButton, List, ListItem, Menu, MenuHandler, MenuList,MenuItem,} from "@material-tailwind/react";
import { ChevronDownIcon, Bars3Icon, XMarkIcon, CreditCardIcon,DocumentMagnifyingGlassIcon,ClipboardDocumentIcon,} from "@heroicons/react/24/outline";
import { Link,  useNavigate } from "react-router-dom";
import axios from "axios";



//Element Menu
const navListMenuItems = [
  {
    title: "Payment",
    description: "Find the perfect solution for your needs.",
    icon: CreditCardIcon,
    toPath: "/client/dashboard/payment",
  },
  {
    title: "Invoices",
    description: "Meet and learn about our dedication",
    icon: ClipboardDocumentIcon,
    toPath: "/client/dashboard/invoices",
  },
  {
    title: "History",
    description: "Find the perfect solution for your needs.",
    icon: DocumentMagnifyingGlassIcon,
    toPath: "/client/dashboard/history",
  },
];

//Render menu item when hover
function NavListMenu() {

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);



  


  const renderItems = navListMenuItems.map(
    ({ icon, title, description, toPath }, key) => (
      <Link  key={key} to={toPath} >
        <MenuItem 
          className="flex items-center gap-3 rounded-lg transition-all duration-300 hover:bg-blue-gray-50 hover:translate-x-1 group"
        >
          <div className="flex items-center justify-center bg-blue-gray-50 p-2 rounded-lg transition-all duration-300 group-hover:bg-carribean group-hover:shadow-md">
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 w-6 text-gray-600 group-hover:text-white transition-colors duration-300",
            })}
          </div>
          <div className="transition-all duration-300 group-hover:translate-x-1">
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold group-hover:text-carribean transition-colors duration-300"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500 group-hover:text-moonstone transition-colors duration-300"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    ),
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-100"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Navigate To
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${isMenuOpen ? "rotate-180" : ""
                  }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${isMobileMenuOpen ? "rotate-180" : ""
                  }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl  lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

//Element NavBAr
function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="/client/dashboard"
        variant="small"
        color="gray"
        className="font-medium"
        
      >
        
        <ListItem className="flex text-gray-100 items-center gap-2 py-2 pr-4">
          Home
        </ListItem>
      </Typography>
      <NavListMenu />
    
    </List>
  );
}

//Main function
export function NavbarWithMegaMenu() {

  const [openNav, setOpenNav] = React.useState(false);
  

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const navigate = useNavigate();
  const Logout = async()=>{
    try {
      await axios.post("http://localhost:8882/api/v1/auth/logout");
      console.log("Déconnexion réussie !");
      // Vous pouvez ajouter d'autres actions de succès ici si nécessaire
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
      // Vous pouvez gérer l'erreur ici, par exemple afficher un message à l'utilisateur
    }
  };
  const handleClick=()=>{
   navigate("/")
    Logout()
  
  }
  return (
    <div className="fixed mb-16 w-full z-50 rounded-xs ">
      <Navbar className="mx-auto max-w-full bg-[#94CCF9] px-4 py-2 z-10">
        <div className="flex items-center justify-between text-gray-100">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 lg:ml-2"
          >
            Your profile
          </Typography>
          <div className="hidden lg:block">
            <NavList />
          </div>

          <div className="hidden gap-2 lg:flex bg-[#F0BFA5] rounded-md">

            <Button size="sm" onClick={handleClick}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
             
             </svg>
               
            </Button>
          </div>
          <IconButton
            variant="text"
            color="orange"
            className="lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList />
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden bg-orange-500 rounded-md">

            <Button variant="gradient" size="sm" fullWidth className="">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="orange-500" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>

            </Button>
          </div>
        </Collapse>
      </Navbar>
    </div>
  );
}
