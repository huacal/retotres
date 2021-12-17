package com.ciclocuatro.retotres;

import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import com.ciclocuatro.retotres.model.Chocolate;
import com.ciclocuatro.retotres.model.Order;
import com.ciclocuatro.retotres.model.User;
import com.ciclocuatro.retotres.repository.crud.ChocolateCrudRepository;
import com.ciclocuatro.retotres.repository.crud.OrderCrudRepository;
import com.ciclocuatro.retotres.repository.crud.UserCrudRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Component;


@Component
@SpringBootApplication
public class RetodosApplication implements CommandLineRunner {
    @Autowired
    private ChocolateCrudRepository chocolateRepo;
    @Autowired
    private UserCrudRepository userRepo;
    @Autowired
    private OrderCrudRepository orderRepo;

    public static void main(String[] args) {
        SpringApplication.run(RetodosApplication.class, args);
    }

    @Override
    public void  run(String...args) throws Exception{
        /* System.out.println("Pendiente");
        System.out.println("Usuario : " + userRepo.findTopByOrderByIdDesc().get()); */
        SimpleDateFormat ft = new SimpleDateFormat("yyyy-MM-dd");
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        chocolateRepo.deleteAll();
        userRepo.deleteAll();
        orderRepo.deleteAll();


        /// codigo faltante

       /* chocolateRepo.saveAll(List.of(
                new Chocolate("AP-903", "CATEGORIA 1", "DESCRIPCION 1", true, 120000, 10, "https://www.avasoluciones.com/uploads/2021/09/910-006127.jpg"),
                new Chocolate("AP-904", "CATEGORIA  2", "DESCRIPCION 2",  true, 130000, 10, "https://www.avasoluciones.com/uploads/2021/09/910-007.jpg")
        )); */

        /* userRepo.saveAll(List.of(
                new User(1, "123123", "ALAN BRITO", ft.parse("1986-11-15"),"11","CR 34-45", "311222222", "abrito@gmail.com", "Demo123.", "ZONA 2", "ADM"),
                new User(2, "61123211", "NAPOLEON BONAPARTE", ft.parse("1966-11-15"),"11","CR 34-45", "3168965645", "nbonaparte@gmail.com", "Demo123.", "ZONA 2", "COORD"),
                new User(3, "46669989", "BLODY MARRY", ft.parse("1996-11-15"),"11","CR 34-45", "3174565625", "stellez@gmail.com", "Demo123.", "ZONA 2", "ASE"),
                new User(4, "52369563", "JUANA DE ARCO", ft.parse("1987-05-15"),"05","CR 34-45", "3265632", "jdarco@gmail.com", "Demo123.", "ZONA 2", "ASE"),
                new User(5, "123456789", "ALCIRA LA ALPACA", ft.parse("1966-02-15"),"02","CR 34-45", "3168965645", "aalpaca@gmail.com", "Demo123.", "ZONA 1", "COORD"),
                new User(6, "213456789", "PEDRO CAPAROSA", ft.parse("1966-02-15"),"02","CR 34-45", "3168965645", "pcaparosa@gmail.com", "Demo123.", "ZONA 1", "ASE"),
                new User(7, "312456789", "LUIS IXV UN SOL", ft.parse("1966-02-15"),"02","CR 34-45", "3168965645", "reysol@gmail.com", "Demo123.", "ZONA 1", "ASE")
        )); */

        //Instanciar las ordenes
       /*  Order orderOne = new Order();
        orderOne.setId(1);
        Order orderTwo = new Order();
        orderTwo.setId(2); */
        
        //Recuperar vendedores
        /* Optional<User> salesManOne = userRepo.findById(3);
        Optional<User> salesManTwo = userRepo.findById(6); */

        //Mapa de productos asociados a una orden
        /* Map<String, Chocolate> productOrderOne = new HashMap<String, Chocolate>();
        Map<String, Chocolate> productOrderTwo = new HashMap<String, Chocolate>(); */

        //Mapa de cantidades de producto asociados a una orden
        /* Map<String, Integer> quantitiesOrderOne = new HashMap<String, Integer>();
        Map<String, Integer> quantitiesOrderTwo = new HashMap<String, Integer>(); */
        
        //lista de producto de la orden 1
        /* productOrderOne.put("AP-903", chocolateRepo.findById("AP-903").get());
        productOrderOne.put("AP-904", chocolateRepo.findById("AP-904").get()); */

        //Cantidades de producto de la orden 1      
        /* quantitiesOrderOne.put("AP-903", 1);
        quantitiesOrderOne.put("AP-904", 1); */

        //lista de producto de la orden 2
        /* productOrderTwo.put("AP-903", chocolateRepo.findById("AP-903").get());
        productOrderTwo.put("AP-904", chocolateRepo.findById("AP-904").get()); */

        //Cantidades de producto de la orden 2
        /* quantitiesOrderTwo.put("AP-903", 1);
        quantitiesOrderTwo.put("AP-904", 1); */
             
        //Configuraciòn datos orden 1
        /* orderOne.setRegisterDay(ft.parse("2021-09-15"));
        orderOne.setStatus(Order.PENDING);
        orderOne.setSalesMan(salesManOne.get());
        orderOne.setProducts(productOrderOne);
        orderOne.setQuantities(quantitiesOrderOne); */
        
        //Configuraciòn datos orden 2
        /* orderTwo.setRegisterDay(ft.parse("2021-09-15"));
        orderTwo.setStatus(Order.PENDING);
        orderTwo.setSalesMan(salesManTwo.get());
        orderTwo.setProducts(productOrderTwo);
        orderTwo.setQuantities(quantitiesOrderTwo); */


        //registra las ordenes en la base de datos
        //imprime el los datos de las ordenes
       /*  orderRepo.saveAll(List.of(orderOne, orderTwo));
        
        System.out.println("Listado de ordenes");
        orderRepo.findAll().forEach(System.out::println);   */





    }
}






