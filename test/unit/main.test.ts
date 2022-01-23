import { Client, IPexelsClient } from '../../src';

describe('pexels client units tests', (): void => {

    let client: IPexelsClient;

    beforeAll(() => {
        client = new Client({ apiKey: 'test' });
    });

    afterAll(() => {
        client = undefined;
    });

    it('should throw error after passing invalid photo param', async (done) => {
        const param = '0' as any;

        try {
            const photo = await client.v1.photos.get(param);

            done('expected error, instead got ', photo);
        } catch (err) {
            expect(err.message).toBe('Pexels client: invalid id param: ' + param);
            done();
        }
    });

    it('should throw error after passing invalid search params', async (done) => {
        try {
            const photos = await client.v1.photos.search('forest', { perPage: '10' as any, page: null });

            done('expected error, instead got ', photos);
        } catch (err) {
            expect(err.message).toBe('Pexels client: invalid fields passed to method ' + ['10', null]);

            try {
                const photos = await client.v1.photos.search(123 as any, { perPage: 10, page: 2 });

                done('expected error, instead got ', photos);
            } catch (err) {
                expect(err.message).toBe('Pexels client: invalid query param: ' + 123);
                done();
            }
        }
    });

    it('should throw error after passing invalid popular params', async (done) => {
        try {
            const photos = await client.v1.photos.curated(10, 'f' as any);

            done('expected error, instead got ', photos);
        } catch (err) {
            expect(err.message).toBe('Pexels client: invalid fields passed to method ' + ['f']);
            done();
        }
    });
});
