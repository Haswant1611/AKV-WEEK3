const { faker } = require('@faker-js/faker');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Clear the table to avoid conflicts
  await knex('products').del();

  // Fetch category IDs to ensure valid foreign key references
  const categories = await knex('categories').select('category_id');
  const categoryIds = categories.map((category) => category.category_id);

  if (categoryIds.length === 0) {
    console.error('No categories found. Please populate the categories table first.');
    return;
  }

  // Generate 1000 fake products
  const fakeProducts = Array.from({ length: 1000 }, () => ({
    product_name: faker.commerce.productName(),
    category_id: faker.helpers.arrayElement(categoryIds),
    quantity_in_stock: faker.number.int({ min: 10, max: 100 }),
    unit_price: parseFloat(faker.commerce.price(1, 100, 2)),
    product_image: faker.image.url(), // Correct function
    status: faker.number.int({ min: 0, max: 2 }),
    created_at: knex.fn.now(),
    updated_at: knex.fn.now(),
  }));

  // Insert the fake products
  await knex('products').insert(fakeProducts);
};
