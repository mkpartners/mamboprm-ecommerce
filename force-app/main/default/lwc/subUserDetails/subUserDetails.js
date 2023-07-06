import { LightningElement, api } from "lwc";
import queryOrgData from "@salesforce/apex/EcommerceController.queryOrgData";

export default class SubUserDetails extends LightningElement {
  @api customerEmail = "";
  @api orgId = "";
  errorMsg = "";

  async submitUserDetails(event) {
    event.preventDefault();

    if (this.customerEmail && this.orgId) {
      // await queryOrgData({ orgId: this.orgId }).then((result) => {
      //   // this.log(result);
      //   if (result.status == "success") {
      //     this.errorMsg = "";
      //     let details = {
      //       screen: "orderDetails",
      //       customerEmail: this.customerEmail,
      //       orgId: this.orgId
      //     };
      //     const handleScreenChangeEvent = new CustomEvent(
      //       "handlescreenchange",
      //       {
      //         detail: details
      //       }
      //     );
      //     this.dispatchEvent(handleScreenChangeEvent);
      //   } else {
      //     this.errorMsg = result.message;
      //   }
      // });

      // Use this for testing, uncomment the above code to use the Apex method
      const handleScreenChangeEvent = new CustomEvent("handlescreenchange", {
        detail: {
          screen: "orderDetails",
          customerEmail: this.customerEmail,
          orgId: this.orgId
        }
      });
      this.dispatchEvent(handleScreenChangeEvent);
    } else {
      this.errorMsg = "Please fill out form to continue.";
    }
  }

  handleCustomerEmailChange(event) {
    this.customerEmail = event.target.value.trim();
  }

  handleOrgIdChange(event) {
    this.orgId = event.target.value.trim();
  }

  get showError() {
    return this.errorMsg;
  }

  log(o) {
    console.log(JSON.parse(JSON.stringify(o)));
  }
}
