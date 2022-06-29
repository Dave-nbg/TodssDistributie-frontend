import Order from "../domain/Order.js";
import OrderItem from "../domain/OrderItem.js";

export default class OrderService {
    async getOrdersForLocation(locationId) {
        const response = await fetch("http://localhost:8080/order/all/" + locationId);
        const responseJson = await response.json();


        const orders = await Promise.all(responseJson.map(
              async order => new Order(order.id, await this.getVisit(order.visitId), order.orderItems.map(
                 orderItem => new OrderItem(orderItem.amount, orderItem.menuItem.name)
             ), order.status)
        ));
        return await orders;
    }

    async getVisit(visitId){
        const response = await fetch("http://localhost:8080/visit/" + visitId);
        const responseJson = await response.json();
        console.log(responseJson.tableNumber)
        return await responseJson.tableNumber;
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