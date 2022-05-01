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
    autoplaySpeed: 2500,
    cssEase: "linear",
  };

  useEffect(() => {
    const getPractice = async () => {
      await getPractices(1).then((o) => setPractice(o.data));
    };

    getPractice();
  }, []);

  return (
    <div className='container-fluid card bg-pale-silver p-4'>
      <Slider {...settings}>
        {practice.map((img) =>
          img.image.endsWith("mp4") ? (
            <div key={img.id}>
              <video
                style={{ height: "15em" }}
                controls
                autoPlay
                muted
                loop
                className='rounded border border-light-gray'
                key={img.image}
              >
                <source
                  src={`${BASE_URL}/practice/${img.image}`}
                  type='video/mp4'
                  key={img.image}
                />
              </video>
            </div>
          ) : (
            <div key={img.id}>
              <img
                src={`${BASE_URL}/practice/${img.image}`}
                alt={"Progresso"}
                key={img.image}
                style={{
                  width: "26em",
                  height: "15em",
                }}
                className='rounded border border-light-gray'
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
