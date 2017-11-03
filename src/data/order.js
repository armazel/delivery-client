import { moments } from '../utils';

class OrderDocument {
    constructor() {
      this.numberOrder = -1;
      this.operatorName = '';
      this.dateCreateOrder = {
        date:'',
        time:''
      };
      this.pointOfDelivery = '';
      this.clientInfo = '';
      this.addressInfo = '';
      this.phoneNumber = '';
      this.statusOrder = {};
      this.timeSend = {
        dateInfo:'',
        timeInfo:''
      };
      this.type = {};
      this.curierName = '';

        Object.seal(this);
    }

    prepareForRequest() {
        this.dateCreateOrder = moments.formatDateJson(this.dateCreateOrder);
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

    if (data.dateCreateOrder) {
        document.dateCreateOrder = moments.parseDate(data.dateCreateOrder);
    }

    return document;
};
export default OrderDocument;
