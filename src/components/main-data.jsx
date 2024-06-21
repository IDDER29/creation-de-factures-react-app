const mainData = {
  clients: [
    {
      id: 1,
      fullName: "John Doe",
      email: "john@example.com",
      phoneNumber: "123-456-7890",
      address: {
        street: "123 Main St",
        city: "Marrakech",
        country: "Morocco",
        state: "Marrakech-Safi",
        zipCode: "40000",
      },
    },
    {
      id: 2,
      fullName: "Jane Smith",
      email: "jane@example.com",
      phoneNumber: "098-765-4321",
      address: {
        street: "456 Elm St",
        city: "Casablanca",
        country: "Morocco",
        state: "Casablanca-Settat",
        zipCode: "20000",
      },
    },
  ],

  products: [
    {
      id: 1,
      name: "Product A",
      unitPrice: 200,
      quantity: 100,
      discounts: [
        { minQuantity: 1, maxQuantity: 4, discount: 0 },
        { minQuantity: 5, maxQuantity: 9, discount: 0.05 },
        { minQuantity: 10, maxQuantity: 14, discount: 0.1 },
        { minQuantity: 15, discount: 0.15 },
      ],
    },
    {
      id: 2,
      name: "Product B",
      unitPrice: 200,
      quantity: 150,
      discounts: [
        { minQuantity: 1, maxQuantity: 4, discount: 0 },
        { minQuantity: 5, maxQuantity: 9, discount: 0.03 },
        { minQuantity: 10, maxQuantity: 14, discount: 0.07 },
        { minQuantity: 15, discount: 0.1 },
      ],
    },
    {
      id: 3,
      name: "Product C",
      unitPrice: 300,
      quantity: 200,
      discounts: [
        { minQuantity: 1, maxQuantity: 2, discount: 0 },
        { minQuantity: 3, maxQuantity: 6, discount: 0.04 },
        { minQuantity: 7, maxQuantity: 10, discount: 0.08 },
        { minQuantity: 11, discount: 0.12 },
      ],
    },
  ],

  invoices: [
    {
      id: "INV001",
      clientId: 1,
      clientName: "John Doe",
      totalHT: 1000,
      TVA: 200,
      totalTTC: 1200,
      details: [
        {
          productId: 1,
          productName: "Product A",
          quantity: 2,
          unitPrice: 200,
          discount: 0,
          price: 400,
          totalHT: 400,
        },
        {
          productId: 2,
          productName: "Product B",
          quantity: 3,
          unitPrice: 200,
          discount: 0,
          price: 600,
          totalHT: 600,
        },
      ],
    },
    {
      id: "INV002",
      clientId: 2,
      clientName: "Jane Smith",
      totalHT: 1500,
      TVA: 300,
      totalTTC: 1800,
      details: [
        {
          productId: 3,
          productName: "Product C",
          quantity: 5,
          unitPrice: 300,
          discount: 0,
          price: 1500,
          totalHT: 1500,
        },
      ],
    },
  ],
};

export default mainData;
