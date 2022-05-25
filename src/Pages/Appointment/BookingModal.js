import React from "react";
import { format } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { toast } from "react-toastify";
import id from "date-fns/esm/locale/id/index.js";

const BookingModal = ({ treatment, date, setTreatment, refetch }) => {
  const [user, loading, error] = useAuthState(auth);
  const { name, slots, _id, price } = treatment;
  const formattedDate = format(date, "PP");
  const handleBooking = (event) => {
    event.preventDefault();
    const slot = event.target.slot.value;
    console.log(slots, name, _id);
    const booking = {
      email: user?.email,
      treatmentId: _id,
      treatment: name,
      date: formattedDate,
      slot: slot,
      price,
      patientName: user.displayName,
      phone: event.target.phone.value,
    };
    fetch("http://localhost:5000/booking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data?.success) {
          toast(`Appointment is set ${formattedDate} at ${slot}`);
        } else {
          toast(`Appointment exists  ${formattedDate} at ${slot}`);
        }
        refetch();
        setTreatment(null);
      });
  };
  return (
    <div>
      <input type="checkbox" id="booking-modal-6" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <label
            for="booking-modal-6"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-center font-bold text-lg">
            Booking For : {name}
          </h3>
          <form
            onSubmit={handleBooking}
            className="mt-5 grid grid-cols-1 gap-3 justify-items-center"
          >
            <input
              type="text"
              disabled
              value={format(date, "PP")}
              className="input input-bordered w-full max-w-xs"
            />
            <select name="slot" className="select w-full max-w-xs">
              {slots.map((slot) => (
                <option>{slot}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Your Name"
              name="name"
              value={user.displayName}
              disabled
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="email"
              name="email"
              value={user.email}
              disabled
              placeholder="Email"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="input input-bordered w-full max-w-xs"
            />
            <input
              type="submit"
              value="Submit"
              className=" btn btn-bordered btn-secondary  max-w-xs"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
