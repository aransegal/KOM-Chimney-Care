import { Star } from "lucide-react";

const reviews = [
  { name: "Sarah M.", text: "Technician arrived within 2 hours of my call. Replaced our water heater quickly and cleaned up everything. Amazing service!", stars: 5, date: "2 weeks ago" },
  { name: "James K.", text: "Fair pricing, no hidden charges. Our tankless unit is running perfectly. Will definitely call KOM again.", stars: 5, date: "1 month ago" },
  { name: "Linda P.", text: "Had an emergency at 11pm on a Sunday. They came out and fixed it the same night. Couldn't believe it!", stars: 5, date: "3 weeks ago" },
  { name: "Tom R.", text: "Very professional and knowledgeable. Explained exactly what was wrong and gave me options. Highly recommend.", stars: 5, date: "1 week ago" },
  { name: "Maria G.", text: "Best plumbing service I've ever used. Honest, fast, and great value. New KOM heater is fantastic.", stars: 5, date: "2 months ago" },
];

export default function ReviewsStrip() {
  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 text-center">
        <span className="text-orange-600 font-semibold text-sm tracking-widest uppercase mb-2 block">Customer Reviews</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Trusted by Thousands of Homeowners
        </h2>
        <div className="flex items-center justify-center gap-2 mt-4">
          {[1,2,3,4,5].map(i => <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />)}
          <span className="text-slate-600 font-medium ml-1">4.9/5 from 1,200+ reviews</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {reviews.map((review) => (
          <div key={review.name} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div className="flex items-center gap-1 mb-3">
              {Array.from({ length: review.stars }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">"{review.text}"</p>
            <div className="flex items-center justify-between">
              <span className="text-slate-900 font-semibold text-sm">{review.name}</span>
              <span className="text-slate-400 text-xs">{review.date}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}