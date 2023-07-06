public without sharing class EcommerceController {
  @AuraEnabled
  public static Map<String, Object> queryOrgData(String orgId) {
    try { 
    Map<String, Object> response = new Map<String, Object>();
    List<Account> org = [SELECT Id, Name FROM Account WHERE Production_OrgId__c = :orgId LIMIT 1];
    List<sfLma__License__c> licenses = [SELECT Id, sfLma__Expiration__c FROM sfLma__License__c WHERE sfLma__Subscriber_Org_ID__c = :orgId LIMIT 1];

    if(org.size() > 0) {
      response.put('orgId', orgId);
      response.put('orgName', org[0].Name);

      if(licenses.size() > 0) { // Returning/Existing Customer (Full process is PHASE 2)
        response.put('status', 'error'); 
        response.put('message', 'Existing customers will be able to purchase licenses in the future through our Ecommerce site. A MamboMerge rep will reach out to you shortly to assist with your order.');
        // TODO FOR PHASE 1: Updates the license record and triggers a flow to send an email and start manual communication
      } else { // New Customer
        response.put('status', 'success'); 
        response.put('message', '');
      }
    } else {
      response.put('status', 'error');
      response.put('message', 'MamboMerge is not installed in the entered Production Org Id. Please install MamboMerge first then try again.');
    }

    return response;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled
  public static void createOrderRecord(String orgId) {
    try { 
    Map<String, Object> response = new Map<String, Object>();
    List<Order> orders = [SELECT Id, Status FROM Order WHERE Salesforce_Org_Id__c = :orgId AND Status = 'Draft' LIMIT 1];

    if(orders.size() > 0) { // Existing Order
      // What should be updated if there is an existing order in Draft?
    } else { // New Order
      Order o = new Order();
      o.Salesforce_Org_Id__c = orgId;
      o.AccountId = [SELECT Id FROM Account WHERE Production_OrgId__c = :orgId LIMIT 1].Id;
      o.Status = 'Draft';
      // Check what else should be updated here
    }
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}