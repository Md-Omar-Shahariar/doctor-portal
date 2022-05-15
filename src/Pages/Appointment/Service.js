import React from "react";

const Service = ({ service, setTreatment }) => {
  const { name, slot } = service;
  return (
    <div className="card lg:max-w-lg bg-base-100 shadow-xl">
      <div className="card-body text-center">
        <h2 className="text-3xl text-center text-secondary">{name}</h2>
        <p>
          {slot.length ? (
            <span>{slot[0]}</span>
          ) : (
            <span className="text-red-500">Try Another Date</span>
          )}
        </p>
        <p>{slot.length} Spaces Available</p>
        <div className="card-actions justify-center">
          <label
            for="booking-modal-6"
            onClick={() => setTreatment(service)}
            disabled={slot.length === 0}
            className="btn btn-secondary"
          >
            Book Now
          </label>
        </div>
      </div>
    </div>
  );
};

export default Service;
