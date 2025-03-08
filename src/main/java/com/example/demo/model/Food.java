package com.example.demo.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
@Data
@NoArgsConstructor
@Entity
@Table(name = "foods")
public class Food {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(nullable = false)
    @Size(min = 2)
    @NotNull
    private String name;
    @Column(nullable = false)
    @Min(1)
    private double price;

    public Food(int id, String name, double price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
