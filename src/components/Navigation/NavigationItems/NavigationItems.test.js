import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import navigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    it('should render 2 NavigationItems elements if not Authenticated', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(navigationItem)).toHaveLength(2);
    });
});