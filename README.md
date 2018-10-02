
# HealthInsurance network

This Defines a business network where health insurance consumers can claim their insurance.

### Network definition:
  - Participants
  - Assets
  - Transactions

### Participants 
    InsuranceProvider | Hospital | Patient
### Assets
    ClaimGrant | HospitalVerification 
### Transactions
    ClaimProcess | HospitalVerification
A ```patient``` first claims for the insurance based upon his transactions with the hospital, and ```claimGrant``` accounts to him.
Whenever a ```patient``` claims the amount, ```hospital``` comes into the picture and it is responsible for ```HospitalVerification```.

Application Flow:
  - Patient claims for the amount with the underlying asset ```claimGrant```.
  - This reults Hospital to initiate the verification process.
  - First transaction would be ```HospitalVerification``` followed by ```claimProcess```.

To test this Business Network Definition in the hyperledger playgound test tab:

### Participants
 Create ```Patient``` , ```Insurer``` participants this way:
 ``` {
  "$class": "org.example.empty.Insurance",
  "insurerId": "1",
  "firstName": "***",
  "lastName": "***"
} 
```
```{
  "$class": "org.example.empty.Person",
  "personId": "5",
  "firstName": "***",
  "lastName": "***",
}
```
Create a ```ClaimGrant``` Asset:
```{
  "$class": "org.example.empty.claimContract",
  "claimId": "6",
  "insurer": "resource:org.example.empty.Insurance#1",
  "patient": "resource:org.example.empty.Person#5"
}
```
Submit a ```ClaimProcess``` transaction:
```{
  "$class": "org.example.empty.processClaims",
  "patient": "resource:org.example.empty.Person#1",
  "insurer": "resource:org.example.empty.Insurance#5",
  "Amount": "***",
  "claim": "resource:org.example.empty.claimContract#6"
}
```
As of now, HospitalVerification is on hold, will be incorporation ```recordskeeper``` to hold the health records and the verification will be done accordingly.

[All about Hyperledger network creation.](https://hyperledger.github.io/composer/latest/installing/installing-index)
