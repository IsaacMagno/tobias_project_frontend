import React from "react";
import Spinner from "react-spinkit";

const Loading = ({ render, type }) => {
  return render ? (
    <div className='m-3'>
      <Spinner name={type} fadeIn='none' color='white' className='m-auto' />
    </div>
  ) : null;
};

export default Loading;
