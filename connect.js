const request = require('request-promise');

/**
 * Surecomp's Accounting Connectivity API
 * 
 * For the complete docs: https://developer.apisure.io/docs/accounting-connectivity/1/overview
 * 
 */

const AUTH_TOKEN = 'Basic YOUR TOKEN HERE';

// Get all integrations (with integration state)
const retrieveIntegrationsOptions = {
	method: 'GET',
	uri: 'https://api.apisure.io/accounting/integrations',
	headers: {
		'Authorization': AUTH_TOKEN
	},
	json: true // Automatically stringifies the body to JSON
};

const retrieveCompaniesOptions = {
	method: 'GET',
	uri: 'https://api.apisure.io/accounting/companies',
	headers: {
		'Authorization': AUTH_TOKEN
	},
	json: true // Automatically stringifies the body to JSON
};

const billsOptions = {
	method: 'GET',
	// See bills docs: https://developer.apisure.io/docs/accounting-connectivity/1/routes/companies/%7BcompanyId%7D/data/bills/get
	// https://api.apisure.io/accounting/companies/{companyId}/data/bills
	uri: 'https://api.apisure.io/accounting/companies/2bc2eed3-609b-403d-b7ae-2c57de49339d/data/bills',
	headers: {
		'Authorization': AUTH_TOKEN
	},
	json: true // Automatically stringifies the body to JSON
};

async function run() {

	const resp1 = await request(retrieveIntegrationsOptions);
	// print all integrations
	// print(resp1);

	const quickBooksIntegration = resp1.find(integration => integration.name == 'QuickBooks Online');
	console.log(`Quickbooks integration: \n${JSON.stringify(quickBooksIntegration, ' ', 2)}`); // print integration status 
	/*
	Sample response:
	{
	   key: 'quickbooksonline',
  	  name: 'QuickBooks Online',
  	  enabled: true,
  	  sourceId: 'd3a7993f-8165-46ef-8c61-f3c06c3ef88a',
  	  integrationId: 'adeb7fe9-4c64-4848-9e0d-175317876b6f',
	  sourceType: 'Accounting' 
	}
	*/

	const companiesResp = await request(retrieveCompaniesOptions);
	console.log(`Companies list: \n${JSON.stringify(companiesResp, ' ', 2)}`);
	/*
	Sample response:	
	"companies": [
		{
		"id": "2bc2eed3-609b-403d-b7ae-2c57de49339d",
		"name": "SurecompTest",
		"platform": "QuickBooks Online",
		"status": "Linked",
		"lastSync": "2020-09-08T09:36:03.92Z",
		"dataConnections": [
			{
			"id": "45baebe4-98a3-4513-b92d-d888644a9209",
			"integrationId": "adeb7fe9-4c64-4848-9e0d-175317876b6f",
			"sourceId": "d3a7993f-8165-46ef-8c61-f3c06c3ef88a",
			"platformName": "QuickBooks Online",
			"status": "Linked",
			"lastSync": "2020-09-08T09:36:03.9196469Z",
			"created": "2020-09-07T07:12:01Z"
			}
		],
		"created": "2020-09-07T07:11:57Z"
		}
	]
	*/
	
	const billPaymentsResp = await request(billPaymentsOptions);
	console.log(`Payments list: \n${JSON.stringify(billPaymentsResp, ' ', 2)}`);
	/**
	 Sample response:
    {
      "id": "44",
      "reference": "44",
      "supplierRef": {
        "id": "36",
        "supplierName": "Diego's Road Warrior Bodyshop"
      },
      "issueDate": "2020-03-22T00:00:00Z",
      "dueDate": "2020-04-21T00:00:00Z",
      "currency": "USD",
      "currencyRate": 1,
      "lineItems": [
        {
          "description": "Repairs on the truck",
          "unitAmount": 0,
          "quantity": 0,
          "discountAmount": 0,
          "subTotal": 755,
          "taxAmount": 0,
          "totalAmount": 755,
          "accountRef": {
            "id": "75"
          },
          "taxRateRef": {
            "id": "NON",
            "name": "NON"
          },
          "trackingCategoryRefs": []
        }
      ],
      "status": "Open",
      "subTotal": 755,
      "taxAmount": 0,
      "totalAmount": 755,
      "amountDue": 755,
      "modifiedDate": "2020-09-08T09:36:00Z",
      "sourceModifiedDate": "2020-03-22T18:31:42Z"
    }
	*/
}

run();

