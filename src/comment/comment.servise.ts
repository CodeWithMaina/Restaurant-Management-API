import db from '../drizzle/db';
import { comment, TCommentSelect, TCommentInsert} from "../drizzle/schema";
import { eq } from 'drizzle-orm';

export const commentService = async():Promise<TCommentSelect[] |null>=>
  {
  return await db.query.comment.findMany({
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