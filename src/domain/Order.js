export default class Order {
    constructor(id, tableNumber, orderItems, status) {
        this._id = id;
        this._tableNumber = tableNumber;
        this._orderItems = orderItems;
        this._status = status;
    }

    get id() {
        return this._id;
    }

    get tableNumber() {
        return this._tableNumber;
    }

    get orderItems() {
        return this._orderItems;
    }

    get status() {
        return this._status;
    }
}