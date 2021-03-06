/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import fire from "./fire";
import { createGlobalStyle }  from "styled-components";
import { useDispatch } from "react-redux";
import DirectorsReducer from "./redux/DirectorsReducer";
import MoviesReducer from "./redux/MoviesReducer";
import TabDirectors from "./components/directors/TabDirectors";
import Preloader from "./components/Preloader";
import { Switch, Route, Redirect } from 'react-router-dom';
import TabFilming from './components/filming/TabFilming';
import TabTheatres from "./components/theaters/TabTheatres";
import FilmingReducer from './redux/FilmingReducer';
import UserReducer from "./redux/UserReducer";
import LoginPage from "./components/LoginPage";
import TheatersReducer from "./redux/TheatersReducer";
import TabOscars from "./components/oscars/TabOscars";
import OscarYearsReducer from "./redux/OscarYearsReducer";
import OscarMoviesReducer from "./redux/OscarMoviesReducer";

export const OMDbApiKey: string = '36827e98';

const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    box-sizing: border-box;
    font-size: 16px;
  }
  
  body {
    background: #fff9de;
  }
`;

function App() {
  const [directorsLoaded, setDirectorsLoaded] = useState(false);
  const [moviesLoaded, setMoviesLoaded] = useState(false);
  const [filmingLoaded, setFilmingLoaded] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [theatersLoaded, setTheatersLoaded] = useState(false);
  const [oscarYearsLoaded, setOscarYearsLoaded] = useState(false);
  const [oscarMoviesLoaded, setOscarMoviesLoaded] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  },[]);

  const fetchData = () => {
    fetchUser();
    fetchDirectors();
    fetchMovies();
    fetchFilming();
    fetchTheaters();
    fetchOscarYears();
    fetchOscarMovies();
  };

  const fetchUser = () => {
    fire.auth().onAuthStateChanged(user => {
      if (user !== null) {
        //console.log(user);
        dispatch({type: UserReducer.actions.USER_FETCH, snapshot: user});
        setUserLoaded(true);
      }else {
        //console.log(user);
        setUserLoaded(true);
      }
    })
  };

  const fetchDirectors = () => {
    fire.firestore().collection('directors').orderBy("name").onSnapshot((snapshot: any) => {
      dispatch({type: DirectorsReducer.actions.DIRECTORS_FETCH, snapshot: snapshot});
      setDirectorsLoaded(true);
    }, (error: { message: any; }) => {
      console.log(error.message);
    });
  };

  const fetchMovies = () => {
    fire.firestore().collection('movies').orderBy("year").onSnapshot((snapshot: any) => {
      dispatch({type: MoviesReducer.actions.MOVIES_FETCH, snapshot: snapshot});
      setMoviesLoaded(true);
    }, (error: { message: any; }) => {
      console.log(error.message);
    });
  };

  const fetchFilming = () => {
    fire.firestore().collection('filming').orderBy("year").onSnapshot((snapshot: any) => {
      dispatch({type: FilmingReducer.actions.FILMING_FETCH, snapshot: snapshot});
      setFilmingLoaded(true);
    }, (error: { message: any; }) => {
      console.log(error.message);
    });
  };

  const fetchTheaters = () => {
    fire.firestore().collection('theaters').orderBy("year").onSnapshot((snapshot: any) => {
      dispatch({type: TheatersReducer.actions.THEATERS_FETCH, snapshot: snapshot});
      setTheatersLoaded(true);
    }, (error: { message: any; }) => {
      console.log(error.message);
    });
  };

  const fetchOscarYears = () => {
    fire.firestore().collection('oscarYears').orderBy("name").onSnapshot((snapshot: any) => {
      dispatch({type: OscarYearsReducer.actions.YEARS_FETCH, snapshot: snapshot});
      setOscarYearsLoaded(true);
    }, (error: { message: any; }) => {
      console.log(error.message);
    });
  };

  const fetchOscarMovies = () => {
    fire.firestore().collection('oscarMovies').orderBy("name").onSnapshot((snapshot: any) => {
      dispatch({type: OscarMoviesReducer.actions.OSCAR_MOVIES_FETCH, snapshot: snapshot});
      setOscarMoviesLoaded(true);
    }, (error: { message: any; }) => {
      console.log(error.message);
    });
  };

  const loader = (
      <Preloader/>
  );

  const allContent = (
      <Switch>
        <Route exact path="/directors" component={TabDirectors}/>
        <Route exact path="/filming" component={TabFilming}/>
        <Route exact path="/theatres" component={TabTheatres}/>
        <Route exact path="/oscars" component={TabOscars}/>
        <Route exact path="/login" component={LoginPage}/>
        <Redirect to="/directors"/>
      </Switch>
  );

  return (
      <>
        {(directorsLoaded
            && moviesLoaded
            && filmingLoaded
            && userLoaded
            && theatersLoaded
            && oscarMoviesLoaded
            && oscarYearsLoaded) ? allContent : loader}
        <GlobalStyles/>
      </>
  );
}

export default App;
