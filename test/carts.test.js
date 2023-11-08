import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js'
import { expect } from 'chai';

chai.use(chaiHttp);

describe('Carros de Compras (Carts) API', () => {
  let cartId; // Guardar el ID del carrito creado
  
  it('Debería crear un carrito de compras', (done) => {
    chai.request(app)
      .post('/carts')
      .send({ title: 'MiCarrito_test' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status', 'success');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.have.property('title', 'MiCarrito'); 
        cartId = res.body.data._id; // Guarda el ID para pruebas posteriores
        done();
      });
  });

  it('Debería obtener los productos del carrito de compras', (done) => {
    chai.request(app)
      .get(`/carts/${cartId}/products`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status', 'success');
        expect(res.body).to.have.property('data');
        expect(res.body.data).to.be.an('array');
        done();
      });
  });

  it('Debería agregar un producto al carrito de compras', (done) => {
    chai.request(app)
      .post(`/carts/${cartId}/products`)
      .send({ productId: '64cb10967e293e09177d9278' })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('title'); 
        expect(res.body).to.have.property('productsCarts');
        expect(res.body.productsCarts).to.be.an('array');
        done();
      });
  });
});
