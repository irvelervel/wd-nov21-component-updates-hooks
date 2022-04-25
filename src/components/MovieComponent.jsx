import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'

// what's going on here?
// 1) render() gets invoked: will display the h2, and the loading div (because this.state.movieObject is still null)
// 2) componentDidMount triggers: it will fetch the movie details, and SET THE STATE
// 3) whenever the props change OR the state gets set, render() fires again! this time rendering the whole card
// 4) let's try to select a new movie from the dropdown! nothing happens. because even if we're getting a new prop with the
// new movieTitle, getMovieResults() is only invoked in componentDidMount and that is not going to happen again.
// 5) for this reason, we set up a componentDidUpdate, which is a lifecycle method thats gets executed automatically
// every time there's a change in the props or in the state. If we put our getMovieResults() function in there, our app just
// enters an infinite loop, because every time we fetch a movie we set the state, and that makes us enter componentDidUpdate again.
// 6) we finally set a condition on componentDidUpdate, making sure we launch getMovieResults() just if the props changed, so just
// if we received a new movieTitle in the superhero dropdown; entering componentDidUpdate again because of the setState DOESN'T
// launch getMovieResults() again because this time the state changed, and not the props.

const MovieComponent = ({ movieTitle }) => {
  // I want here to fetch some movie info about the current movieTitle selected

  // state = {
  //   movieObject: null, // this is eventually going to be an object
  // }

  const [movieObject, setMovieObject] = useState(null)

  // componentDidMount = () => {
  //   // componentDidMount executes just once! after the initial render()
  //   // this is perfect for any expensive/data fetching operation
  //   console.log('componentDidMount triggered!')
  //   console.log('movieTitle is: ', this.props.movieTitle)
  //   // let's fetch the data for Iron Man!
  //   this.getMovieResults()
  // }

  useEffect(() => {
    console.log('componentDidMount triggered!')
    console.log('movieTitle is: ', movieTitle)
    getMovieResults()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getMovieResults = async () => {
    try {
      let response = await fetch(
        'http://www.omdbapi.com/?apikey=24ad60e9&s=' + movieTitle
      ) // this.props.movieTitle initially is Iron Man
      console.log(response)
      let data = await response.json()
      // data now is an object containing Response, Search and totalResults
      // the movie object I'm looking for is in Search[0]
      // this.setState({
      //   movieObject: data.Search[0],
      // })
      setMovieObject(data.Search[0])
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getMovieResults()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movieTitle])

  // componentDidUpdate = (prevProps, prevState) => {
  //   // componentDidUpdate gets triggered EVERY TIME there's a change in the state or in the props
  //   // when I receive a new movieTitle from the props, I'll invoke getMovieResults again!

  //   // prevProps is the props object BEFORE entering componentDidUpdate
  //   // prevState is the state object BEFORE entering componentDidUpdate
  //   // you can compare them with this.props and this.state, which are instead the CURRENT values

  //   if (prevProps.movieTitle !== this.props.movieTitle) {
  //     // if I enter here, it means there was a change in the props!
  //     // ...it means a new movie was selected from the dropdown!
  //     this.getMovieResults()
  //   }

  //   // componentDidUpdate works TOO well! we're entering here NOT ONLY because our prop changed,
  //   // but also because in the getMovieResults() we're setting the state... and that enter componentDidUpdate again
  //   // --> INFINITE LOOP

  //   // GOLDEN RULE: EVERY COMPONENTDIDUPDATE NEEDS A HANDBRAKE! (a condition)
  //   // I want to fetch the new movie details when a new movieTitle arrives!
  //   // BUT I don't want to invoke getMovieResults() if I entered componentDidUpdate because of a state change

  //   // componentDidUpdate gets triggered because of:
  //   // 1) a change in the props
  //   // 2) a change in the state
  //   // in this situation I want to invoke my function just if 1) happens
  // }

  console.log('render happened')
  return (
    <div>
      <h2>MOVIE DETAILS</h2>
      {/* here I'll put maybe a Card from react-bootstrap */}
      {movieObject ? (
        <Card className="text-dark">
          <Card.Img variant="top" src={movieObject.Poster} />
          <Card.Body>
            <Card.Title>{movieObject.Title}</Card.Title>
            <Card.Text>
              {movieObject.Year} - {movieObject.imdbID}
            </Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div>LOADING...</div>
      )}
    </div>
  )
}

export default MovieComponent
