package com.ciclocuatro.retotres.service;

import com.ciclocuatro.retotres.model.Chocolate;
import com.ciclocuatro.retotres.repository.ChocolateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author Huacal
 */
@Service
public class ChocolateService {
    @Autowired
    private ChocolateRepository chocolateRepository;

    public List<Chocolate> getAll(){
        return  chocolateRepository.getAll();
    }

    public Optional<Chocolate> getChocolate(String reference) {
        return chocolateRepository.getChocolate(reference);
    }

    public Chocolate create(Chocolate chocolate) {
        if (chocolate.getReference() == null) {
            return chocolate;
        } else {
            return chocolateRepository.create(chocolate);
        }
    }

    public Chocolate update(Chocolate chocolate) {

        if (chocolate.getReference() != null) {
            Optional<Chocolate> chocolateDb = chocolateRepository.getChocolate(chocolate.getReference());
            if (!chocolateDb.isEmpty()) {

                if (chocolate.getCategory() != null) {
                    chocolateDb.get().setCategory(chocolate.getCategory());
                }

                if (chocolate.getDescription() != null) {
                    chocolateDb.get().setDescription(chocolate.getDescription());
                }
                if (chocolate.getPrice() != 0.0) {
                    chocolateDb.get().setPrice(chocolate.getPrice());
                }
                if (chocolate.getQuantity() != 0) {
                    chocolateDb.get().setQuantity(chocolate.getQuantity());
                }
                if (chocolate.getPhotography() != null) {
                    chocolateDb.get().setPhotography(chocolate.getPhotography());
                }
                chocolateDb.get().setAvailability(chocolate.isAvailability());
                chocolateRepository.update(chocolateDb.get());
                return chocolateDb.get();
            } else {
                return chocolate;
            }
        } else {
            return chocolate;
        }
    }

    public boolean delete(String reference) {
        Boolean aBoolean = getChocolate(reference).map(chocolate -> {
            chocolateRepository.delete(chocolate);
            return true;
        }).orElse(false);
        return aBoolean;
    }

    public List<Chocolate> findByPrice(double price){
        return chocolateRepository.findByPrice(price);
    }

    public List<Chocolate> getByDescriptionContains(String description){
        return chocolateRepository.findByDescriptionContains(description);
    }

}
