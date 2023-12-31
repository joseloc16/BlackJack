/**
 *  2C = Two of Clubs (Tréboles)
 *  2D = Two of Diamonds (Daiamantes)
 *  2H = Two of Hearts (Corazones)
 *  2S = Two of Spades (Espadas)
 */

// FUNCIÓN ANÓNIMA
const miModulo = (() => {
  'use strict'

  let deck = [];
  const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

  let puntosJugadores = [];

  // Referencias HTML
  // Jugador 1
  const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener');
  
  const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small'); 
  
  const inicializarJuego = (numJugadores = 2) => {
    
    deck = creaDeck();

    puntosJugadores = [];
    for(let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }
    
    puntosHTML.forEach(elem => elem.innerText = 0);
    divCartasJugadores.forEach(elem => elem.innerHTML = '');

    btnDetener.disabled = false;
    btnPedir.disabled = false;
  }

  // Esta función crea una nueva baraja
  const creaDeck = () => {

    deck = [];
    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }

    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }

    return _.shuffle(deck);
  };

  // Esta función permite tomar una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw 'No hay cartas en el deck';
    }
    return deck.pop();
  };

  const valorCarta = (carta) => {
    const val = carta.substring(0, carta.length - 1);
    return isNaN(val) ? (val === 'A' ? 11 : 10) : val * 1;
  };

  // Turno: 0 = primer jugador y el último será la computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] =  puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  }

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugadores[turno].append(imgCarta);
  }

  const determinarGanador = () => {
    
    const [puntosJugador, puntosComputadora] = puntosJugadores;
    
    setTimeout(() => {
      let ganador;

      if (puntosComputadora > 21 || puntosJugador === 21) {
        ganador = 'Jugador 1';
      } else if (puntosJugador > 21 || puntosComputadora === 21) {
        ganador = 'Computadora';
      } else if (puntosJugador > puntosComputadora) {
        ganador = 'Jugador 1';
      } else if (puntosJugador < puntosComputadora) {
        ganador = 'Computadora';
      } else {
        ganador = 'Nadie gana'; // Empate
      }

      window.alert('Ganador: ' + ganador);
    }, 100);
  };

  // Turno de la computadora
  const turnoComputadora = (puntosMinimos) => {

    let puntosComputadora = 0;

    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);
      
    } while(puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();
  }

  // Eventos
  btnPedir.addEventListener('click', () => {
   
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);

    crearCarta(carta, 0);

    if(puntosJugador > 21) {
      btnPedir.disabled = true;
      turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21) {
      window.alert('21, geniasl!');
      btnPedir.disabled = true;
      turnoComputadora(puntosJugador);
    }

  });

  btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugadores[0]);
  });

  return {
    nuevoJuego: inicializarJuego
  };

})();

