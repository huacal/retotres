package com.ciclocuatro.retotres.repository.crud;

import com.ciclocuatro.retotres.model.Chocolate;
import org.springframework.data.mongodb.repository.MongoRepository;

/**
 * @author Huacal
 */
public interface ChocolateCrudRepository extends MongoRepository<Chocolate, String> {

}
