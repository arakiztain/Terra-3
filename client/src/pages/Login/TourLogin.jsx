import Joyride from 'react-joyride';
import { useState, useRef } from "react";

//pasos del tour para el componente Login
const steps = [
  {
    target: "body",
    content: "Welcome to the login page",
    disableBeacon: true,
    placement: "center", // Centra el tooltip en la pantalla
    styles: {
      options: {
        arrowColor: "transparent", // Oculta la flecha
      },
    },
  },
  {
    // title: "",
    target: ".login__input-email",
    content: "Here you can write your email",
    disableBeacon: true,
  },
  {
    target: ".login__input-password",
    content: "Here you can write your password",
    disableBeacon: true,
  },
  {
    target: ".login__button",
    content: "And click here to log in",
    disableBeacon: true,
  },
];

//Componente que hace el tour en Login
function TourLogin() {

  const [run, setRun] = useState(true);

  const handleJoyrideCallback = (data) => {
    const { action, type } = data;
    if (action === "close" || action === "tooltip-close") {
      setRun(false);
    }
    if (action === "finished" || action === "skip") {
      setRun(false);
    }
  };
  
  const joyrideRef = useRef(null);

  const startTour = () => {
    // Resetea el tour 
    joyrideRef.current?.reset();
    // Inicia el tour cambiando run a true
    setRun(false);
    setTimeout(() => setRun(true), 100);
  };

  return (
    <div>
      {/* Botón que activa el tour */}
      <button onClick={startTour} className="tour__button">
        Run Tour
      </button>

      {/* Componente React de Joyride*/}
      <Joyride
        steps={steps}
        continuous={true}
        showProgress={true}
        disableBeacon={true} // Oculta el circulo de click 
        spotlightPadding={0} // Acerca el tooltip al elemento 
        run={run} // Activa el tour segun la variable de estado run
        callback={handleJoyrideCallback} // Maneja los eventos del tour
      />
    </div>
  );
};

export default TourLogin;
