import React, { useState, useEffect } from "react";
import axios from "axios";
import { StudentForm } from "../components/StudentForm";

export function StudentPage({ match }) {
  const id = match.params.id;
  const [student, setStudent] = useState(null);

  // Retrieve a student from path variable
  useEffect(() => {
    axios
      .get(`/api/student/${id}`)
      .then((response) => {
        console.log("Get One:");
        console.log(response.status, response.data);
        setStudent(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  return student ? (
    <div className="container">
      <section className="section">
        <h1 className="title is-2">Update Student</h1>
        <StudentForm preloadedData={student} />
      </section>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
