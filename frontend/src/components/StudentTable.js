import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { SearchBar } from "./SearchBar";

export function StudentTable({ students }) {
  const [query, setQuery] = useState("");
  const [sortBy] = useState("fullName");
  const [orderBy] = useState("asc");
  const [pageNumber, setPageNumber] = useState(0);

  let history = useHistory();

  // Pagination setup
  const studentsPerPage = 5;
  const pageCount = Math.ceil(students.length / studentsPerPage);
  const entriesVisited = pageNumber * studentsPerPage;

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  // Filter and sort students by query and order
  const filteredStudents = students
    .filter((student) => {
      return (
        student.fullName.toLowerCase().includes(query.toLowerCase()) ||
        student.parentName.toLowerCase().includes(query.toLowerCase()) ||
        student.email.toLowerCase().includes(query.toLowerCase()) ||
        student.address.toLowerCase().includes(query.toLowerCase())
      );
    })
    .sort((a, b) => {
      let order = orderBy === "asc" ? 1 : -1;
      return a[sortBy].toLowerCase() < b[sortBy].toLowerCase()
        ? -1 * order
        : 1 * order;
    });

  // Display students in a table with pagination
  const paginatedStudents = filteredStudents
    .slice(entriesVisited, entriesVisited + studentsPerPage)
    .map((student, key) => {
      return (
        <tr key={key} className="">
          <td>{student.id}</td>
          <td>{student.fullName}</td>
          <td>{student.parentName}</td>
          <td>{student.grade}</td>
          <td>{student.email}</td>
          <td>{student.phone}</td>
          <td>{student.address}</td>
          <td>
            <div className="is-flex is-flex-direction-row is-justify-content-center	">
              <button
                className="button is-small is-warning mx-1"
                onClick={() => history.push(`/student/${student.id}`)}
              >
                <span className="icon is-small">
                  <i className="fas fa-edit"></i>
                </span>
                <span>Edit</span>
              </button>
              <button
                className="button is-small is-danger mx-1"
                onClick={() => onDeleteStudent(student.id)}
              >
                <span className="icon is-small">
                  <i className="fas fa-trash"></i>
                </span>
                <span>Delete</span>
              </button>
            </div>
          </td>
        </tr>
      );
    });

  // Call API to delete a student
  const onDeleteStudent = async (id) => {
    axios
      .delete(`/api/student/${id}`)
      .then((response) => {
        console.log("Delete:");
        console.log(response.status, response.data);
      })
      .catch((error) => console.error(error));
  };

  return students ? (
    <>
      <SearchBar query={query} onQueryChange={(myQuery) => setQuery(myQuery)} />
      <table className="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Parent Name</th>
            <th>Grade</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{paginatedStudents}</tbody>
      </table>

      <ReactPaginate
        previousLabel={<i className="fas fa-chevron-left"></i>}
        nextLabel={<i className="fas fa-chevron-right"></i>}
        pageCount={pageCount}
        onPageChange={changePage}
        containerClassName={"my-pagination-container"}
        pageLinkClassName={"pagination-link"}
        previousLinkClassName={"pagination-previous"}
        nextLinkClassName={"pagination-next"}
        activeLinkClassName={"pagination-link is-current"}
        breakLinkClassName={"pagination-ellipsis"}
      ></ReactPaginate>
    </>
  ) : (
    <div>Loading...</div>
  );
}
