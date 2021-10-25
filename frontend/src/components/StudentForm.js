import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";

export function StudentForm({ preloadedData }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: preloadedData,
  });

  const onSubmit = async (data) => {
    // If there's no current student, add new
    if (!preloadedData) {
      axios
        .post(`/api/students`, data)
        .then((response) => {
          console.log("Add:", data);
          console.log(response.status, response.data);
          reset();
        })
        .catch((error) => {
          console.error(error);
        });
      // Else, update current one
    } else {
      axios
        .put(`/api/student/${preloadedData.id}`, data)
        .then((response) => {
          console.log("Update:", data);
          console.log(response.status, response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="columns">
      <div className="column is-desktop is-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">Full Name</label>
            <p className="control has-icons-left">
              <input
                className="input"
                type="text"
                name="fullName"
                {...register("fullName", {
                  required: true,
                })}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-user"></i>
              </span>
            </p>
            <p className="help is-info">Required</p>
          </div>

          <div className="field">
            <label className="label">Parent Name</label>
            <p className="control">
              <input
                className="input"
                type="text"
                name="parentName"
                {...register("parentName", {
                  required: false,
                })}
              />
            </p>
          </div>

          <div className="field">
            <label className="label">Grade</label>
            <p className="control">
              <span className="select">
                <select {...register("grade")}>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              </span>
            </p>
          </div>

          <div className="field">
            <label className="label">Email</label>
            <p className="control has-icons-left">
              <input
                className="input"
                type="email"
                name="email"
                {...register("email", {
                  required: true,
                })}
              />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
            </p>
            <p className="help is-info">Required</p>
          </div>

          <div className="field">
            <label className="label">Phone</label>
            <p className="control">
              <input
                className="input"
                type="text"
                name="phone"
                {...register("phone", {
                  required: false,
                })}
              />
            </p>
          </div>

          <div className="field">
            <label className="label">Address</label>
            <p className="control">
              <input
                className="input"
                type="text"
                name="address"
                {...register("address", {
                  required: false,
                })}
              />
            </p>
          </div>

          <div className="control">
            <button type="submit" className="button is-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
