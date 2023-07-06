@isTest
public with sharing class EcommerceControllerTest {
  @TestSetup
  static void makeData() {
    Account a = new Account(Name = 'Test Account', Production_OrgId__c = 'MK123');
    insert a;
  }

  @isTest
  private static void queryOrgData() {
    Test.startTest();
    Account a = [SELECT Id, Name, Production_OrgId__c FROM Account WHERE Name = 'Test Account' LIMIT 1];
    Map<String, Object> resultNewCustomer = EcommerceController.queryOrgData(a.Production_OrgId__c);
    // Map<String, Object> resultReturningCustomer = EcommerceController.queryOrgData(a.Production_OrgId__c);
    Map<String, Object> resultNoOrg = EcommerceController.queryOrgData('bad org id');

    System.assertEquals('success', resultNewCustomer.get('status'), 'Found matching Org ID with no license');
    System.assertEquals('error', resultNoOrg.get('status'), 'No matching Org ID found');
    Test.stopTest();
  }
}