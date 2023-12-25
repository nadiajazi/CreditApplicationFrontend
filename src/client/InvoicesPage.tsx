import React from 'react';
import { NavbarWithMegaMenu } from './Layout/NavList';


const InvoicesPage: React.FC = () => {
  const tableHeadings = [
    { text: 'Invoice', class: 'py-3.5 px-4 text-lg font-normal text-left rtl:text-right text-orange-500  bg-gray-100' },
    { text: 'Date', class: 'px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-orange-500 bg-gray-100' },
    { text: 'Status', class: 'px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-orange-500 bg-gray-100' },
   
    { text: 'Purchase', class: 'px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-orange-500 bg-gray-100' },
    { text: 'Actions', class: 'px-4 py-3.5 text-lg font-normal text-left rtl:text-right text-orange-500 bg-gray-100' },

  ];

  const tableData = [
    [
      { text: '#1', class: 'px-4 py-4 text-lg font-medium text-blacklight:text-orange-200 whitespace-nowrap' },
      { text: 'Jan 6, 2022', class: 'px-4 py-4 text-lg text-black light:text-orange-300 whitespace-nowrap' },
      { text: 'Cancelled', class: 'px-4 py-4 text-lg text-black- light:text-orange-300 whitespace-nowrap' },
      {text: 'foods', class:' px-4 py-4 text-lg text-black- light:text-orange-300 whitespace-nowrap'},
      { text: 'Download', class: 'px-4 py-4 text-lg text-blue-500 light:text-orange-300 whitespace-nowrap' },
      // ... (similar entries for other columns)
    ],
    [
      { text: '#2', class: 'px-4 py-4 text-lg font-medium text-blacklight:text-orange-200 whitespace-nowrap' },
      { text: 'Jan 6, 2022', class: 'px-4 py-4 text-lg text-black light:text-orange-300 whitespace-nowrap' },
      { text: 'Paid', class: 'px-4 py-4 text-lg text-black- light:text-orange-300 whitespace-nowrap' },
      {text: 'Drinks', class:' px-4 py-4 text-lg text-black- light:text-orange-300 whitespace-nowrap'},
      { text: 'Download', class: 'px-4 py-4 text-lg text-blue-500 whitespace-nowrap' },
      // ... (similar entries for other columns)
    ],
    [
      { text: '#3', class: 'px-4 py-4 text-lg font-medium text-blacklight:text-orange-200 whitespace-nowrap' },
      { text: 'june 17, 2023', class: 'px-4 py-4 text-lg text-black light:text-orange-300 whitespace-nowrap' },
      { text: 'paid', class: 'px-4 py-4 text-lg text-black- light:text-orange-300 whitespace-nowrap' },
      {text: 'foods', class:' px-4 py-4 text-lg text-black- light:text-orange-300 whitespace-nowrap'},
      { text: 'Download', class: 'px-4 py-4 text-lg text-blue-500 light:text-orange-300 whitespace-nowrap' },
  
    ],
    [
      { text: '#4', class: 'px-4 py-4 text-lg font-medium text-blacklight:text-orange-200 whitespace-nowrap' },
      { text: 'August 5, 2022', class: 'px-4 py-4 text-lg text-black light:text-orange-300 whitespace-nowrap' },
      { text: 'active', class: 'px-4 py-4 text-lg text-black- light:text-orange-300 whitespace-nowrap' },
      {text: 'Beauty', class:' px-4 py-4 text-lg text-black- light:text-orange-300 whitespace-nowrap'},
      { text: 'Download', class: 'px-4 py-4 text-lg text-blue-500 light:text-orange-300 whitespace-nowrap' },
   
    ],
    [
      { text: '#5', class: 'px-4 py-4 text-lg font-medium text-blacklight:text-orange-200 whitespace-nowrap' },
      { text: 'Jan 6, 2022', class: 'px-4 py-4 text-lg text-black light:text-orange-300 whitespace-nowrap' },
      { text: 'Cancelled', class: 'px-4 py-4 text-lg text-black- light:text-orange-300 whitespace-nowrap' },
      {text: 'foods', class:' px-4 py-4 text-lg text-black- light:text-orange-300 whitespace-nowrap'},
      { text: 'Download', class: 'px-4 py-4 text-lg text-blue-500 light:text-orange-300 whitespace-nowrap' },
  
    ],
    [
      { text: '#6', class: 'px-4 py-4 text-lg font-medium text-blacklight:text-orange-200 whitespace-nowrap' },
      { text: 'Jan 6, 2022', class: 'px-4 py-4 text-lg text-black light:text-orange-300 whitespace-nowrap' },
      { text: 'Paid', class: 'px-4 py-4 text-lg text-black- light:text-orange-300 whitespace-nowrap' },
      {text: 'Drinks', class:' px-4 py-4 text-lg text-black- light:text-orange-300 whitespace-nowrap'},
      { text: 'Download', class: 'px-4 py-4 text-lg text-blue-500 whitespace-nowrap' },
      // ... (similar entries for other columns)
    ],
    [
      { text: '#7', class: 'px-4 py-4 text-lg font-medium text-blacklight:text-orange-200 whitespace-nowrap' },
      { text: 'june 17, 2023', class: 'px-4 py-4 text-lg text-black light:text-orange-300 whitespace-nowrap' },
      { text: 'paid', class: 'px-4 py-4 text-lg text-black- light:text-orange-300 whitespace-nowrap' },
      {text: 'foods', class:' px-4 py-4 text-lg text-black- light:text-orange-300 whitespace-nowrap'},
      { text: 'Download', class: 'px-4 py-4 text-lg text-blue-500 light:text-orange-300 whitespace-nowrap' },
      
    ],
    [
      { text: '#8', class: 'px-4 py-4 text-lg font-medium text-blacklight:text-orange-200 whitespace-nowrap' },
      { text: 'August 5, 2022', class: 'px-4 py-4 text-lg text-black light:text-orange-300 whitespace-nowrap' },
      { text: 'active', class: 'px-4 py-4 text-lg text-black- light:text-orange-300 whitespace-nowrap' },
      {text: 'Beauty', class:' px-4 py-4 text-lg text-black- light:text-orange-300 whitespace-nowrap'},
      { text: 'Download', class: 'px-4 py-4 text-lg text-blue-500 light:text-orange-300 whitespace-nowrap' },
      
    ],
    
  ];

  const pagination = [
    { text: '1', class: 'px-2 py-1 text-lg text-orange-500 rounded-md light:bg-orange-800 bg-orange-100/60' },
    { text: '2', class: 'px-2 py-1 text-lg text-orange-500 rounded-md light:hover:bg-orange-800 light:text-orange-300 hover:bg-orange-100' },
   
  ];

  return (
    <div className=''>
    <NavbarWithMegaMenu></NavbarWithMegaMenu>
   
    <section className="container px-40 py-40 mx-auto">
      <div className="flex flex-col">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-orange-200 light:border-orange-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-orange-200 light:divide-orange-700">
                <thead className="bg-orange-50 light:bg-orange-800">
                  <tr>
                    {/* Table Headings */}
                    {tableHeadings.map((heading, index) => (
                      <th key={index} className={heading.class}>
                        {heading.text}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-orange-200 light:divide-orange-700 light:bg-orange-900">
                  {/* Table Data Rows */}
                  {tableData.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {row.map((item, itemIndex) => (
                        <td key={itemIndex} className={item.class}>
                          {item.text}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
          <span>previous</span>
        

        <div className="items-center hidden md:flex gap-x-3">
          {/* Pagination Numbers */}
          {pagination.map((pageNumber, pageIndex) => (
            <a key={pageIndex} href={`#${pageNumber}`} className={pageNumber.class}>
              {pageNumber.text}
            </a>
          ))}
        </div>

          <span>Next</span>
        
      </div>
    </section>
    
    </div>
    
  );
};

export default InvoicesPage;

