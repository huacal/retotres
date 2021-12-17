package com.ciclocuatro.retotres.service;

import com.ciclocuatro.retotres.model.User;
import com.ciclocuatro.retotres.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Huacal
 */
@Service
public class UserService {
    @Autowired
    private UserRepository repositorio;

    public List<User> getAll(){
        return repositorio.getAll();
    }

    public Optional<User> getUser(int id){
        return repositorio.getUser(id);
    }

    public User create(User user) {

        Optional<User> userIdMaximo = repositorio.lastUserId();
        if (user.getId() == null) {
            if (userIdMaximo.isEmpty())
                user.setId(1);
            else
                user.setId(userIdMaximo.get().getId() + 1);
        }
        Optional<User> e = repositorio.getUser(user.getId());
        if (e.isEmpty()) {
            if (existeEmail(user.getEmail()) == false) {
                return repositorio.create(user);
            } else {
                return user;
            }
        }else{
            return user;
        }
    }

    public User update(User user){
        if (user.getId() != null){
            Optional<User> userDb = repositorio.getUser(user.getId());
            if (!userDb.isEmpty()){
                if (user.getIdentification() != null){
                    userDb.get().setIdentification(user.getIdentification());
                }
                if (user.getName() != null){
                    userDb.get().setName(user.getName());
                }
                if (user.getAddress() != null) {
                    userDb.get().setAddress(user.getAddress());
                }
                if (user.getCellPhone() != null) {
                    userDb.get().setCellPhone(user.getCellPhone());
                }
                if (user.getEmail() != null) {
                    userDb.get().setEmail(user.getEmail());
                }
                if (user.getPassword() != null) {
                    userDb.get().setPassword(user.getPassword());
                }
                if (user.getZone() != null) {
                    userDb.get().setZone(user.getZone());
                }
                repositorio.update(userDb.get());
                return userDb.get();
            }else{
                return  user;
            }
        }else{
            return user;
        }
    }

    public boolean delete(int userId){
        Boolean aBoolean = getUser(userId).map(user -> {
            repositorio.delete(user);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    public boolean existeEmail(String email) {
        return repositorio.existeEmail(email);
    }

    public User autenticateUser(String email,String password){
        Optional<User> usuario = repositorio.autenticateUser(email,password);
        if (usuario.isEmpty()){
            return new User();
        }else{
            return usuario.get();
        }
    }




}
