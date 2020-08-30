describe('pizza.js', () =>{
    let pizza;
    beforeEach(() => {
        pizza = new Pizza(['bacon'], 'small');
    });

    it('unique instances', () => {
        const pizza2 = new Pizza(['pineapple', 'pepperoni', 'sausage', 'corn'], 'medium');
        expect(pizza2).not.toBe(pizza);
        expect(pizza2).toBeTruthy();
    });

    it('has defined operations', () => {
        expect(pizza.pizzaPrice).toBeDefined();
        expect(pizza.toppingsPrice).not.toBeUndefined();
    });

    describe('constructor', () => {

        it('initializes pizza object correctly', () => {

            expect(pizza.size).toBe('small');
            expect(pizza.toppings).toEqual(['bacon']);
        })

        it('pizza toppings are array of strings', () =>{
            const pizza1 = new Pizza(['pineapple', 'pepperoni'], 'medium');
            expect(pizza1.toppings).toBeArrayOfStrings();
        })

        it('pizza size is a string', () =>{
            const pizza1 = new Pizza(['pineapple', 'pepperoni'], 'medium');
            expect(pizza1.size).toBeString();
        })

    })

    describe('get pizzaPrice', () => {
        it('correct size', () =>{
            const pizza2 = new Pizza(['bacon'],'extra small')
            expect(() => { pizza2.pizzaPrice }).toThrowError(Error);
        })

        it('price must be a number', () =>{
            expect(pizza.pizzaPrice ).toBeNumber();
        })

        it('correct price', () =>{
            expect(pizza.pizzaPrice ).toBe(0.8);
        })

        it('calls toppingsPrice()', () =>{
            const spy = spyOnProperty(pizza, 'toppingsPrice').and.returnValue(10);

            expect(pizza.pizzaPrice ).toBe(10);
            expect(spy).toHaveBeenCalled();
        })
    })

    describe('get toppingsPrice', () =>{

        it('no such topping', () =>{
            const pizza1 = new Pizza(['salmon'], 'small');
            expect(() => { pizza1.toppingsPrice }).toThrowError(Error);
        })

        it('correct toppings price', () =>{
            const pizza1 = new Pizza(['pineapple', 'pepperoni'], 'medium');
            expect(pizza1.toppingsPrice ).not.toBeNull();
            expect(pizza1.toppingsPrice ).toBe(1.25);
        })

        it('toppings price is a number', () =>{
            const pizza1 = new Pizza(['pineapple', 'pepperoni'], 'medium');
            expect(typeof(pizza1.toppingsPrice)).toMatch('number');
        })

    })
});
