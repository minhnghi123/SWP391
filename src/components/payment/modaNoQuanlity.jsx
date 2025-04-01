import { AlertCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const ModalNoQuantity = ({ onClose, shortageInfo }) => {
  const navigate = useNavigate();
  console.log(shortageInfo)
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="max-w-lg w-full bg-white rounded-3xl shadow-2xl p-8 border border-red-100"
        >
          <div className="flex flex-col items-center text-center">
            {/* Close Button */}
            <button
              onClick={() => onClose(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <XCircle className="w-6 h-6" />
            </button>

            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
              className="mb-8 p-4 rounded-full bg-red-50 group hover:scale-110 transition-all duration-300"
            >
              <AlertCircle className="w-14 h-14 text-red-500" />
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-red-900 mb-4"
            >
              Insufficient Quantity
            </motion.h2>
            <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8 rounded-full" />

            {/* Description */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-700 mb-8 max-w-md leading-relaxed text-lg"
            >
              The current vaccine quantity is not sufficient to meet the vaccination demand. Please check the information below:
            </motion.p>

            {/* Shortage Details */}
            {shortageInfo && shortageInfo.shortageVaccines.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-red-50/80 p-6 rounded-2xl w-full mb-8 text-left border border-red-100"
              >
                <h3 className="text-lg font-semibold text-red-800 mb-4">Shortage Details</h3>
                <ul className="space-y-4">
                  {shortageInfo.shortageVaccines.map((shortage, index) => (
                    <li key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-700">{shortage.name}</span>
                        <span className="font-semibold text-red-700">
                          {shortage.available} / {shortage.required}
                        </span>
                      </div>
                      <div className="text-sm text-red-600 bg-red-100/50 px-3 py-1 rounded-full inline-block">
                        Shortage: {shortage.shortage} doses
                      </div>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex justify-center gap-4 w-full"
            >
              <Button
                onClick={() => navigate('/variantsPage')}
                className="bg-red-600 text-white hover:bg-red-700 rounded-full px-8 py-3 flex items-center space-x-2 transition-all duration-200 font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Vaccination</span>
              </Button>
              <Button
                onClick={() => onClose(false)}
                className="bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full px-8 py-3 flex items-center space-x-2 transition-all duration-200 font-medium"
              >
                <span>Close</span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ModalNoQuantity;