const { BadRequest } = require('@feathersjs/errors');
const app = require('../../src/app');

describe('\'events\' service', () => {
  it('registered the service', () => {
    const service = app.service('events');
    expect(service).toBeTruthy();
  });

  it('creates an event', async () => {
    const event = await app.service('events').create({
      _id: '630a76bc-e602-4958-9700-5b556bc5dd1a',
      name: 'name #1',
      description: 'description #1',
      date_start: '2022-03-06T20:45:27.745Z',
    });

    expect(event.name).toBe('name #1');
    expect(event.description).toBe('description #1');
    expect(event.date_start).toBe('2022-03-06T20:45:27.745Z');
  });

  // @TODO should use Min / Max length from defined constants...
  // (for all tests below)

  it('creates an invalid name event (min length)', async () => {
    try {
      await app.service('events').create({
        _id: '630a76bc-e602-4958-9700-5b556bc5dd1b',
        name: '#1',
        description: 'description #1',
        date_start: '2022-03-06T20:45:27.745Z',
      });

      expect(false).toBeTruthy();
    } catch (error) {
      expect(error instanceof BadRequest).toBeTruthy();
    }
  });

  it('creates an invalid name event (max length)', async () => {
    try {
      await app.service('events').create({
        _id: '630a76bc-e602-4958-9700-5b556bc5dd1c',
        name: '#1 0123456789 0123456789 0123456789',
        description: 'description #1',
        date_start: '2022-03-06T20:45:27.745Z',
      });

      expect(false).toBeTruthy();
    } catch (error) {
      expect(error instanceof BadRequest).toBeTruthy();
    }
  });

  it('creates an invalid description event (min length)', async () => {
    try {
      await app.service('events').create({
        _id: '630a76bc-e602-4958-9700-5b556bc5dd1d',
        name: 'Name #1',
        description: '',
        date_start: '2022-03-06T20:45:27.745Z',
      });

      expect(false).toBeTruthy();
    } catch (error) {
      expect(error instanceof BadRequest).toBeTruthy();
    }
  });

  it('creates an invalid description event (max length)', async () => {
    try {
      await app.service('events').create({
        _id: '630a76bc-e602-4958-9700-5b556bc5dd1e',
        name: 'Name #1',
        description: Array(210).join('0123456789'),
        date_start: '2022-03-06T20:45:27.745Z',
      });

      expect(false).toBeTruthy();
    } catch (error) {
      expect(error instanceof BadRequest).toBeTruthy();
    }
  });
});
