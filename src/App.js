import { Col, Container, Form, Row } from 'react-bootstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import MovieComponent from './components/MovieComponent'

// In App I want to display an input field at the top, a dropdown
// below it I will display a movie poster component, reading from that input

const App = () => {
  // state = {
  //   movieTitle: 'Iron Man',
  // }

  const [movieTitle, setMovieTitle] = useState('Iron Man')

  return (
    <div className="App">
      <Container>
        <Row className="justify-content-center mt-3">
          <Col md={6} className="text-light">
            <Form.Group>
              <Form.Label>Choose your superhero!</Form.Label>
              <Form.Control
                as="select"
                value={movieTitle}
                onChange={(e) =>
                  // this.setState({ movieTitle: e.target.value })
                  setMovieTitle(e.target.value)
                }
              >
                <option>Iron Man</option>
                <option>Wonder Woman</option>
                <option>The Flash</option>
                <option>Captain America</option>
                <option>Black Widow</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-center mt-3">
          <Col md={6} className="text-light">
            <MovieComponent movieTitle={movieTitle} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
