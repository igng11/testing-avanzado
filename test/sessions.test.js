import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js'
import { expect } from 'chai';

chai.use(chaiHttp);

describe('Rutas de Sesiones', () => {
  it('Debería mostrar la vista de sesiones', (done) => {
    chai.request(app)
      .get('/sessions/views')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        done();
      });
  });

  it('Debería registrar un nuevo usuario', (done) => {
    chai.request(app)
      .post('/sessions/signup')
      .send({
        first_name: 'Nacho',
        email: 'igng_11@hotmail.com',
        password: '123'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        // Verifica que la página muestre un mensaje de registro exitoso u otra lógica específica de tu aplicación.
        done();
      });
  });

  it('Debería iniciar sesión con un usuario registrado', (done) => {
    chai.request(app)
      .post('/sessions/login')
      .send({
        email: 'igng_11@hotmail.com',
        password: '123'
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res).to.be.html;
        // Verifica que el usuario haya iniciado sesión y se haya redirigido a su perfil.
        done();
      });
  });
  
  it('Debería cerrar la sesión de usuario', (done) => {
    chai.request(app)
      .get('/sessions/logout')
      .end((err, res) => {
        expect(res).to.have.status(302); // Debe redirigir a la página de inicio de sesión o a otro lugar específico.
        done();
      });
  });
});
