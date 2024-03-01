package vttp.batch4.csf.ecommerce;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import vttp.batch4.csf.ecommerce.services.ProductService;

@SpringBootApplication
public class EcommerceApplication implements CommandLineRunner{

  @Autowired
  ProductService
  prodSvc; 

  public static void main(String[] args) {
    SpringApplication.run(EcommerceApplication.class, args);
  }

  @Override
  public void run(String... args) throws Exception {
  //  prodSvc.getProductByCategory("Baby Care");

  }

}
