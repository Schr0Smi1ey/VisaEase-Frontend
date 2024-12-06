import React, { useEffect } from "react";
import Banner from "./Banner/Banner";
import LatestVisa from "./LatestVisa/LatestVisa";
import ExSec1 from "./ExSec1/ExSec1";
import ExSec2 from "./ExSec2/ExSec2";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container mx-auto">
      <Banner></Banner>
      <LatestVisa></LatestVisa>
      <ExSec1></ExSec1>
      <ExSec2></ExSec2>
    </div>
  );
};

export default Home;
