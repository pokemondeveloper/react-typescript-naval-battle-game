import React from "react";
// IMPORT COMPONENTS
import Nav from "./components/Nav";
import BattleArea from "./components/BattleArea";
import Battle from "./components/Battle";
// APP Component
export default class App extends React.Component {
  state = {
    started: false,
    confirmed: false,
    startMove: false,
    player: "1",
    firstPlayerData: [],
    secondPlayerData: [],
  };
  // HANDLERS
  startHandler = () => {
    this.setState({ started: true });
  };

  resetHandler = () => {
    this.setState({
      started: false,
      confirmed: false,
      startMove: false,
      player: "1",
      firstPlayerData: [],
      secondPlayerData: [],
    });
  };

  confirmData = (userFields: Array<string>) => {
    if (this.state.player === "1") {
      this.setState({ firstPlayerData: userFields, player: "2" });
    } else {
      this.setState({
        secondPlayerData: userFields,
        player: "1",
        confirmed: true,
      });
    }
  };

  render() {
    // DESTRUCTURING STATE
    const {
      started,
      player,
      confirmed,
      startMove,
      firstPlayerData,
      secondPlayerData,
    } = this.state;

    return (
      <div className="App">
        <div className="container">
          {/* HEADER */}
          <div className="header">
            <div className="header__banner"></div>
          </div>
          {/* TITLE */}
          <h2>Simplified naval combat</h2>
          <hr />
          <p>
            <b>⚠️Basic rule:</b> Follow the rules of the Battle while playing
            with each other. A player who violates one of the rules will be
            removed from the Battle.
          </p>
          <hr />
          {/* BATTLE AREA */}
          {started && (
            <div className="battle__container">
              {!confirmed && player === "1" && (
                <BattleArea player="1" confirmData={this.confirmData} />
              )}
              {!confirmed && player === "2" && (
                <BattleArea player="2" confirmData={this.confirmData} />
              )}
            </div>
          )}
          {!startMove && confirmed && (
            <button
              className="btn btn__move"
              onClick={() => this.setState({ startMove: true })}
            >
              - 🏁 START MOVE -
            </button>
          )}
          {startMove && (
            <Battle
              player={player}
              firstPlayerData={firstPlayerData}
              secondPlayerData={secondPlayerData}
              playerChangeHandler={(player: string) =>
                this.setState({ player })
              }
            />
          )}
          <hr />
          <Nav
            start={this.startHandler}
            reset={this.resetHandler}
            player={player}
            started={started}
          />
        </div>
      </div>
    );
  }
}
