package com.example.springreactcrud.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("SELECT s FROM Student s WHERE s.email = :email")
    Optional<Student> findStudentByEmail(String email);

    @Query("SELECT email FROM Student s WHERE NOT s.email = :email")
    List<String> findAllEmailsNot(String email);
}
