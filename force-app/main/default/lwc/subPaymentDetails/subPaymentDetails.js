import { LightningElement, api } from "lwc";

export default class SubPaymentDetails extends LightningElement {
  @api customerEmail;
  @api orgId;
  @api edition;
  @api quantity;

  connectedCallback() {
    console.log(
      "SubPaymentDetails: ",
      this.customerEmail,
      this.orgId,
      this.edition,
      this.quantity
    );
  }

  async backOrderDetails(event) {
    event.preventDefault();

    const handleScreenChangeEvent = new CustomEvent("handlescreenchange", {
      detail: {
        screen: "orderDetails"
      }
    });
    this.dispatchEvent(handleScreenChangeEvent);
  }

  async submitPaymentDetails(event) {
    event.preventDefault();

    const submitPaymentDetailsEvent = new CustomEvent("submitpaymentdetails", {
      detail: {}
    });
    this.dispatchEvent(submitPaymentDetailsEvent);
  }
}
