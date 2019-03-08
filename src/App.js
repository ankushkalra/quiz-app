import React, { Component } from "react";
import "./App.css";
import _ from "lodash";
import a from "./question.json";

class App extends Component {
  state = {
    questions: _.mapKeys(a, "id"),
    currentQuestionIndex: 0
  };

  isQuestionLeftInDataset = () => {
    let { questions, currentQuestionIndex } = this.state;
    if (questions && currentQuestionIndex < Object.keys(questions).length) {
      return true;
    } else {
      return false;
    }
  };

  onOptionClick(id, option, e) {
    const { questions, currentQuestionIndex } = this.state;
    const { [id]: question } = questions;
    question.marked = option;
    const isCorrect = question.a === option;
    console.log("Marked Answer: ", question.options[option]);
    console.log("Result: ", isCorrect ? "Correct" : "Incorrect");
    if (this.isQuestionLeftInDataset()) {
      this.setState({
        questions: { ...questions, [id]: { ...question, marked: option, isCorrect } },
        currentQuestionIndex: currentQuestionIndex + 1
      });
    } else {
      this.setState({ questions: { ...questions, [id]: { ...question, marked: option, isCorrect } } });
    }
  }

  renderQuestion = ({ question }) => {
    return (
      <div key={question.id} style={{ padding: 20 }}>
        <h3>{question.q}</h3>
        <div
          className="btn btn-primary"
          style={{ marginRight: 20 }}
          key="a"
          onClick={this.onOptionClick.bind(this, question.id, "a")}
        >
          {question.options.a}
        </div>
        <div
          className="btn btn-primary"
          style={{ margin: 20 }}
          key="b"
          onClick={this.onOptionClick.bind(this, question.id, "b")}
        >
          {question.options.b}
        </div>
        <div
          className="btn btn-primary"
          style={{ margin: 20 }}
          key="c"
          onClick={this.onOptionClick.bind(this, question.id, "c")}
        >
          {question.options.c}
        </div>
        <div
          className="btn btn-primary"
          style={{ margin: 20 }}
          key="d"
          onClick={this.onOptionClick.bind(this, question.id, "d")}
        >
          {question.options.d}
        </div>
      </div>
    );
  };

  renderQuestionResult = ({ question }) => {
    const { isCorrect, a, marked } = question;
    return (
      <div key={question.id}>
        {this.renderQuestion({ question })}
        {isCorrect ? (
          <span style={{ color: "green", marginRight: 20, marginLeft: 20 }}>Correct</span>
        ) : (
          <span style={{ color: "red", marginRight: 20, marginLeft: 20 }}>Incorrect</span>
        )}
        <span style={{ marginRight: 20, marginLeft: 20 }}>Marked Answer - {question.options[marked]}</span>
        <span style={{ marginRight: 20, marginLeft: 20 }}>Correct Answer - {question.options[a]}</span>
      </div>
    );
  };

  renderResult() {
    const { questions } = this.state;
    return _.map(questions, question => this.renderQuestionResult({ question }));
  }

  render() {
    const { questions, currentQuestionIndex } = this.state;
    let keys = Object.keys(questions);
    const questionCompleted = currentQuestionIndex === keys.length;
    return (
      <div className="App" style={{ padding: 20 }}>
        <h2 style={{ padding: 20 }}>Questions App</h2>
        {questionCompleted
          ? this.renderResult()
          : this.renderQuestion({ question: questions[keys[currentQuestionIndex]] })}
      </div>
    );
  }
}

export default App;
