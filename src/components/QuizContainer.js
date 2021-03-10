import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItem, Typography
} from "@material-ui/core";
import {Skeleton} from "@material-ui/lab";


const QuizContainer = ({
                           isLoading,
                           quiz,
                           onFetch,
                           countQuizzes,
                           onSelectQuiz,
                           currentIndex,
                           onSelectAnswer,
                           myAnswers,
                           onCheckAnswer
                       }) => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    useEffect(() => {
        if (isLoading)
            fetch('https://opentdb.com/api.php?amount=20&category=18&difficulty=easy&type=multiple', {method: 'get'})
                .then(res => res.json())
                .then(data => onFetch(data))
    })

    let countCorrectAnswers = calculateCorrectAnswer(myAnswers)
    if (countCorrectAnswers !== -1 && !isFinished) {
        setModalIsOpen(true)
        setIsFinished(true)
    }

    const buttons = []
    for (let i = 0; i < countQuizzes; i++) {
        let className = ''
        if (i === currentIndex) {
            className = 'current-btn'
        } else if (myAnswers[i].isSubmitted) {
            className = myAnswers[i].isCorrect ? 'correct-btn' : 'incorrect-btn'
        } else if (myAnswers[i].answerIndex !== -1) {
            className = 'selected-btn'
        }
        buttons.push(
            <Button className={className + " rounded-0"}
                    disabled={i === currentIndex}
                    onClick={() => onSelectQuiz(i)}
                    key={i}
                    variant="outlined">{i + 1}</Button>)
    }


    return (
        <div className="col-md-6 offset-md-3">
            {!isLoading ?
                <div>
                    <div className="container-fluid px-0 py-3 flex-wrap d-flex justify-content-center">
                        {buttons.map(button => (
                            button
                        ))}
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h5>{quiz.question}</h5>
                        </div>
                        <div className="card-body p-0">
                            <List className="p-0">
                                {
                                    quiz.variants.map((variant, index) => {
                                        const answer = myAnswers[currentIndex]
                                        let className = ''
                                        if (answer.answerIndex === index && !answer.isSubmitted) {
                                            className = 'selected-variant'
                                        } else if (index === answer.correctIndex) {
                                            className = 'correct-variant'
                                        } else if (index === answer.answerIndex) {
                                            className = 'incorrect-variant'
                                        }
                                        return (
                                            <ListItem button
                                                      className={className}
                                                      onClick={() => !answer.isSubmitted && onSelectAnswer(index)}
                                                      key={index}>
                                                {variant}
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                        </div>
                        <div className="card-footer d-flex justify-content-between w-100">
                            <Button disabled={currentIndex === 0}
                                    onClick={() => onSelectQuiz(currentIndex - 1)}
                                    color="primary"
                                    variant={"contained"}>
                                Previous
                            </Button>
                            <Button
                                disabled={myAnswers[currentIndex].answerIndex === -1 || myAnswers[currentIndex].isSubmitted}
                                onClick={onCheckAnswer}
                                variant={"contained"}>
                                Submit
                            </Button>
                            <Button disabled={currentIndex === countQuizzes - 1}
                                    onClick={() => onSelectQuiz(currentIndex + 1)}
                                    color="primary"
                                    variant={"contained"}>
                                Next
                            </Button>
                        </div>
                    </div>
                </div> :
                <div>

                    <div>
                        <Skeleton height={70} animation={"wave"}/>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <Skeleton height={50} animation={"wave"}/>
                            <Skeleton height={50} width="70%" animation={"wave"}/>
                        </div>
                        <div className="card-body">
                            <Skeleton height={40} animation={"wave"}/>
                            <Skeleton height={40} animation={"wave"}/>
                            <Skeleton height={40} animation={"wave"}/>
                            <Skeleton height={40} animation={"wave"}/>
                        </div>
                        <div className="card-footer d-flex justify-content-between">
                            <Skeleton height={50} width={100}/>
                            <Skeleton height={50} width={100}/>
                            <Skeleton height={50} width={100}/>
                        </div>
                    </div>

                </div>
            }

            <MyDialog open={modalIsOpen}
                      countQuizzes={countQuizzes}
                      countCorrectAnswers={countCorrectAnswers}
                      toggle={() => setModalIsOpen(false)}/>
        </div>
    );
}

const MyDialog = ({open, toggle, countQuizzes, countCorrectAnswers}) => {

    return (
        <Dialog
            open={open}
            maxWidth={"sm"}
            fullWidth={true}
            onClose={toggle}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{"Your results"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography variant="h4" className="text-center">{countCorrectAnswers} / {countQuizzes}</Typography>
                    <Typography variant="h5" className="text-center">or</Typography>
                    <Typography variant="h4" className="text-center">{Math.round(countCorrectAnswers/countQuizzes*100)} %</Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={toggle} className="w-100" variant={"outlined"} color="primary" autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

function calculateCorrectAnswer(answers = []) {
    let counter = 0;
    for (let i = 0; i < answers.length; i++) {
        if (answers[i].isSubmitted) {
            counter += answers[i].isCorrect ? 1 : 0;
        } else {
            return -1;
        }
    }
    return answers.length?counter:-1;
}


export default QuizContainer;
