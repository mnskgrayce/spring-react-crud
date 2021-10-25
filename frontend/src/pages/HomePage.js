import React, { useState, useEffect } from "react";
import axios from "axios";
import { StudentForm } from "../components/StudentForm";
import { StudentTable } from "../components/StudentTable";

export function HomePage() {
  const [students, setStudents] = useState([]);

  // Load student list at refresh
  useEffect(() => {
    axios
      .get(`/api/students`)
      .then((response) => {
        console.log("Get All:");
        console.log(response.status, response.data);
        setStudents(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return students ? (
    <div className="container">
      <section className="section">
        <h1 className="title is-1">Students</h1>
        <StudentTable students={students}></StudentTable>
      </section>

      <section className="section">
        <h2 className="title is-2">Add New Student</h2>
        <StudentForm preloadedData={null} />
      </section>
    </div>
  ) : (
    <div>Loading...</div>
  );
}
