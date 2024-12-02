import React from 'react';
import NavbarDesktop from '../../views/navbar-desktop';
import Footer from '../../views/footer';
type Props = {
  children: React.ReactNode;
};

const UserLayout: React.FC<Props> = (props) => {
  const { children } = props;

  return (
  <main className="mx-auto max-w-[1536px]">
    <NavbarDesktop/>
    {children}
    <Footer/>
    </main>);
};

export default UserLayout;
