import { Syringe } from 'lucide-react';
import { Calendar, Clock, User, ChevronUp, ChevronDown, PlusCircle, AlertCircle, CheckCircle } from 'lucide-react';
// import { ToUpperCase } from '../../../../utils/ToUpperCase';
// import { formatDate } from '../../../../utils/formatDate';

export default function VaccineTracking({ sortedLinkList, navigate ,hoveredCard,setHoveredCard,expandedVaccines,toggleVaccine}) {
  return (
   <>
   {sortedLinkList.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4 animate-fadeIn">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-md">
            <Syringe className="text-blue-600 w-12 h-12" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">No Vaccination Records</h2>
          <p className="text-gray-500 text-base max-w-md mb-4">
            It looks like there are no vaccination records available for tracking at the moment. Check back later or schedule a new appointment.
          </p>
          <button
            onClick={() => navigate("/variantsPage")}
            className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
          >
            Booking Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedLinkList.map((chain, index) => {
            const vaccineName = chain[0]?.vaccineName || 'Unknown Vaccine';
            const completed = chain.filter(item =>
              item.status.toLowerCase() === 'success'
            ).length;
            const total = chain.length;
            const percentage = Math.round((completed / total) * 100) || 0;

            return (
              <div
                key={index}
                className="transform transition-all duration-300 ease-in-out"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="flex flex-row-reverse items-center gap-4 mb-2">
                  <button
                    onClick={() => toggleVaccine(index)}
                    className={`p-3 rounded-xl transition-all duration-300 ${hoveredCard === index ? 'bg-indigo-100 text-indigo-600' : 'hover:bg-indigo-50 text-gray-400'}`}
                  >
                    {expandedVaccines[index] ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <div className="flex-1 bg-white p-5 rounded-xl border border-gray-100 hover:border-indigo-200 transition-all duration-300 hover:shadow-md">
                    <ProgressBar
                      vaccineName={vaccineName}
                      current={completed}
                      total={total}
                      percentage={percentage}
                      doses={chain}
                    />
                  </div>
                </div>

                {expandedVaccines[index] && (
                  <div className="ml-12 mt-6 space-y-6 border-l-2 border-indigo-100 pl-8 relative animate-fadeIn">
                    {chain.map((dose, doseIndex) => {
                      const isOverdueVaccine = isOverdue(dose.maximumIntervalDate);

                      return (
                        <div
                          key={doseIndex}
                          className="relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                        >
                          <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-[40px] top-10 ring-4 ring-white">
                            <div className="absolute w-4 h-4 bg-indigo-500 rounded-full animate-ping opacity-20"></div>
                          </div>

                          <div className={`bg-white p-6 rounded-2xl shadow-sm border transition-all duration-300 ${dose.status.toLowerCase() === 'cancel'
                            ? 'border-red-200 hover:border-red-300'
                            : isOverdueVaccine
                              ? 'border-amber-200 hover:border-amber-300'
                              : 'border-gray-100 hover:border-indigo-200'
                            }`}>
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <span className={`${getStatusColor(dose.status)} p-3 rounded-xl transition-colors duration-300`}>
                                  {getStatusIcon(dose.status)}
                                </span>
                                <div>
                                  <h4 className="font-semibold text-gray-800 text-lg">
                                    Dose {doseIndex + 1}
                                  </h4>
                                  <span className="text-sm text-gray-500">
                                    {dose.vaccineName}
                                  </span>
                                </div>
                              </div>
                              <div className='flex items-center gap-2'>
                                {findSchedule.some(item => item.trackingID === dose.trackingID) && (
                                  <button
                                    onClick={() => handleOpenModalReSchedule(dose.trackingID, dose.vaccinationDate, dose.vaccineName)}
                                    className='bg-indigo-500 text-white px-4 py-2 rounded-xl'
                                  >
                                    ReSchedule
                                  </button>
                                )}
                                <span className={`${isOverdueVaccine ? getStatusColor('overdue') : getStatusColor(dose.status)} px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300`}>
                                  {isOverdueVaccine ? 'Overdue' : ToUpperCase(dose.status)}
                                </span>
                              </div>
                            </div>

                            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-3">
                                {dose.vaccinationDate && (
                                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                                    <Calendar className="w-5 h-5 text-indigo-500" />
                                    <div>
                                      <span className="font-medium block text-gray-700">Vaccination Date</span>
                                      <span className="text-gray-600 text-sm">{formatDate(dose.vaccinationDate)}</span>
                                    </div>
                                  </div>
                                )}

                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                                  <User className="w-5 h-5 text-indigo-500" />
                                  <div>
                                    <span className="font-medium block text-gray-700">Parent</span>
                                    <span className="text-gray-600 text-sm">{ToUpperCase(dose.userName)}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-3">
                                {dose.minimumIntervalDate && dose.maximumIntervalDate && (
                                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all duration-300">
                                    <Clock className="w-5 h-5 text-indigo-500 mt-1" />
                                    <div>
                                      <span className="flex flex-col gap-2 font-medium text-gray-700">Maximum Vaccination Date</span>
                                      <span className="text-gray-600 text-sm block">{formatDate(dose.maximumIntervalDate)}</span>
                                    </div>
                                  </div>
                                )}
                                {dose.reaction && (
                                  <div className={`flex items-center gap-3 p-4 ${dose.reaction === 'Nothing' ? 'bg-amber-50' : 'bg-green-50'} rounded-xl transition-all duration-300`}>
                                    {dose.reaction === 'Nothing' ? (
                                      <AlertCircle className="w-5 h-5 text-amber-500" />
                                    ) : (
                                      <CheckCircle className="w-5 h-5 text-green-500" />
                                    )}

                                    <div className="flex-1">
                                      <span className={`font-medium block ${dose.reaction === 'Nothing' ? 'text-amber-700' : 'text-green-700'}`}>
                                        Reaction
                                      </span>

                                      {checkReaction.some(item => item.trackingID === dose.trackingID) ? (
                                        <button
                                          onClick={() => setIsInput(prev => ({ ...prev, [dose.trackingID]: true }))}
                                          className={`mt-2 flex items-center gap-2 ${dose.reaction === 'Nothing' ? 'text-amber-600 hover:text-amber-700' : 'text-green-600 hover:text-green-700'} transition-colors text-sm`}
                                        >
                                          <PlusCircle className="w-4 h-4" />
                                          Add Reaction
                                        </button>
                                      ) : (
                                        <span className={dose.reaction === 'Nothing' ? 'text-amber-600' : 'text-green-600'}>
                                          {(dose.status).toLowerCase() !== 'success'
                                            ? 'After completed vaccination, you can add your reaction'
                                            : dose.reaction}
                                        </span>
                                      )}

                                      {isInput[dose.trackingID] && (
                                        <div className="mt-2 space-y-2">
                                          <textarea
                                            type="text"
                                            placeholder="Describe any reactions..."
                                            value={reaction[dose.trackingID] || ""}
                                            onChange={(e) => setReaction(prev => ({ ...prev, [dose.trackingID]: e.target.value }))}
                                            className={`w-full p-2 text-sm border ${dose.reaction === 'Nothing' ? 'border-amber-200 focus:ring-amber-300 focus:border-amber-300' : 'border-green-200 focus:ring-green-300 focus:border-green-300'} rounded-lg focus:ring-2 outline-none resize-none`}
                                            rows="2"
                                          />
                                          <div className="flex justify-end gap-2">
                                            <button
                                              onClick={() => setIsInput(prev => ({ ...prev, [dose.trackingID]: false }))}
                                              className={`px-3 py-1 text-sm ${dose.reaction === 'Nothing' ? 'text-amber-700 bg-amber-50 hover:bg-amber-100' : 'text-green-700 bg-green-50 hover:bg-green-100'} rounded-lg transition-colors`}
                                            >
                                              Cancel
                                            </button>
                                            <button
                                              onClick={() => handleSubmit(dose.trackingID)}
                                              className={`px-3 py-1 text-sm text-white ${dose.reaction === 'Nothing' ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-500 hover:bg-green-600'} rounded-lg transition-colors`}
                                            >
                                              Save
                                            </button>
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
   
   </>
  );
}
