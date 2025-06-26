import db from '../drizzle/db';
import { comment, TCommentSelect, TCommentInsert, orders, users} from "../drizzle/schema";
import { eq } from 'drizzle-orm';

export const getCommentService = async():Promise<TCommentSelect[] |null>=>
  {
  return await db.query.comment.findMany({
    with:{
      order:{
        columns:{
          restaurantId:true,
          deliveryAddressId:true,
          userId:true,
          driverId:true,
          price:true,
          discount:true,
          finalPrice:true,
        }
      },
      user:{
        columns:{
          name:true,
          contactPhone:true,
          email:true,
          userType:true
        }
      }
    }
  })
}
export const getCommentByIdService = async(id:number):Promise<TCommentSelect |undefined>=>
{
  return await db.query.comment.findFirst({
    where:eq(comment.id,id),
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
      user:{
        columns:{
          name:true,
          contactPhone:true,
          phoneVerified:true,
          email:true,
          emailVerified:true,
          confirmationCode:true,
          password:true,
          userType:true
        }
      }
    }

  })
}
export const createCommentService = async(Comment: TCommentInsert):Promise<String>=>{
  await db.insert(comment).values(Comment).returning()
  return "Comment created successfully"
}
export const updateCommentService = async(Comment: TCommentInsert, id:number):Promise<string>=>{
  await db.update(comment).set(Comment).returning()
  return "Comment updated successfully"
}
export const deletecommentService = async(id:number):Promise<string>=>{
  await db.delete(comment).where(eq(comment.id,id)).returning()
  return "Comment deleted succesfully"
}


// Get comments by restaurant ID
export const getCommentServiceByRestaurantId = async (
  restaurantId: number
): Promise<TCommentSelect[] | null> => {
  return await db
    .select()
    .from(comment)
    .innerJoin(orders, eq(comment.orderId, orders.id))
    .innerJoin(users, eq(comment.userId, users.id))
    .where(eq(orders.restaurantId, restaurantId))
    .then((rows) => {
      return rows.map((row) => ({
        ...row.comment,
        order: {
          restaurantId: row.orders.restaurantId,
          deliveryAddressId: row.orders.deliveryAddressId,
          userId: row.orders.userId,
          driverId: row.orders.driverId,
          price: row.orders.price,
          discount: row.orders.discount,
          finalPrice: row.orders.finalPrice,
          comment: row.orders.comment,
        },
        user: {
          name: row.users.name,
          contactPhone: row.users.contactPhone,
          email: row.users.email,
          userType: row.users.userType,
        },
      }));
    });
};