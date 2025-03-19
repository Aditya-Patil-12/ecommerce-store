import React from 'react'
import { Link } from 'react-router';
const AdminHomePage = () => {
  return (
    <div>
      <h1>Welcome Admin</h1>
      <Link
        to="/admin/products"
        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 cursor-pointer"
      >
        Products
      </Link>
    </div>
  );
}

export default AdminHomePage
