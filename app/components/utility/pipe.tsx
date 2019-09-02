/**
 * A purely functional layout component that adds a pipe to the left or right
 * Defaults to left
 *
 * This got a little complicated but I feel like it works out.
 * */
import * as React from 'react';
import { FunctionComponent } from 'react';

export type PipeProps = {
  position?: string;
  children?: any;
};

// TODO have a way to change the pipe color

export const Pipe: FunctionComponent<PipeProps> = ({
  position = 'left',
  children
}) => {
  // Just in case we'll make the position lower-case then capitalize the first letter
  const pos =
    position
      .toLowerCase()
      .charAt(0)
      .toUpperCase() + position.slice(1);
  const borderMeasurement = '1px solid white';
  const borderPosition = `border${pos}`;
  const marginPosition = `margin${pos}`;
  const paddingPosition = `padding${pos}`;
  const marginMeasurement = `0.5rem`;
  const style = {
    [borderPosition]: borderMeasurement,
    [marginPosition]: marginMeasurement,
    [paddingPosition]: marginMeasurement
  };

  return (
    <div id="pipe-component" style={style}>
      {children}
    </div>
  );
};

export default React.memo(Pipe);
