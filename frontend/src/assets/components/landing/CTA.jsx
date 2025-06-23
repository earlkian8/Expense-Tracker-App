import { Link } from "react-router-dom";

const CTA = () => {
     return (
        <section className="py-20 bg-gradient-to-r from-blue-600 to-teal-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to take control?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join a fresh approach to finance. Your journey starts here.
          </p>
          <Link to="/register" className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            Start Saving Today
          </Link>
        </div>
      </section>
     );
}

export default CTA