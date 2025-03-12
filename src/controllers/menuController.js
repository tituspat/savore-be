const db = require('../config/db');
const { menuQueries } = require('../models/queries');

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
    try {
        const result = await db.query(menuQueries.GET_ALL_MENU_ITEMS);
        res.json(result.rows);
    } catch (err) {
        console.error("Error getting menu items:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Get menu items by category
exports.getMenuItemsByType = async (req, res) => {
    const { category } = req.params;

    try {
        const result = await db.query(menuQueries.GET_MENU_ITEMS_BY_TYPE, [category]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: `No menu items found in category: ${category}` });
        }

        res.json(result.rows);
    } catch (err) {
        console.error(`Error getting ${category} items:`, err.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Get single menu item
exports.getMenuItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(menuQueries.GET_MENU_ITEM_BY_ID, [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: `Menu item with ID ${id} not found` });
        }

        res.json(result.rows[0]);
    } catch (err) {
        console.error("Error getting menu item:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Create menu item
exports.createMenuItem = async (req, res) => {
    const { name, description, price, category } = req.body;

    if (!name || !price || !category) {
        return res.status(400).json({ message: `'${name}', '${price}', and '${category}' are required ` });
    }

    try {
        const allowedCategories = ["food", "beverage", "dessert"];
        if (!allowedCategories.includes(category.toLowerCase())) {
            return res.status(400).json({ message: `Category '${category}' is not valid` });
        }

        const type = category.toLowerCase();

        // Insert new menu item
        const result = await db.query(
            menuQueries.CREATE_MENU_ITEM,
            [name, description, price, type]
        );

        // Get complete item with category name
        const newItem = await db.query(
            menuQueries.GET_MENU_ITEM_BY_ID,
            [result.rows[0].id]
        );

        res.status(201).json(newItem.rows[0]);
    } catch (err) {
        console.error("Error creating menu item:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Update menu item
exports.updateMenuItem = async (req, res) => {
    const { id } = req.params;
    const { name, description, price, category } = req.body;

    try {
        // Check if item exists
        const checkItem = await db.query(menuQueries.CHECK_MENU_ITEM, [id]);

        if (checkItem.rows.length === 0) {
            return res.status(404).json({ message: `Menu item with ID ${id} not found` });
        }

        let categoryId = checkItem.rows[0].type;

        // If category is being updated, get the new category id
        if (category) {
            const categoryResult = category.toLowerCase();

            if (categoryResult === 0) {
                return res.status(400).json({ message: `Category '${category}' does not exist` });
            }

            categoryId = categoryResult.rows[0].id;
        }

        // Update the menu item
        await db.query(
            menuQueries.UPDATE_MENU_ITEM,
            [name, description, price, categoryId, is_available, id]
        );

        // Get updated item
        const result = await db.query(menuQueries.GET_MENU_ITEM_BY_ID, [id]);

        res.json(result.rows[0]);
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
        const checkItem = await db.query(menuQueries.CHECK_MENU_ITEM, [id]);

        if (checkItem.rows.length === 0) {
            return res.status(404).json({ message: `Menu item with ID ${id} not found` });
        }

        // Delete the item
        await db.query(menuQueries.DELETE_MENU_ITEM, [id]);

        res.json({ message: `Menu item with ID ${id} successfully deleted` });
    } catch (err) {
        console.error("Error deleting menu item:", err.message);
        res.status(500).json({ error: "Server error" });
    }
};