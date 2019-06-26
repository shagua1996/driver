import Bothkemu from "../kemu/bothKemu";

class K1 extends Bothkemu {
  componentDidMount() {
    this.setState({ name: "k1" });
    this.requestK1();
  }
}
export default K1;
