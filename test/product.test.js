import request from 'supertest';
import app from '../src/app.js'
import { expect } from 'chai';

const exampleProduct = {
  num: 1,
  p_name: 'SPORT MINERAL SUNSCREEN CREAM - SPF 40',
  p_desc: 'Descripción del producto',
  c_name: 'Nombre de la categoría',
  c_desc: 'Descripción de la categoría',
  price: '15,29 US$',
  price_l: '175,7 US$',
  specification1: 'Water resistant for 80 minutes',
  specification2: 'Made with just 4 simple ingredients',
  specification3: 'Made with solar power',
  link: 'https://amzn.to/3IRQbRa',
  img_1: 'assets/img/img_11.png',
  logos: [4, 10, 13, 14, 15, 16],
  owner: '64dffc85d286c53f4d562cb3'
};

describe('Router de Products', function() {
  // Prueba para la creación de un producto
  it('Debería crear un nuevo producto con datos válidos', function(done) {
    request(app)
      .post('/products')
      .send(exampleProduct)
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('status', 'success');
        expect(res.body).to.have.property('message', 'producto creado');
        done();
      });
  });

  // Prueba para obtener un producto por su ID
  it('Debería obtener un producto por su ID', function(done) {
    request(app)
      .get('/products/64cb10967e293e09177d9278')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('num', exampleProduct.num);
        expect(res.body).to.have.property('p_name', exampleProduct.p_name);
        done();
      });
  });

  // Prueba para eliminar un producto por su ID
  it('Debería eliminar un producto por su ID', function(done) {
    request(app)
      .delete('/products/64cb10967e293e09177d9278')
      .expect(200)
      .end(function(err, res) {
        if (err) return done(err);
        expect(res.body).to.have.property('status', 'success');
        expect(res.body).to.have.property('message', 'producto eliminado');
        done();
      });
  });
});
