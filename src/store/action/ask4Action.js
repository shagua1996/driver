import * as Types from "../type";
function askAction(data) {
  return {
    type: Types.REDUX_ACTION_ASK_K4,
    data
  };
}
export default function asyncAskAction(askDate) {
  return function(dispatch, getState) {
    let ask = getState().ask4;
    ask.push(askDate);
    dispatch(askAction(ask));
  };
}
