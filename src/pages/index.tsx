import { useEffect } from "react";
import Router from "next/router";

const HomePage = () => {
  useEffect(() => {
    Router.push("/products");
  }, []);

  return <></>;
};

export default HomePage;
