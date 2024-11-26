const Users = require("../model/user");
const bcryptjs = require("bcryptjs");

const addUser = async (req, res) => {
    const { username, email, password, date, phone, address } = req.body;
    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const user = new Users({
            username,
            email,
            password: hashedPassword,  
            date,
            phone,
            address
        });
        await user.save();
        res.status(201).json({ message: "User added successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }
        const isValidPassword = await bcryptjs.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        req.session.user = user; 
        res.status(200).json({ message: "Login successful!", user: user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const logout = (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
    addUser,
    login,
    logout,
    getAllUsers
};