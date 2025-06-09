import db from '../drizzle/db';
import { orderMenuItem, TOrderMenuItemInsert, TOrderMenuItemSelect } from '../drizzle/schema';
import { eq } from 'drizzle-orm';


export const orderMenuItemService = async():Promise<TOrderMenuItemSelect[] |null>=>{
  return await db.query.orderMenuItem.findMany({
    with:{
      order:{
        columns:{
          restaurantId:true,
          estimatedDeliveryTime:true,
          actualDeliveryTime:true,
          deliveryAddressId:true,
          userId:true,
          driverId:true,
          price:true,
          discount:true,
          finalPrice:true,
          comment:true
        }
      },
      menuItem:{
        columns:{
          name:true,
          restaurantId:true,
          categoryId:true,
          description:true,
          ingredients:true,
          price:true,
          active:true
        }
      }

    }
  })
}

export const getOderMenuItemByIdService = async(id:number):Promise<TOrderMenuItemSelect |undefined>=>{
  return await db.query.orderMenuItem.findFirst({
    where:eq(orderMenuItem.id,id),
    with:{
      order:{
        columns:{
          restaurantId:true,
          estimatedDeliveryTime:true,
          actualDeliveryTime:true,
          deliveryAddressId:true,
          userId:true,
          driverId:true,
          price:true,
          discount:true,
          finalPrice:true,
          comment:true
        }
      },
      menuItem:{
        columns:{
          name:true,
          restaurantId:true,
          categoryId:true,
          description:true,
          ingredients:true,
          price:true,
          active:true
        }
      }

    }
  })
}
export const createOrderMenuItemService =async(OderMenuItem: TOrderMenuItemInsert):Promise<string>=>{
  await db.insert(orderMenuItem).values(OderMenuItem).returning()
  return "Oder menu item created successfully"
}
export const updateOderMenuItemService = async(OrderMenuItem: TOrderMenuItemSelect, id:number):Promise<string>=>{
  await db.update(orderMenuItem).set(OrderMenuItem).where(eq(orderMenuItem.id,id)).returning()
  return "Oder menu item updated successfully" 
}
export const deleteOderMenuItemService = async(id:number):Promise<string>=>{
  await db.delete(orderMenuItem).where(eq(orderMenuItem.id,id)).returning()
  return "Odermenu item deleted successfully"
}