import { LightningElement, api } from "lwc";
import createOrderRecord from "@salesforce/apex/EcommerceController.createOrderRecord";

export default class SubOrderDetails extends LightningElement {
  @api customerEmail;
  @api orgId;
  @api edition;
  @api quantity;
  errorMsg = "";

  renderedCallback() {
    let radioButtons = this.template.querySelectorAll("input[type=radio]");
    radioButtons.forEach((radioButton) => {
      if (radioButton.value === this.edition) {
        radioButton.checked = true;
      }
    });
  }

  async backUserDetails(event) {
    event.preventDefault();

    let details = {
      screen: "userDetails",
      edition: this.edition,
      quantity: this.quantity
    };

    const handleScreenChangeEvent = new CustomEvent("handlescreenchange", {
      detail: details
    });
    this.dispatchEvent(handleScreenChangeEvent);
  }

  async submitOrderDetails(event) {
    event.preventDefault();
    this.errorMsg = "";

    if (this.edition && this.quantity && this.quantity > 0) {
      let details = {
        screen: "paymentDetails",
        edition: this.edition,
        quantity: this.quantity
      };

      const handleScreenChangeEvent = new CustomEvent("handlescreenchange", {
        detail: details
      });
      this.dispatchEvent(handleScreenChangeEvent);

      await createOrderRecord({ orgId: this.orgId });
    } else {
      this.errorMsg = "Quantity cannot be less than 1.";
    }
  }

  handleEditionChange(event) {
    this.edition = event.target.value;
  }

  handleQuantityChange(event) {
    if (event.target.value < 0) {
      this.quantity = 0;
    } else {
      this.quantity = event.target.value;
    }
  }

  get showError() {
    return this.errorMsg;
  }
}
