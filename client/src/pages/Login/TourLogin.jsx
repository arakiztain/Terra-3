import Joyride from 'react-joyride';
import { useState, useRef } from "react";

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

function TourLogin() {

  const [run, setRun] = useState(true);

  const handleJoyrideCallback = (data) => {
    const { action, type } = data;
    console.log("handleJoyrideCallback:data:",data)
    if (action === "close" || action === "tooltip-close") {
      setRun(false);
    }
    if (action === "finished" || action === "skip") {
      setRun(false);
    }
  };
  
  const joyrideRef = useRef(null);

  const startTour = () => {
    // Resetea el tour (opcional)
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
      <Joyride
        steps={steps}
        continuous={true}
        showProgress={true}
        disableBeacon={true}
        spotlightPadding={0}
        run={run}
        callback={handleJoyrideCallback}
      />
    </div>
  );
};

export default TourLogin;
