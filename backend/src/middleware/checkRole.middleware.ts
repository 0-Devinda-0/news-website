import { Request, Response, NextFunction } from 'express';
import { CustomJwtPayload } from '../types/express.d';

/**
 * Middleware to check if the authenticated user has any of the specified roles.
 * @param allowedRoles An array of roles (e.g., ['Admin', 'Manager'])
 */
const checkRoles = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authPayload = req.auth?.payload as CustomJwtPayload | undefined;
    if (!authPayload || !authPayload['https://my-app.example.com/roles']) {
      return res.status(403).json({ message: 'Forbidden: No roles assigned or token malformed.' });
    }

    const userRoles = authPayload['https://my-app.example.com/roles'];

    // Check if the user has at least one of the allowed roles
    const hasRequiredRole = allowedRoles.some(role => userRoles.includes(role));

    if (hasRequiredRole) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden: Insufficient permissions.' });
    }
  };
};

export default checkRoles;