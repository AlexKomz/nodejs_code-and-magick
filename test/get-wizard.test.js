const request = require(`supertest`);
const assert = require(`assert`);

const app = require(`../src/server`).app;

describe(`GET /api/wizards`, () => {
  it(`get all wizards`, async () => {
    const response = await request(app).
      get(`/api/wizards`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const wizards = response.body;
    assert.strictEqual(wizards.length, 17);
  });

  it(`get all wizards with / at the end`, async () => {
    const response = await request(app).
      get(`/api/wizards/`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const wizards = response.body;
    assert.equal(wizards.length, 17);
  });

  it(`get data from unknown resource`, async () => {
    return await request(app).
    get(`/api/oneone`).
    set(`Accept`, `application/json`).
    expect(404).
    expect(`Page was not found`).
    expect(`Content-Type`, /html/);
  });
});

describe(`GET /api/wizards/:name`, () => {
  it(`get wizard with name "Мерлин"`, async () => {
    const response = await request(app).
      get(`/api/wizards/${encodeURI(`Мерлин`)}`).
      set(`Accept`, `application/json`).
      expect(200).
      expect(`Content-Type`, /json/);

    const wizard = response.body;
    assert.strictEqual(wizard.name, `Мерлин`);
  });

  it(`get wizard with name "Мерлин" in lower case`, async () => {
    const response = await request(app).
    get(`/api/wizards/${encodeURI(`мерлин`)}`).
    set(`Accept`, `application/json`).
    expect(200).
    expect(`Content-Type`, /json/);

    const wizard = response.body;
    assert.strictEqual(wizard.name, `Мерлин`);
  });

  xit(`get unknown wizard with name "Шапокляк"`, async () => {
    return request(app).
      get(`/api/wizards/${encodeURI(`шапокляк`)}`).
      set(`Accept`, `application/json`).
      expect(404).
      expect(`Маг с именем "шапокляк" не найден`).
      expect(`Content-Type`, /html/);
  });
});