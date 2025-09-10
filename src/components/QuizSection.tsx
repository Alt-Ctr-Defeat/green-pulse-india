import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Brain, CheckCircle, XCircle, RotateCcw, Award } from "lucide-react";
import { toast } from "sonner";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  const questions: Question[] = [
    {
      id: 1,
      question: "What percentage of waste in India is organic waste that can be composted?",
      options: ["20-30%", "40-50%", "60-70%", "80-90%"],
      correctAnswer: 2,
      explanation: "Approximately 60-70% of waste in India is organic waste like food scraps and garden waste, which can be easily composted to create nutrient-rich soil."
    },
    {
      id: 2,
      question: "Which bin should you use for plastic bottles?",
      options: ["Green (Organic)", "Blue (Recyclable)", "Gray (General)", "Red (Hazardous)"],
      correctAnswer: 1,
      explanation: "Plastic bottles are recyclable materials and should always go in the blue recyclable bin to be processed and turned into new products."
    },
    {
      id: 3,
      question: "What is the primary benefit of waste segregation at source?",
      options: [
        "Reduces collection time",
        "Improves recycling efficiency", 
        "Saves transportation costs",
        "All of the above"
      ],
      correctAnswer: 3,
      explanation: "Waste segregation at source provides all these benefits: faster collection, better recycling rates, and reduced transportation costs, making the entire system more efficient."
    },
    {
      id: 4,
      question: "How long does it take for a plastic bag to decompose naturally?",
      options: ["1-2 years", "10-20 years", "100-500 years", "1000+ years"],
      correctAnswer: 2,
      explanation: "Plastic bags take 100-500 years to decompose naturally, which is why proper disposal and recycling are crucial for environmental protection."
    },
    {
      id: 5,
      question: "Which Indian city was the first to implement mandatory waste segregation?",
      options: ["Mumbai", "Bangalore", "Chennai", "Pune"],
      correctAnswer: 1,
      explanation: "Bangalore was one of the first Indian cities to implement mandatory waste segregation rules, setting an example for other cities to follow."
    },
    {
      id: 6,
      question: "What should you do with electronic waste (e-waste)?",
      options: [
        "Throw in general waste bin",
        "Take to authorized e-waste collection centers",
        "Burn it safely",
        "Bury it in the ground"
      ],
      correctAnswer: 1,
      explanation: "E-waste contains harmful chemicals and valuable materials. It should always be taken to authorized e-waste collection centers for proper recycling and safe disposal."
    },
    {
      id: 7,
      question: "What is the main component of biogas produced from organic waste?",
      options: ["Carbon dioxide", "Methane", "Hydrogen", "Nitrogen"],
      correctAnswer: 1,
      explanation: "Biogas produced from organic waste primarily contains methane (50-70%), which can be used as a clean cooking fuel or for electricity generation."
    },
    {
      id: 8,
      question: "Which of these is NOT a benefit of composting organic waste?",
      options: [
        "Reduces landfill burden",
        "Creates nutrient-rich fertilizer",
        "Generates electricity",
        "Reduces greenhouse gas emissions"
      ],
      correctAnswer: 2,
      explanation: "While composting provides many benefits like reducing landfill waste and creating fertilizer, it doesn't directly generate electricity. However, anaerobic composting can produce biogas for energy."
    }
  ];

  const startQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setAnsweredQuestions(new Array(questions.length).fill(false));
    setSelectedAnswer("");
  };

  const handleAnswerSubmit = () => {
    if (!selectedAnswer) {
      toast.error("Please select an answer");
      return;
    }

    const answerIndex = parseInt(selectedAnswer);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    
    if (correct) {
      setScore(score + 1);
      toast.success("Correct!", {
        description: questions[currentQuestion].explanation
      });
    } else {
      toast.error("Incorrect", {
        description: questions[currentQuestion].explanation
      });
    }

    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer("");
      } else {
        setShowResult(true);
      }
    }, 3000);
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer("");
    setAnsweredQuestions([]);
  };

  const getScoreMessage = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return { message: "Excellent! You're a waste management expert!", color: "text-primary" };
    if (percentage >= 60) return { message: "Good job! You have solid knowledge.", color: "text-accent" };
    if (percentage >= 40) return { message: "Not bad! Keep learning about sustainability.", color: "text-warning" };
    return { message: "Keep practicing! Every expert was once a beginner.", color: "text-muted-foreground" };
  };

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4 text-primary border-primary/20">
          <Brain className="mr-2 h-4 w-4" />
          Interactive Quiz
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Test Your <span className="text-gradient">Sustainability Knowledge</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Challenge yourself with questions about waste management, recycling, and environmental sustainability. 
          Learn interesting facts while testing your knowledge!
        </p>
      </div>

      {!quizStarted ? (
        <div className="max-w-2xl mx-auto">
          <Card className="card-eco p-8 text-center">
            <Brain className="h-16 w-16 text-primary mx-auto mb-6 animate-pulse-eco" />
            <h3 className="text-2xl font-bold mb-4">Ready for the Challenge?</h3>
            <p className="text-muted-foreground mb-6">
              Test your knowledge with {questions.length} questions about waste management and sustainability in India.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8 text-sm">
              <div className="p-3 bg-primary/10 rounded-lg">
                <div className="font-semibold text-primary">{questions.length} Questions</div>
                <div className="text-muted-foreground">Multiple Choice</div>
              </div>
              <div className="p-3 bg-accent/10 rounded-lg">
                <div className="font-semibold text-accent">Educational</div>
                <div className="text-muted-foreground">Learn as you play</div>
              </div>
              <div className="p-3 bg-secondary/20 rounded-lg">
                <div className="font-semibold">No Time Limit</div>
                <div className="text-muted-foreground">Take your time</div>
              </div>
            </div>
            <Button className="btn-eco" onClick={startQuiz}>
              Start Quiz
            </Button>
          </Card>
        </div>
      ) : showResult ? (
        <div className="max-w-2xl mx-auto">
          <Card className="card-eco p-8 text-center">
            <Award className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-3xl font-bold mb-4">Quiz Completed!</h3>
            <div className="text-4xl font-bold text-gradient mb-2">
              {score}/{questions.length}
            </div>
            <div className="text-lg mb-6">
              Score: {Math.round((score / questions.length) * 100)}%
            </div>
            <p className={`text-lg mb-8 ${getScoreMessage().color}`}>
              {getScoreMessage().message}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-eco" onClick={resetQuiz}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button variant="outline" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Back to Top
              </Button>
            </div>
          </Card>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Question {currentQuestion + 1} of {questions.length}</span>
              <span className="text-sm text-muted-foreground">Score: {score}</span>
            </div>
            <Progress value={((currentQuestion + 1) / questions.length) * 100} className="h-2" />
          </div>

          {/* Question */}
          <Card className="card-eco p-8">
            <h3 className="text-xl font-semibold mb-6 leading-relaxed">
              {questions[currentQuestion].question}
            </h3>

            <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                  <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-sm">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="mt-8 flex justify-between items-center">
              <div className="flex space-x-2">
                {questions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${
                      index < currentQuestion
                        ? 'bg-primary'
                        : index === currentQuestion
                        ? 'bg-accent'
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
              <Button 
                className="btn-eco" 
                onClick={handleAnswerSubmit}
                disabled={!selectedAnswer}
              >
                {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Quiz Benefits */}
      <div className="mt-16 grid md:grid-cols-3 gap-8">
        <Card className="card-eco p-6 text-center">
          <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-3">Learn Real Facts</h3>
          <p className="text-sm text-muted-foreground">
            Discover important statistics and facts about waste management in India.
          </p>
        </Card>

        <Card className="card-eco p-6 text-center">
          <Brain className="h-12 w-12 text-accent mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-3">Build Awareness</h3>
          <p className="text-sm text-muted-foreground">
            Increase your environmental consciousness and sustainability knowledge.
          </p>
        </Card>

        <Card className="card-eco p-6 text-center">
          <Award className="h-12 w-12 text-warning mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-3">Track Progress</h3>
          <p className="text-sm text-muted-foreground">
            Monitor your learning journey and become a sustainability champion.
          </p>
        </Card>
      </div>
    </div>
  );
};

export default QuizSection;