// Query constants untuk penggunaan di controllers

const menuQueries = {
    GET_ALL_MENU_ITEMS: `
        SELECT *
        FROM menu m
    `,

    GET_MENU_ITEMS_BY_TYPE: `
        SELECT m.id, m.name, m.description, m.price,  
                m.type 
        FROM menu m
        WHERE m.type = $1
        ORDER BY m.id ASC
    `,

    GET_MENU_ITEM_BY_ID: `
        SELECT m.id, m.name, m.description, m.price, 
                m.type
        FROM menu m
        WHERE m.id = $1
    `,

    CREATE_MENU_ITEM: `
        INSERT INTO menu (name, description, price, type)
        VALUES ($1, $2, $3, $4)
        RETURNING *
    `,

    CHECK_MENU_ITEM: `
        SELECT * FROM menu WHERE id = $1
    `,


    UPDATE_MENU_ITEM: `
        UPDATE menu 
        SET name = COALESCE($1, name),
            description = COALESCE($2, description),
            price = COALESCE($3, price),
            type = COALESCE($4, type),
        WHERE id = $5
    `,

    DELETE_MENU_ITEM: `
        DELETE FROM menu WHERE id = $1
    `
};

module.exports = {
    menuQueries,
};