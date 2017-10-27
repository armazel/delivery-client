import { moments } from '../utils';

class OrderDocument {
    constructor() {
        this.id = -1;

        this.date = null;
        this.number = '';
        this.status = 0;
        this.invoices = [];

        Object.seal(this);
    }

    prepareForRequest() {
        this.date = moments.formatDateJson(this.date);
        return this;
    }
}

OrderDocument.create = function () {
    return new OrderDocument();
};

OrderDocument.fromRequest = function (data) {
    if (!data) {
        return;
    }

    const document = new OrderDocument();
    for (const prop in data) {
        if (document.hasOwnProperty(prop)) {
            document[prop] = data[prop];
        }
    }

    if (data.date) {
        document.date = moments.parseDate(data.date);
    }

    return document;
};
export default OrderDocument;
