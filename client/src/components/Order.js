import React from "react";
import Button from "react-bootstrap/Button";
import "../styles/Order.css";

const Order = ({ user, updateOrderState, showOrder }) => {
  return (
    <div className="order-main">
      {user.orders ? (
        user.orders.length > 0 ? (
          user.orders.map((order) => (
            <div className="orders" key={order.id}>
              <div className="orders-id">
                <Button
                  onClick={() => {
                    updateOrderState(order.id);
                  }}
                  className="py-0 pr-2"
                  variant="link"
                >{`${order.id.substring(24)} `}</Button>
                <span>{` - ${order.date}`}</span>
              </div>
              <div
                className={`order-details ${
                  showOrder.show && order.id === showOrder.order ? "" : "d-none"
                }`}
              >
                <span>Items:</span>
                <table>
                  <tbody>
                    <tr>
                      <td></td>
                      <td>Name</td>
                      <td>Quantity</td>
                      <td>Price</td>
                    </tr>
                    {order.products.map((product) => (
                      <tr key={product.id}>
                        <td className="order-image">
                          <img src={product.images[0]} alt={product.title} />
                        </td>
                        <td>{product.title}</td>
                        <td>{product.amount}</td>
                        <td>${product.price.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr>
                      <td>Total:</td>
                      <td></td>
                      <td></td>
                      <td>
                        ${" "}
                        {order.shipping === "Paid"
                          ? (order.totalAmount + 10).toLocaleString()
                          : order.totalAmount.toLocaleString()}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <br />
                <div>
                  <p>Payment method: {order.paymentMethod}</p>
                  <div>
                    <p>
                      Shipping to:{" "}
                      {`${order.address.streetAdress}, ${order.address.zip}, ${order.address.city}, ${order.address.country}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No orders yet</p>
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Order;
