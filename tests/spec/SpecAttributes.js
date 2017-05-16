(function () {
    var el, el2, el3, $f4, $res, $res2, inner1, inner2;

    var before = function before() {
        el = document.createElement('div');
        el2 = document.createElement('b');
        el3 = document.createElement('b');
        el.appendChild(el2);
        el.appendChild(el3);
    };

    describe("'html' method", function () {

        inner1 = ' <span>1</span> ';
        inner2 = '<strong>2</strong><span>3</span>';
        beforeEach(before);

        it("should return an array of elements 'html' contents", function () {
            el2.innerHTML = inner1;
            el3.innerHTML = inner2;

            $f4 = f4(el).find('b');
            $res = $f4.html();

            expect($res[0]).toBe(inner1);
            expect($res[1]).toBe(inner2);
            expect($res.length).toBe(2);
        });

        it("should return a string instead of an array when only one element matches the selector", function () {
            el.innerHTML = inner1;

            $f4 = f4(el);
            $res = $f4.html();

            expect(typeof $res).toBe('string');
            expect($res).toBe(inner1);
        });

        it("should return 'undefined' if no one element matches the selector", function () {
            $f4 = f4(el).find('nothing');
            $res = $f4.html();

            expect($res).toBeUndefined();
        });

        it("should set elements' 'html' content if called with the parameter", function () {
            $f4 = f4(el).find('b').html(inner2);
            $res = el2.innerHTML;
            $res2 = el3.innerHTML;

            expect($res).toBe(inner2);
            expect($res2).toBe(inner2);
        });

        it("should return all prototypes", function () {
            $res = f4(el).html('');
            Object.keys(f4.proto).forEach(function (name) {
                expect($res[name]).toBe(f4.proto[name]);
            });
        });

    });

    describe("'text' method", function () {

        var text1 = 'text';
        var text2 = 'textandanother text';
        inner1 = '<span> text </span>';
        inner2 = '<strong>text</strong>and<span>another text</span>';
        beforeEach(before);

        it("should return an array of elements 'text' contents", function () {
            el2.innerHTML = inner1;
            el3.innerHTML = inner2;

            $f4 = f4(el).find('b');
            $res = $f4.text();

            expect($res[0]).toBe(text1);
            expect($res[1]).toBe(text2);
            expect($res.length).toBe(2);
        });

        it("should return a string instead of an array when only one element matches the selector", function () {
            el.innerHTML = inner1;

            $f4 = f4(el);
            $res = $f4.text();

            expect(typeof $res).toBe('string');
            expect($res).toBe(text1);
        });

        it("should return 'undefined' if no one element matches the selector", function () {
            $f4 = f4(el).find('nothing');
            $res = $f4.text();

            expect($res).toBeUndefined();
        });

        it("should set elements' 'text' content if called with the parameter", function () {
            $f4 = f4(el).find('b').text(text2);
            $res = el2.innerHTML;
            $res2 = el3.innerHTML;

            expect($res).toBe(text2);
            expect($res2).toBe(text2);
        });

        it("should return all prototypes", function () {
            $res = f4(el).text('');
            Object.keys(f4.proto).forEach(function (name) {
                expect($res[name]).toBe(f4.proto[name]);
            });
        });

    });

    describe("'attr' method", function () {

        beforeEach(before);
        beforeEach(function () {
            el.setAttribute('test', 'val');
            el.setAttribute('test2', 2);
            el2.setAttribute('test3', 'val3');
            el3.setAttribute('test4', 'val4');
        });

        it("should return an array of attributes objects", function () {
            $f4 = f4(el).find('b');
            $res = $f4.attr();

            expect($res[0]).toEqual({test3: 'val3'});
            expect($res[1]).toEqual({test4: 'val4'});
            expect($res.length).toBe(2);
        });

        it("should return an array of attributes values if called with the parameter", function () {
            $f4 = f4(el).find('b');
            $res = $f4.attr('test3');
            $res2 = $f4.attr('test4');

            expect($res[0]).toEqual('val3');
            expect($res[1]).toEqual(null);
            expect($res.length).toBe(2);
            expect($res2[0]).toEqual(null);
            expect($res2[1]).toEqual('val4');
            expect($res2.length).toBe(2);
        });

        it("should return an object or value instead of an array when only one element matches the selector", function () {
            $f4 = f4(el);
            $res = $f4.attr();
            $res2 = $f4.attr('test2');

            expect($res).toEqual({test: 'val', test2: 2});
            expect($res2).toBe(2);
        });

        it("should return 'undefined' if no one element matches the selector", function () {
            $f4 = f4(el).find('nothing');
            $res = $f4.attr();

            expect($res).toBeUndefined();
        });

        it("should set element's attributes values if called with the second parameter", function () {
            $f4 = f4(el).find('b').attr('test5', 'val5');
            $res = el2.attributes;
            $res2 = el3.attributes;

            expect($res.length).toBe(2);
            expect($res[0].name).toBe('test3');
            expect($res[0].value).toBe('val3');
            expect($res[1].name).toBe('test5');
            expect($res[1].value).toBe('val5');
            expect($res2.length).toBe(2);
            expect($res2[0].name).toBe('test4');
            expect($res2[0].value).toBe('val4');
            expect($res2[1].name).toBe('test5');
            expect($res2[1].value).toBe('val5');
        });

        it("should return all prototypes", function () {
            $res = f4(el).attr('a', 'b');
            Object.keys(f4.proto).forEach(function (name) {
                expect($res[name]).toBe(f4.proto[name]);
            });
        });

    });

    describe("'data' method", function () {

        beforeEach(before);
        beforeEach(function () {
            el.setAttribute('data-test', 'val');
            el.setAttribute('data-test2', 2);
            el.setAttribute('data-test-with-camel-case', true);
            el.setAttribute('not-data', 'yep');
            el2.setAttribute('data-test3', 'val3');
            el2.setAttribute('not-data', 'yep');
            el3.setAttribute('data-test4', 'val4');
            el3.setAttribute('not-data', 'yep');
        });

        it("should return an array of 'data' attributes objects", function () {
            $f4 = f4(el).find('b');
            $res = $f4.data();

            expect($res[0]).toEqual({test3: 'val3'});
            expect($res[1]).toEqual({test4: 'val4'});
            expect($res.length).toBe(2);
        });

        it("should return an array of 'data' attributes values if called with the 'string' parameter", function () {
            $f4 = f4(el).find('b');
            $res = $f4.data('test3');
            $res2 = $f4.data('test4');

            expect($res[0]).toEqual('val3');
            expect($res[1]).toEqual(null);
            expect($res.length).toBe(2);
            expect($res2[0]).toEqual(null);
            expect($res2[1]).toEqual('val4');
            expect($res2.length).toBe(2);
        });

        it("should return an object or value instead of an array when only one element matches the selector", function () {
            $f4 = f4(el);
            $res = $f4.data();
            $res2 = $f4.data('test2');

            expect($res).toEqual({test: 'val', test2: 2, testWithCamelCase: true});
            expect($res2).toBe(2);
        });

        it("should return 'undefined' if no one element matches the selector", function () {
            $f4 = f4(el).find('nothing');
            $res = $f4.data();

            expect($res).toBeUndefined();
        });

        it("should set element's 'data' attributes values if called with the 'object' parameter", function () {
            $f4 = f4(el).find('b').data({testWithSet: 5, hop: 'hey'});
            $res = el2.attributes;
            $res2 = el3.attributes;

            expect($res.length).toBe(4);
            expect($res[0].name).toBe('data-test3');
            expect($res[0].value).toBe('val3');
            expect($res[1].name).toBe('not-data');
            expect($res[1].value).toBe('yep');
            expect($res[2].name).toBe('data-test-with-set');
            expect($res[2].value).toBe('5');
            expect($res[3].name).toBe('data-hop');
            expect($res[3].value).toBe('hey');
            expect($res2.length).toBe(4);
            expect($res2[0].name).toBe('data-test4');
            expect($res2[0].value).toBe('val4');
            expect($res2[1].name).toBe('not-data');
            expect($res2[1].value).toBe('yep');
            expect($res2[2].name).toBe('data-test-with-set');
            expect($res2[2].value).toBe('5');
            expect($res2[3].name).toBe('data-hop');
            expect($res2[3].value).toBe('hey');
        });

        it("should return all prototypes", function () {
            $res = f4(el).data({a: 1});
            Object.keys(f4.proto).forEach(function (name) {
                expect($res[name]).toBe(f4.proto[name]);
            });
        });

    });

    describe("'removeAttr' method", function () {

        beforeEach(before);
        beforeEach(function () {
            el2.setAttribute('test3', 'val3');
            el2.setAttribute('test5', 'val5');
            el3.setAttribute('test4', 'val4');
            el3.setAttribute('test6', 'val6');
        });

        it("should remove specified attribute", function () {
            $f4 = f4(el).find('b');

            $f4.removeAttr('test3');
            $res = el2.attributes;
            $res2 = el3.attributes;

            expect($res.length).toBe(1);
            expect($res[0].name).toBe('test5');
            expect($res[0].value).toBe('val5');
            expect($res2.length).toBe(2);


            $f4.removeAttr('test6');
            expect($res.length).toBe(1);
            expect($res[0].name).toBe('test5');
            expect($res[0].value).toBe('val5');
            expect($res2.length).toBe(1);
            expect($res2[0].name).toBe('test4');
            expect($res2[0].value).toBe('val4');
        });

        it("should return all prototypes", function () {
            $res = f4(el).removeAttr('attr');
            Object.keys(f4.proto).forEach(function (name) {
                expect($res[name]).toBe(f4.proto[name]);
            });
        });

    });

    describe("'removeData' method", function () {

        beforeEach(before);
        beforeEach(function () {
            el2.setAttribute('data-test3', 'val3');
            el2.setAttribute('data-test5', 'val5');
            el3.setAttribute('test4', 'val4');
            el3.setAttribute('data-test-with-camel-case', 'val6');
        });

        it("should remove specified 'data' attribute", function () {
            $f4 = f4(el).find('b');

            $f4.removeData('test3');
            $res = el2.attributes;
            $res2 = el3.attributes;

            expect($res.length).toBe(1);
            expect($res[0].name).toBe('data-test5');
            expect($res[0].value).toBe('val5');
            expect($res2.length).toBe(2);


            $f4.removeData('testWithCamelCase');
            expect($res.length).toBe(1);
            expect($res[0].name).toBe('data-test5');
            expect($res[0].value).toBe('val5');
            expect($res2.length).toBe(1);
            expect($res2[0].name).toBe('test4');
            expect($res2[0].value).toBe('val4');
        });

        it("should return all prototypes", function () {
            $res = f4(el).removeData('dat');
            Object.keys(f4.proto).forEach(function (name) {
                expect($res[name]).toBe(f4.proto[name]);
            });
        });

    });
})();