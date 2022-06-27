import Order from "../domain/Order.js";
import OrderItem from "../domain/OrderItem.js";

export default class OrderService {
    async getOrdersForLocation(locationId) {
        const response = await fetch("http://localhost:8080/order/all/" + locationId);
        const responseJson = await response.json();
        const orders = responseJson.map(
            order => new Order(order.id, 10, order.orderItems.map(
                orderItem => new OrderItem(orderItem.amount, orderItem.menuItem.name)
            ), order.status)
        );

        return orders;
    }

    async setOrderStatus(id, status) {
        const response = await fetch('http://localhost:8080/order', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: id, status: status }),
        });

        const responseJson = await response.json();
    }

    async deleteOrder(id) {
        await fetch('http://localhost:8080/order/' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }
}