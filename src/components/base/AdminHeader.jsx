'use client';
import authStore from '@/store/authStore';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useSnapshot } from 'valtio';

const AdminHeader = () => {
    const [visible, setVisible] = useState(false);
    const userSnap = useSnapshot(authStore);
    const pathname = usePathname();

    useEffect(() => {
        const role = userSnap?.user?.role || "user";
        const inAdminRoute = pathname.startsWith('/admin');

        if (role !== "user" && !inAdminRoute) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [userSnap.user, pathname]);
    

  return (
    <div className={`admin-head-nav ${visible ? 'show' : ''}`} aria-label="Breadcrumb" role="navigation">
        <div className="left">
            <h1>ML Bangladesh</h1>
        </div>
        <ul className="right">
            <li>
                <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
                <button onClick={() => {authStore.logout(); window && (window.location.href = "/");}}>
                    Logout
                </button>
            </li>
        </ul>
    </div>
  )
}

export default AdminHeader