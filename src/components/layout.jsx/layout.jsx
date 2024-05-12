import React from "react";
import Nav from "../navbar/nav";
import Footer from "../footer/footer";

const layout = ({children}) => {
  return (
    <>
      <Nav />
      <div className="min-h-[100vh] main-content ">
        {children}
      </div>
      <Footer />
    </>
  );
};

export default layout;
