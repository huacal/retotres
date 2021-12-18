package com.ciclocuatro.retotres.repository;


import com.ciclocuatro.retotres.model.Chocolate;
import com.ciclocuatro.retotres.repository.crud.ChocolateCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * @author Huacal
 */
@Repository
public class ChocolateRepository {
    @Autowired
    private ChocolateCrudRepository repository;

    public List<Chocolate> getAll() {
        return repository.findAll();
    }

    public  Optional<Chocolate> getChocolate(String reference){
        return  repository.findById(reference);
    }

    public Chocolate create(Chocolate chocolate) {
        return repository.save(chocolate);
    }
    public void update(Chocolate chocolate) {
        repository.save(chocolate);
    }

    public void delete(Chocolate chocolate) {
        repository.delete(chocolate);
    }
    
    //RETO 5
    public List<Chocolate>findByPrice(double price){
        return repository.findByprice(price);
    }

    public List<Chocolate> findByDescriptionContains(String description){
        return repository.findByDescriptionContainingIgnoreCase(description);
    }

}
