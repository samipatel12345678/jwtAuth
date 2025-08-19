import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ error: "Not authenticated" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
router.get("/me", authMiddleware, async (req, res) => {
  res.json({ user: req.user });
});
