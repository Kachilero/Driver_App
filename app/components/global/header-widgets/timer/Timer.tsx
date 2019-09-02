/**
 * A 'simple' timer that resides in the header
 *
 * @exports Class Timer
 *
 * Doesn't interact with any other components
 *
 * **TYPES**
 * @type sec string
 * @type min string
 * @type hour string
 * @type timer number
 * @type value string
 * @type showMenu boolean
 * @type timerDirection string
 * @type timerIsPaused boolean
 * @type timerIsRunning boolean
 * @type properTime: boolean
 * @type numberMask (rawValue: string) -> string[] private
 * @type mSecondsRemaining number private
 * @type timerTarget number private
 * @type intervalHandler NodeJS.Timer private
 * For above we need to use the 'global.setInterval' to get the correct setInterval type see
 * @link http://evanshortiss.com/development/nodejs/typescript/2016/11/16/timers-in-typescript.html
 * @type numberInput HTMLInputElement
 *
 * @function handleToggle(isOpen: boolean, event: React.SyntheticEvent<Dropdown>, metadata: any): void
 *  overrides the default dropdown behaviour when clicking
 *  on the input element
 * @function changeHandler(val: React.ChangeEvent<HTMLInputElement): void
 *  removes any non-digit characters and sets the timer state
 * @function tick(direction: string): void
 *  calls either countDown or countUp
 *  depending on the direction value, then converts the mSecondsRemaining to
 *  a string and sets the values for each part of the timer state
 * @function startTimer(direction: string): void
 *  First checks if there is a valid timer, then converts it to a string and
 *  sets the state. If 'direction' is up, it sets timerTarget and zero's out
 *  the mSecondsRemaining variable. Then we set the state of showMenu and
 *  timerIsRunning so we can handle those changes in other areas and finally
 *  calls the intervalHandler function with tick()
 * @function cutTime(time: number): TimeObject
 *  takes the time and returns an object with the time parts
 *  @return Object: TimeObject
 * @convertToProperTime(passedTime: number): number
 *  takes the timer that the user inputs and converts it to properly formatted
 *  time -> ie minutes and seconds do not exceed 60
 *  @return passingTime: number
 * @function sixties(timeNumber: TimeObject): TimeObject
 *  Takes a time object and makes sure seconds and minutes are 60
 *  @return TimeObject
 * @function handleTimeConversion(passedTime: number): StringTimeObject
 *  Takes a numeric time value and converts it to an object with
 *  strings for the time parts
 *  @return StringTimeObject
 * @function countDown: void
 *  Subtracts 1 from mSecondsRemaining and
 *  handles the stop condition for the setInterval of intervalHandler
 * @function countUp: void
 *  Adds 2 to mSecondsRemaining and
 *  handles the stop condition for the setInterval of intervalHandler
 * @function resetTimer: void
 *  Handles resetting ( or zeroing out ) all of the state variables and
 *  makes sure the setInterval is terminated.
 */
import * as React from 'react';
import { Button, ButtonToolbar, Dropdown } from 'react-bootstrap';
import MaskedInput from 'react-text-mask';
import createTimerMask from '../../../../utils/createTimerMask';
import Pipe from '../../../utility/pipe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPause,
  faStopwatch,
  faUndo
} from '@fortawesome/free-solid-svg-icons';

interface TimeObject {
  sec: number;
  min: number;
  hour: number;
}

interface StringTimeObject {
  sec: string;
  min: string;
  hour: string;
}

interface timerState {
  sec: string;
  min: string;
  hour: string;
  timer: number;
  value: string;
  showMenu: boolean;
  timerDirection: string;
  timerIsPaused: boolean;
  timerIsRunning: boolean;
  properTime: boolean;
}
interface timerProps {}

class Timer extends React.Component<timerProps, timerState> {
  state: timerState;
  private numberMask: (rawValue: string) => string[];
  private mSecondsRemaining: number;
  private timerTarget: number;
  private intervalHandler: NodeJS.Timer;
  private numberInput: HTMLInputElement;

  constructor(props: timerProps) {
    super(props);
    this.state = {
      sec: '00',
      min: '00',
      hour: '00',
      timer: 0,
      value: '',
      showMenu: false,
      timerDirection: '',
      timerIsPaused: false,
      timerIsRunning: false,
      properTime: false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);
    this.beep = this.beep.bind(this);
    this.mSecondsRemaining = 0;
    this.timerTarget = 0;
    this.intervalHandler;
    this.numberMask = createTimerMask();
  }

