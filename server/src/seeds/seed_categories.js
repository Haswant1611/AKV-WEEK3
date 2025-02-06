/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // First, delete all existing entries
  await knex('categories').del();
  
  // Then insert seed entries
  await knex('categories').insert([
    {
      category_name: 'Product Designer',
      description: 'Professionals who design digital products and user experiences',
      status: 1
    },
    {
      category_name: 'Product Manager',
      description: 'Professionals who oversee product development and strategy',
      status: 1
    },
    {
      category_name: 'Frontend Developer',
      description: 'Developers specializing in client-side web development',
      status: 1
    },
    {
      category_name: 'Backend Developer',
      description: 'Developers specializing in server-side development',
      status: 1
    },
    {
      category_name: 'Full Stack Developer',
      description: 'Developers proficient in both frontend and backend development',
      status: 1
    },
    {
      category_name: 'UX Designer',
      description: 'Professionals focused on user experience design',
      status: 1
    },
    {
      category_name: 'UX Copywriter',
      description: 'Writers specializing in user experience content',
      status: 1
    },
    {
      category_name: 'UI Designer',
      description: 'Designers focused on user interface design',
      status: 1
    },
    {
      category_name: 'QA Engineer',
      description: 'Engineers specializing in quality assurance and testing',
      status: 1
    },
    {
      category_name: 'Digital Marketing Specialist',
      description: 'Professionals who plan and execute online marketing strategies',
      status: 1
    },
    {
      category_name: 'SEO Specialist',
      description: 'Professionals who optimize websites to rank higher in search engine results',
      status: 1
    },
    {
      category_name: 'Content Writer',
      description: 'Writers who produce written content for various platforms',
      status: 1
    },
    {
      category_name: 'Social Media Manager',
      description: 'Professionals who handle a company’s social media presence and engagement',
      status: 1
    },
    {
      category_name: 'Graphic Designer',
      description: 'Designers who create visual content for various media platforms',
      status: 1
    },
    {
      category_name: 'Web Designer',
      description: 'Professionals who design the layout, structure, and visual aspects of websites',
      status: 1
    },
    {
      category_name: 'Project Manager',
      description: 'Professionals who plan, initiate, and execute projects from start to finish',
      status: 1
    },
    {
      category_name: 'Business Analyst',
      description: 'Professionals who analyze business needs and translate them into technical requirements',
      status: 1
    },
    {
      category_name: 'Operations Manager',
      description: 'Professionals responsible for overseeing day-to-day operations of a business or department',
      status: 1
    },
    {
      category_name: 'Financial Analyst',
      description: 'Professionals who evaluate financial data and trends to inform business decisions',
      status: 1
    },
    {
      category_name: 'Marketing Manager',
      description: 'Professionals who develop and oversee marketing strategies for a company or product',
      status: 1
    },
    {
      category_name: 'Accountant',
      description: 'Professionals responsible for managing financial records and ensuring compliance with regulations',
      status: 1
    },
    {
      category_name: 'Legal Advisor',
      description: 'Professionals who provide legal counsel and advice to businesses or individuals',
      status: 1
    },
    {
      category_name: 'Event Coordinator',
      description: 'Professionals responsible for planning and executing events, from conferences to weddings',
      status: 1
    },
    {
      category_name: 'Public Relations Specialist',
      description: 'Professionals who manage a company’s public image and media relations',
      status: 1
    },
  ]);
};