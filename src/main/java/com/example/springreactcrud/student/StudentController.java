package com.example.springreactcrud.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PostMapping("/students")
    public void addNewStudent(@RequestBody Student student) {
        studentService.addNewStudent(student);
    }

    @GetMapping("/student/{id}")
    public Student getOneStudent(@PathVariable(name = "id") Long id) {
        return studentService.getOneStudent(id);
    }

    @DeleteMapping("/student/{id}")
    public void deleteStudent(@PathVariable(name = "id") Long id) {
        studentService.deleteStudent(id);
    }

    @PutMapping("/student/{id}")
    public void updateStudent(@RequestBody Student student) {
        studentService.updateStudent(student);
    }
}