  // Make sure we start from a clear state
  componentWillMount(): void {
    clearInterval(this.intervalHandler);
  }
  // Override the default menu behaviour so it doesn't close when the input is clicked
  handleToggle(
    isOpen: boolean,
    event: React.SyntheticEvent<Dropdown>,
    metadata: { source: 'select' | 'click' | 'rootClose' | 'keydown' }
  ): void {
    if (isOpen || metadata.source !== 'select') {
      this.setState({ showMenu: isOpen });
    }
    event.persist;
    /**
     * This is fragging hacky, but I have to set a time out to wait
     * for the rudy element to display before it can be focused
     * */
    setTimeout(() => {
      document.getElementById('masked-input').focus();
    }, 20);
  }
  // Sets timer value
  changeHandler(val: React.ChangeEvent<HTMLInputElement>): void {
    let stringVal = val.target.value;
    stringVal = stringVal.replace(/\D+/g, '');
    // if (stringVal.length > 6) {
    //   stringVal = stringVal.substring(0, 6);
    // }
    this.setState({ timer: Number(stringVal) });
  }
  // Handles the timer
  tick(direction: string): void {
    // going up or down
    if (direction === 'down') {
      this.countDown();
    } else {
      this.countUp();
    }
    const stringTime = this.handleTimeConversion(this.mSecondsRemaining);
    this.setState({
      sec: stringTime.sec,
      min: stringTime.min,
      hour: stringTime.hour
    });
  }
  // Starts timer
  startTimer(direction: string): void {
    // get the timer
    let timer = this.state.timer;
    // If no timer set, return
    if (timer === 0) return;
    // convert to proper time, but only the first time
    if (!this.state.properTime) {
      const tempProperTime = this.convertToProperTime(timer);
      timer = tempProperTime;
      this.setState({
        timer: tempProperTime
      });
    }
    // Convert timer to string
    const stringTime = this.handleTimeConversion(timer);
    // Reverse direction for a count up
    if (direction === 'up' && this.timerTarget === 0) {
      this.timerTarget = this.mSecondsRemaining;
      this.mSecondsRemaining = 0;
    }
    // Close the dropdown, and disable the buttons
    this.setState({
      sec: stringTime.sec,
      min: stringTime.min,
      hour: stringTime.hour,
      timerDirection: direction,
      showMenu: false,
      timerIsRunning: true,
      properTime: true
    });
    // Finally we call the tick function
    this.intervalHandler = global.setInterval(() => this.tick(direction), 1000);
  }
  // cut Time into parts - returns Number Object
  cutTime(time: number): TimeObject {
    let timeSec: number, timeMin: number, timeHour: number;
    let minString: string;
    const timeStringLength = time.toString().length;
    timeSec = Number(time.toString().substring(timeStringLength - 2));
    minString = time.toString().substring(timeStringLength - 4);
    timeMin = Number(
      minString.replace(time.toString().substring(timeStringLength - 2), '')
    );
    timeHour = Number(
      time
        .toString()
        .replace(time.toString().substring(timeStringLength - 4), '')
    );
    // Now we return the parts
    return {
      sec: timeSec,
      min: timeMin,
      hour: timeHour
    };
  }
  // Handles having values larger than 60 in timer
  // Sets mSecondsRemaining
  convertToProperTime(passedTime: number): number {
    let timer = this.cutTime(passedTime);
    timer = this.sixties(timer);
    let timerSec = timer.sec;
    let timerMin = timer.min;
    let timerHour = timer.hour;

    // Now we make timer equal the new amount in seconds
    const tempHour = timerHour * 60 * 60 * 1000;
    const tempMin = timerMin * 60 * 1000;
    const tempSec = timerSec * 1000;
    const passingTime = Math.floor((tempHour + tempMin + tempSec) / 1000);
    this.mSecondsRemaining = passingTime;
    return passingTime;
  }
  // Adjust numeric time to be rounded to 60's
  sixties(timeNumber: TimeObject): TimeObject {
    let sec = timeNumber.sec;
    let min = timeNumber.min;
    let hour = timeNumber.hour;

    // If more than 60 seconds we add them to minutes
    if (sec > 60) {
      sec = sec % 60;
      min++;
    }
    // If more than 60 minutes we add them to hours
    if (min > 60) {
      min = min % 60;
      hour++;
    }
    // return an adjusted Object
    return {
      sec: sec,
      min: min,
      hour: hour
    };
  }
  // converts numbers to strings
  handleTimeConversion(passedTime: number): StringTimeObject {
    // lets not mutate the passedTime
    let tTime = passedTime - Math.floor(passedTime / 3600) * 3600;
    const timerMin = Math.floor(tTime / 60);
    const timerSec = tTime - timerMin * 60;
    const timerHour = Math.floor(passedTime / 3600);
    // timer strings
    let tSecString: string, tMinString: string, tHourString: string;
    // First we'll make sure our parts look nice and are strings
    tSecString =
      timerSec < 10 ? '0' + timerSec.toString() : timerSec.toString();
    tMinString =
      timerMin < 10 ? '0' + timerMin.toString() : timerMin.toString();
    tHourString =
      timerHour < 10 ? '0' + timerHour.toString() : timerHour.toString();
    return {
      sec: tSecString,
      min: tMinString,
      hour: tHourString
    };
  }
  // handles counting and stop condition
  countDown(): void {
    this.mSecondsRemaining = this.mSecondsRemaining - 1;
    if (this.mSecondsRemaining === 0) {
      clearInterval(this.intervalHandler);
      this.setState({
        timerIsRunning: false,
        properTime: false
      });
      this.beep('end');
    }
  }
  // handles counting and stop condition
  countUp(): void {
    this.mSecondsRemaining = this.mSecondsRemaining + 1;
    if (this.mSecondsRemaining === this.timerTarget) {
      clearInterval(this.intervalHandler);
      this.timerTarget = 0;
      this.setState({
        timerIsRunning: false,
        properTime: false
      });
      this.beep('end');
    }
  }
  // pause the timer
  pauseTimer(): void {
    if (!this.state.timerIsPaused) {
      clearInterval(this.intervalHandler);
      this.setState({
        timerIsPaused: true,
        timer: this.mSecondsRemaining
      });
    } else {
      this.setState({ timerIsPaused: false });
      this.startTimer(this.state.timerDirection);
    }
    this.beep('pause');
  }
  // BEEP BEEP b*tch
  beep(when: string): void {
    // shell.beep();
    const endSrc = '../app/constants/sounds/double_bell.mp3';
    const pauseSrc = '../app/constants/sounds/pop.mp3';
    let audio;
    if (when === 'end') {
      audio = new Audio(endSrc);
    } else if (when === 'pause') {
      audio = new Audio(pauseSrc);
    }
    audio.play();
  }
  // Reset all the things
  resetTimer(): void {
    clearInterval(this.intervalHandler);
    // Since the input passes through masked input, we need to call
    // numberInput.inputElement.value to reset the value
    // this.numberInput.value = '';
    (document.getElementById('masked-input') as HTMLInputElement).value = '';
    this.setState({
      sec: '00',
      min: '00',
      hour: '00',
      timer: 0,
      value: '',
      timerIsRunning: false,
      properTime: false
    });
  }

