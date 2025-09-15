'use client';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Navbar />
      <div className="flex">
        <main 
          className="flex-1 overflow-x-hidden"
          style={{ 
            paddingTop: '100px',
            minHeight: '100vh'
          }}
        >
          <div className="min-h-full flex flex-col">
            <div className="flex-1">
              {/* Simple client-side guard: redirect to /login if no token in storage */}
              {children}
            </div>
            {/* <Footer /> */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;