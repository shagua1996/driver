import "./bothKemu.css";
import React from "react";
import Http from "../../unit/http";
import Select from "../../components/select";
import { Pagination, Spin } from "antd";
import $ from "jquery";
import { BackTop } from "antd";

class BothKemu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      list: [],
      curPage: 1,
      total: 0,
      isShowSpin: false
    };
    this.changePage = this.changePage.bind(this);
  }
  componentDidMount() {
    this.requestK1();
  }
  requestK1() {
    this.setState({
      isShowSpin: true
    });
    Http.k1(this.state.curPage, res => {
      this.setState({
        isShowSpin: false
      });
      let obj = JSON.parse(res.data.data);
      let { list, curPage, total } = obj.result;
      this.setState(
        {
          list,
          curPage,
          total
        },
        () => {
          $(document).scrollTop(0);
        }
      );
    });
  }
  requestK4() {
    this.setState({
      isShowSpin: true
    });
    Http.k4(this.state.curPage, res => {
      this.setState({
        isShowSpin: false
      });
      let obj = JSON.parse(res.data.data);
      let { list, curPage, total } = obj.result;
      this.setState(
        {
          list,
          curPage,
          total
        },
        () => {
          $(document).scrollTop(0);
        }
      );
    });
  }
  changePage(pageNumber) {
    this.setState({ curPage: pageNumber }, () => {
      this.requestK1();
    });
  }
  render() {
    return (
      <div>
        <div>
          {this.state.list.map(val => {
            return <Select key={val.id} data={val} kemu={this.state.name} />;
          })}
        </div>
        <div>
          {!this.state.isShowSpin && (
            <Pagination
              showQuickJumper
              defaultCurrent={this.state.curPage}
              total={this.state.total}
              onChange={this.changePage}
            />
          )}
        </div>

        <div className="loading">
          <Spin size="large" spinning={this.state.isShowSpin} />
        </div>
        <BackTop />
      </div>
    );
  }
}
export default BothKemu;
