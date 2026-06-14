import * as React from "react";
import { Card, CardContent } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

const PlatformPreviews = () => {
  return (
    <section className="container mx-auto py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-gameducation-navy dark:text-white text-center mb-6">
        How Gameducation Works
      </h2>
      <p className="text-center text-lg text-gray-700 dark:text-gray-200 mb-12 max-w-3xl mx-auto">
        Create engaging learning experiences with our intuitive tools and monitor student progress in real-time.
      </p>

      <Tabs defaultValue="creator" className="w-full">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="creator">Content Creation</TabsTrigger>
          <TabsTrigger value="dashboard">Student Dashboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="creator" className="space-y-4">
          <div className="bg-white dark:bg-gameducation-navy/80 rounded-xl shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gameducation-navy dark:text-white mb-4">
              Game-Based from Google Sheets
            </h3>
            <p className="text-gray-700 dark:text-gray-200 mb-6">
              Create flashcards, matching games, MCQs, and more using Google Sheets.
            </p>
            
            <div className="mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <Label htmlFor="google-sheet-url">Google Sheet URL or ID</Label>
                <input 
                  id="google-sheet-url" 
                  type="text" 
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  className="flex-1 p-2 border rounded dark:bg-gameducation-navy/50 dark:border-gray-600"
                />
              </div>
            </div>
            
            <div className="mb-6">
              <h4 className="font-medium mb-3">Game Type</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-2 border-gameducation-blue bg-blue-50 dark:bg-blue-900/20">
                  <CardContent className="flex flex-col items-center pt-6">
                    <div className="text-4xl mb-2">📚</div>
                    <p className="font-medium">Flashcards</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex flex-col items-center pt-6">
                    <div className="text-4xl mb-2">❓</div>
                    <p className="font-medium">Quiz</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="flex flex-col items-center pt-6">
                    <div className="text-4xl mb-2">🧩</div>
                    <p className="font-medium">Matching Game</p>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <Button className="w-full bg-gameducation-blue hover:bg-gameducation-blue/90 text-white">
              Create Game
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="dashboard">
          <div className="bg-white dark:bg-gameducation-navy/80 rounded-xl shadow-lg overflow-hidden">
            <div className="p-4 bg-gameducation-cream dark:bg-gameducation-navy/50 border-b flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <select className="p-2 rounded bg-white dark:bg-gameducation-navy dark:text-white border">
                  <option>Current Session</option>
                </select>
                <select className="p-2 rounded bg-white dark:bg-gameducation-navy dark:text-white border">
                  <option>Class A</option>
                </select>
              </div>
              <Button className="bg-gameducation-blue hover:bg-gameducation-blue/90 text-white">
                Start Strandhoot
              </Button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-5 gap-4 mb-4">
                <div className="col-span-1 font-medium">Students</div>
                <div className="font-medium">Strand 1</div>
                <div className="font-medium">Strand 2</div>
                <div className="font-medium">Strand 3</div>
                <div className="font-medium">Strand 4</div>
              </div>
              
              {[
                { name: "Charlotte", strand1: true, strand2: true, strand3: ["green", "blue", "red"] },
                { name: "Ethan", strand1: "pending", strand2: true, strand3: true },
                { name: "Aiden", strand1: true, strand2: "partial", strand3: true },
                { name: "Isabella", strand1: true, strand2: true, strand3: true }
              ].map((student, index) => (
                <div key={index} className="grid grid-cols-5 gap-4 py-3 border-t">
                  <div className="col-span-1 bg-yellow-100 dark:bg-yellow-900/30 px-3 py-2 rounded">
                    {student.name}
                  </div>
                  <div className="flex justify-center items-center">
                    {student.strand1 === true && 
                      <div className="w-6 h-6 rounded-full bg-gameducation-green flex items-center justify-center text-white">✓</div>
                    }
                    {student.strand1 === "pending" && 
                      <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center text-white">⌛</div>
                    }
                  </div>
                  <div className="flex justify-center items-center">
                    {student.strand2 === true && 
                      <div className="w-6 h-6 rounded-full bg-gameducation-green flex items-center justify-center text-white">✓</div>
                    }
                    {student.strand2 === "partial" && 
                      <div className="w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center text-white">○</div>
                    }
                  </div>
                  <div className="flex justify-center items-center">
                    {student.strand3 === true && 
                      <div className="w-6 h-6 rounded-full bg-gameducation-green flex items-center justify-center text-white">✓</div>
                    }
                    {Array.isArray(student.strand3) && 
                      <div className="flex space-x-1">
                        {student.strand3.map((color, i) => (
                          <div key={i} className={`w-4 h-4 rounded-full bg-${color}-500`}></div>
                        ))}
                      </div>
                    }
                  </div>
                  <div className="flex justify-center items-center">
                    {student.strand3 === true && 
                      <div className="w-6 h-6 rounded-full bg-gameducation-green flex items-center justify-center text-white">✓</div>
                    }
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default PlatformPreviews;
