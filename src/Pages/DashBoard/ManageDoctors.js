import React, { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import DeleteConfirmModal from "./DeleteConfirmModal";
import DoctorRow from "./DoctorRow";

const ManageDoctors = () => {
  const [doctorDeleting, setDoctorDeleting] = useState(null);
  const {
    data: doctors,
    isLoading,
    refetch,
  } = useQuery("doctors", () =>
    fetch("http://localhost:5000/doctor", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-2xl">Manage Doctors :{doctors?.length}</h2>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr className="text-center">
              <th></th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Specialty</th>
              <th>Button</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor, index) => (
              <DoctorRow
                key={index}
                refetch={refetch}
                doctor={doctor}
                index={index}
                setDoctorDeleting={setDoctorDeleting}
              ></DoctorRow>
            ))}
            {/* {doctors.map((a, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{a.PatientName}</td>
                <td>{a.date}</td>
                <td>{a.slot}</td>
                <td>{a.treatment}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
      {doctorDeleting && (
        <DeleteConfirmModal
          refetch={refetch}
          setDoctorDeleting={setDoctorDeleting}
          doctorDeleting={doctorDeleting}
        ></DeleteConfirmModal>
      )}
    </div>
  );
};

export default ManageDoctors;
