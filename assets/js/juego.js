/**
 *  2C = Two of Clubs (Tréboles)
 *  2D = Two of Diamonds (Daiamantes)
 *  2H = Two of Hearts (Corazones)
 *  2S = Two of Spades (Espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;
let puntosComputadora = 0;

// Referencias HTML
// Jugador 1
const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small'); 

console.log(btnPedir);

// Esta función crea una nueva baraja
const creadDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (esp of especiales) {
      deck.push(esp + tipo);
    }
  }
  deck = _.shuffle(deck);
  return deck;
};

creadDeck();
// Esta función permite tomar una carta
const pedirCarta = () => {
  if (deck.length === 0) {
    throw 'No hay cartas en el deck';
  }
  return deck.pop();
};

// deck = []; //para probar pedirCarta

const valorCarta = (carta) => {
  const val = carta.substring(0, carta.length - 1);
  return isNaN(val) ? (val === 'A' ? 11 : 10) : val * 1;
};

// Turno de la computadora



// Eventos
btnPedir.addEventListener('click', () => {
  const carta = pedirCarta();
  puntosJugador =  puntosJugador + valorCarta(carta);
  puntosHTML[0].innerText = puntosJugador;
  
  const imgCarta = document.createElement('img');
  imgCarta.src = `assets/cartas/${carta}.png`;
  imgCarta.classList.add('carta');
  divCartasJugador.append(imgCarta);
  
  if(puntosJugador > 21) {
    window.alert('PERDISTE XD');
    btnPedir.disabled = true; // Desactiva el botón
  } else if (puntosJugador === 21) {
    window.alert('21, geniasl!');
    btnPedir.disabled = true;
  }

});




turnoComputadora(12);
