export  default class Order {
    constructor(orderid,date,customer,items) {
        this.orderId = orderid;
        this.items = [];
        this._total = 0;
        this._subTotal = 0;
        this._orderid = orderid;
        this._date = date;
        this._customer = customer;
        this._items = items;
    }

    get orderid() {
        return this._orderid;
    }

    set orderid(value) {
        this._orderid = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get customer() {
        return this._customer;
    }

    set customer(value) {
        this._customer = value;
    }

    get items() {
        return this._items;
    }

    set items(value) {
        this._items = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }

    get subTotal() {
        return this._subTotal;
    }

    set subTotal(value) {
        this._subTotal = value;
    }
}