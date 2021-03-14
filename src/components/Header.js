import {Skeleton} from "@material-ui/lab";
import React from "react";
import {Button} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";

const Header = ({currentIndex, countQuizzes, onFinish, forseUpdate}) => {
    const {location}=useHistory()
    const isHome=location.pathname === '/'

    return (
        <div className="navbar navbar-light bg-light">
            <div className="container">
                <div className="d-flex justify-content-between align-content-center w-100">
                    <Link to="/"
                          onClick={forseUpdate}
                          className="navbar-brand m-0"
                          push>
                        Quiz App</Link>
                    {
                        countQuizzes ?
                            <h4 className="mb-0">{currentIndex}/{countQuizzes}</h4> :
                            !isHome && <Skeleton animation={"wave"} width={60} height={40}/>
                    }
                    {
                        countQuizzes ?
                            <Button color="secondary"
                                    disabled={isHome}
                                    onClick={onFinish}
                                    variant="contained">
                                Finish
                            </Button> :
                            !isHome && <Skeleton height={50} width={100}/>
                    }

                </div>
            </div>
        </div>
    );
};

export default Header;
