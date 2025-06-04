const isAdmin = (req, res, next) => {
    console.log('isAdmin middleware - req.user:', req.user);
    const user = req.user;
    if (!user || user.role !== "admin") {
        return res.status(403).json({ error: "Acceso denegado. Solo admins pueden realizar esta acción." });
    }
    next();
};


export {
    isAdmin
}