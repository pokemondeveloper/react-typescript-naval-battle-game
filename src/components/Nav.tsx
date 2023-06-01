import { Component } from "react";

interface Props {
  player: string;
  started: boolean;
  start: () => void;
  reset: () => void;
}
// NAV
class Nav extends Component<Props> {
  render() {
    const { player, started } = this.props;
    return (
      <>
        <div className="btn__container">
          <button className="btn btn__success" onClick={this.props.start}>
            Start
          </button>
          <button className="btn btn__danger" onClick={this.props.reset}>
            Reset
          </button>
        </div>
        <hr />
        {started && (
          <div className="player">
            <h2>
              <mark>PLAYING:</mark> -🎮Player {player}...
            </h2>
            <div className="lds-ripple">
              <div></div>
              <div></div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Nav;
