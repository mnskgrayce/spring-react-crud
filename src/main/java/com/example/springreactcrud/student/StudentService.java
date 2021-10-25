package com.example.springreactcrud.student;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private final StudentRepository studentRepository;

    public StudentService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student getOneStudent(Long studentId) {
        return studentRepository.findById(studentId)
                .orElseThrow(() -> new IllegalStateException
                        ("Student with id=" + studentId + " does not exist!"));
    }

    public void addNewStudent(Student student) {
        Optional<Student> optionalStudent = studentRepository
                .findStudentByEmail(student.getEmail());
        if (optionalStudent.isPresent()) {
            throw new IllegalStateException("Email is taken!");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        boolean exists = studentRepository.existsById(studentId);
        if (!exists) {
            throw new IllegalStateException
                    ("Student with id=" + studentId + " does not exist!");
        }
        studentRepository.deleteById(studentId);
    }

    @Transactional
    public void updateStudent(Student student) {
        Student currentStudent = getOneStudent(student.getId());
        String currentEmail = currentStudent.getEmail();

        List<String> takenEmails = studentRepository.findAllEmailsNot(currentEmail);
        if (takenEmails.contains(student.getEmail())) {
            throw new IllegalStateException("Email is taken!");
        }

        currentStudent.setFullName(student.getFullName());
        currentStudent.setParentName(student.getParentName());
        currentStudent.setGrade(student.getGrade());
        currentStudent.setEmail(student.getEmail());
        currentStudent.setPhone(student.getPhone());
        currentStudent.setAddress(student.getAddress());

        // Technically not mandatory, but just to be sure
        studentRepository.save(student);
    }
}