  render() {
    const { sec, min, hour, showMenu, timerIsRunning } = this.state;
    const timerTitle = hour + ':' + min + ':' + sec;

    return (
      <div id="timer-group" className="no-spin-buttons">
        <Pipe>
          <FontAwesomeIcon icon={faStopwatch} />
        </Pipe>
        <Dropdown show={showMenu} onToggle={this.handleToggle}>
          <Dropdown.Toggle
            id="timer-button"
            className="d-inline-block"
            variant="outline-info"
          >
            {timerTitle}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Header>Timer</Dropdown.Header>
            <div id="timer-input-group">
              <MaskedInput
                mask={this.numberMask}
                id="masked-input"
                className="masked-input"
                placeholder="HH:MM:SS"
                onChange={this.changeHandler}
                onKeyPress={event => {
                  if (event.key === 'Enter') {
                    this.startTimer('down');
                  }
                }}
                ref={this.numberInput}
              />
              <Button
                id="stopwatch-start"
                variant="outline-primary"
                onClick={() => this.startTimer('down')}
                disabled={timerIsRunning}
              >
                <FontAwesomeIcon icon={faStopwatch} />
              </Button>
            </div>
            <Dropdown.Item>
              <ButtonToolbar>
                <Button
                  variant="outline-primary"
                  onClick={() => this.startTimer('up')}
                  disabled={timerIsRunning}
                >
                  Up
                </Button>
                <Button
                  variant="outline-danger"
                  size="lg"
                  onClick={this.resetTimer}
                  block
                >
                  <FontAwesomeIcon icon={faUndo} />
                </Button>
              </ButtonToolbar>
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item href="#">Create/Edit Custom Timers</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        {timerIsRunning && (
          <div id="timer-controls">
            <Button variant="outline-light" onClick={this.pauseTimer}>
              <FontAwesomeIcon icon={faPause} />
            </Button>
            <Button variant="outline-light" onClick={this.resetTimer}>
              <FontAwesomeIcon icon={faUndo} />
            </Button>
          </div>
        )}
      </div>
    );
  }
}

export default Timer;
