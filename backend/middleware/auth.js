import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: "Missing token" });
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const requireRole =
  (roles = []) =>
  (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });
    const userRoles = Array.isArray(req.user.roles) ? req.user.roles : [];
    const allowed =
      roles.length === 0 || roles.some((r) => userRoles.includes(r));
    if (!allowed) return res.status(403).json({ error: "Forbidden" });
    next();
  };
