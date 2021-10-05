import { gql } from "@apollo/client";

export const SEARCH_CUSTOMER = gql`
  query CustomerSearch($input: CustomerSearchInput!) {
    search {
      customers(input: $input) {
        edges {
          node {
            id
            legacyId
            firstName
            lastName
            email
            defaultPaymentMethod {
              id
              legacyId
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
          }
        }
      }
    }
  }
`;

export const ID_FROM_LEGACY = gql`
  query idFromLegacyId($legacyId: ID!, $legacyIdType: LegacyIdType!) {
    idFromLegacyId(legacyId: $legacyId, type: $legacyIdType)
  }
`;

export const NODE_SEARCH = gql`
  query NodeSearch($input: ID!) {
    node(id: $input) {
      ... on Transaction {
        legacyId
        createdAt
        status
        amount {
          currencyCode
          value
        }
      }
      ... on Customer {
        legacyId
        firstName
        lastName
        email
        defaultPaymentMethod {
          id
          legacyId
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
      }
      ... on PaymentMethod {
        legacyId
        usage
        createdAt
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
    }
  }
`;
