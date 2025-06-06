import Joyride from "react-joyride";
import { useState, useRef } from "react";
import styles from "./Login.module.css";
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
    target: "#login__input-email",
    content: "Here you can write your email",
    disableBeacon: true,
  },
  {
    target: "#login__input-password",
    content: "Here you can write your password",
    disableBeacon: true,
  },
  {
    target: "#login__button",
    content: "And click here to log in",
    disableBeacon: true,
  },
];

//Componente que hace el tour en Login
function TourLogin() {
  const [run, setRun] = useState(true);
  const [tourKey, setTourKey] = useState(0); // key para que empiece desde el primer tooltip siempre que inicia el tour

  const handleJoyrideCallback = (data) => {
    const { action, type } = data;
    console.log("TourLogin:handleJoyrideCallback:action:", action);
    if (
      action === "close" ||
      action === "tooltip-close" ||
      action === "finished" ||
      action === "skip"
    ) {
      setRun(false);
      console.log("TourLogin:current:", joyrideRef.current);
    }
  };

  const joyrideRef = useRef(null);

  const startTour = () => {
    // Resetea el tour
    setRun(false);
    // Forzar al tour a empezar desde el primer tooltip
    setTourKey((prevKey) => prevKey + 1);
    // Iniciar el tour
    setTimeout(() => setRun(true), 300);
  };

  return (
    <div>
      {/* Botón que activa el tour */}
      <button onClick={startTour} className={styles.tour__button}>
        Run Tour!
      </button>

      {/* Componente React de Joyride*/}
      <Joyride
        key={tourKey}
        steps={steps}
        continuous={true}
        showProgress={true} // Muestra pagina/paginas en boton next
        disableBeacon={true} // Oculta el circulo de click
        spotlightPadding={0} // Acerca el tooltip al elemento
        run={run} // Activa el tour segun la variable de estado run
        callback={handleJoyrideCallback} // Maneja los eventos del tour
      />
    </div>
  );
}

export default TourLogin;
