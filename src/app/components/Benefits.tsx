import { Check } from "lucide-react";

const Benefits = () => {
  const benefits = [
    "Increase student engagement with gamified learning",
    "Track student progress with detailed analytics",
    "Create customized games for any subject",
    "Easy to use for teachers and students",
    "Accessible on any device",
    "Aligned with curriculum standards"
  ];

  return (
    <section className="container mx-auto py-16 bg-white rounded-xl shadow-sm my-16">
      <div className="flex flex-col md:flex-row items-center gap-8 p-8">
        <div className="flex-1">
          <h2 className="text-3xl md:text-4xl font-bold text-gameducation-navy mb-6">
            Why Choose Gameducation
          </h2>
          
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="bg-gameducation-green rounded-full p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <p className="text-gray-700">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex-1 flex justify-center">
          <div className="bg-gameducation-cream rounded-xl shadow-lg p-6 animate-pulse-light">
            <h3 className="text-2xl font-bold text-gameducation-navy mb-4">
              Most Popular Templates
            </h3>
            <ul className="space-y-3">
              <li className="bg-white rounded-lg p-3 shadow-sm">Science Quiz Bowl</li>
              <li className="bg-white rounded-lg p-3 shadow-sm">Math Challenge</li>
              <li className="bg-white rounded-lg p-3 shadow-sm">Historical Timeline</li>
              <li className="bg-white rounded-lg p-3 shadow-sm">Language Memory Match</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
