describe('test it each', () => {
    
    beforeEach(async () => {
        console.log('beforeEach called')
    })
    it.each([
        1,2,3
    ])('test function %p', async myCounter => {
        console.log(`counter is ${myCounter}`)
        expect(myCounter).toBeLessThan(4);
    })
})