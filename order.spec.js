describe('order.js', () => {
    let order;
    let pizza, pizza2;

    beforeEach(() => {
        order = new Order();

        pizza = new Pizza(['bacon', 'pepperoni', 'olives', 'corn'], 'small');
        pizza2 = new Pizza(['pineapple', 'pepperoni', 'sausage', 'corn'], 'medium');

        order.addPizza(pizza);
        order.addPizza(pizza2);
    });

    it('has defined operations', () => {
        expect(order.totalPrice).toBeDefined();
        expect(order.addPizza).toBeDefined();
        expect(order.removePizza).toBeDefined();;
    });

    it('pizza is array ', () => {
        expect(order.pizzas).toBeArray();
    })

    it('pizza is empty array by default ', () => {
        const order = new Order();

        expect(order.pizzas).toBeEmptyArray();
    })

    describe('addPizza()', () =>{
        it('works correctly', () => {
            expect(order.pizzas).toBeArrayOfSize(2);
        })

        it('calls push method correctly', () => {
            const pizza3 = new Pizza(['bacon', 'pepperoni', 'ham'], 'large');

            order.addPizza(pizza3);

            expect(order.pizzas).toBeArrayOfSize(3);
            expect(order.pizzas).toBeArrayOfObjects();

            order.removePizza(pizza3);
        });
    })

    describe('removePizza()', () =>{
        it('calls indexOf method correctly', () => {
            const index = order.pizzas.indexOf(pizza2);

            expect(index).toBe(1);
        });

        it('works correctly', () => {
            const pizza3 = new Pizza(['bacon', 'pepperoni', 'ham'], 'large');

            order.addPizza(pizza3);
            order.removePizza(pizza3);

            expect(order.pizzas).toBeArrayOfSize(2);
        });
    })

    describe ('totalPrice()', () =>{
        it('Pizza can\'t cost 0 USD', () =>{
            const spy = spyOnProperty(pizza, 'pizzaPrice').and.returnValue(0);

            expect(() => { order.totalPrice }).toThrowError(Error, 'Pizza can\'t cost 0 USD');
            expect(spy).toHaveBeenCalled();
            expect(spy).toHaveBeenCalledTimes(1);
        })
        it('Pizza must have a price', () =>{
            const order1 = new Order();

            const pizza1 = new Pizza([], '');
            order1.addPizza({});
            expect(() => { order1.totalPrice}).toThrowError(Error, 'Pizza must have a price');
        })
        it('calls totalPrice correctly', () => {
            spyOn(order, 'totalPrice').and.callFake(function(){
                return 5.1;
            });
            order.totalPrice;
            expect(order.totalPrice).toBe(5.1);
        });

    })

});
