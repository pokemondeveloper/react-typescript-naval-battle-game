import { Component } from "react";
// IMPORT COMPONENTS
import BattleCells from "./BattleCells";

type BattleAreaProps = {
  player: string;
  selectedFields?: Array<string>;
  startMove?: boolean;
  currentPlayer?: string;
  confirmData: (userFields: Array<string>) => void;
};
// BATTLE AREA
class BattleArea extends Component<BattleAreaProps> {
  state = {
    selectedFields: [],
  };
  // HANDLERS
  clickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const id = e.currentTarget.dataset.id || "";
    let data: string[] = [...this.state.selectedFields];
    if (data.includes(id)) {
      data.splice(data.indexOf(id), 1);
      e.currentTarget.classList.remove("active");
    } else {
      if (data.length > 7) {
        alert("⚠️ ONLY select -> 8 ships");
        return;
      }
      data.push(id);
      e.currentTarget.classList.add("active");
    }
    this.setState({ selectedFields: data });
  };

  confirmHandler = () => {
    if (this.state.selectedFields.length === 8) {
      this.props.confirmData(this.state.selectedFields);
    } else {
      alert("⚠️ ONLY select -> 8 ships");
    }
  };

  render() {
    return (
      <div>
        <BattleCells clickHandler={this.clickHandler} />
        <br />
        <button className="btn btn__confirm" onClick={this.confirmHandler}>
          CONFIRM
        </button>
      </div>
    );
  }
}

export default BattleArea;
