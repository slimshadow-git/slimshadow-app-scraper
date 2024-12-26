import React from 'react';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { FileList } from './components/FileList';
import { Pagination } from './components/Pagination';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useDarkMode } from './hooks/useDarkMode';
import { useFileList } from './hooks/useFileList';

function App() {
  const [isDark, setIsDark] = useDarkMode();
  const {
    files,
    loading,
    error,
    totalPages,
    currentPage,
    setCurrentPage,
    perPage,
    setPerPage,
    searchQuery,
    setSearchQuery
  } = useFileList();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <ErrorBoundary>
        <Header isDark={isDark} onToggleDarkMode={() => setIsDark(!isDark)} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
          
          {loading ? (
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          ) : (
            <>
              <FileList files={files} />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                perPage={perPage}
                onPageChange={setCurrentPage}
                onPerPageChange={setPerPage}
              />
            </>
          )}
        </main>
      </ErrorBoundary>
    </div>
  );
}

export default App;