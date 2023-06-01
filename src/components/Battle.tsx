import { Component, ReactNode } from "react";
// IMPORT COMPONENTS
import BattleCells from "./BattleCells";

type BattleProps = {
  player: string;
  firstPlayerData: Array<string>;
  secondPlayerData: Array<string>;
  playerChangeHandler: (player: string) => void;
};

type BattleState = {
  selectedField: string;
  firstPlayerPoint: number;
  secondPlayerPoint: number;
  ended: boolean;
};
// BATTLE
class Battle extends Component<BattleProps, BattleState> {
  state = {
    selectedField: "",
    firstPlayerPoint: 0,
    secondPlayerPoint: 0,
    ended: false,
  };

  clickHandler = (e: React.MouseEvent<HTMLElement>, player: string) => {
    const id = e.currentTarget.dataset.id || "";
    if (
      this.state.firstPlayerPoint === 8 ||
      this.state.secondPlayerPoint === 8
    ) {
      alert(`Game is ended! Winner is Player ${this.props.player}`);
      this.setState({ ended: true });
      return;
    }
    if (player === this.props.player) {
      alert("You cannot attack your own field");
      return;
    }
    if (this.state.selectedField !== "" && this.state.selectedField !== id) {
      alert("You can attack to one cell only!");
      return;
    }
    if (id === this.state.selectedField) {
      e.currentTarget.classList.remove("active");
      this.setState({ selectedField: "" });
    } else {
      e.currentTarget.classList.add("active");
      this.setState({ selectedField: id });
    }
  };

  attackHandler = () => {
    const elements = document.querySelectorAll<HTMLElement>(
      `.player-${this.props.player === "1" ? "2" : "1"} .cell.active`
    );

    if (this.props.player === "1") {
      this.setState({ selectedField: "" });
      if (this.props.secondPlayerData.includes(this.state.selectedField)) {
        elements.forEach((element) => {
          element.style.pointerEvents = "none";
          if (element.dataset.id === this.state.selectedField) {
            element.classList.add("killed");
          }
        });
        this.setState((state) => ({
          firstPlayerPoint: state.firstPlayerPoint + 1,
        }));
        alert("Killed");
        if (this.state.firstPlayerPoint === 7) {
          alert(`Game is ended! Winner is Player ${this.props.player}`);
          this.setState({ ended: true });
          return;
        }
      } else {
        elements.forEach((element) => {
          element.style.pointerEvents = "none";
          if (element.dataset.id === this.state.selectedField) {
            element.classList.add("missed");
          }
        });
        alert(":( MISSED");
        this.props.playerChangeHandler("2");
      }
    } else {
      this.setState({ selectedField: "" });
      if (this.props.firstPlayerData.includes(this.state.selectedField)) {
        elements.forEach((element) => {
          element.style.pointerEvents = "none";
          if (element.dataset.id === this.state.selectedField) {
            element.classList.add("killed");
          }
        });
        alert(":) KILLED");
        this.setState((state) => ({
          secondPlayerPoint: state.secondPlayerPoint + 1,
        }));
        if (this.state.secondPlayerPoint === 7) {
          alert(`🏆 GAME IS ENDED! Winner is Player ${this.props.player}`);
          this.setState({ ended: true });
          return;
        }
      } else {
        elements.forEach((element) => {
          element.style.pointerEvents = "none";
          if (element.dataset.id === this.state.selectedField) {
            element.classList.add("missed");
          }
        });
        alert(":( MISSED");
        this.props.playerChangeHandler("1");
      }
    }
  };

  endHandler = () => {
    alert(`🏆 GAME IS ENDED! Winner is Player ${this.props.player}`);
  };

  render(): ReactNode {
    const { selectedField, ended, firstPlayerPoint, secondPlayerPoint } =
      this.state;
    const { player } = this.props;
    return (
      <>
        <div className="battle__container">
          <div className={`${player === "1" ? "passive" : ""}`}>
            <h5>Player 1's Point: {firstPlayerPoint}</h5>
            <BattleCells clickHandler={this.clickHandler} player="1" />
          </div>
          <div className={`${player === "2" ? "passive" : ""}`}>
            <h5>Player 2's Point: {secondPlayerPoint}</h5>
            <BattleCells clickHandler={this.clickHandler} player="2" />
          </div>
        </div>
        {selectedField !== "" && (
          <button
            className="btn btn-warning mt-20"
            onClick={this.attackHandler}
          >
            Attack
          </button>
        )}
        {ended && (
          <button className="btn btn-success mt-20" onClick={this.endHandler}>
            End turn
          </button>
        )}
      </>
    );
  }
}

export default Battle;
