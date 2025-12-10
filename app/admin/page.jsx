import React from 'react';
import { getCurrentUser, requireRole } from '../../lib/auth';

const AdminHome = async () => {
  const user = await getCurrentUser();
  const { allowed } = requireRole(user, ['admin']);

  if (!allowed) {
    return <p>You must be an admin to access this page.</p>;
  }

  return (
    <div>
      <p>Welcome, {user.name || user.email} (admin).</p>
      <p>Use the navigation above to manage products, users, and messages.</p>
    </div>
  );
};

export default AdminHome;
