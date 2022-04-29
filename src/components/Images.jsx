import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { getPractices, BASE_URL } from "../services/axiosRequests";

const Images = () => {
  const [practice, setPractice] = useState([]);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  useEffect(() => {
    const getPractice = async () => {
      await getPractices(1).then((o) => setPractice(o.data));
    };

    getPractice();
  }, []);

  console.log(practice);

  return (
    <div className='container-fluid card bg-dark p-4'>
      <Slider {...settings}>
        {practice.map((img) =>
          img.image.endsWith("mp4") ? (
            <div>
              <video
                style={{ width: "27em", height: "15em" }}
                controls
                autoPlay
                muted
                loop
                className='rounded border border-gainsboro'
              >
                <source
                  src={`${BASE_URL}/practice/${img.image}`}
                  type='video/mp4'
                />
              </video>
            </div>
          ) : (
            <div key={img.image}>
              <img
                src={`${BASE_URL}/practice/${img.image}`}
                alt={"Progresso"}
                key={img.image}
                style={{
                  width: "26em",
                  height: "15em",
                }}
                className='rounded border border-gainsboro'
              />
            </div>
          )
        )}
      </Slider>
    </div>
  );
};
// className='container card bg-dark p-4 text-center'
export default Images;
