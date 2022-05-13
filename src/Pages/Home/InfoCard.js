import React from "react";

const InfoCard = ({ img, cardTitle, bgClass }) => {
  return (
    <div
      className={`card lg:card-side bg-base-100 shadow-xl text-white ${bgClass}`}
    >
      <figure>
        <img className="md:pl-5 pt-5 lg:pt-0" src={img} alt="Album"></img>
      </figure>
      <div class="card-body">
        <h2 class="card-title">{cardTitle}</h2>
        <p>Click the button to listen on Spotiwhy app.</p>
      </div>
    </div>
  );
};

export default InfoCard;
