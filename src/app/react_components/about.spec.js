import React from 'react';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import {About} from './about';

describe('about component', () => {
    it('should render How it works', () => {
        const about = TestUtils.renderIntoDocument(<About/>);
        const h1 = TestUtils.findRenderedDOMComponentWithTag(about, 'h1');
        const h4 = TestUtils.scryRenderedDOMComponentsWithTag(about, 'h4');
        expect(h1.textContent).toEqual('How it works');
        expect(h4[0].textContent).toEqual('Explanation');
        expect(h4[1].textContent).toEqual('Slightly more Explanation');
    })
});