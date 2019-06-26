import "./select.css";
import React from "react";
import { Radio, Button, Modal } from "antd";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import ask1Action from "../store/action/ask1Action";
import ask4Action from "../store/action/ask4Action";

function mapStateToProps(state) {
  return {
    state
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ask1Action, ask4Action }, dispatch);
}

function DriveRadio(props) {
  let { val, title } = props;
  if (title !== "") {
    return (
      <div>
        <Radio value={val}>{title}</Radio>
      </div>
    );
  }
  return null;
}
function Image(props) {
  if (props.file !== "") {
    return (
      <div>
        <img src={props.file} alt="" />
      </div>
    );
  }
  return null;
}
class Select extends React.Component {
  constructor(props) {
    super(props);
    //isError为ture表示做错了否则表示做对了
    this.state = {
      value: 0,
      isShowModel: false,
      isError: false,
      disabeld: false
    };
    this.showExplainText = this.showExplainText.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }
  onChange = e => {
    this.setState({
      value: e.target.value
    });
    if (e.target.value !== this.props.data.val) {
      this.setState({
        isError: true
      });
      this.props[`as${this.props.kemu}Action`]({
        id: this.props.data.id,
        ask: false,
        val: e.target.value
      });
    } else {
      this.setState({
        isError: false
      });
      this.props[`as${this.props.kemu}Action`]({
        id: this.props.data.id,
        ask: true,
        val: e.target.value
      });
    }
  };
  showExplainText() {
    this.setState({
      isShowModel: true
    });
  }
  handleOk() {
    this.setState({
      isShowModel: false
    });
  }
  componentDidMount() {
    this.props.state[`as${this.props.kemu}`].map(val => {
      if (val.id === this.props.data.id) {
        this.setState({
          disabeld: true,
          value: val.val
        });
      }
      return null;
    });
  }

  render() {
    return (
      <div>
        <h3>{this.props.data.title}</h3>
        <div>
          <Radio.Group
            value={this.state.value}
            onChange={this.onChange}
            disabled={this.state.value !== 0 || this.state.disabeld}
          >
            <DriveRadio val={1} title={this.props.data.a} />
            <DriveRadio val={2} title={this.props.data.b} />
            <DriveRadio val={3} title={this.props.data.c} />
            <DriveRadio val={4} title={this.props.data.d} />
          </Radio.Group>
        </div>
        <Image file={this.props.data.file} />

        <div>
          <Button size="small" onClick={this.showExplainText}>
            本题解析
          </Button>
        </div>
        <div>
          <span>
            {this.state.value !== 0
              ? this.state.isError
                ? "错误"
                : "正确"
              : null}
          </span>
        </div>
        <Modal
          title="本题解析"
          visible={this.state.isShowModel}
          onOk={this.handleOk}
        >
          <p>{this.props.data.explainText}</p>
        </Modal>
        <div />
      </div>
    );
  }
}
Select = connect(
  mapStateToProps,
  mapDispatchToProps
)(Select);
export default Select;
