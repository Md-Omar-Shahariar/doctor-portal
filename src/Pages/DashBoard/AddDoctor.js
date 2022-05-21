import { setDate } from "date-fns";

import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading";

const AddDoctor = () => {
  const image_storage_key = "ca09099b83aac0b0d972482ffb674720";

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const { data: services, isLoading } = useQuery("service", () =>
    fetch("http://localhost:5000/services").then((res) => res.json())
  );
  console.log(services);

  const onSubmit = async (data) => {
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${image_storage_key}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const doctor = {
            name: data.name,
            email: data.email,
            specialty: data.specialty,
            img: img,
          };

          //send data to database
          fetch("http://localhost:5000/doctor", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify(doctor),
          })
            .then((res) => res.json())
            .then((inserted) => {
              if (inserted.insertedId) {
                toast.success("Doctor added Successfully");
                reset();
              } else {
                toast.error("Failed to Add");
              }
            });
        }
        console.log(result);
      });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h2 className="text-2xl">Add A new Doctor</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            {...register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full max-w-xs"
          />

          <label className="label">
            {errors.name?.type === "required" && (
              <span className="text-red-600">{errors.name.message}</span>
            )}
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            {...register("email", {
              required: {
                value: true,
                message: "Email is required",
              },
              pattern: {
                value: /[a-z0-9]+@[a-z]+\.[a-z]{3}/,
                message: "Provide a Valid Email",
              },
            })}
            type="email"
            placeholder="Email"
            className="input input-bordered w-full max-w-xs"
          />

          <label className="label">
            {errors.email?.type === "required" && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
            {errors.email?.type === "pattern" && (
              <span className="text-red-600">{errors.email.message}</span>
            )}
          </label>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Specialty</span>
          </label>
          <select
            {...register("specialty")}
            class="select select-bordered w-full max-w-xs"
          >
            {console.log(services?.name)}
            {services?.map((service, index) => (
              <option key={index} value={service.name}>
                {service.name}
              </option>
            ))}
            {/* <option>Han Solo</option>
            <option>Greedo</option> */}
          </select>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Photo</span>
          </label>
          <input
            {...register("image", {
              required: {
                value: true,
                message: "Image is required",
              },
            })}
            type="file"
            className="input input-bordered w-full max-w-xs"
          />

          <label className="label">
            {errors.name?.type === "required" && (
              <span className="text-red-600">{errors.image.message}</span>
            )}
          </label>
        </div>

        <input
          className="btn btn-outline  w-full max-w-xs"
          type="submit"
          value="Add"
        />
      </form>
    </div>
  );
};

export default AddDoctor;
