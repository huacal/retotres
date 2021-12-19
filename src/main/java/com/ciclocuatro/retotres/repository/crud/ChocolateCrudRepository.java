package com.ciclocuatro.retotres.repository.crud;

import java.util.List;
import java.util.Optional;

import com.ciclocuatro.retotres.model.Chocolate;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author Huacal
 */
public interface ChocolateCrudRepository extends MongoRepository<Chocolate, String> {
    //RETO 5
    public List<Chocolate>findByprice(double price);
    public Optional<Chocolate>findByReferenceContainingIgnoreCase(String reference);
    public List<Chocolate>findByDescriptionContainingIgnoreCase(String description);
}
