'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './layout.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const menuItems = [
    { name: '📊 Dashboard', href: '/admin' },
    { name: '🏗️ Machines', href: '/admin/machines' },
    { name: '📅 Reserveringen', href: '/admin/reservations' },
    { name: '👥 Klanten', href: '/admin/customers' },
    { name: '☕ Coffee Corner', href: '/admin/coffee-corner' },
    { name: '⚙️ Instellingen', href: '/admin/settings' },
  ];

  return (
    <div className={styles.adminLayout}>
      {/* 1. Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>⚙️</span>
          <span className={styles.logoText}>HubAdmin</span>
        </div>

        <nav className={styles.nav}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.navActive : ''}`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userBadge}>
            <div className={styles.avatar}>A</div>
            <div>
              <p className={styles.userName}>Admin User</p>
              <p className={styles.userRole}>Super Admin</p>
            </div>
          </div>
          <Link href="/" className="btn btn-outline btn-sm" style={{ width: '100%', marginTop: '10px', color: 'white', borderColor: 'rgba(255,255,255,0.2)' }}>
            🏠 Terug naar Site
          </Link>
        </div>
      </aside>

      {/* 2. Main Content */}
      <div className={styles.mainWrapper}>
        <header className={styles.topbar}>
          <div className={styles.breadcrumbs}>
            <span>Admin</span> &gt; <span>{pathname.replace('/admin', '') || 'Dashboard'}</span>
          </div>
          <div className={styles.topActions}>
            <span className={styles.notificationBell}>🔔 <span className={styles.badgeCount}>3</span></span>
            <div className={styles.profile}></div>
          </div>
        </header>
        <main className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
