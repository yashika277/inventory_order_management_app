// Middleware to check user role
const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.sendStatus(403); // Forbidden
        }
        next();
    };
};
module.exports = { checkRole }