import React from "react";

const Service = ({ service, setTreatment }) => {
  const { name, slot } = service;
  return (
    <div class="card lg:max-w-lg bg-base-100 shadow-xl">
      <div class="card-body text-center">
        <h2 class="text-3xl text-center text-secondary">{name}</h2>
        <p>
          {slot.length ? (
            <span>{slot[0]}</span>
          ) : (
            <span className="text-red-500">Try Another Date</span>
          )}
        </p>
        <p>{slot.length} Spaces Available</p>
        <div class="card-actions justify-center">
          <label
            for="booking-modal-6"
            onClick={() => setTreatment(service)}
            disabled={slot.length === 0}
            class="btn btn-secondary"
          >
            Book Now
          </label>
        </div>
      </div>
    </div>
  );
};

export default Service;
