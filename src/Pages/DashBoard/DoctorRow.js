import React from "react";
import { toast } from "react-toastify";

const DoctorRow = ({ doctor, index, refetch, setDoctorDeleting }) => {
  const { name, specialty, img, email } = doctor;

  return (
    <tr className="text-center">
      <th>{index + 1}</th>
      <td>
        <div class="avatar">
          <div class="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={img} alt={name} />
          </div>
        </div>
      </td>
      <td>{name}</td>
      <td>{specialty}</td>
      <td>
        <label
          onClick={() => setDoctorDeleting(doctor)}
          for="delete-confirm"
          class="btn btn-xs btn-error"
        >
          DELETE
        </label>
      </td>
    </tr>
  );
};

export default DoctorRow;
