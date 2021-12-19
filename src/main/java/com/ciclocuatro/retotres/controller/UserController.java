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
    /**
     * Inyección de dependecias, instancia de la clase UserService
     */
    @Autowired
    private UserService servicio;

    /**
     * Get = Lista de todos los Usuarios
     * @return
     */

    @GetMapping("/all")
    public List<User> getAll(){
        return servicio.getAll();
    }

    /**
     * Get = Trae un usuario por id
     * @param id
     * @return
     */

    @GetMapping("/{id}")
    public Optional <User> getUser(@PathVariable("id") int id) {
        return servicio.getUser(id);
    }

    /**
     * Post = Registrar un nuevo Usuario
     * @param user
     */

    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@RequestBody User user){
        return servicio.create(user);
    }

    /**
     * Put = Actualizar la información de un usuario
     * @param user
     * @return
     */

    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public User update(@RequestBody User user){
        return  servicio.update(user);
    }

    /**
     * Delete = Eliminar un usuario
     * @param id
     * @return
     */

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id){
        return  servicio.delete(id);
    }

    /**
     * Get = Obtiene el Usuario por el email y la contraseña
     * @param email
     * @param password
     * @return
     */

    @GetMapping("/{email}/{password}")
    public User autenticateUser(@PathVariable("email")String email, @PathVariable("password") String password){
        return servicio.autenticateUser(email,password);
    }

    /**
     * Get = Retorna si el usuario que se busca por el email existe o no
     * @param email
     * @return
     */

    @GetMapping("/emailexist/{email}")
    public boolean existeEmail(@PathVariable("email") String email){
        return servicio.existeEmail(email);
    }

    /**
     * Reto 5
     * Get = Retorna los usuarios por mes de cumpleaños
     * @param  monthBirthtDay
     * @return
     */
    @GetMapping("/birthday/{monthBirthtDay}")
    public List<User> getByMonthBirthtDay(@PathVariable("monthBirthtDay") String monthBirthtDay){
        return servicio.getByMonthBirthtDay(monthBirthtDay);
    }




}
