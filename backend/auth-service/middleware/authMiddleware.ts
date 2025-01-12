import { Request, Response, NextFunction } from 'express';
enum UserRole {
    Admin = 'admin',
    Seller = 'seller',
    Buyer = 'buyer',
  }
  
type UserRoleType = keyof typeof UserRole;
interface CustomRequest extends Request {
  user?: {
    _id: Types.ObjectId;
    role: UserRoleType;
  };
}
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';


export function verifyToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.cookies?.token;
    if (!token) {
      res.status(401).json({ message: 'Access denied' });
      return;
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload & { _id: Types.ObjectId, role: UserRoleType };
      (req as CustomRequest).user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
  }

export function authorizeRoles(...roles: UserRoleType[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const customReq = req as CustomRequest;
    if (!customReq.user || !roles.includes(customReq.user.role)) {
      res.status(403).json({ message: 'Access denied' });
      return;
    }
    next();
  };
}
