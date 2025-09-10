import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogAction } from "@/components/ui/alert-dialog";
import { GamepadIcon, RotateCcw, Trophy, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

interface WasteItem {
  id: string;
  name: string;
  category: 'organic' | 'recyclable' | 'general';
  emoji: string;
}

interface DustBin {
  id: string;
  type: 'organic' | 'recyclable' | 'general';
  color: string;
  label: string;
  emoji: string;
}

const WasteGameSection = () => {
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [currentWasteIndex, setCurrentWasteIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [showFineAlert, setShowFineAlert] = useState(false);
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const dragItemRef = useRef<HTMLDivElement>(null);

  const wasteItems: WasteItem[] = [
    { id: '1', name: 'Apple Core', category: 'organic', emoji: '🍎' },
    { id: '2', name: 'Plastic Bottle', category: 'recyclable', emoji: '🍼' },
    { id: '3', name: 'Paper Cup', category: 'general', emoji: '🥤' },
    { id: '4', name: 'Banana Peel', category: 'organic', emoji: '🍌' },
    { id: '5', name: 'Aluminum Can', category: 'recyclable', emoji: '🥤' },
    { id: '6', name: 'Cigarette Butt', category: 'general', emoji: '🚬' },
    { id: '7', name: 'Vegetable Waste', category: 'organic', emoji: '🥬' },
    { id: '8', name: 'Glass Bottle', category: 'recyclable', emoji: '🍾' },
    { id: '9', name: 'Tissue Paper', category: 'general', emoji: '🧻' },
    { id: '10', name: 'Cardboard', category: 'recyclable', emoji: '📦' }
  ];

  const dustBins: DustBin[] = [
    { id: 'organic', type: 'organic', color: 'bg-green-500', label: 'Organic Waste', emoji: '🟢' },
    { id: 'recyclable', type: 'recyclable', color: 'bg-blue-500', label: 'Recyclable', emoji: '🔵' },
    { id: 'general', type: 'general', color: 'bg-gray-500', label: 'General Waste', emoji: '⚫' }
  ];

  const currentWaste = wasteItems[currentWasteIndex];

  const handleBinClick = (binType: string) => {
    if (!gameStarted || !currentWaste) return;

    if (binType === currentWaste.category) {
      // Correct choice
      setScore(score + 10);
      toast.success(`Correct! +10 points`, {
        description: `${currentWaste.name} belongs in ${binType} waste.`
      });
      nextWaste();
    } else {
      // Wrong choice
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      
      if (newMistakes >= 3) {
        setShowFineAlert(true);
        setGameStarted(false);
      } else {
        toast.error(`Wrong bin! ${3 - newMistakes} warnings left`, {
          description: `${currentWaste.name} should go in ${currentWaste.category} waste.`
        });
      }
    }
  };

  const nextWaste = () => {
    if (currentWasteIndex < wasteItems.length - 1) {
      setCurrentWasteIndex(currentWasteIndex + 1);
      setProgress(((currentWasteIndex + 1) / wasteItems.length) * 100);
    } else {
      // Game completed
      toast.success("Congratulations! Game completed!", {
        description: `Final score: ${score + 10} points`
      });
      setLevel(level + 1);
      resetGame();
    }
  };

  const resetGame = () => {
    setScore(0);
    setMistakes(0);
    setCurrentWasteIndex(0);
    setGameStarted(false);
    setProgress(0);
  };

  const startGame = () => {
    setGameStarted(true);
    setScore(0);
    setMistakes(0);
    setCurrentWasteIndex(0);
    setProgress(0);
    toast.success("Game started! Sort waste into correct bins.");
  };

  return (
    <div className="container mx-auto px-6">
      <div className="text-center mb-16">
        <Badge variant="outline" className="mb-4 text-primary border-primary/20">
          <GamepadIcon className="mr-2 h-4 w-4" />
          Waste Segregation Game
        </Badge>
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Learn Through <span className="text-gradient">Interactive Gaming</span>
        </h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Test your waste segregation knowledge! Sort different types of waste into the correct bins. 
          Get 3 wrong answers and you'll face a fine of ₹500 - just like in real life!
        </p>
      </div>

      {/* Game Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="card-eco p-4 text-center">
          <div className="text-2xl font-bold text-primary">{score}</div>
          <div className="text-sm text-muted-foreground">Score</div>
        </Card>
        <Card className="card-eco p-4 text-center">
          <div className="text-2xl font-bold text-warning">{mistakes}/3</div>
          <div className="text-sm text-muted-foreground">Mistakes</div>
        </Card>
        <Card className="card-eco p-4 text-center">
          <div className="text-2xl font-bold text-accent">{level}</div>
          <div className="text-sm text-muted-foreground">Level</div>
        </Card>
        <Card className="card-eco p-4 text-center">
          <div className="text-2xl font-bold text-secondary-foreground">{Math.round(progress)}%</div>
          <div className="text-sm text-muted-foreground">Progress</div>
        </Card>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <Progress value={progress} className="h-3" />
      </div>

      {/* Game Area */}
      <div className="bg-gradient-earth rounded-2xl p-8 md:p-12 mb-8">
        {!gameStarted ? (
          <div className="text-center">
            <div className="mb-8">
              <GamepadIcon className="h-16 w-16 text-primary mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-4">Ready to Play?</h3>
              <p className="text-muted-foreground mb-6">
                Sort waste items into the correct bins. Remember: 3 wrong answers = ₹500 fine!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-eco" onClick={startGame}>
                Start Game
              </Button>
              <Button variant="outline" onClick={resetGame}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            {/* Current Waste Item */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Sort this waste item:</h3>
              <Card 
                ref={dragItemRef}
                className="waste-item inline-block p-6 bg-background/80 backdrop-blur-sm border-2 border-primary/20 hover:border-primary/50"
              >
                <div className="text-6xl mb-2">{currentWaste?.emoji}</div>
                <div className="text-lg font-medium">{currentWaste?.name}</div>
              </Card>
            </div>

            {/* Dust Bins */}
            <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
              {dustBins.map((bin) => (
                <Card
                  key={bin.id}
                  className="dustbin p-6 cursor-pointer bg-background/60 backdrop-blur-sm border-2 border-transparent hover:border-primary/50 transition-all duration-200"
                  onClick={() => handleBinClick(bin.type)}
                >
                  <div className="text-4xl mb-3">{bin.emoji}</div>
                  <div className={`text-sm font-medium mb-2 ${
                    bin.type === 'organic' ? 'text-green-600' :
                    bin.type === 'recyclable' ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {bin.label}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {bin.type === 'organic' && 'Food waste, garden waste'}
                    {bin.type === 'recyclable' && 'Plastic, glass, metal, paper'}
                    {bin.type === 'general' && 'Non-recyclable items'}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Game Instructions */}
      <Card className="card-eco p-6">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <Trophy className="mr-2 h-5 w-5 text-primary" />
          Game Rules & Tips
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2 text-green-600">Organic Waste (Green Bin)</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Food scraps and leftovers</li>
              <li>• Fruit and vegetable peels</li>
              <li>• Garden waste and leaves</li>
              <li>• Biodegradable materials</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-blue-600">Recyclable (Blue Bin)</h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Plastic bottles and containers</li>
              <li>• Glass bottles and jars</li>
              <li>• Metal cans and foil</li>
              <li>• Paper and cardboard</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 bg-warning/10 rounded-lg">
          <div className="flex items-center mb-2">
            <AlertTriangle className="mr-2 h-4 w-4 text-warning" />
            <span className="font-medium text-warning">Important:</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Just like in real waste management systems, incorrect segregation has consequences. 
            After 3 mistakes, you'll face a fine of ₹500 to emphasize the importance of proper waste sorting.
          </p>
        </div>
      </Card>

      {/* Fine Alert Dialog */}
      <AlertDialog open={showFineAlert} onOpenChange={setShowFineAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center text-destructive">
              <AlertTriangle className="mr-2 h-5 w-5" />
              Fine Imposed!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base">
              You have made 3 incorrect waste segregation attempts. In real-life scenarios, 
              improper waste disposal results in environmental fines.
              <br /><br />
              <span className="font-semibold text-destructive text-lg">Fine Amount: ₹500</span>
              <br /><br />
              This demonstrates the importance of learning proper waste segregation to protect 
              our environment and avoid penalties.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => {
              setShowFineAlert(false);
              resetGame();
            }}>
              Try Again
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default WasteGameSection;