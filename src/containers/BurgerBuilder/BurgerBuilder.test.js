import React from 'react';

import {BurgerBuilder} from './BurgerBuilder';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import buildControls from '../../components/Burger/BuildControls/BuildControls';

configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder purchaseBurgerFinished={() => {}} setBasicIngredients={() => {}}/>);
    })
    it('should render Build Controls when receivig ingredients', () => {
        wrapper.setProps({ingredients:{salad:1, cheese:1}});
        expect(wrapper.find(buildControls)).toHaveLength(1);
    });
});