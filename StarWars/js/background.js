// haalt de id voor starfield uit de html
const starfield = document.getElementById("starfield");
const stars = [];
// aantal sterren
const numStars = 4000;

// loop voor de sterren
for (let i = 0; i < numStars; i++) {
  // maak een star element
  const star = document.createElement("div");
  // zet de star class naam voor styling in css
  randomNumber = Math.random();
  console.log(randomNumber);
  star.className = "star";
  // start posities voor de sterrren
  star.style.position = "absolute";
  star.style.width = "2px";
  star.style.height = "2px";

  if (randomNumber <= 0.25) {
    star.style.backgroundColor = "yellow";
  } else if (randomNumber > 0.3 && randomNumber < 0.4) {
    star.style.backgroundColor = "red";
  } else {
    star.style.backgroundColor = "white";
  }

  star.style.borderRadius = "50%";
  star.style.opacity = Math.random();
  // zet de star class aan  de starfield class vast
  starfield.appendChild(star);
  // voegt de sterren toe aan de stars array op regel 3.
  stars.push({
    element: star,
    x: Math.random() * window.innerWidth - window.innerWidth / 2,
    y: Math.random() * window.innerHeight - window.innerHeight / 2,
    z: Math.random() * window.innerWidth,
  });
}

function animateStars() {
  // loopt over elke ster heen
  stars.forEach((star) => {
    // laat de ster richting te gebruiken bewegen
    star.z -= 1;
    // resets de sterren locatie om als het te dichtbij komt
    if (star.z <= 0) {
      star.z = window.innerWidth;
      star.x = Math.random() * window.innerWidth - window.innerWidth / 2;
      star.y = Math.random() * window.innerHeight - window.innerHeight / 2;
    }

    // x / star.z doen we zodat het lijkt dat de star sneller en sneller gaat hoe dichter bij het komt
    const starSpeed = 150.0 / star.z;
    // berekent de x en y position van de sterren
    const px = star.x * starSpeed + window.innerWidth / 2;
    const py = star.y * starSpeed + window.innerHeight / 2;

    // als de gegeven posistion binnen in de viewport zit, update de ster position en groten
    if (
      px >= 0 &&
      px <= window.innerWidth &&
      py >= 0 &&
      py <= window.innerHeight
    ) {
      star.element.style.left = px + "px";
      star.element.style.top = py + "px";
      const size = (1 - star.z / window.innerWidth) * 2.5; // Bewerkt de ster groten gebaseerd op diepte
      star.element.style.width = size + "px";
      star.element.style.height = size + "px";
    } else {
      // haalt de ster uit het zicht
      star.element.style.left = "-9999px";
    }
  });

  // vraagt de volgende frame aan van de animatie
  requestAnimationFrame(animateStars);
}

// Start the animation
animateStars();

// wacht totdat de groten van het scherm word aangepast en zet dan de x, y en z opnieuw
window.addEventListener("resize", () => {
  stars.forEach((star) => {
    star.x = Math.random() * window.innerWidth - window.innerWidth / 2;
    star.y = Math.random() * window.innerHeight - window.innerHeight / 2;
    star.z = Math.random() * window.innerWidth;
  });
});
