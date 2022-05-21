import React from "react";
import { toast } from "react-toastify";

const DeleteConfirmModal = ({ doctorDeleting, refetch, setDoctorDeleting }) => {
  const { name, email } = doctorDeleting;
  const handleDelete = () => {
    fetch(`http://localhost:5000/doctor/${email}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          toast.success(`Doctor: ${name} is deleted`);
          setDoctorDeleting(null);
          refetch();
        }
      });
  };
  return (
    <div>
      <input type="checkbox" id="delete-confirm" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg text-red-500">
            Are you Sure You Want To delete {name}
          </h3>
          <p class="py-4">
            You've been selected for a chance to get one year of subscription to
            use Wikipedia for free!
          </p>
          <div class="modal-action">
            <button
              onClick={() => {
                handleDelete(email);
              }}
              className="btn btn-xs btn-error"
            >
              Delete
            </button>
            <label for="delete-confirm" class="btn btn-xs">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
