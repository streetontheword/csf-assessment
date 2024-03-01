package vttp.batch4.csf.ecommerce.repositories;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import vttp.batch4.csf.ecommerce.models.Cart;
import vttp.batch4.csf.ecommerce.models.LineItem;
import vttp.batch4.csf.ecommerce.models.Order;

@Repository
public class PurchaseOrderRepository {

  @Autowired
  private JdbcTemplate template;

 
  
	public static final String SQL_INSERT_LINEITEMS = """
		insert into cart(productId, name, quantity, price, orderId) values (?,?,?,?,?)
		""";

    public static final String SQL_INSERT_PURCHASEORDER= """
      insert into cart(orderId, name, address, priority, comments) values (?,?,?,?,?)
      """;
  

    // public void newBookings(Bookings bookings) {  //this creates the booking 
		
    //   template.update(Queries.SQL_ADD_BOOKINGS, bookings.getBookingId(), bookings.getListingId(), bookings.getDuration(), bookings.getEmail());
  
    // }
  // IMPORTANT: DO NOT MODIFY THIS METHOD.
  // If this method is changed, any assessment task relying on this method will
  // not be marked
  // You may only add Exception to the method's signature
  public void create(Order order) {
    // TODO Task 3
    

    System.out.println(order.getCart());
    Cart listOfCart = order.getCart();
    String orderId = order.getOrderId();
    order.getAddress();
    System.out.println("HELLLOOO"+orderId);

    List<LineItem> list = listOfCart.getLineItems();
    for (LineItem l :list){
      String prodId = l.getProductId();
      String name = l.getName();
      int qty = l.getQuantity();
      float price = l.getPrice();

      
      template.update(SQL_INSERT_PURCHASEORDER, orderId, order.getName(),order.getAddress(),order.getPriority(),order.getComments());
      
      template.update(SQL_INSERT_LINEITEMS, prodId, name, qty, price, orderId);
    }


  





  }
}
