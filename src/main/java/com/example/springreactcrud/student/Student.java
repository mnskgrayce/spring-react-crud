package com.example.springreactcrud.student;

import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name="student")
public class Student {

    @Id
    @SequenceGenerator(
            name = "student_sequence",
            sequenceName = "student_sequence",
            allocationSize = 1
    )
    @GeneratedValue(strategy = GenerationType.SEQUENCE,
            generator = "student_sequence")
    private Long id;

    private String fullName;
    private Integer grade;
    private String parentName;
    private String address;
    private String phone;
    private String email;

    public Student(String fullName, Integer grade, String parentName, String address, String phone, String email) {
        this.fullName = fullName;
        this.grade = grade;
        this.parentName = parentName;
        this.address = address;
        this.phone = phone;
        this.email = email;
    }
}
