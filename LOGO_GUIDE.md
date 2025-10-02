# UniNest Logo Integration Guide

## 📸 How to Use Your Custom Logo

Your UniNest logo has been integrated into the website! Here's what you need to know:

### Current Setup
- The logo is displayed in the header section alongside the UniNest text
- It includes hover animations and interactive effects
- Responsive design ensures it looks great on all devices

### To Use Your Actual Logo Image:

#### Option 1: Save your logo image
1. Save your logo image as `logo.png` in the `/assets/images/` folder
2. Update the `src` attribute in `index.html` from the current placeholder to:
   ```html
   <img src="assets/images/logo.png" alt="UniNest Logo" class="logo-image" id="uniNestLogo">
   ```

#### Option 2: Use the SVG version (Current)
The website currently uses a custom SVG version that matches your logo design:
- Green circular background with gradient
- "UN" letters prominently displayed
- University-themed icons (book, graduation cap, wifi)
- Professional and clean design

### Logo Features:
- ✅ Hover animations (scale and rotation effects)
- ✅ Click interactions (360° rotation)
- ✅ Responsive design (scales down on mobile)
- ✅ Smooth loading animation
- ✅ Professional backdrop blur effect

### Customization Options:
If you want to modify the logo appearance, you can:
1. **Change colors**: Modify the gradient colors in the `loadUniNestLogo()` function
2. **Adjust size**: Update the width/height in CSS `.logo-image` class
3. **Add effects**: Modify animations in the JavaScript file

### File Locations:
- **HTML**: Logo structure in `index.html` (header section)
- **CSS**: Logo styling in `styles.css` (`.logo-image` class)
- **JavaScript**: Logo loading and animations in `script.js` (`loadUniNestLogo()` function)

The logo is now seamlessly integrated into your UniNest retrospective website! 🎓