export type TRestaurantListItem = {
  id: number;
  name: string;
  streetAddress: string | null;
  zipCode: string | null;
  city: {
    name: string;
    state: {
      name: string;
    };
  };
};