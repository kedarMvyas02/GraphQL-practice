const express = require("express");
const { buildSchema } = require("graphql");
const { graphqlHTTP } = require("express-graphql");

const schema = buildSchema(`
    type Query {
        products: [Product]
        orders: [Order]
    }
    
    type Product {
        id: ID!
        description: String!
        reviews: [Review]
        price: Float!
    }

    type Review {
        rating: Int!
        comment: String
    }

    type Order {
        date: String!
        subtotal: Float!
        items: [OrderItem]
    }

    type OrderItem {
        products: Product
        quantity: Int!
    }
`);

const root = {
  products: [
    {
      id: "redshoe",
      description: "Red Shoe",
      price: 42.12,
      reviews: [
        {
          rating: 4,
          comment: "Bakwas",
        },
      ],
    },
    {
      id: "bluejean",
      description: "Blue",
      price: 55.55,
      reviews: [
        {
          rating: 2,
          comment: "bovj bakwas",
        },
      ],
    },
  ],
  orders: [
    {
      date: "2005-05-05",
      subtotal: 90.22,
      items: [
        {
          products: {
            id: "redshoe",
            description: "Old Red Shoe",
            price: 45.11,
            reviews: [
              {
                rating: 1,
                comment: "Bakwas",
              },
            ],
          },
          quantity: 2,
        },
      ],
    },
  ],
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log("Running GraphQL Server...");
});

/*
{
  products {
    reviews {
      rating
      comment
    }
  }
  orders {
    date
    subtotal
    items {
      quantity
      products {
        id
        price
        description
        reviews {
          comment
          rating
        }
      }
    }
  }
}

*/
