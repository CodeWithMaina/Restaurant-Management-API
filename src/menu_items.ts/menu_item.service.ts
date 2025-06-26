import { restaurant } from './../drizzle/schema';
import db  from '../drizzle/db';
import { menuItem, TMenuItemSelect } from '../drizzle/schema';
import { eq } from 'drizzle-orm';
import { MenuItemInput, UpdateMenuItemInput } from '../validations/menu_item.validotor';

type MenuItemWithRelations = {
  id: number;
  name: string;
  description: string | null;
  price: string;
  ingredients: string;
  active: boolean | null;
  restaurant: {
    name: string;
    streetAddress: string | null;
    zipCode: string | null;
  };
  category: {
    name: string;
  };
  orderItems: {
    orderId: number;
    menuItemId: number;
    quantity: number;
    itemPrice: string;
    price: string;
    comment: string | null;
  }[];
};

export const getMenuItemService = async (): Promise<MenuItemWithRelations[] | null> => {
  return await db.query.menuItem.findMany({
    columns: {
      id: true,
      name: true,
      description: true,
      price: true,
      ingredients: true,
      active: true,
    },
    orderBy: (menuItem, { desc }) => [desc(menuItem.id)],
    with: {
      restaurant: {
        columns: {
          name: true,
          streetAddress: true,
          zipCode: true,
        }
      },
      category: {
        columns: {
          id: true,
          name: true
        }
      },
      orderItems: {
        columns: {
          orderId: true,
          menuItemId: true,
          quantity: true,
          itemPrice: true,
          price: true,
          comment: true
        }
      }
    }
  });
};

export const getMenuItemByIdService = async (id: number): Promise<TMenuItemSelect | undefined> => {
  return await db.query.menuItem.findFirst({
    where: eq(menuItem.id, id),
    with: {
      restaurant: {
        columns: {
          name: true,
          streetAddress: true,
          zipCode: true,
          cityId: true
        }
      },
      category: {
        columns: {
          name: true
        }
      },
      orderItems: {
        columns: {
          orderId: true,
          menuItemId: true,
          quantity: true,
          itemPrice: true,
          price: true,
          comment: true
        }
      }
    }
  });
};

export const createMenuItemService = async (menu_item: MenuItemInput): Promise<string> => {
  await db.insert(menuItem).values({ ...menu_item, price: menu_item.price.toString() }).returning();
  return "Menu item created successfully";
};

export const updateMenuItemService = async (menu_item: UpdateMenuItemInput, id: number): Promise<string> => {
  await db.update(menuItem).set({ ...menu_item, price: menu_item.price?.toString() }).where(eq(menuItem.id, id)).returning();
  return "Menu item updated successfully";
};

export const deleteMenuItemService = async (id: number): Promise<string> => {
  await db.delete(menuItem).where(eq(menuItem.id, id)).returning();
  return "Menu item deleted successfully";
};

//Getting menu item by restaurant id
export const getMenuItemByRestaurantIdService = async (restaurantId: number): Promise<TMenuItemSelect[] | null> => {
  return await db.query.menuItem.findMany({
    where: eq(menuItem.restaurantId, restaurantId),
  });
};


// Getting menu items by category id
export const getMenuItemByCategoryIdService = async (categoryId: number): Promise<TMenuItemSelect[] | null> => {
  return await db.query.menuItem.findMany({
    where: eq(menuItem.categoryId, categoryId),
    with: {
      restaurant: {
        columns: {
          name: true,
          streetAddress: true,
          zipCode: true,
        }
      },
      category: {
        columns: {
          name: true
        }
      }
    }
  });
};