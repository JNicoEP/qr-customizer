interface StepSelectorProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

const steps = [
  { num: 1, label: 'Tipo', sub: 'Elige el contenido' },
  { num: 2, label: 'Contenido', sub: 'Ingresa los datos' },
  { num: 3, label: 'Diseño', sub: 'Personaliza tu QR' },
  { num: 4, label: 'Descargar', sub: 'Exporta tu QR' },
];

export default function StepSelector({ currentStep, onStepChange }: StepSelectorProps) {
  return (
    <nav className="step-nav">
      {steps.map((step) => (
        <button
          key={step.num}
          className={`step-nav__item ${currentStep === step.num ? 'step-nav__item--active' : ''}`}
          onClick={() => onStepChange(step.num)}
        >
          <span className="step-nav__number">{step.num}</span>
          <span className="step-nav__label">
            {step.label}
            <span className="step-nav__label-sub">{step.sub}</span>
          </span>
        </button>
      ))}
    </nav>
  );
}
