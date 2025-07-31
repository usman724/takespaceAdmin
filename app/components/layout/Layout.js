'use client';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({
  children,
  showSidebar = true,
  sidebarData = { subjects: [], grades: [] }
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        {showSidebar && (
          <Sidebar
            subjects={sidebarData.subjects}
            grades={sidebarData.grades}
          />
        )}
        <main 
          className="flex-1"
          style={{ 
            marginLeft: showSidebar ? '250px' : '0', // Updated to 250px
            paddingTop: '100px',
            minHeight: '100vh'
          }}
        >
          <div className="min-h-full flex flex-col">
            <div className="flex-1 p-6">
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