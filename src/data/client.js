class ClientDocument {
  constructor() {
    this.phone = [];
    this.surName = '';
    this.firstName = '';
    this.middleName = '';
    this.addressInfo ='';
    this.eMail = '';
    this.discount = '';
    this.comments = '';
    this.status = [];

    Object.seal(this);
  }

  /*prepareForRequest() {
    this.dateCreateOrder = moments.formatDateJson(this.dateCreateOrder);
    return this;
  }*/
}

ClientDocument.create = function () {
  return new ClientDocument();
};

ClientDocument.fromRequest = function (data) {
  if (!data) {
    return;
  }

  const document = new ClientDocument();
  for (const prop in data) {
    if (document.hasOwnProperty(prop)) {
      document[prop] = data[prop];
    }
  }

  return document;
};
export default ClientDocument;
