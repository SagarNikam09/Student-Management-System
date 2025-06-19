# Student Management Dashboard - Setup Instructions

## Option 1: Standalone HTML Version (Recommended for Quick Start)

The easiest way to run the application is using the standalone HTML version:

1. **Open the HTML file**: Double-click on `index.html` in your file explorer
2. **Or open in browser**: Right-click `index.html` and select "Open with" → Choose your preferred browser

The application will work immediately without any installation required!

## Option 2: React Version (For Development)

If you want to run the React version, you'll need to install Node.js first:

### Installing Node.js

1. **Download Node.js**: Visit [https://nodejs.org/](https://nodejs.org/)
2. **Choose LTS version**: Download the "LTS" (Long Term Support) version
3. **Install**: Run the installer and follow the setup wizard
4. **Verify installation**: Open a new terminal/command prompt and run:
   ```bash
   node --version
   npm --version
   ```

### Running the React Application

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

## Features Available in Both Versions

- ✅ Add new students with name, email, course, and profile image
- ✅ Edit existing student information
- ✅ View detailed student information
- ✅ Delete students
- ✅ Search students by name, email, or course
- ✅ Responsive design for mobile and desktop
- ✅ Data persistence using localStorage
- ✅ Form validation
- ✅ Modern, clean UI

## Browser Compatibility

Both versions work on all modern browsers:
- Chrome (recommended)
- Firefox
- Safari
- Edge

## Sample Data

The application comes with three sample students:
- John Doe (Computer Science)
- Jane Smith (Mathematics)
- Mike Johnson (Physics)

You can modify or delete these as needed.

## Troubleshooting

### If the HTML version doesn't work:
- Make sure you're opening it in a modern browser
- Check that the file is named `index.html`
- Try opening it with a different browser

### If the React version doesn't work:
- Make sure Node.js is properly installed
- Try running `npm install` again
- Check that you're in the correct directory
- Make sure no other application is using port 3000

## File Structure

```
NavG_task/
├── index.html              # Standalone HTML version
├── package.json            # React dependencies
├── README.md              # Project documentation
├── SETUP_INSTRUCTIONS.md  # This file
└── src/                   # React source code
    ├── components/
    │   ├── Header.js
    │   ├── StudentList.js
    │   ├── StudentForm.js
    │   └── StudentDetail.js
    ├── App.js
    ├── App.css
    ├── index.js
    └── index.css
```

## Quick Start Recommendation

For immediate use, simply open `index.html` in your web browser. No installation required! 