import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./database/secret";
import User from "./model/user";

interface AuthResponse {
  success: boolean;
  message: string;
  payload?: any;
}

export async function isLogin(): Promise<AuthResponse> {
  try {
    const token = (await cookies()).get("user_token")?.value;

    if (!token) {
      return { success: false, message: "Please login" };
    }
    
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

    if (!decoded || !decoded.id) {
      return { success: false, message: "JWT authentication failed" };
    }

    const user = await User.findById(decoded.id);

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return {
      success: true,
      message: "User is logged in",
      payload: user,
    };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
