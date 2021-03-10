import {Skeleton} from "@material-ui/lab";
import React from "react";
import {Button} from "@material-ui/core";

const QuizContainerHeader = ({currentIndex, countQuizzes, onFinish}) => {
    return (
        <div className="navbar navbar-light bg-light">
            <div className="container">
                <div className="d-flex justify-content-between align-content-center w-100">
                    <h3 className="navbar-brand m-0">Quiz</h3>
                    {
                        countQuizzes ?
                            <h4 className="mb-0">{currentIndex}/{countQuizzes}</h4> :
                            <Skeleton animation={"wave"} width={60} height={40}/>
                    }
                    {
                        countQuizzes ?
                            <Button color="secondary"
                                    onClick={onFinish}
                                    variant="contained">
                                Finish
                            </Button> :
                            <Skeleton height={50} width={100}/>
                    }

                </div>
            </div>
        </div>
    );
};

export default QuizContainerHeader;
