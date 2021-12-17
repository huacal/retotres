package com.ciclocuatro.retotres.repository.crud;

import java.util.List;
import java.util.Optional;

import com.ciclocuatro.retotres.model.Order;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;


/**
 * @author Huacal
 */

public interface OrderCrudRepository extends MongoRepository<Order, Integer> {
     //Retorna las ordenes de pedido que coincidad con la zona recibida como parametro
     @Query("{'salesMan.zone': ?0}")
     List<Order> findByZone(final String country);

     //Retorna las ordenes x estado
    @Query("{status: ?0}")
    List<Order> findByStatus(final String status);

    //Para seleccionar la orden con el id maximo
    Optional<Order> findTopByOrderByIdDesc();
}
