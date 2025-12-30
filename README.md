# Classic Snake Game

A modern, responsive implementation of the classic Snake game built with HTML5, CSS3, and JavaScript.

![Snake Game Screenshot](https://via.placeholder.com/800x400/00adb5/ffffff?text=Snake+Game+Screenshot)

## Features

- **Modern UI**: Beautiful gradient backgrounds, responsive design, and smooth animations
- **Game Controls**: 
  - Arrow keys or WASD for movement
  - Start, Pause, Reset buttons
  - Adjustable game speed
- **Game Features**:
  - Score tracking with local storage for high scores
  - Increasing difficulty as score increases
  - Visual feedback with glowing effects
  - Snake with gradient coloring and eyes that follow direction
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## How to Play

1. Click "Start Game" to begin
2. Use arrow keys (↑, ↓, ←, →) or WASD keys to control the snake
3. Eat the red food to grow longer and earn points
4. Avoid hitting walls or the snake's own body
5. Each food gives you 10 points
6. The game speeds up every 50 points

## Controls

- **Start Game**: Begin a new game
- **Pause/Resume**: Pause or resume the current game
- **Reset**: Reset the game to initial state
- **Faster/Slower**: Adjust game speed
- **Spacebar**: Quick pause/resume during gameplay

## Technical Details

### Game Logic
- Grid-based movement (20x20 grid)
- Collision detection for walls and self-collision
- Food generation that avoids snake positions
- Score tracking with localStorage for high scores
- Dynamic speed adjustment based on score

### Visual Features
- Canvas-based rendering with smooth animations
- Gradient snake coloring from head to tail
- Glowing effects for snake head and food
- Grid background for better visibility
- Responsive design that adapts to screen size

### Browser Compatibility
- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript and Canvas support
- Uses modern CSS features (flexbox, gradients, shadows)

## Installation

No installation required! Simply open `index.html` in your web browser.

Or deploy to any static web hosting service:
- GitHub Pages
- Netlify
- Vercel
- Any web server

## Project Structure

```
snake-game/
├── index.html          # Main HTML file
├── style.css           # Styles and responsive design
├── game.js             # Game logic and rendering
└── README.md           # This file
```

## Development

To modify or extend the game:

1. Clone the repository
2. Edit the files as needed:
   - `game.js` for game logic
   - `style.css` for styling
   - `index.html` for structure
3. Test in your browser
4. Deploy to your preferred hosting service

## Credits

- Built with vanilla JavaScript (no frameworks)
- Fonts from Google Fonts
- Icons from Font Awesome
- Color palette inspired by modern design trends

## License

This project is open source and available under the MIT License.

## Contributing

Feel free to fork the repository and submit pull requests with improvements!

---

Enjoy the game! 🐍
