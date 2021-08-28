import { gql } from "@apollo/client";

export const CREATE_CLIENT_TOKEN = gql`
  mutation {
    createClientToken {
      clientToken
    }
  }
`;

export const CHARGE_PAYMENT_METHOD = gql`
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
