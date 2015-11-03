/**
 * Copyright 2015, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
var expect = require('expect');

var React = require('react/addons');
var NominatimResultList = require('../NominatimResultList');
var NominatimResult = require('../NominatimResult');


describe("test the NominatimResultList", () => {
    afterEach((done) => {
        React.unmountComponentAtNode(document.body);
        document.body.innerHTML = '';
        setTimeout(done);
    });

    it('test component creation', () => {
        var results = [{
            display_name: "Name",
            boundingbox: []
        }];
        const tb = React.render(<NominatimResultList results={results}/>, document.body);
        expect(tb).toExist();

    });

    it('create component without items', () => {
        const tb = React.render(<NominatimResultList />, document.body);
        expect(tb).toExist();
    });

    it('create component with empty items array', () => {
        const tb = React.render(<NominatimResultList results={[]} notFoundMessage=""/>, document.body);
        expect(tb).toExist();
    });

    it('test click handler', () => {
        var TestUtils = React.addons.TestUtils;
        const testHandlers = {
            clickHandler: () => {},
            afterClick: () => {}
        };
        var items = [{
            display_name: "Name",
            boundingbox: [1, 2, 3, 4]
        }];
        const spy = expect.spyOn(testHandlers, 'clickHandler');
        var tb = React.render(<NominatimResultList results={items} mapConfig={{size: 100, projection: "EPSG:4326"}}
            onItemClick={testHandlers.clickHandler}
            afterItemClick={testHandlers.afterItemClick}/>, document.body);
        let elem = TestUtils.scryRenderedComponentsWithType(tb, NominatimResult);
        expect(elem.length).toBe(1);

        let elem1 = TestUtils.findRenderedDOMComponentWithClass(elem[0], "search-result");
        React.findDOMNode(elem1).click();
        expect(spy.calls.length).toEqual(1);
    });
});
