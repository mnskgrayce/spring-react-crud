package com.example.springreactcrud.student;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.Reader;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

@Configuration
public class StudentConfig {

    @Bean
    CommandLineRunner commandLineRunner(StudentRepository studentRepository) {
        return args -> {
            try {
                Gson gson = new Gson();

                Reader reader = Files.newBufferedReader(Paths.get("data/students.json"));

                List<Student> students =
                        gson.fromJson(reader,
                                new TypeToken<List<Student>>() {}.getType());
                studentRepository.saveAll(students);
            } catch (Exception e) {
                e.printStackTrace();
            }
        };
    }
}
