import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../ui/dialog';
import { Button } from '../ui/button';

// Sample icons or SVGs (Enhanced Calendar Icon with better styling)
const CalendarIcon = () => (
  <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" className="text-blue-500">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="currentColor" />
    <line x1="16" y1="2" x2="16" y2="6" stroke="currentColor" />
    <line x1="8" y1="2" x2="8" y2="6" stroke="currentColor" />
    <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" />
    <text x="12" y="16" fontSize="8" textAnchor="middle" fill="#3B82F6">28</text>
  </svg>
);

const ModalLasterNews = ({ isOpen, setIsOpen, title, description, date, author, topic }) => {
  // Default longer fake news description if none is provided
  const longDescription = description || `
    In a groundbreaking development, health authorities have announced the release of a new generation of flu vaccines designed to combat the ever-evolving seasonal flu strains. These vaccines, developed after years of rigorous research and clinical trials, promise to offer enhanced protection against the most common and dangerous flu viruses circulating this season. Unlike previous vaccines, this new formula incorporates advanced mRNA technology, similar to that used in COVID-19 vaccines, allowing for faster adaptation to emerging strains. Health centers across the country have begun rolling out the vaccine, with priority given to vulnerable populations such as the elderly, young children, and individuals with compromised immune systems. Dr. Johnson, a leading expert in infectious diseases, stated, "This is a significant step forward in our fight against seasonal flu. We expect to see a dramatic reduction in hospitalizations and severe cases this year." The vaccine is available free of charge at most public health facilities, and officials are urging the public to get vaccinated before the peak flu season hits in late winter. Additionally, the health department has launched a nationwide awareness campaign to educate the public on the importance of vaccination, proper hygiene practices, and early symptom recognition to curb the spread of the virus. Local clinics are also offering extended hours to accommodate the expected high demand for the vaccine. Experts recommend scheduling an appointment as soon as possible to ensure availability, as supplies may be limited in some areas due to the unprecedented demand.
  `;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-2xl p-8 rounded-xl bg-white shadow-2xl border border-gray-100 max-h-[80vh] overflow-y-auto">
        {/* Dialog Header */}
        <DialogHeader className="mb-6">
          <DialogTitle className="text-3xl font-extrabold text-blue-600 tracking-tight">
            Latest News
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-lg mt-2">
            Stay updated with the latest in {topic}.
          </DialogDescription>
        </DialogHeader>

        {/* News Card */}
        <div className="relative border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-blue-50 to-white shadow-lg hover:shadow-xl transition-all duration-300">
          {/* Topic and Date */}
          <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
            <span className="flex items-center font-medium text-blue-500">
              <span className="mr-2 text-blue-500">🏥</span>
              {topic}
            </span>
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
              {date}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-blue-700 mb-3 leading-tight">
            {title}
          </h3>

          {/* Calendar Icon (Optional, for visual flair) */}
          <div className="flex justify-center mb-4">
            <CalendarIcon />
          </div>

          {/* Description */}
          <p className="text-gray-600 text-base leading-relaxed mb-4">
            {longDescription}
          </p>

          {/* Author and Read More */}
          <div className="flex flex-row-reverse justify-between items-center">
            <span className="text-sm text-gray-500 font-medium">
              By {author}
            </span>
           
          </div>

          {/* Subtle Decorative Element */}
          <div className="absolute top-0 left-0 w-16 h-1 bg-blue-500 rounded-tl-xl"></div>
        </div>

        {/* Dialog Footer */}
        <DialogFooter className="mt-8">
          <Button
            onClick={() => setIsOpen(false)}
            className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-300 font-semibold py-2 px-6 rounded-full"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalLasterNews;