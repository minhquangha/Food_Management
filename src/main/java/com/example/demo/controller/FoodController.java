package com.example.demo.controller;

import com.example.demo.model.Food;
import com.example.demo.repository.FoodRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/foods")
public class FoodController {
    @Autowired
    private FoodRepository foodRepository;

    private List<Food> foodList;

    public FoodController() {
    }

    @GetMapping
    public List<Food> returnFood(){
        return foodRepository.findAll();
    }

    @PostMapping
    public String addFood(@Valid @RequestBody  Food food){
        foodRepository.save(food);
        return "Thêm thành công";
    }

    @PutMapping("/{id}")
    public String updateFood(@PathVariable int id, @RequestBody Food food){
        Food food1 = foodRepository.findById(id).orElse(null);
        if(food1==null) return "Khong tim thay mon";
        food1.setName(food.getName());
        food1.setPrice(food.getPrice());
        foodRepository.save(food1);
        return "Cập nhật thành công";
    }

    @DeleteMapping("{id}")
    public String deleteFood(@PathVariable int id){
        foodRepository.deleteById(id);
        return "Đã xóa";

    }


}
