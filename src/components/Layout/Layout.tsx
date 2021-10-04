import { Fragment } from "react";

import MainNavigation from 'components/Layout/Navigation';

const Layout = ({
  children
}: LayoutProps) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{children}</main>
    </Fragment>
  );
}

export default Layout;

interface LayoutProps {
  children: React.ReactNode
}
