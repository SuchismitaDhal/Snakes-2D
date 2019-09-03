# Snakes-2D
A web based snake game using javascript
### Characteristics
1. The playground is made using HTML canvas
2. The game loop is driven by `setInterval()` and the playground gets redrawn every 150ms
3. The high score for the session is stored using HTML local storage API, `sessionStorage.setItem()`

### Setup
Download the repository to your computer and open index.html in your favourite browser

### How to play
1. Control the snake's head using arrow keys on the keyboard
2. The snake grows in size every time it eats the food
3. If the snake hits any of the walls, it returns from the opposite wall 
4. If the snake bites itself, it loses a life

:snake:
