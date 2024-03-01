package vttp.batch4.csf.ecommerce.controllers;


import java.io.StringReader;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.sound.sampled.Line;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;




import jakarta.json.Json;
import jakarta.json.JsonArray;

import jakarta.json.JsonNumber;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import jakarta.json.JsonValue;
import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

import vttp.batch4.csf.ecommerce.services.PurchaseOrderService;


@Controller
@CrossOrigin
@RequestMapping(path="/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class OrderController {

  @Autowired
  private PurchaseOrderService poSvc;

  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  @ResponseBody
  @PostMapping(path="/postOrder")
  public ResponseEntity<String> postOrder(@RequestBody String jsonObjString) {
    
     // TODO Task 3
    JsonReader jsonReader = Json.createReader(new StringReader(jsonObjString));
	
		JsonObject jsonObject = jsonReader.readObject();

    System.out.println("RECEIVED>>>>>"+jsonObject);

    String name = jsonObject.getString("name");
    String address = jsonObject.getString("address");
    boolean priority = jsonObject.getBoolean("priority");
    String comments = jsonObject.getString("comments");
    
    System.out.println( name);
    System.out.println(address);
    System.out.println(priority);

    System.out.println(comments);
    List<LineItem> listOfLineItem = new ArrayList<>();

	 LineItem lineItem = new LineItem();
    JsonArray jsonArray = jsonObject.getJsonArray("cart");
    for (JsonValue j : jsonArray){
      System.out.println(j);
      JsonObject jsonobJ = j.asJsonObject();
      String prodId = jsonobJ.getString("prodId");
      String prodName = jsonobJ.getString("name");
      JsonNumber jsonPrice = jsonobJ.getJsonNumber("price");
      float price = (float)jsonPrice.doubleValue();
      System.out.println(price);
      System.out.println(prodId);
      lineItem.setName(prodName);
      lineItem.setProductId(prodId);
      lineItem.setPrice(price);
      listOfLineItem.add(lineItem);
    }

    Cart cart = new Cart(); 
    cart.setLineItems(listOfLineItem);
   

    Order order = new Order(); 
   
    order.setName(name);
    order.setAddress(address);
    order.setComments(comments);
    order.setPriority(priority);
    order.setCart(cart);
    System.out.println("order>>>" + order);

    System.out.println(order.toString());
 
    	try {
        poSvc.createNewPurchaseOrder(order);
			return ResponseEntity.status(HttpStatusCode.valueOf(200)).body(order.getOrderId());

		} catch (Exception e) {

			return new ResponseEntity<>(HttpStatusCode.valueOf(500));
		}

    



  }
}

