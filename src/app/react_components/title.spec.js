import React from 'react';
import TestUtils from 'react-dom/lib/ReactTestUtils';
import {Title} from './title';

describe('title component', () => {
    it('should render playEquation', () => {
        const hello = TestUtils.renderIntoDocument(<Title/>);
        const h1 = TestUtils.findRenderedDOMComponentWithTag(hello, 'h1');
        const span = TestUtils.findRenderedDOMComponentWithTag(hello, 'span');
        expect(h1.textContent).toEqual('playEquation');
        expect(span.textContent).toEqual('... and graph it too!')
    })
});