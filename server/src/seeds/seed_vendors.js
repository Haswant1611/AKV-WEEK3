/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('vendors').del();
  
  // Inserts seed entries
  await knex('vendors').insert([
    {
      vendor_name: 'Zepto',
      contact_name: 'Aadit Palicha',
      address: '1st Floor, Mantri Avenue, Vittal Mallya Road',
      city: 'Bangalore',
      postal_code: '560001',
      country: 'India',
      phone: '+91-9876543210',
      status: 1
    },
    {
      vendor_name: 'Blinkit',
      contact_name: 'Albinder Dhindsa',
      address: 'Plot No. 82A, Sector 18',
      city: 'Gurugram',
      postal_code: '122015',
      country: 'India',
      phone: '+91-9876543211',
      status: 1
    },
    {
      vendor_name: 'Swiggy',
      contact_name: 'Sriharsha Majety',
      address: '3rd Floor, Salarpuria Softzone, Outer Ring Road',
      city: 'Bangalore',
      postal_code: '560103',
      country: 'India',
      phone: '+91-9876543213',
      status: 1
    },
    {
      vendor_name: 'Dunzo',
      contact_name: 'Kabeer Biswas',
      address: 'Ground Floor, Wind Tunnel Road, Bangalore',
      city: 'Bangalore',
      postal_code: '560017',
      country: 'India',
      phone: '+91-9876543214',
      status: 1
    },
    {
      vendor_name: 'BigBasket',
      contact_name: 'Hari Menon',
      address: '1st Floor, Cunningham Road',
      city: 'Bangalore',
      postal_code: '560052',
      country: 'India',
      phone: '+91-9876543215',
      status: 1
    },
    {
      vendor_name: 'Amazon Fresh',
      contact_name: 'Jayaram Raghavan',
      address: '2nd Floor, Bannerghatta Road',
      city: 'Bangalore',
      postal_code: '560076',
      country: 'India',
      phone: '+91-9876543216',
      status: 1
    },
    {
      vendor_name: 'Grofers',
      contact_name: 'Arvind Singhal',
      address: '5th Floor, MG Road',
      city: 'Gurugram',
      postal_code: '122001',
      country: 'India',
      phone: '+91-9876543217',
      status: 1
    },
    {
      vendor_name: 'CureFit',
      contact_name: 'Mukesh Bansal',
      address: '1st Floor, Cubbon Park',
      city: 'Bangalore',
      postal_code: '560071',
      country: 'India',
      phone: '+91-9876543218',
      status: 1
    },
    {
      vendor_name: 'ZappFresh',
      contact_name: 'Amit Chopra',
      address: '4th Floor, Connaught Place',
      city: 'Delhi',
      postal_code: '110001',
      country: 'India',
      phone: '+91-9876543219',
      status: 1
    }
  ]);
};