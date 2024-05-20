import React from "react";
import { LogoMobile } from "./Logo";
import { Button } from "@/components/ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";




const Header = () => {


  return (
    <div className=" p-5 flex justify-between items-center border shadow-sm">
      <LogoMobile />

      <SignedIn>
        <UserButton  />
      </SignedIn>

      <SignedOut>
        <Button >
          <SignInButton/>
        </Button>
      </SignedOut>


    </div>
  );
};

export default Header;
