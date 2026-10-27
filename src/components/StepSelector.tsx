interface StepSelectorProps {
  currentStep: number;
  onStepChange: (step: number) => void;
}

const steps = [
  { num: 1, label: 'Tipo', sub: 'Elige el formato', icon: '📋' },
  { num: 2, label: 'Contenido', sub: 'Ingresa los datos', icon: '✏️' },
  { num: 3, label: 'Diseño', sub: 'Personaliza todo', icon: '🎨' },
  { num: 4, label: 'Descargar', sub: 'Exporta tu QR', icon: '📥' },
];

export default function StepSelector({ currentStep, onStepChange }: StepSelectorProps) {
  return (
    <div className="step-nav-wrapper">
      {/* Mobile step status banner */}
      <div className="step-nav-mobile-status">
        <span className="step-nav-mobile-tag">PASO {currentStep} DE 4</span>
        <span className="step-nav-mobile-name">
          {steps[currentStep - 1]?.icon} {steps[currentStep - 1]?.label}
        </span>
      </div>

      <nav className="step-nav" aria-label="Pasos de creación">
        {steps.map((step) => (
          <button
            key={step.num}
            type="button"
            className={`step-nav__item ${currentStep === step.num ? 'step-nav__item--active' : ''} ${
              step.num < currentStep ? 'step-nav__item--completed' : ''
            }`}
            onClick={() => onStepChange(step.num)}
          >
            <span className="step-nav__number">
              {step.num < currentStep ? '✓' : step.num}
            </span>
            <span className="step-nav__label">
              <span className="step-nav__label-main">{step.label}</span>
              <span className="step-nav__label-sub">{step.sub}</span>
            </span>
          </button>
        ))}
      </nav>
    </div>
  );
}
