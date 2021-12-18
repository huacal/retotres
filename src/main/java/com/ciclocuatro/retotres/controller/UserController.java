package com.ciclocuatro.retotres.controller;

import com.ciclocuatro.retotres.model.User;
import com.ciclocuatro.retotres.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**
 * @author Huacal
 */

@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService servicio;

    @GetMapping("/all")
    public List<User> getAll(){
        return servicio.getAll();
    }

    @GetMapping("/{id}")
    public Optional <User> getUser(@PathVariable("id") int id) {
        return servicio.getUser(id);
    }

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@RequestBody User user){
        return servicio.create(user);
    }

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public User update(@RequestBody User user){
        return  servicio.update(user);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id){
        return  servicio.delete(id);
    }

    @GetMapping("/{email}/{password}")
    public User autenticateUser(@PathVariable("email")String email, @PathVariable("password") String password){
        return servicio.autenticateUser(email,password);
    }

    @GetMapping("/emailexist/{email}")
    public boolean existeEmail(@PathVariable("email") String email){
        return servicio.existeEmail(email);
    }

    @GetMapping("/birthday/{monthBirthtDay}")
    public List<User> getByMonthBirthtDay(@PathVariable("monthBirthtDay") String monthBirthtDay){
        return servicio.getByMonthBirthtDay(monthBirthtDay);
    }




}
