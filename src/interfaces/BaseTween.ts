export default interface BaseTween {
  [x: string]: string | number | this | (() => void);
  duration: number;
  onStart: () => void;
  onComplete: () => void;
}
