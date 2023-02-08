import {gql} from "@apollo/client";

export const PRODUCTS_QUERY = gql`
{
    category {
      products {
        brand
        inStock
        name
        id
        gallery
        description
        category
        attributes {
          name
          type
          items {
            id
            value
            displayValue
          }
          id
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
}`;

export const CURRENCY_QUERY = gql`
{
    currencies {
        label
        symbol
    }
}`;

export const CATEGORY_QUERY = gql`
{
  categories {
    name
  }
}`;