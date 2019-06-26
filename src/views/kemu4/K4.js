import Bothkemu from "../kemu/bothKemu";

class K4 extends Bothkemu {
  componentDidMount() {
    this.setState({ name: "k4" });
    this.requestK4();
  }
}
export default K4;
