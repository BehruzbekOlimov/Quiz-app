import './App.css';
import QuizContainer from "./components/QuizContainer";
import {Component} from "react";
import Header from "./components/Header";
import {BrowserRouter,Switch,Route} from "react-router-dom";
import Home from "./components/Home";

class App extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            quizzes: [],
            isLoading: true,
            selectedQuizId: 0,
            myAnswers: [],
            options:{difficulty: '', category: '', amount: 10}
        }
        console.log(this.props)
    }

    setSelectedQuiz = (id) => {
        this.setState({
            selectedQuizId: id
        })
    }

    setOptions = (options) => {
        this.setState({
            options,
            isLoading:true
        })
    }

    onCheckAnswer = () => {
        const {myAnswers, quizzes, selectedQuizId} = this.state
        const correctIndex = quizzes[selectedQuizId].variants.findIndex(variant => variant === quizzes[selectedQuizId].correct_answer)
        myAnswers[selectedQuizId].isSubmitted = true
        myAnswers[selectedQuizId].correctIndex = correctIndex
        myAnswers[selectedQuizId].isCorrect = myAnswers[selectedQuizId].answerIndex === correctIndex
        this.setState({
            myAnswers
        })
    }
    onQuizEnd = () => {
        const {myAnswers, quizzes} = this.state
        for (let i = 0; i < quizzes.length; i++) {
            if (!myAnswers[i].isSubmitted) {
                const correctIndex = quizzes[i].variants.findIndex(variant => variant === quizzes[i].correct_answer)
                myAnswers[i].isSubmitted = true
                myAnswers[i].correctIndex = correctIndex
                myAnswers[i].isCorrect = myAnswers[i].answerIndex === correctIndex
            }
        }
        this.setState({
            myAnswers
        })
    }

    setSelectAnswer = (answerId) => {
        const {myAnswers} = this.state
        myAnswers[this.state.selectedQuizId].answerIndex = answerId
        this.setState({
            myAnswers
        })
    }

    setData = (data) => {
        const quizzes = [...data.results]
        const myAnswers = new Array(quizzes.length)
        for (let i = 0; i < quizzes.length; i++) {
            quizzes[i].variants = [...quizzes[i].incorrect_answers, quizzes[i].correct_answer]
            this.shuffleArray(quizzes[i].variants)
            delete quizzes[i].incorrect_answers
            myAnswers[i] = {
                isSubmitted: false,
                isCorrect: false,
                answerIndex: -1
            }
        }
        this.setState({
            quizzes,
            isLoading: false,
            selectedQuizId: 0,
            myAnswers,
        })
    }

    render() {
        const {quizzes, isLoading, selectedQuizId, myAnswers, options} = this.state


        return (
            <>
                <BrowserRouter>
                    <div className="App">
                        <Header currentIndex={selectedQuizId + 1}
                                onFinish={this.onQuizEnd}
                                forseUpdate={()=>this.forceUpdate()}
                                countQuizzes={quizzes.length}/>
                        <Switch>
                            <Route exact path="/">
                                <Home options={options}
                                      isLoading={isLoading}
                                      forseUpdate={()=>this.forceUpdate()}
                                      onSubmit={this.setOptions}/>
                            </Route>
                            <Route path="/quiz">
                        <QuizContainer isLoading={isLoading}
                                       quiz={quizzes[selectedQuizId]}
                                       currentIndex={selectedQuizId}
                                       myAnswers={myAnswers}
                                       options={options}
                                       forseUpdate={()=>this.forceUpdate()}
                                       onSelectQuiz={this.setSelectedQuiz}
                                       onSelectAnswer={this.setSelectAnswer}
                                       onCheckAnswer={this.onCheckAnswer}
                                       onFetch={this.setData} countQuizzes={quizzes.length}/>

                            </Route>
                        </Switch>
                    </div>
                </BrowserRouter>
            </>
        );
    }

    shuffleArray(arr = []) {
        for (let i = 0; i < arr.length; i++) {
            let randomIndex = Math.floor(Math.random() * arr.length)
            let temp = arr[i];
            arr[i] = arr[randomIndex]
            arr[randomIndex] = temp
        }
    }
}

export default App;
