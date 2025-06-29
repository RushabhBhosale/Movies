"use client";

import React, { useEffect, useState } from "react";
import Hero from "./Hero";
import { useSession } from "next-auth/react";

const Home = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="p-3">
      <Hero />
    </div>
  );
};

export default Home;
