import { authenticate } from "passport";
import { Express, Request, Response } from "express";

export default (app: Express) => {
  app.get(
    "/auth/google",
    authenticate("google", {
      scope: ["profile", "email"]
    })
  );

  app.get("/auth/google/callback", authenticate("google"));

  app.get("/api/logout", (req: Request, res: Response) => {
    // Trigger log out method attached to Passport
    // Passport destroys cookies
    req.logout();
    res.send(req.user);
  });

  app.get("/api/current_user", (req: Request, res: Response) => {
    res.send(req.user);
  });
};
