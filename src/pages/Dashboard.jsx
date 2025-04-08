import { useState, useEffect } from 'react';
import {
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Mail,
  User,
  MessageSquare,
  X,
  ArrowRight
} from 'lucide-react';
import { useUserStore } from '../stores/useUserStore';

export default function Dashboard() {
  const { feedback, getFeedback } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await getFeedback();
      } catch (err) {
        setError('Failed to fetch feedback data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getFeedback]);

  const filteredData = feedback.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.message.toLowerCase().includes(query) ||
      item.fullName.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query)
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const refreshData = () => {
    setLoading(true);
    getFeedback().finally(() => setLoading(false));
  };

  const handleCardClick = (item) => {
    setSelectedFeedback(item);
  };

  const closeModal = () => {
    setSelectedFeedback(null);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900">
        <div className="text-center p-8 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Error</h2>
          <p className="text-gray-300">{error}</p>
          <button
            onClick={refreshData}
            className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded hover:bg-emerald-700 flex items-center justify-center mx-auto"
          >
            <RefreshCw size={16} className="mr-2" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold text-emerald-400">Feedback Dashboard</h2>
          <p className="mt-2 text-gray-300">Review user feedback submissions</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow mb-8">
          <h3 className="text-sm font-medium text-gray-400">Total Feedback</h3>
          <p className="text-2xl font-bold text-white">{feedback.length}</p>
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search feedback..."
                className="pl-10 pr-4 py-2 w-full bg-gray-700 border border-gray-600 rounded-md 
                text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <button
              onClick={refreshData}
              className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 flex items-center justify-center"
            >
              <RefreshCw size={18} className={`${loading ? 'animate-spin' : ''} mr-2`} />
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : paginatedData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedData.map((feedback) => (
              <div 
                key={feedback.id} 
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg overflow-hidden 
                hover:shadow-xl transition-all transform hover:-translate-y-1 duration-200 cursor-pointer group"
                onClick={() => handleCardClick(feedback)}
              >
                <div className="p-5 relative">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mr-3 shadow-md">
                      <User className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-white">{feedback.fullName}</h3>
                      <div className="flex items-center text-sm text-gray-400">
                        <Mail className="h-4 w-4 mr-1" />
                        {feedback.email}
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-700 bg-opacity-40 p-4 rounded-lg">
                    <div className="flex">
                      <MessageSquare className="h-5 w-5 text-emerald-400 mr-2 mt-1 flex-shrink-0" />
                      <p className="text-gray-200 leading-relaxed line-clamp-3">{feedback.message}</p>
                    </div>
                  </div>
                  
                  <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-5 w-5 text-emerald-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg shadow p-8 text-center">
            <h3 className="text-lg font-medium text-white mb-2">No feedback found</h3>
            <p className="text-gray-400">Try adjusting your search criteria</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-300
              disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 rounded-md ${
                    page === currentPage
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-800 border border-gray-700 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-md bg-gray-800 border border-gray-700 text-gray-300
              disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {selectedFeedback && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-emerald-400">Feedback Details</h3>
                <button 
                  onClick={closeModal}
                  className="p-1 hover:bg-gray-700 rounded-full"
                >
                  <X size={24} className="text-gray-400 hover:text-white" />
                </button>
              </div>
              
              <div className="flex items-center mb-6 bg-gray-900 p-4 rounded-lg">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mr-4 shadow-lg">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-white">{selectedFeedback.fullName}</h3>
                  <div className="flex items-center text-gray-400 mt-1">
                    <Mail className="h-4 w-4 mr-2" />
                    {selectedFeedback.email}
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 rounded-lg p-5 mb-6">
                <h4 className="text-lg font-medium text-emerald-400 mb-3 flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  Feedback Message
                </h4>
                <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                  {selectedFeedback.message}
                </p>
              </div>
              
              <div className="flex justify-end">
                <button 
                  onClick={closeModal}
                  className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}