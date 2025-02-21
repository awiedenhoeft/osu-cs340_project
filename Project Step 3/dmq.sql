-- Query for add a new client functionality with colon : character being used to 
-- denote the variables that will have data from the backend programming language

--get all client information to populate table of clients
SELECT clientID AS "Client ID", firstName AS "First Name", lastName AS "Last Name", email AS "Email", phoneNum AS "Phone Number" FROM clients;

--remove client from clients
DELETE FROM clients
WHERE clientID = :clientID_from_dropdown_input;

--update client phone number
UPDATE clients
SET phoneNum = :phoneNumInput
WHERE clientID = :clientID_from_dropdown_input;

--add new client to database
INSERT INTO clients (firstName, lastName, email, phoneNum)
VALUES ( 
    :firstNameInput, 
    :lastNameInput, 
    :emailInput, 
    :phoneNumInput
    );

--get all wedding information to populate table of weddings
SELECT weddingID AS "Wedding ID", clientID AS "Client ID", weddingDate AS "Wedding Date", location AS "Wedding Location", weddingType AS "Wedding Type", totalBudget AS "Total Budget" FROM weddings;

--add new wedding to database
INSERT INTO weddings (weddingID, clientID, weddingDate, location, weddingType, totalBudget)
VALUES (
    :weddingIDInput,
    :clientIDInput,
    :weddingDateInput,
    :locationInput,
    :weddingType_from_dropdown_input,
    :totalBudgetInput
);

--add service to wedding (M:M relationship addition)
INSERT INTO weddingServices (weddingID, serviceID)
SELECT 
    weddings.weddingID, 
    services.serviceID
FROM weddings, services
WHERE weddings.weddingID = :weddingID_from_dropdown_input
AND services.serviceName = :serviceName_from_dropdown_input;

--delete service from wedding
DELETE FROM weddingServices
WHERE weddingID = :weddingID_from_dropdown_input
AND serviceID = :serviceID_from_checkbox

--remove wedding from weddings
DELETE FROM weddings
WHERE weddingID = :weddingID_from_dropdown_input


--get all payment information to populate table of payments
SELECT invoiceID AS "Invoice ID", clientID AS "Client ID", invoiceDate AS "Invoice Date", totalAmount AS "Total Amount", paymentDate AS "Payment Date" FROM payments;

--add new payment information to database
INSERT INTO payments (invoiceID, clientID, invoiceDate, totalAmount, paymentDate)
VALUES (
    :clientIDInput,
    :invoiceDateInput,
    :totalAmountInput,
    :paymentDateInput
);

--update total amount of invoice
UPDATE payments SET totalAmount = :totalAmountInput
WHERE payments.invoiceID = :invoiceID_from_dropdown_input;

--remove payment from payments
DELETE FROM payments
WHERE paymentID = :paymentID_from_dropdown_input;

--get all services information to populate table of services
SELECT serviceID AS "Service ID", serviceName AS "Service Name", serviceType AS "Service Type", serviceCost AS "Service Cost" FROM services;

--add new service to database
INSERT INTO services (serviceID, serviceName, serviceType, serviceCost)
VALUES (
    :serviceNameInput,
    :serviceType_from_dropdown_input,
    :serviceCostInput
);

--update service cost
UPDATE services SET serviceCost = :serviceCostInput
WHERE services.serviceID = :serviceID_from_dropdown_input;

--remove service from services table
DELETE FROM services
WHERE serviceID = :serviceID_from_dropdown_input;


--