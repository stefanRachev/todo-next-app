
import connectToDatabase from  "@/lib/mongoDB"
import { Product } from "@/models/Product"

export default async function handler(req, res) {
    if (req.method === "POST") {
      try {
        await connectToDatabase();
  
        const { userId, item, quantity } = req.body; 
  
        if (!userId || !item) {
          return res.status(400).json({ success: false, error: "Missing userId or item" });
        }
  
        const newProduct = await Product.create({
          userId,
          item,
          quantity: quantity || 1,
        });
  
        res.status(201).json({ success: true, data: newProduct });
      } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Server error" });
      }
    } else {
      res.setHeader("Allow", ["POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }