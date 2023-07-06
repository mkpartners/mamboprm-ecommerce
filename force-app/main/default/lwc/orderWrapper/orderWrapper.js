import { LightningElement, api } from "lwc";
import { loadStyle } from "lightning/platformResourceLoader";
import ecommerceResources from "@salesforce/resourceUrl/EcommerceResources";

export default class OrderWrapper extends LightningElement {
  @api customerEmail = "";
  @api orgId = "";
  @api edition = "standard";
  @api quantity = 0;
  showUserDetailsScreen = true;
  showOrderDetailsScreen = false;
  showPaymentDetailsScreen = false;
  logoImg = ecommerceResources + "/images/mambo-merge-logo-transparent.png";
  loaded = true;

  async connectedCallback() {
    try {
      await loadStyle(this, ecommerceResources + "/styles/styles.css");
      this.loaded = true;
    } catch (error) {
      console.log(error.body);
    }
  }

  handleScreenChange(event) {
    this.log(event.detail);

    const eventDetails = event.detail;
    if (eventDetails.screen) {
      switch (eventDetails.screen) {
        case "userDetails":
          this.showUserDetailsScreen = true;
          this.showOrderDetailsScreen = false;
          this.showPaymentDetailsScreen = false;
          break;
        case "orderDetails":
          this.showUserDetailsScreen = false;
          this.showOrderDetailsScreen = true;
          this.showPaymentDetailsScreen = false;
          break;
        case "paymentDetails":
          this.showUserDetailsScreen = false;
          this.showOrderDetailsScreen = false;
          this.showPaymentDetailsScreen = true;
          break;
      }

      if (eventDetails.customerEmail) {
        this.customerEmail = eventDetails.customerEmail;
      }
      if (eventDetails.orgId) {
        this.orgId = eventDetails.orgId;
      }
      if (eventDetails.edition) {
        this.edition = eventDetails.edition;
      }
      if (eventDetails.quantity) {
        this.quantity = eventDetails.quantity;
      }
    }
  }

  handleSubmitPaymentDetails(event) {
    console.log("handleSubmitPaymentDetails");
  }

  log(o) {
    console.log(JSON.parse(JSON.stringify(o)));
  }
}
