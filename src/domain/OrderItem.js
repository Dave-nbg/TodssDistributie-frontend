export default class OrderItem {
    constructor(amount, dishName) {
        this._amount = amount;
        this._dishName = dishName;
    }

    get amount() {
        return this._amount;
    }

    get dishName() {
        return this._dishName;
    }
}