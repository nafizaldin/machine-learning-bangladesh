'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useSnapshot } from 'valtio';
import authStore from '@/store/authStore';
import { toast } from 'react-toastify';

const AuthChecker = () => {
  const pathname = usePathname();
  const authSnap = useSnapshot(authStore);
  const router = useRouter();

  async function checkUser() {
    const [resp, err] = await authSnap.reAuthorizeWithToken();
    if (pathname.includes('admin/') && !pathname.includes('orifine-admin')) {
      if (err || !resp) {
        toast.error(err);
        router.replace('/');
        return;
      }

      if (resp && !['super_admin','admin', 'account_department', 'publisher_department'].includes(resp.role)) {
        toast.error('You are not authorized to access this page');
        router.replace('/orifine-admin');
        return;
      }
    }
  }

  useEffect(() => {
    checkUser();
  }, [pathname, authSnap.reAuthorizeWithToken]);

  return null;
};

export default AuthChecker;
