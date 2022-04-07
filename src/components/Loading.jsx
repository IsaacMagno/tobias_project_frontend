import React from "react";
import Spinner from "react-spinkit";

const Loading = ({ render }) => {
  return render ? (
    <div className='m-3'>
      <Spinner
        name='chasing-dots'
        fadeIn='none'
        color='white'
        className='m-auto'
      />
    </div>
  ) : null;
};

export default Loading;
