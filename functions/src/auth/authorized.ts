//Extract the user’s info from res.locals we set previously 

//Validate if it has the role required to execute the operation 

//In the case the operation allows the same user to execute, 
//we validate that the ID on the request params is the same as the one in the auth token.

//If the user doesn’t have the required role, we’ll return a 403.

import { Request, Response } from "express";

export function isAuthorized(opts: { hasRole: Array<'admin' | 'manager' | 'user'>, allowSameUser?: boolean }) {
   return (req: Request, res: Response, next: Function) => {
       const { role, email, uid } = res.locals
       const { id } = req.params
     
       if (email === 'your-root-user-email@domain.com')
         return next();

       if (opts.allowSameUser && id && uid === id)
           return next();

       if (!role)
           return res.status(403).send();

       if (opts.hasRole.includes(role))
           return next();

       return res.status(403).send();
   }
}