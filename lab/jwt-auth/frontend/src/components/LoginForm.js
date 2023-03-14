import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [email, setEmail] = useState('bob@example.com')
  const [password, setPassword] = useState('motdepasse2')
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    console.log({ email, password })
    axios.post('http://localhost:8080/login', { email, password })
      .then((response) => {
        localStorage.setItem('super_site_token', response.data.token)
        navigate('/profile')
      })
      .catch((error) => {
        console.log({ error })
      }) 
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Entrez votre email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Mot de passe</Form.Label>
        <Form.Control
          type="password"
          placeholder="Entrez votre mot de passe"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Se connecter
      </Button>
    </Form>
  );
}

export default LoginForm;
