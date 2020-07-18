import React, {useState, useEffect, useContext} from "react";
import axios from "axios";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import {BubbleContext} from "../contexts/BubbleContext";
import {axiosWithAuth} from "../utils/AxiosWithAuth";

const BubblePage = () => {
  const {setLoading, colorList, setColorList} = useContext(BubbleContext);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
    useEffect(() =>{
        setLoading(true);
        axiosWithAuth().get(`http://localhost:5000/api/colors`)
            .then(res =>{
                setColorList(res.data);
                setLoading(false);
            })
            .catch(err =>{
                console.log("Error getting colors: ", err);
                setLoading(false);
            });
    },[]);

  return (
    <>
      <ColorList />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;