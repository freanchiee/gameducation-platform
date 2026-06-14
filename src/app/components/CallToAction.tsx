import { Button } from "../components/ui/button";

const CallToAction = () => {
  return (
    <section className="container mx-auto py-16">
      <div className="bg-gradient-to-r from-gameducation-navy to-gameducation-blue rounded-2xl p-8 md:p-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Ready to Transform Your Classroom?
        </h2>
        
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Join thousands of educators who are using Gameducation to create 
          engaging learning experiences for their students.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="bg-white text-gameducation-navy hover:bg-white/90 text-lg py-6 px-8">
            Sign Up Free
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg py-6 px-8">
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
