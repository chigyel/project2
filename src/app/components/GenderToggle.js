import { Button, ButtonGroup } from 'react-bootstrap';

export default function GenderToggle({ sport, currentGender, setCurrentGender }) {
  return (
    <div className="btn-group gender-toggle-group" role="group" aria-label="Gender Selection">
      <Button
        type="button"
        className={`gender-toggle ${currentGender === 'mens' ? 'active btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setCurrentGender('mens')}
      >
        Men&apos;s
      </Button>
      <Button
        type="button"
        className={`gender-toggle ${currentGender === 'womens' ? 'active btn-primary' : 'btn-outline-primary'}`}
        onClick={() => setCurrentGender('womens')}
      >
        Women&apos;s
      </Button>
    </div>
  );
}