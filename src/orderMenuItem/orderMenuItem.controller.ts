import { Request, Response } from "express";
import {
  orderMenuItemService,
  getOderMenuItemByIdService,
  createOrderMenuItemService,
  updateOderMenuItemService,
  deleteOderMenuItemService
} from "./orderMenuItem.service";


export const getOrderMenuItems = async (req: Request, res: Response) => {
  try {
    const orderMenuItems = await orderMenuItemService();
    if (!orderMenuItems || orderMenuItems.length === 0) {
      res.status(404).json({ message: "No order menu items found" });
      return;
    }
    res.status(200).json(orderMenuItems);
  } catch (error) {
    console.error("Error fetching order menu items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrderMenuItemById = async (req: Request, res: Response) => {
  const orderMenuItemId = parseInt(req.params.id);
  if (isNaN(orderMenuItemId)) {
    res.status(400).json({ message: "Invalid order menu item ID" });
    return;
  }

  try {
    const orderMenuItem = await getOderMenuItemByIdService(orderMenuItemId);
    if (!orderMenuItem) {
      res.status(404).json({ message: "Order menu item not found" });
    } else {
      res.status(200).json(orderMenuItem);
    }
  } catch (error) {
    console.error("Error fetching order menu item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createOrderMenuItem = async (req: Request, res: Response) => {
  const orderMenuItemData = req.body;

  try {
    const newOrderMenuItem = await createOrderMenuItemService(orderMenuItemData);
    res.status(201).json({ orderMenuItem: newOrderMenuItem });
  } catch (error) {
    console.error("Error creating order menu item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateOrderMenuItem = async (req: Request, res: Response) => {
  const orderMenuItemId = parseInt(req.params.id);
  const orderMenuItemData = req.body;

  try {
    const updatedOrderMenuItem = await updateOderMenuItemService(
      orderMenuItemData,
      orderMenuItemId
    );
    res.status(200).json({ orderMenuItem: updatedOrderMenuItem });
  } catch (error) {
    console.error("Error updating order menu item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteOrderMenuItem = async (req: Request, res: Response) => {
  const orderMenuItemId = parseInt(req.params.id);
  if (isNaN(orderMenuItemId)) {
    res.status(400).json({ message: "Invalid order menu item ID" });
    return;
  }

  try {
    const deleteMessage = await deleteOderMenuItemService(orderMenuItemId);
    res.status(200).json({ message: deleteMessage });
  } catch (error) {
    console.error("Error deleting order menu item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// import { Request, Response } from "express";
// import {
//   orderMenuItemService,
//   getOderMenuItemByIdService,
//   createOrderMenuItemService,
//   updateOderMenuItemService,
//   deleteOderMenuItemService,
// } from "./orderMenuItem.service";
// import { createOrderMenuItemSchema, updateOrderMenuItemSchema } from "../validation/orderMenuItem.validation";



// export const getOrderMenuItems = async (req: Request, res: Response) => {
//   try {
//     const orderMenuItems = await orderMenuItemService();
//     if (!orderMenuItems || orderMenuItems.length === 0) {
//       res.status(404).json({ message: "No order menu items found" });
//       return;
//     }
//     res.status(200).json(orderMenuItems);
//   } catch (error) {
//     console.error("Error fetching order menu items:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const getOrderMenuItemById = async (req: Request, res: Response) => {
//   const orderMenuItemId = parseInt(req.params.id);
//   if (isNaN(orderMenuItemId)) {
//     res.status(400).json({ message: "Invalid order menu item ID" });
//     return;
//   }

//   try {
//     const orderMenuItem = await getOderMenuItemByIdService(orderMenuItemId);
//     if (!orderMenuItem) {
//       res.status(404).json({ message: "Order menu item not found" });
//     } else {
//       res.status(200).json(orderMenuItem);
//     }
//   } catch (error) {
//     console.error("Error fetching order menu item:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const createOrderMenuItem = async (req: Request, res: Response) => {
//   const parseResult = createOrderMenuItemSchema.safeParse(req.body);
//   if (!parseResult.success) {
//     return res.status(400).json({ errors: parseResult.error.errors });
//   }
//   const orderMenuItemData = parseResult.data;

//   try {
//     const newOrderMenuItem = await createOrderMenuItemService(orderMenuItemData);
//     res.status(201).json({ orderMenuItem: newOrderMenuItem });
//   } catch (error) {
//     console.error("Error creating order menu item:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const updateOrderMenuItem = async (req: Request, res: Response) => {
//   const orderMenuItemId = parseInt(req.params.id);
//   if (isNaN(orderMenuItemId)) {
//     return res.status(400).json({ message: "Invalid order menu item ID" });
//   }

//   const parseResult = updateOrderMenuItemSchema.safeParse(req.body);
//   if (!parseResult.success) {
//     return res.status(400).json({ errors: parseResult.error.errors });
//   }
//   const orderMenuItemData = parseResult.data;

//   try {
//     const updatedOrderMenuItem = await updateOderMenuItemService(
//       orderMenuItemData,
//       orderMenuItemId
//     );
//     res.status(200).json({ orderMenuItem: updatedOrderMenuItem });
//   } catch (error) {
//     console.error("Error updating order menu item:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const deleteOrderMenuItem = async (req: Request, res: Response) => {
//   const orderMenuItemId = parseInt(req.params.id);
//   if (isNaN(orderMenuItemId)) {
//     res.status(400).json({ message: "Invalid order menu item ID" });
//     return;
//   }

//   try {
//     const deleteMessage = await deleteOderMenuItemService(orderMenuItemId);
//     res.status(200).json({ message: deleteMessage });
//   } catch (error) {
//     console.error("Error deleting order menu item:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };



