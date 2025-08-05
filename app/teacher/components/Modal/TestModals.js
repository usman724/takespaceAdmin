'use client';

import { useState } from 'react';
import { AddTeacherModal, ResetPasswordModal } from './index';

const TestModals = () => {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);
    const [submittedData, setSubmittedData] = useState(null);

    const handleAddTeacher = (data) => {
        console.log('Teacher data submitted:', data);
        setSubmittedData(data);
        setShowAddModal(false);
    };

    const handleResetPassword = () => {
        console.log('Password reset initiated');
        setShowResetModal(false);
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Modal Testing Component</h1>
            
            <div className="space-y-4">
                <button 
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Test Add Teacher Modal
                </button>
                
                <button 
                    onClick={() => setShowResetModal(true)}
                    className="px-4 py-2 bg-red-500 text-white rounded ml-4"
                >
                    Test Reset Password Modal
                </button>
            </div>

            {submittedData && (
                <div className="mt-6 p-4 bg-green-100 rounded">
                    <h3 className="font-bold">Submitted Data:</h3>
                    <pre className="mt-2">{JSON.stringify(submittedData, null, 2)}</pre>
                </div>
            )}

            <AddTeacherModal 
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={handleAddTeacher}
                subjects={['Maths', 'English Language', 'Science', 'Geography', 'History']}
                width="848px"
                height="479px"
            />

            <ResetPasswordModal
                isOpen={showResetModal}
                onClose={() => setShowResetModal(false)}
                teachersCount={15}
                width="500px"
                height="300px"
            />
        </div>
    );
};

export default TestModals; 