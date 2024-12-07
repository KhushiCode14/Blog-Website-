// import React from "react";
// import Navbar from "../Navbar";

import ContentBanner from "./ContentBanner";
import ContentPost from "./ContentPost";
import ContentSidebar from "./ContentSidebar";
const UserHome = () => {
  return (
    <div>
      {/* Content Area */}
      <div className="flex flex-1 p-6 m-2 space-x-6 rounded-2xl bg-slate-100">
        {/* Second Div (Smaller) */}
        <div className="flex-1 p-6 bg-white rounded-lg shadow-lg">
          <ContentSidebar />
        </div>
        {/* First Div (Wider) */}
        <div className="gap-3 p-6 bg-white rounded-lg shadow-lg flex-2">
          <ContentBanner />
          <ContentPost />
        </div>
      </div>
    </div>
  );
};

export default UserHome;
