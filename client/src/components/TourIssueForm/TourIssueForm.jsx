import Joyride from 'react-joyride';
import { useState, useRef } from "react";
import './TourIssueForm.css';
//pasos del tour para el componente Login
const issueSteps = [
  {
    target: "body",
    content: "Welcome to the project page! Issues you open will appear here",
    disableBeacon: true,
    placement: "center", // Centra el tooltip en la pantalla
    styles: {
      options: {
        arrowColor: "transparent", // Oculta la flecha
      },
    },
  },
  {
    target: "#joyRide-project",
    content: "Here you can visit your page",
    disableBeacon: true,
  },
  {
    target: "#joyRide-issue",
    content: "Here you can open a new issue",
    disableBeacon: true,
  },
  {
    target: "body",
    content: "This is the form to add issues",
    disableBeacon: true,
    placement: "center", // Centra el tooltip en la pantalla
    styles: {
      options: {
        arrowColor: "transparent", // Oculta la flecha
      },
    },
  },
  {
    target: "#tourButton",
    content: "Hit the button here to get an explanation of the form fields",
    disableBeacon: true,
  },
];

const formSteps = [
    {
    target: "body",
    content: "Welcome to the issue page! Here you can send issues!",
    disableBeacon: true,
    placement: "center", // Centra el tooltip en la pantalla
    styles: {
      options: {
        arrowColor: "transparent", // Oculta la flecha
      },
    },
  },
  {
    target: "#name",
    content: "Here you can name your issue",
    disableBeacon: true,
  },
  {
    target: "#requestType",
    content: "Use this field to explain what kind of problem you are finding. Copy revisions are for text, New item for additions, design issues and requested changes are self-explanatory, while bugfixes are for technical problems!",
    disableBeacon: true,
  },
  {
    target: "#browser",
    content: "This field is for the browser you are finding the problem with",
    disableBeacon: true,
  },
  {
    target: "#device",
    content: "This field is for the device you are finding the problem with",
    disableBeacon: true,
  },
  {
    target: "#description",
    content: "The request body! Tell us as much as you can about what you want.",
    disableBeacon: true,
  },
    {
    target: "#pageUrl",
    content: "Here you can point us to the specific URL you want to deal with",
    disableBeacon: true,
  },
  {
    target: "#screenshot",
    content: "And even add a screenshot of the problem!",
    disableBeacon: true,
  },
  {
    target: "#buttonContainer1",
    content: "Finally, send the issues with these two buttons, the first one will return you to the issues page,",
    disableBeacon: true,
  },
  {
    target: "#buttonContainer2",
    content: "While the second one will clear the form to send another issue.",
    disableBeacon: true,
  },
  {
    target: "body",
    content: "Thanks for your attention! Click the button again anytime to get an explanation of the form fields",
    disableBeacon: true,
    placement: "center", // Centra el tooltip en la pantalla
    styles: {
      options: {
        arrowColor: "transparent", // Oculta la flecha
      },
    },
  },
]
const tourFork = () =>{
  if(document.querySelector('#lettering')==null){
    // I'm in the issue side of things
    return issueSteps;
  }else{
    // I'm in the form side of things
    return formSteps;
  }
}

//Componente que hace el tour en Login
function TourIssueForm() {
  const [steps, setSteps] = useState([])
  const [run, setRun] = useState(false);

  const handleJoyrideCallback = (data) => {
    const { index, type, action } = data;
    if (action === "close" || action === "tooltip-close") {
      setRun(false);
    }
    if (action === "finished" || action === "skip") {
      setRun(false);
    }
    if (type === "step:after" && document.querySelector('#lettering')==null) {
      if (index === 2) {
        document.querySelector("#joyRide-issue")?.click();
      }
    }
  };
  
  const joyrideRef = useRef(null);

  const startTour = () => {
    // Resetea el tour 
    joyrideRef.current?.reset();
    // Inicia el tour cambiando run a true
    setSteps(tourFork());
    setRun(false);
    setTimeout(() => setRun(true), 100);
  };

  return (
    <>
      {/* Botón que activa el tour */}
      <div onClick={startTour} id="tourButton" className="tour__button">
        ?
      </div>

      {/* Componente React de Joyride*/}
      <Joyride
        steps={steps}
        continuous={true}
        showProgress={true}
        disableBeacon={true} // Oculta el circulo de click 
        spotlightPadding={0} // Acerca el tooltip al elemento 
        run={run} // Activa el tour segun la variable de estado run
        callback={handleJoyrideCallback} // Maneja los eventos del tour
        styles={{
          buttonNext: {
            backgroundColor: '#0F0F0F',
            color: 'white',
          },
          buttonBack: {
            color: '#0F0F0F',
          },
          buttonClose: {
            color: '#0F0F0F',
          },
        }}
      />
    </>
  );
};

export default TourIssueForm;
