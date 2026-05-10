export const services = [
  "Plumbing",
  "Electrical",
  "Painting",
  "Roof Repair",
  "Cleaning",
  "Dog Walking",
  "Aircon Service",
  "CCTV Installation",
];

export const bookingDensity: Record<string, number> = {
  "2026-04-28": 4,
  "2026-04-29": 2,
  "2026-04-30": 1,
  "2026-05-01": 3,
};

export const walletData = {
  balance: 1500,
  transactions: [
    {
      id: 1,
      type: "reload",
      amount: 1000,
      date: "2026-04-20",
    },
    {
      id: 2,
      type: "booking",
      amount: -300,
      date: "2026-04-22",
    },
    {
      id: 3,
      type: "booking",
      amount: -200,
      date: "2026-04-25",
    },
  ],
};

export const userProfile = {
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "09171234567",
  address: "Quezon City, Philippines",
};