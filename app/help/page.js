'use client';

import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import I18nProvider from '../components/providers/I18nProvider';
import '../lib/i18n';

const HelpPage = () => {
    const { t } = useTranslation();

    return (
        <I18nProvider>
            <Layout>
                <div className="p-8">
                    <header className="mb-6">
                        <h1 className="text-[22px] font-semibold text-[#103358] leading-[27px] font-['Inter']">
                            Help & Support
                        </h1>
                    </header>
                    
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="space-y-6">
                            <div>
                                <h2 className="text-lg font-medium text-[#398AC8] mb-3">Teacher Management</h2>
                                <div className="space-y-3 text-[#4E4B66]">
                                    <p><strong>Adding Teachers:</strong> Click the "Add a Teacher" button to create new teacher accounts.</p>
                                    <p><strong>Filtering:</strong> Use the Filter dropdown to view teachers by subject.</p>
                                    <p><strong>Options:</strong> Access additional actions like resetting passwords or exporting teacher lists.</p>
                                    <p><strong>Deleting:</strong> Click the trash icon next to a teacher to remove them from the system.</p>
                                </div>
                            </div>
                            
                            <div>
                                <h2 className="text-lg font-medium text-[#398AC8] mb-3">Navigation</h2>
                                <div className="space-y-3 text-[#4E4B66]">
                                    <p>Use the sidebar to navigate between different sections of the admin panel.</p>
                                    <p>Each section provides specific functionality for managing your educational platform.</p>
                                </div>
                            </div>
                            
                            <div>
                                <h2 className="text-lg font-medium text-[#398AC8] mb-3">Support</h2>
                                <div className="space-y-3 text-[#4E4B66]">
                                    <p>For additional support, please contact your system administrator.</p>
                                    <p>Technical issues should be reported through the appropriate channels.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </I18nProvider>
    );
};

export default HelpPage; 