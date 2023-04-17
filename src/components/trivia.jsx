import { useEffect } from "react";
import { useState } from "react";
import "../app.css";   
import useSound from "use-sound";
import Play from "../sounds/src_sounds_play.mp3";
import Correct from "../sounds/src_sounds_correct.mp3";
import Wrong from "../sounds/src_sounds_wrong.mp3";

function Trivia({data, questionNumber, setStop, setQuestionNumber}) {

    const [className, setclassName] = useState("answer");
    const [selectedAnswer, setselectedAnswer] = useState(null);
    const [question, setQuestion] = useState(null);

    const[letsPlay] = useSound(Play);
    const[correctAnswer] = useSound(Correct);
    const[wrongAnswer] = useSound(Wrong);


    useEffect(()=> {
        setQuestion(data[questionNumber-1]);
    },[data,questionNumber]);

    const delay = (duration, callback) => {
        setTimeout(()=>{
            callback();
        },duration);
    };

    useEffect(()=>{
        letsPlay();
    },[letsPlay]);

    const handleClick=(a)=>{
        setselectedAnswer(a);
        setclassName("answer active");

        delay(3000, ()=> 
            setclassName(a.correct ? "answer correct" : "answer wrong")
        );

        delay(5000, ()=> {
               if(a.correct){
                    correctAnswer();
                    delay(1000,()=>{
                        setQuestionNumber((prev) => prev+1);
                        setselectedAnswer(null);
                    });
               }
               else{
                    wrongAnswer();
                    delay(1000, ()=>{
                        setStop(true);
                    });
               }
        });
    };

    return ( 
        <div className="trivia">
            <div className="question">
                {question?.question}
            </div>
            <div className="answers">
                {question?.answers.map(c=>
                    <div className={selectedAnswer === c ? className : "answer"} onClick={() =>handleClick(c)}>{c.text}</div>    
                )}
                
            </div>
        </div>
     );
}

export default Trivia;