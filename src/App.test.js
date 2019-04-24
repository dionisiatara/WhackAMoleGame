import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Login';

import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
// import Adapter from 'enzyme-adapter-react-15';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe("Login", () => {
  it("should render login component", () => {
    Enzyme.configure({ adapter: new Adapter() })
    const wrapper = shallow(<Login />);
  });
});
