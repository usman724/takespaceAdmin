'use client';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <main 
          className="flex-1"
          style={{ 
            paddingTop: '100px',
            minHeight: '100vh'
          }}
        >
          <div className="min-h-full flex flex-col">
            <div className="flex-1">
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