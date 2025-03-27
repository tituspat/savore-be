const db = require('../config/db');

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
    try {
        const result = await db('menus').select('*'); // ✅ Use correct table name
        res.json(result);
    } catch (err) {
        console.error("Error getting menu items:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Get menu items by type
exports.getMenuItemsByType = async (req, res) => {
    const { menu_type } = req.params;

    try {
        const allowedTypes = ["Meals", "Drinks", "Snacks"];
        if (!allowedTypes.includes(menu_type)) {
            return res.status(400).json({ message: `Menu type '${menu_type}' is not valid` });
        }

        const result = await db('menus').where({ menu_type });

        if (result.length === 0) {
            return res.status(404).json({ message: `No menu items found for type: ${menu_type}` });
        }

        res.json(result);
    } catch (err) {
        console.error(`Error getting ${menu_type} items:`, err.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Get single menu item by ID
exports.getMenuItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db('menus').where({ id }).first();

        if (!result) {
            return res.status(404).json({ message: `Menu item with ID ${id} not found` });
        }

        res.json(result);
    } catch (err) {
        console.error("Error getting menu item:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Create new menu item
exports.createMenuItem = async (req, res) => {
    console.log("Request headers:", req.headers);
    console.log("Request body:", req.body); // 🐞 Debugging log

    const { name, description, price, menu_type, status } = req.body;

    if (!name || !price || !menu_type || !status) {
        return res.status(400).json({ message: `Missing required fields, ${name}, ${price}, ${menu_type}, ${status}` });
    }

    try {
        // Validate menu_type
        const allowedTypes = ["Meals", "Drinks", "Snacks"];
        if (!allowedTypes.includes(menu_type)) {
            return res.status(400).json({ message: `Menu type '${menu_type}' is not valid` });
        }

        // Validate status
        const allowedStatus = ["available", "unavailable"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: `Status '${status}' is not valid` });
        }

        const newItem = await db('menus')
            .insert({ name, description, price, menu_type, status })
            .returning('*'); // ✅ Get inserted record

        res.status(201).json(newItem[0]);
    } catch (err) {
        console.error("Error creating menu item:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Update menu item
exports.updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, menu_type, status } = req.body;

    try {
        // Check if item exists
        const checkItem = await db('menus').where({ id }).first();

        if (!checkItem) {
            return res.status(404).json({ message: `Menu item with ID ${id} not found` });
        }

        // Validate menu_type if provided
        if (menu_type) {
            const allowedTypes = ["Meals", "Drinks", "Snacks"];
            if (!allowedTypes.includes(menu_type)) {
                return res.status(400).json({ message: `Menu type '${menu_type}' is not valid` });
            }
        }

        // Validate status if provided
        if (status) {
            const allowedStatus = ["available", "unavailable"];
            if (!allowedStatus.includes(status)) {
                return res.status(400).json({ message: `Status '${status}' is not valid` });
            }
        }

        // Update menu item
        await db('menus')
            .where({ id })
            .update({ name, description, price, menu_type, status });

        // Get updated item
        const updatedItem = await db('menus').where({ id }).first();
        res.json(updatedItem);
    } catch (err) {
        console.error("Error updating menu item:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Delete menu item
exports.deleteMenuItem = async (req, res) => {
    const { id } = req.params;

    try {
        // Check if item exists
        const checkItem = await db('menus').where({ id }).first();

        if (!checkItem) {
            return res.status(404).json({ message: `Menu item with ID ${id} not found` });
        }

        // Delete the item
        await db('menus').where({ id }).del();

        res.json({ message: `Menu item with ID ${id} successfully deleted` });
    } catch (err) {
        console.error("Error deleting menu item:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};
