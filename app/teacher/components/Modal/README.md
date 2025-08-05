# Modal Components

This directory contains reusable modal components for the teacher management system.

## Components

### AddTeacherModal
- **File**: `AddTeacherModal.js`
- **Purpose**: Modal for adding new teachers
- **Props**:
  - `isOpen` (boolean): Controls modal visibility
  - `onClose` (function): Callback when modal is closed
  - `onSubmit` (function): Callback when form is submitted
  - `subjects` (array): List of available subjects
  - `width` (string): Modal width (default: '848px')
  - `height` (string): Modal height (default: '479px')

### ResetPasswordModal
- **File**: `ResetPasswordModal.js`
- **Purpose**: Modal for resetting teacher passwords
- **Props**:
  - `isOpen` (boolean): Controls modal visibility
  - `onClose` (function): Callback when modal is closed
  - `teachersCount` (number): Number of teachers affected
  - `width` (string): Modal width (default: '500px')
  - `height` (string): Modal height (default: '300px')

## Features

### Styling
- Exact Figma design implementation
- Responsive design
- Consistent color scheme:
  - Primary: `#103358`
  - Secondary: `#398AC8`
  - Button Primary: `#16375A`
  - Text: `#374151`

### Functionality
- Background overlay with click-to-close
- Form validation
- Checkbox styling with custom colors
- Buttons always positioned on the right side
- Proper focus management

## Testing

### Manual Testing Steps

1. **Add Teacher Modal**:
   ```bash
   # Navigate to teacher page
   cd app/teacher
   npm run dev
   # Open http://localhost:3000/teacher
   # Click "Add a Teacher" button
   ```

2. **Reset Password Modal**:
   ```bash
   # On the teacher page
   # Click "Options" dropdown
   # Click "Reset Password"
   ```

### Test Cases

#### AddTeacherModal
- [ ] Modal opens when "Add a Teacher" button is clicked
- [ ] Background overlay closes modal when clicked
- [ ] Form fields are properly labeled and styled
- [ ] Checkboxes show correct colors when checked/unchecked
- [ ] Submit button is positioned on the right
- [ ] Cancel button closes modal
- [ ] Form submission works correctly

#### ResetPasswordModal
- [ ] Modal opens when "Reset Password" is clicked
- [ ] Shows correct teacher count
- [ ] Buttons are positioned on the right
- [ ] Cancel button closes modal
- [ ] Reset Password button has correct styling

### Visual Testing
- [ ] Modal dimensions match Figma specs
- [ ] Colors match design system
- [ ] Typography is correct (Poppins font)
- [ ] Border radius is 29.98px
- [ ] Shadow matches design
- [ ] Checkbox color is `#16375A` when checked

### Responsive Testing
- [ ] Modal works on mobile devices
- [ ] Form fields stack properly on small screens
- [ ] Buttons remain accessible

## Usage Example

```jsx
import { AddTeacherModal, ResetPasswordModal } from './components/Modal';

// In your component
const [showAddModal, setShowAddModal] = useState(false);
const [showResetModal, setShowResetModal] = useState(false);

<AddTeacherModal 
    isOpen={showAddModal}
    onClose={() => setShowAddModal(false)}
    onSubmit={handleAddTeacher}
    subjects={['Maths', 'English', 'Science']}
    width="848px"
    height="479px"
/>

<ResetPasswordModal
    isOpen={showResetModal}
    onClose={() => setShowResetModal(false)}
    teachersCount={12}
    width="500px"
    height="300px"
/>
``` 