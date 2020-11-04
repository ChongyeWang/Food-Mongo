import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

import Register from './components/Register';
import Login from './components/Login';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Event from './components/Events';
import { shallow } from 'enzyme';

Enzyme.configure({ adapter: new Adapter() });


// test('renders learn react link', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });


it("renders without crashing", () => {
  shallow(<App />);
});

describe('App Component', () => {
  it('Test App', () => {
    const wrapper = shallow(<App />);
    const text = wrapper.find('div').text();
    expect(text).toEqual('<Main />');
  });
});

describe('Event Component', () => {
  it('Test App', () => {
    const wrapper = shallow(<Event />);
    expect(wrapper.contains("div"));
  });
});



// describe('Register component', () => {
//   it('Test Register', () => {
//     const wrapper = shallow(<Register />);
//     const text = wrapper.find('input').length;
//     expect(text).toEqual(6);
//   });
// });

describe('Login component', () => {
  it('Test Login', () => {
    const wrapper = shallow(<Login />);
    const text = wrapper.find('h2').length;
    expect(wrapper.contains("Admin"));
  });
});