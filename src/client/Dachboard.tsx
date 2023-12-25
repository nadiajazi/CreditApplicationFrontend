<<<<<<< HEAD
import React from 'react'

export default function Dachboard() {
  return (
    <div>
      {/* UI Elements:
        Display of the client's credit information.
      Navigation links to:
        Transaction History Page
        Payment Page
        Invoices Page */}
    </div>
  )
}

=======
import React from "react";
import {NavbarWithMegaMenu} from "./Layout/NavList";
import {FooterWithLogo} from "./Layout/Footer";
import CreditAppPage from "./Layout/CreditAppPage";


const Dachboard = () => {
  

  return (
    <div>
      
      <NavbarWithMegaMenu></NavbarWithMegaMenu>
      <CreditAppPage></CreditAppPage>
      <FooterWithLogo ></FooterWithLogo>

    </div>
    
  );
};

export default Dachboard;
>>>>>>> origin/MarwenChebbi
