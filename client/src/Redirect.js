import React, { useEffect } from "react";
import { useParams } from "react-router-dom"

const Redirect = () => {
  const url = useParams();
  useEffect(() => {
    window.location.href = url.full;
  }, []);


  return (
    <div><a>LOADING.....</a></div>
  )
}
export default Redirect;