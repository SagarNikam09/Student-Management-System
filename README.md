# Student Management Dashboard

A comprehensive, production-ready React application for managing student information. This project demonstrates advanced React patterns, modern JavaScript concepts, and best practices for building scalable web applications.

## 🚀 Features

### Core Functionality
- ✅ **Add Students**: Complete form with real-time validation
- ✅ **Edit Students**: Modify existing student information
- ✅ **View Student Details**: Detailed modal view with actions
- ✅ **Delete Students**: Remove students with confirmation
- ✅ **Search & Filter**: Real-time search and status filtering
- ✅ **Responsive Design**: Mobile-first, fully responsive UI


## 🛠 Technologies Used

### Frontend
- **React 18**: Latest React with hooks and concurrent features
- **React Icons**: Beautiful icon library
- **CSS3**: Custom styling with Flexbox and Grid
- **Local Storage**: Data persistence

### Advanced Patterns
- **Async/Await**: Modern JavaScript async patterns
- **Event Loop**: setTimeout/setInterval demonstrations
- **Custom Hooks**: Reusable logic encapsulation
- **Context API**: Global state management
- **useReducer**: Complex state logic
- **Performance Optimization**: Memoization and optimization techniques

## 📋 Student Information Fields

Each student record includes:
- **Name** (required, 2-50 characters)
- **Email** (required, validated format)
- **Course** (dynamic dropdown from mockapi.io)
- **Profile Image** (URL with preview)
- **Status** (active/graduated)
- **Created Date** (automatic timestamp)

## 🎓 Available Courses (Dynamic from mockapi.io)

The application fetches courses from the mock API endpoint:
**GET https://mockapi.io/courses**

Response format:
```json
[
  { "id": 1, "name": "HTML Basics" },
  { "id": 2, "name": "CSS Mastery" },
  { "id": 3, "name": "JavaScript Pro" },
  { "id": 4, "name": "React In Depth" },
  { "id": 5, "name": "Node.js Backend" },
  { "id": 6, "name": "Database Design" },
  { "id": 7, "name": "API Development" },
  { "id": 8, "name": "DevOps Fundamentals" },
  { "id": 9, "name": "Mobile Development" },
  { "id": 10, "name": "Cloud Computing" },
  { "id": 11, "name": "Machine Learning" },
  { "id": 12, "name": "Cybersecurity" },
  { "id": 13, "name": "UI/UX Design" },
  { "id": 14, "name": "Project Management" },
  { "id": 15, "name": "Agile Development" }
]
```

## 🏗 Project Structure

```
src/
├── components/           # React components
│   ├── Header.js        # Application header with search
│   ├── StudentList.js   # Student grid display
│   ├── StudentForm.js   # Add/edit form with validation
│   ├── StudentDetail.js # Student detail modal
│   └── Stats.js         # Statistics dashboard
├── context/             # Global state management
│   └── StudentContext.js # React Context with useReducer
├── hooks/               # Custom React hooks
│   └── useCourses.js    # Courses data management
├── services/            # API services
│   └── api.js          # Mock API with async/await
├── App.js              # Main application component
├── App.css             # Application styles
├── index.js            # Application entry point
└── index.css           # Global styles
```

## 🚀 Getting Started

### Option 1: Standalone HTML Version (Recommended for Quick Start)

The easiest way to run the application:

1. **Open the HTML file**: Double-click on `index.html` in your file explorer
2. **Or open in browser**: Right-click `index.html` and select "Open with" → Choose your preferred browser

The application will work immediately without any installation required!

### Option 2: React Version (For Development)

If you want to run the React version, you'll need to install Node.js first:

#### Installing Node.js

1. **Download Node.js**: Visit [https://nodejs.org/](https://nodejs.org/)
2. **Choose LTS version**: Download the "LTS" (Long Term Support) version
3. **Install**: Run the installer and follow the setup wizard
4. **Verify installation**: Open a new terminal/command prompt and run:
   ```bash
   node --version
   npm --version
   ```

#### Running the React Application

Once Node.js is installed:

1. **Open terminal/command prompt** in the project directory
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start the development server**:
   ```bash
   npm start
   ```
4. **Open browser**: Navigate to `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `build` folder.

## 📖 Usage Guide

### Adding a Student

1. Click the "Add Student" button in the header
2. Fill in the required information:
   - **Name** (required, 2-50 characters)
   - **Email** (required, must be valid format)
   - **Course** (select from dynamic dropdown from mockapi.io)
   - **Profile Image URL** (required, with live preview)
3. Click "Add Student" to save

### Editing a Student

1. Click the edit button (pencil icon) on any student card
2. Modify the information as needed
3. Click "Update Student" to save changes

### Viewing Student Details

1. Click the "View" button on any student card
2. A modal will open showing detailed student information
3. From here you can also edit or delete the student

### Searching and Filtering

1. **Search**: Use the search bar in the header to search by name, email, or course
2. **Filter**: Use the filter buttons to show All, Active, or Graduated students
3. **Real-time**: Results update as you type

### Deleting a Student

1. Click the delete button (trash icon) on any student card
2. The student will be immediately removed from the system


### Best Practices
- **Form Validation**: Comprehensive input validation
- **Error Handling**: Proper error states and user feedback
- **Loading States**: User experience during async operations
- **Accessibility**: Semantic HTML and ARIA attributes
- **Responsive Design**: Mobile-first approach
- **Code Organization**: Clean, maintainable code structure

## 🌐 Browser Compatibility

Both versions work on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🔍 Troubleshooting

### If the HTML version doesn't work:
- Make sure you're opening it in a modern browser
- Check that the file is named `index.html`
- Try opening it with a different browser

### If the React version doesn't work:
- Make sure Node.js is properly installed
- Try running `npm install` again
- Check that you're in the correct directory
- Make sure no other application is using port 3000

## 📊 Sample Data

The application comes with three sample students to help you get started.

You can modify or delete these sample records as needed.
