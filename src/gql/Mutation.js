import { gql } from "@apollo/client";

export const CREATE_CLIENT_TOKEN = gql`
  mutation createClientToken ($input: CreateClientTokenInput) {
    createClientToken (input: $input) {
      clientToken
    }
}
`;

export const TOKENIZE_CARD = gql`
mutation TokenizeCreditCard($input: TokenizeCreditCardInput!) {
  tokenizeCreditCard(input: $input){
    paymentMethod{
      id
    }
  }
}
`

export const CHARGE = gql`
  mutation ChargePaymentMethod($input: ChargePaymentMethodInput!) {
    chargePaymentMethod(input: $input) {
      transaction {
        id
        legacyId
        amount {
          value
          currencyCode
        }
        status
      }
    }
  }
`;

export const AUTHORIZE = gql`
  mutation AuthorizePaymentMethod($input: AuthorizePaymentMethodInput!) {
    authorizePaymentMethod(input: $input) {
      transaction {
        id
        legacyId
        amount {
          value
          currencyCode
        }
        status
      }
    }
  }
`;

export const VAULT = gql`
mutation VaultPaymentMethod($input: VaultPaymentMethodInput!) {
  vaultPaymentMethod(input: $input) {
    paymentMethod {
      id
      legacyId
      usage
      details {
        __typename
        ... on CreditCardDetails {
          cardholderName
          bin
          last4
        }
        ... on PayPalAccountDetails {
          payerId
          email
        }
      }
    }
    verification {
      status
    }
  }
}`;