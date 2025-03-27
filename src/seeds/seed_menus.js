/**
 * Seeds the database with initial menu data.
 * 
 * @param { import("knex").Knex } knex - The Knex database instance.
 * @returns { Promise<void> } A promise that resolves when the seeding is complete.
 */
exports.seed = async function (knex) {
  try {
    // Start a transaction to ensure data consistency
    await knex.transaction(async (trx) => {
      // Deletes all existing entries in the table
      await trx('menus').del();

      // Inserts initial menu data into the table
      const initialMenuData = [
        {
          name: 'Nasi Goreng',
          price: 15000,
          description: 'Nasi goreng dengan lauk ayam dan sayuran',
          menu_type: 'Meals',
          status: 'available',
        },
        {
          name: 'Sate Ayam',
          price: 20000,
          description: 'Sate ayam dengan saus kacang dan kecap',
          menu_type: 'Meals',
          status: 'available',
        },
        {
          name: 'Es Teh',
          price: 5000,
          description: 'Es teh manis dengan gula aren',
          menu_type: 'Drinks',
          status: 'available',
        },
        {
          name: 'Kue Putu',
          price: 10000,
          description: 'Kue putu dengan gula merah dan santan',
          menu_type: 'Snacks',
          status: 'available',
        },
        {
          name: 'Soto Betawi',
          price: 25000,
          description: 'Soto betawi dengan daging sapi dan santan',
          menu_type: 'Meals',
          status: 'unavailable',
        },
      ];

      await trx('menus').insert(initialMenuData);
    });
  } catch (error) {
    // Log the error and rethrow it to propagate the error up the call stack
    console.error('Error seeding menu data:', error);
    throw error;
  }
};