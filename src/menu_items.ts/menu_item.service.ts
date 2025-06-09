
import  db  from '../drizzle/db'; // Adjust based on your setup
import  { menuItem, TMenuItemInsert, TMenuItemSelect}  from '../drizzle/schema'; // Your Drizzle schema
import { eq } from 'drizzle-orm';




export const getMenuItemService = async():Promise<TMenuItemSelect[] |null>=>
{
  return await db.query.menuItem.findMany({
    with:{
      restaurant:{
        columns:{
          name: true, 
          streetAddress: true,
          zipCode:true,
          cityId:true
        }
      },
      category: {
        columns:{
          name:true

        }
      },
      orderItems:{
        columns:{
          orderId:true,
          menuItemId:true,
          quantity:true,
          itemPrice:true,
          price:true,
          comment:true


        }
      }

    }
  })
}
export const getMenuItemByIdService = async(id:number):Promise<TMenuItemSelect | undefined>=>{
  return await db.query.menuItem.findFirst({
    where:eq(menuItem.id,id),
    with:{
      restaurant:{
        columns:{
          name:true,
          streetAddress:true,
          zipCode:true,
          cityId:true
        }
      },
      category:{
        columns:{
          name:true
        }
      },
      orderItems:{
        columns:{
          orderId:true,
          menuItemId:true,
          quantity:true,
          itemPrice:true,
          price:true,
          comment:true
        }
      }

    }
  })
}
export const createMenuItemService = async(menu_item: TMenuItemInsert):Promise<string>=>{
   await db.insert(menuItem).values(menu_item).returning()
   return "Menu item created successfully"
}
export const updateMenuItemService = async(menu_item: TMenuItemInsert, id:number):Promise<string>=>{
  await db.update(menuItem).set(menu_item).where(eq(menuItem.id,id)).returning()
  return "Menu item updated successfully"
}
export const deleteMenuItemService = async(id:number):Promise<string>=>{
  await db.delete(menuItem).where(eq(menuItem.id,id)).returning()
  return "Menu item deleted successfully"
}
  
