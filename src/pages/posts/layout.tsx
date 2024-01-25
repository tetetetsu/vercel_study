const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h1>posts</h1>
      {children}
    </div>
  );
};

export default Layout;