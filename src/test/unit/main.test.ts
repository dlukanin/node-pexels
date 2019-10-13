import {DefaultPexelsClient} from '../../lib/client/default';

const handleThen = (done) => (result) => done('expected error, instead got ' + result);

describe('pexels client units tests', (): void => {
    it('should throw error after passing invalid photo param', (done: jest.DoneCallback): void => {
        const client = new DefaultPexelsClient('test');
        const param = '0';
        (client as any).photo(param)
            .then(handleThen(done))
            .catch((error) => {
                expect(error.message).toBe('Pexels client: invalid id param: ' + param);
                done();
            });
    });

    it('should throw error after passing invalid search params', (done: jest.DoneCallback): void => {
        const client = new DefaultPexelsClient('test');
        (client as any).search('forest', '10', null)
            .then(handleThen(done))
            .catch((error) => {
                expect(error.message).toBe('Pexels client: invalid fields passed to method ' + ['10', null]);
                return (client as any).search(123, 10, 2);
            })
            .then(handleThen(done))
            .catch((error) => {
                expect(error.message).toBe('Pexels client: invalid query param: ' + 123);
                done();
            });
    });

    it('should throw error after passing invalid popular params', (done: jest.DoneCallback): void => {
        const client = new DefaultPexelsClient('test');
        (client as any).popular(10, 'f')
            .then(handleThen(done))
            .catch((error) => {
                expect(error.message).toBe('Pexels client: invalid fields passed to method ' + ['f']);
                done();
            });
    });
});
