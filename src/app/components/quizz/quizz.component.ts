import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string =""

  questionIndex:number =0
  questionMaxIndex:number=0

  started:boolean = false
  finished:boolean = false
  restarted:boolean = false

  finalAnswer:string = ''

  constructor() { }

  ngOnInit(): void {
    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }

  }

  start(){
    this.started = true
    this.finalAnswer = ''
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex]    
    }else{
      this.finalAnswer = await this.checkResult(this.answers)
      this.finished = true
      this.restarted = false
      this.answerSelected = quizz_questions.results[this.finalAnswer as keyof typeof quizz_questions.results ]
    }

  }

  async checkResult(anwsers:string[]){

    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }

  restart() {
    this.restarted = true
    this.finished = false
    this.started = true

    this.answers = []
    this.finalAnswer = ''
    this.answerSelected = ''

    this.questionIndex = 0
    this.questionSelected = this.questions[this.questionIndex]    
  }

}


